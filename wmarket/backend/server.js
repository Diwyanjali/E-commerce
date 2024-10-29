const express = require("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const session = require("express-session");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const cron = require("node-cron");
const http = require('http');
const socketIo = require('socket.io');

const salt = 10;

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
app.use(cors(corsOptions));

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "newwalmart",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.stack);
    return;
  }
  console.log("Connected to database.");
});

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    console.log("No token provided");
    return res.status(401).json({ message: "Unauthorized" });
  }
  jwt.verify(token, "secret", (err, user) => {
    if (err) {
      console.log("Token verification failed:", err);
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = user;
    next();
  });
};

app.post("/login", (req, res) => {
  const sql = "SELECT * FROM users WHERE email = ?";
  const values = [req.body.email];
  db.query(sql, values, (err, data) => {
    if (err) {
      return res.json({ message: "Server Side Error" });
    }
    if (data.length > 0) {
      bcrypt.compare(
        req.body.password.toString(),
        data[0].password,
        (err, result) => {
          if (err) return res.json({ message: "Server Side Error" });
          if (result) {
            const token = jwt.sign(
              { id: data[0].id, name: data[0].name, role: data[0].role },
              "secret",
              {
                expiresIn: 86400,
              }
            );
            res.cookie("token", token, {
              httpOnly: true,
              secure: false,
            });
            console.log("Token set in cookie:", token);
            return res.json({ status: "200OK", role: data[0].role });
          } else {
            return res.json({ message: "Invalid credentials" });
          }
        }
      );
    } else {
      return res.json({ message: "User does not exist" });
    }
  });
});

app.post("/signup", (req, res) => {
  const emailCheckSql = "SELECT email FROM users WHERE email = ?";
  const email = req.body.email;

  db.query(emailCheckSql, [email], (err, result) => {
    if (err) {
      return res.json({ message: "Server Side Error" });
    }

    if (result.length > 0) {
      // Email already exists
      return res.json({
        status: "error",
        message: "Email is already registered. Please login.",
      });
    } else {
      // Proceed with registration if the email doesn't exist
      bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
        if (err) return res.json({ message: "Server Side Error" });

        const sql =
          "INSERT INTO users (name, email, password, mobile, role) VALUES (?, ?, ?, ?, ?)";
        const values = [
          req.body.name,
          req.body.email,
          hash,
          req.body.mobile,
          req.body.role,
        ];

        db.query(sql, values, (err, data) => {
          if (err) {
            return res.json({ message: "Server Side Error" });
          }
          return res.json({ status: "200OK" });
        });
      });
    }
  });
});


app.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ status: "200OK" });
});

app.get("/userinfo", verifyToken, (req, res) => {
  const sql = "SELECT * FROM users WHERE id = ?";
  db.query(sql, [req.user.id], (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Server Side Error" });
    }
    if (data.length > 0) {
      return res.json({
        status: "200OK",
        id: data[0].id,
        name: data[0].name,
        email: data[0].email,
        mobile: data[0].mobile,
        role: data[0].role,
        m_id: data[0].m_id,
        total_profit: data[0].total_profit,
        state: data[0].status,
        freeze_balance: data[0].freeze_balance,
      });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  });
});

app.post("/createproduct", upload.single("image"), (req, res) => {
  const image = req.file.filename;
  const sql =
    "INSERT INTO product (productname, description, price, quantity, category_type, membership_type, image) VALUES (?, ?, ?, ?, ?, ?, ?)";
  const values = [
    req.body.productname,
    req.body.description,
    req.body.price,
    req.body.quantity,
    req.body.category_type,
    req.body.membership_type,
    image,
  ];
  db.query(sql, values, (err, data) => {
    if (err) {
      return res.json({ message: "Server Side Error" });
    }
    return res.json({ status: "200OK", id: data.insertId });
  });
});

// Get all products
app.get("/product", (req, res) => {
  const sql = "SELECT * FROM product";
  db.query(sql, (err, data) => {
    if (err) {
      return res.json({ message: "Server Side Error" });
    }
    return res.json(data);
  });
});

// Get a single product by ID
app.get("/product/:product_id", (req, res) => {
  const sql = "SELECT * FROM product WHERE product_id = ?";
  db.query(sql, [req.params.product_id], (err, data) => {
    if (err) {
      return res.json({ message: "Server Side Error" });
    }
    if (data.length > 0) {
      return res.json(data[0]);
    } else {
      return res.status(404).json({ message: "Product not found" });
    }
  });
});

// Update Product
app.put("/update/:product_id", upload.single("image"), (req, res) => {
  let image = req.body.existingImage;
  if (req.file) {
    image = req.file.filename;
  }
  const sql =
    "UPDATE product SET productname = ?, description = ?, price = ?, quantity = ?, category_type = ?, membership_type =?, image = ? WHERE product_id = ?";
  const values = [
    req.body.productname,
    req.body.description,
    req.body.price,
    req.body.quantity,
    req.body.category_type,
    req.body.membership_type,
    image,
    req.params.product_id,
  ];
  db.query(sql, values, (err, data) => {
    if (err) {
      return res.json({ message: "Server Side Error" });
    }
    return res.json({ status: "200OK" });
  });
});

// Delete Product
app.delete("/product/:product_id", (req, res) => {
  const sql = "DELETE FROM product WHERE product_id = ?";
  db.query(sql, [req.params.product_id], (err, data) => {
    if (err) {
      return res.json({ message: "Server Side Error" });
    }
    return res.json({ status: "200OK" });
  });
});

app.get("/membership_types", (req, res) => {
  const query = "SELECT m_id, title FROM membership";
  db.query(query, (error, results) => {
    if (error) {
      return res.json({ message: "Server Side Error" });
    }
    res.json(results);
  });
});

// Customer
app.get("/customer", (req, res) => {
  const sql = `
    SELECT DISTINCT u.id, u.name, u.email, u.mobile, u.role, u.m_id, u.total_profit, u.status, u.freeze_balance,
                    IFNULL(mr.m_title, '') AS m_title
    FROM users u
    LEFT JOIN membership_requests mr ON u.m_id = mr.m_id
    WHERE u.role != 'admin'
  `;

  db.query(sql, (err, data) => {
    if (err) {
      return res.json({ message: "Server Side Error" });
    }
    return res.json(data);
  });
});

app.put("/customer/status/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (status !== "active" && status !== "block") {
    return res.status(400).json({ message: "Invalid status value" });
  }

  const sql = "UPDATE users SET status = ? WHERE id = ?";
  db.query(sql, [status, id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Server Side Error" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Customer not found" });
    }

    if (status === "active") {
      updateFreezeAndTotal(id, (updateResult) => {
        if (updateResult.status === 200) {
          return res.json({
            status: "200OK",
            message:
              "Customer status updated and total profit updated successfully",
          });
        } else {
          return res.status(updateResult.status).json(updateResult);
        }
      });
    } else {
      return res.json({
        status: "200OK",
        message: "Customer status updated successfully",
      });
    }
  });
});

app.post("/createcustomer", (req, res) => {
  const emailCheckSql = "SELECT email FROM users WHERE email = ?";
  const email = req.body.email;

  db.query(emailCheckSql, [email], (err, result) => {
    if (err) {
      return res.json({ message: "Server Side Error" });
    }

    if (result.length > 0) {
      return res.json({
        status: "error",
        message: "Email is already registered.",
      });
    } else {
      bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
        if (err) return res.json({ message: "Server Side Error" });

        const sql =
          "INSERT INTO users (name, email, password, mobile, role) VALUES (?, ?, ?, ?, ?)";
        const values = [
          req.body.name,
          req.body.email,
          hash,
          req.body.mobile,
          req.body.role,
        ];

        db.query(sql, values, (err, data) => {
          if (err) {
            return res.json({ message: "Server Side Error" });
          }
          return res.json({ status: "200OK", message: "Customer created successfully." });
        });
      });
    }
  });
});

app.get("/customer/:id", (req, res) => {
  const sql = "SELECT * FROM users WHERE id = ?";
  db.query(sql, [req.params.id], (err, data) => {
    if (err) {
      return res.json({ message: "Server Side Error" });
    }
    if (data.length > 0) {
      return res.json(data[0]);
    } else {
      return res.status(404).json({ message: "Customer not found" });
    }
  });
});

//customer record update
app.put("/customer_update/:id", (req, res) => {
  const { name, email, mobile, m_title } = req.body;

  // Start with an empty array of update fields and values
  let updateFields = [];
  let updateValues = [];

  // Check each field, if provided, push it into the update query and values array
  if (name) {
    updateFields.push("name = ?");
    updateValues.push(name);
  }
  if (email) {
    updateFields.push("email = ?");
    updateValues.push(email);
  }
  if (mobile) {
    updateFields.push("mobile = ?");
    updateValues.push(mobile);
  }

  // Handle the membership title separately to get m_id from the membership table
  if (m_title) {
    const getMembershipIdQuery = "SELECT m_id FROM membership WHERE title = ?";

    db.query(getMembershipIdQuery, [m_title], (err, membershipResults) => {
      if (err) {
        console.error("Error fetching membership id:", err);
        return res
          .status(500)
          .json({ message: "Error fetching membership id" });
      }

      if (membershipResults.length === 0) {
        return res.status(404).json({ message: "Membership not found" });
      }

      const m_id = membershipResults[0].m_id;
      updateFields.push("m_id = ?");
      updateValues.push(m_id);

      // Once membership is fetched, update the user
      updateValues.push(req.params.id);
      const sql = `UPDATE users SET ${updateFields.join(", ")} WHERE id = ?`;

      db.query(sql, updateValues, (updateErr, data) => {
        if (updateErr) {
          console.error("Error updating user:", updateErr);
          return res.status(500).json({ message: "Server Side Error" });
        }

        return res.json({
          status: "200OK",
          message: "User updated successfully",
        });
      });
    });
  } else {
    // If no membership title to update, just update the user with provided fields
    if (updateFields.length > 0) {
      updateValues.push(req.params.id);
      const sql = `UPDATE users SET ${updateFields.join(", ")} WHERE id = ?`;

      db.query(sql, updateValues, (updateErr, data) => {
        if (updateErr) {
          console.error("Error updating user:", updateErr);
          return res.status(500).json({ message: "Server Side Error" });
        }

        return res.json({
          status: "200OK",
          message: "User updated successfully",
        });
      });
    } else {
      // If no fields are provided, return a message
      return res.status(400).json({ message: "No fields to update" });
    }
  }
});

app.delete("/customer/:id", (req, res) => {
  const sql = "DELETE FROM users WHERE id = ?";
  db.query(sql, [req.params.id], (err, data) => {
    if (err) {
      return res.json({ message: "Server Side Error" });
    }
    return res.json({ status: "200OK" });
  });
});

// News
app.get("/new", (req, res) => {
  const sql = "SELECT * FROM news";
  db.query(sql, (err, data) => {
    if (err) {
      return res.json({ message: "Server Side Error" });
    }
    return res.json(data);
  });
});

app.post("/news_create", upload.single("image"), (req, res) => {
  const image = req.file.filename;
  const sql =
    "INSERT INTO news (news_type, title, description, date, author, image) VALUES (?, ?, ?, ?, ?, ?)";
  const values = [
    req.body.news_type,
    req.body.title,
    req.body.description,
    req.body.date,
    req.body.author,
    image,
  ];
  db.query(sql, values, (err, data) => {
    if (err) {
      return res.json({ message: "Server Side Error" });
    }
    return res.json({ status: "200OK", id: data.insertId });
  });
});

app.get("/new/:n_id", (req, res) => {
  const sql = "SELECT * FROM news WHERE n_id = ?";
  db.query(sql, [req.params.n_id], (err, data) => {
    if (err) {
      return res.json({ message: "Server Side Error" });
    }
    if (data.length > 0) {
      return res.json(data[0]);
    } else {
      return res.status(404).json({ message: "news not found" });
    }
  });
});

app.put("/news_update/:n_id", upload.single("image"), (req, res) => {
  let image = req.body.existingImage;
  if (req.file) {
    image = req.file.filename;
  }
  const sql =
    "UPDATE news SET news_type = ?, title = ?, description = ?, date = ?, author = ?, image = ? WHERE n_id = ?";
  const values = [
    req.body.news_type,
    req.body.title,
    req.body.description,
    req.body.date,
    req.body.author,
    image,
    req.params.n_id,
  ];
  db.query(sql, values, (err, data) => {
    if (err) {
      return res.json({ message: "Server Side Error" });
    }
    return res.json({ status: "200OK" });
  });
});

app.delete("/new/:n_id", (req, res) => {
  const sql = "DELETE FROM news WHERE n_id = ?";
  db.query(sql, [req.params.n_id], (err, data) => {
    if (err) {
      return res.json({ message: "Server Side Error" });
    }
    return res.json({ status: "200OK" });
  });
});

// Membership
app.get("/fetch_memberships", (req, res) => {
  const sql = `
    SELECT m.m_id, m.title, m.balance, m.commission, m.image, COUNT(p.product_id) AS orde
    FROM membership m
    LEFT JOIN product p ON m.title = p.membership_type
    GROUP BY m.m_id, m.title, m.balance, m.commission, m.orde, m.image
  `;
  db.query(sql, (err, data) => {
    if (err) {
      return res.json({ message: "Server Side Error" });
    }
    return res.json(data);
  });
});

app.post("/membership_create", upload.single("image"), (req, res) => {
  const image = req.file.filename;
  const sql =
    "INSERT INTO membership (title, balance, commission, image) VALUES (?, ?, ?,?)";
  const values = [req.body.title, req.body.balance, req.body.commission, image];
  db.query(sql, values, (err, data) => {
    if (err) {
      return res.json({ message: "Server Side Error" });
    }
    return res.json({ status: "200OK", id: data.insertId });
  });
});

////////////////////////////////
app.post("/add_membershipRequests", (req, res) => {
  const { user_id, m_id } = req.body;

  const status = null;

  const userCheckSql = "SELECT name, mobile FROM users WHERE id = ?";
  const membershipCheckSql = "SELECT title FROM membership WHERE m_id = ?";

  // Fetch user's name
  db.query(userCheckSql, [user_id], (err, userData) => {
    if (err) {
      return res.json({ message: "Server side error during user check" });
    }
    if (userData.length === 0) {
      return res.json({ message: "Invalid user_id" });
    }

    const username = userData[0].name;
    const phone = userData[0].mobile;

    // Fetch membership title
    db.query(membershipCheckSql, [m_id], (err, membershipData) => {
      if (err) {
        return res.json({
          message: "Server side error during membership check",
        });
      }
      if (membershipData.length === 0) {
        return res.json({ message: "Invalid m_id" });
      }

      const m_title = membershipData[0].title;

      const insertSql = `
        INSERT INTO membership_requests (user_id, username, m_id, m_title, phone, status)
        VALUES (?, ?, ?, ?, ?, ?)`;
      const values = [user_id, username, m_id, m_title, phone, status];

      db.query(insertSql, values, (err, data) => {
        if (err) {
          return res.json({
            message: "Server side error during request insertion",
          });
        }
        return res.json({ status: "200", data: values });
      });
    });
  });
});
// Route to get count of pending membership requests
app.get('/membership_requests/count', (req, res) => {
  const query = 'SELECT COUNT(*) AS count FROM membership_requests WHERE status IS NULL';

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Server Side Error" });
    }
    res.json(results[0]);
  });
});

// Get all membership requests with status NULL
app.get("/membershipRequests", (req, res) => {
  const sql = `
    SELECT * FROM membership_requests
    WHERE status IS NULL`;

  db.query(sql, (err, data) => {
    if (err) {
      return res.json({ message: "Server side error" });
    }
    return res.json({ data: data });
  });
});

app.put("/update_mRequest/:user_id/:m_id", (req, res) => {
  const { user_id, m_id } = req.params;
  const { status } = req.body;

  if (status !== "accepted" && status !== "rejected") {
    return res.status(400).json({ message: "Invalid status value" });
  }

  const requestCheckSql =
    "SELECT * FROM membership_requests WHERE user_id = ? AND m_id = ?";
  db.query(requestCheckSql, [user_id, m_id], (err, data) => {
    if (err) {
      return res.json({ message: "Server side error during request check" });
    }
    if (data.length === 0) {
      return res.status(404).json({ message: "Request not found" });
    }

    const updateRequestSql =
      "UPDATE membership_requests SET status = ? WHERE user_id = ? AND m_id = ?";

    db.query(updateRequestSql, [status, user_id, m_id], (err) => {
      if (err) {
        return res.json({ message: "Server side error during request update" });
      }

      if (status === "accepted") {
        const updateUserSql = "UPDATE users SET m_id = ? WHERE id = ?";
        db.query(updateUserSql, [m_id, user_id], (err) => {
          if (err) {
            return res.json({
              message: "Server side error during user update",
            });
          }
          return res.json({
            status: "200",
            message: "Request status and user membership updated successfully",
          });
        });
      } else {
        return res.json({
          status: "200",
          message: "Request status updated successfully",
        });
      }
    });
  });
});
////////////////////////////////

app.get("/category/:m_id", (req, res) => {
  const sql = "SELECT * FROM membership WHERE m_id = ?";
  db.query(sql, [req.params.m_id], (err, data) => {
    if (err) {
      return res.json({ message: "Server Side Error" });
    }
    if (data.length > 0) {
      return res.json(data[0]);
    } else {
      return res.status(404).json({ message: "news not found" });
    }
  });
});

app.put("/membership_update/:m_id", upload.single("image"), (req, res) => {
  let image = req.body.existingImage;
  if (req.file) {
    image = req.file.filename;
  }
  const sql =
    "UPDATE membership SET title = ?, balance = ?, commission = ?,orde = ?, image = ? WHERE m_id = ?";
  const values = [
    req.body.title,
    req.body.balance,
    req.body.commission,
    req.body.orde,
    image,
    req.params.m_id,
  ];
  db.query(sql, values, (err, data) => {
    if (err) {
      return res.json({ message: "Server Side Error" });
    }
    return res.json({ status: "200OK" });
  });
});
app.delete("/category/:m_id", (req, res) => {
  const sql = "DELETE FROM membership WHERE m_id = ?";
  db.query(sql, [req.params.m_id], (err, data) => {
    if (err) {
      return res.json({ message: "Server Side Error" });
    }
    return res.json({ status: "200OK" });
  });
});
app.delete("/category/:m_id", (req, res) => {
  const sql = "DELETE FROM membership WHERE m_id = ?";
  db.query(sql, [req.params.m_id], (err, data) => {
    if (err) {
      return res.json({ message: "Server Side Error" });
    }
    return res.json({ status: "200OK" });
  });
});
app.get("/count_product", (req, res) => {
  const sql = "SELECT COUNT(*) AS count FROM product";
  db.query(sql, (err, data) => {
    if (err) {
      return res.json({ message: "Server Side Error" });
    }
    return res.json(data[0]);
  });
});

app.get("/count_membership", (req, res) => {
  const sql = "SELECT COUNT(*) AS count FROM membership";
  db.query(sql, (err, data) => {
    if (err) {
      return res.json({ message: "Server Side Error" });
    }
    return res.json(data[0]);
  });
});
app.get("/count_customer", (req, res) => {
  const sql = "SELECT COUNT(*) AS count FROM users";
  db.query(sql, (err, data) => {
    if (err) {
      return res.json({ message: "Server Side Error" });
    }
    return res.json(data[0]);
  });
});

app.get("/fetch_news", (req, res) => {
  const newsType = "Latest News";
  const query = `SELECT * FROM news WHERE news_type = ?`;

  db.query(query, [newsType], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.get("/fetch_popular", (req, res) => {
  const newsType = "Popular News";
  const query = `SELECT * FROM news WHERE news_type = ?`;

  db.query(query, [newsType], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.get("/fetch_tranding", (req, res) => {
  const newsType = "Tranding News";
  const query = `SELECT * FROM news WHERE news_type = ?`;

  db.query(query, [newsType], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});
app.get("/fetch_memberships", (req, res) => {
  const query = "SELECT * FROM membership";
  db.query(query, (error, results) => {
    if (error) {
      return res.json({ message: "Server Side Error" });
    }
    res.json(results);
  });
});

//delete old orders
function deleteOldOrdersOnStartup() {
  const today = new Date().toISOString().split("T")[0];
  const sql = `DELETE FROM orders WHERE DATE(created_at) != ?`;

  db.query(sql, [today], (err, result) => {
    if (err) {
      console.error("Error deleting old orders:", err);
    } else {
      console.log(
        `${result.affectedRows} old orders deleted on server startup.`
      );
    }
  });
}

app.post("/grab_order/:u_id/:m_id", (req, res) => {
  const { u_id, m_id } = req.params;
  const { status } = "";

  const membershipQuery = `SELECT * FROM membership WHERE m_id = ?`;
  db.query(membershipQuery, [m_id], (err, membershipResults) => {
    if (err) {
      console.error(`Error fetching membership details for m_id: ${m_id}`, err);
      return res
        .status(500)
        .json({ message: "Error fetching membership details" });
    }

    const membershipDetails = membershipResults[0];

    if (!membershipDetails) {
      return res
        .status(404)
        .json({ message: `No membership found with m_id: ${m_id}` });
    }

    const productsQuery = `SELECT product_id, productname, price, lucky FROM product WHERE membership_type = ?`;
    db.query(
      productsQuery,
      [membershipDetails.title],
      (err, productsResults) => {
        if (err) {
          console.error(`Error fetching products for m_id: ${m_id}`, err);
          return res.status(500).json({ message: "Error fetching products" });
        }

        const productIds = productsResults.map((product) => product.product_id);

        if (productIds.length === 0) {
          return res.json({
            membershipDetails,
            products: [],
            message: "No products found for this membership",
          });
        }

        const ordersQuery = `SELECT p_id FROM orders WHERE u_id = ? AND p_id IN (?)`;
        db.query(
          ordersQuery,
          [u_id, productIds],
          async (err, ordersResults) => {
            if (err) {
              console.error(`Error fetching orders for u_id: ${u_id}`, err);
              return res.status(500).json({ message: "Error fetching orders" });
            }

            const existingOrderIds = ordersResults.map((order) => order.p_id);

            const availableProductId = productIds
              .filter((id) => !existingOrderIds.includes(id))
              .sort((a, b) => a - b)[0];

            const nextAvailableProduct = productsResults.find(
              (product) => product.product_id === availableProductId
            );

            if (!nextAvailableProduct) {
              return res.status(404).json({ message: "No available products" });
            }

            // Calculate the profit
            const price = nextAvailableProduct.price;
            const commission = membershipDetails.commission;
            const profit = price * commission;

            const insertOrderQuery = `INSERT INTO orders (u_id, p_id, p_name, price, commission, profit, status) VALUES (?, ?, ?, ?, ?, ?, ?)`;
            const values = [
              u_id,
              nextAvailableProduct.product_id,
              nextAvailableProduct.productname,
              price,
              commission,
              profit,
              status,
            ];

            db.query(insertOrderQuery, values, function (err, result) {
              if (err) {
                console.error(`Error inserting order for u_id: ${u_id}`, err);
                return res
                  .status(500)
                  .json({ message: "Error creating order" });
              }

              const newOrderId = result.insertId;

              res.json({
                message: "Order created successfully",
                order: {
                  id: newOrderId,
                  u_id,
                  p_id: nextAvailableProduct.product_id,
                  p_name: nextAvailableProduct.productname,
                  price,
                  commission,
                  profit,
                  status,
                  lucky: nextAvailableProduct.lucky,
                },
              });
            });
          }
        );
      }
    );
  });
});

// Update user's total profit
function addProfitToUser(userId, profit) {
  const updateProfitQuery = `
    UPDATE users 
    SET total_profit = total_profit + ? 
    WHERE id = ?
  `;

  return new Promise((resolve, reject) => {
    db.query(updateProfitQuery, [profit, userId], (err, results) => {
      if (err) {
        console.error(
          `Error updating total profit for user_id: ${userId}`,
          err
        );
        return reject({
          success: false,
          message: "Error updating total profit",
        });
      }

      if (results.affectedRows === 0) {
        return resolve({ success: false, message: "User not found" });
      }

      resolve({ success: true, message: "Total profit updated successfully" });
    });
  });
}

app.post("/updateProfit", async (req, res) => {
  const { userId, profit } = req.body;

  if (!userId || !profit) {
    return res.status(400).json({ message: "User ID and profit are required" });
  }

  try {
    const result = await addProfitToUser(userId, profit);
    if (!result.success) {
      return res.status(500).json({ message: result.message });
    }
    res.json({ message: result.message });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//update freeze balance to withdrawals
function updateFreezeBalance(userId) {
  const getUserProfitSql = `
    SELECT total_profit, freeze_balance 
    FROM users 
    WHERE id = ?`;

  db.query(getUserProfitSql, [userId], (err, results) => {
    if (err) {
      console.error("Error fetching user details", err);
      return;
    }

    if (results.length === 0) {
      console.error("User not found");
      return;
    }

    const user = results[0];
    const { total_profit, freeze_balance } = user;
    const updatedFreezeBalance = freeze_balance + total_profit;

    const updateUserBalanceSql = `
      UPDATE users 
      SET freeze_balance = ?, total_profit = 0.00 
      WHERE id = ?`;

    db.query(
      updateUserBalanceSql,
      [updatedFreezeBalance, userId],
      (updateErr) => {
        if (updateErr) {
          console.error("Error updating balance", updateErr);
          return;
        }

        console.log(`Freeze balance updated successfully for user ${userId}`);
      }
    );
  });
}

//update freeze balance  and availabal balance
const updateFreezeAndTotal = (userId, callback) => {
  const getUserQuery = `SELECT freeze_balance FROM users WHERE id = ?`;

  db.query(getUserQuery, [userId], (err, results) => {
    if (err) {
      return callback({ message: "Error fetching user details", status: 500 });
    }

    const user = results[0];
    const { freeze_balance } = user;

    const updateUserQuery = `UPDATE users SET total_profit = total_profit + ?, freeze_balance = 0.00 WHERE id = ?`;
    db.query(updateUserQuery, [freeze_balance, userId], (updateErr) => {
      if (updateErr) {
        return callback({
          message: "Error updating user balance",
          status: 500,
        });
      }

      callback({
        message: "User total profit updated successfully",
        freeze_balance: 0.0,
        status: 200,
      });
    });
  });
};

//update order status
app.put("/update_order_status/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ message: "Status is required" });
  }

  const updateQuery = `UPDATE orders SET status = ?, created_at = NOW() WHERE id = ?`;
  db.query(updateQuery, [status, id], (err, result) => {
    if (err) {
      console.error(`Error updating status for order id: ${id}`, err);
      return res.status(500).json({ message: "Error updating order status" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: `No order found with id: ${id}` });
    }

    const getLuckyProductQuery = `
      SELECT p.lucky, o.u_id 
      FROM product p
      JOIN orders o ON p.product_id = o.p_id
      WHERE o.id = ?`;

    db.query(getLuckyProductQuery, [id], (err, productResult) => {
      if (err) {
        console.error(`Error fetching lucky status for order id: ${id}`, err);
        return res.status(500).json({ message: "Error fetching lucky status" });
      }

      if (productResult.length === 0) {
        return res
          .status(404)
          .json({ message: `No product found for order id: ${id}` });
      }

      const { lucky, u_id } = productResult[0];

      if (status === "paid" && lucky === "yes") {
        updateFreezeBalance(u_id);
      }

      res.json({
        message: "Order status updated successfully",
        orderId: id,
        newStatus: status,
        luckyProduct: lucky === "yes" ? true : false,
      });
    });
  });
});

//get admin mobile number
app.get("/admin-mobile", (req, res) => {
  const getAdminMobileQuery = `
    SELECT mobile 
    FROM users 
    WHERE role = 'admin'`;

  db.query(getAdminMobileQuery, (err, results) => {
    if (err) {
      console.error("Error fetching admin mobile numbers:", err);
      return res
        .status(500)
        .json({ message: "Error fetching admin mobile numbers" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "No admin found" });
    }

    const adminMobiles = results.map((row) => row.mobile);

    res.json({
      message: "Admin mobile numbers fetched successfully",
      mobiles: adminMobiles,
    });
  });
});

//check order status
app.get("/pending/:u_id", (req, res) => {
  const { u_id } = req.params;

  if (!u_id) {
    return res.status(400).json({ message: "User ID is required" });
  }

  const checkPendingOrdersQuery = `SELECT COUNT(*) AS count FROM orders WHERE u_id = ? AND status = 'pending'`;

  db.query(checkPendingOrdersQuery, [u_id], (err, results) => {
    if (err) {
      console.error(`Error checking pending orders for user_id: ${u_id}`, err);
      return res.status(500).json({ message: "Error checking pending orders" });
    }

    const count = results[0].count;

    res.json({
      hasPendingOrders: count > 0,
    });
  });
});

//get pending orders
app.get("/pending_orders/:u_id", (req, res) => {
  const { u_id } = req.params;

  if (!u_id) {
    return res.status(400).json({ message: "User ID is required" });
  }

  const checkPendingOrdersQuery = `
    SELECT orders.*, product.* 
    FROM orders 
    JOIN product ON orders.p_id = product.product_id 
    WHERE orders.u_id = ? AND orders.status = 'pending'
  `;

  db.query(checkPendingOrdersQuery, [u_id], (err, results) => {
    if (err) {
      console.error(`Error checking pending orders for user_id: ${u_id}`, err);
      return res.status(500).json({ message: "Error checking pending orders" });
    }

    res.json({
      pendingOrders: results,
    });
  });
});

app.get("/paidOrders/:u_id", (req, res) => {
  const { u_id } = req.params;

  if (!u_id) {
    return res.status(400).json({ message: "User ID is required" });
  }

  const checkPaidOrdersQuery = `
    SELECT orders.*, product.*, 
           DATE_FORMAT(orders.created_at, '%d-%m-%Y') AS date
    FROM orders 
    JOIN product ON orders.p_id = product.product_id 
    WHERE orders.u_id = ? AND orders.status = 'paid'
  `;

  db.query(checkPaidOrdersQuery, [u_id], (err, results) => {
    if (err) {
      console.error(`Error checking paid orders for user_id: ${u_id}`, err);
      return res.status(500).json({ message: "Error checking paid orders" });
    }

    res.json({
      paidOrders: results,
    });
  });
});

app.get("/getMembershipProductCount/:userId", (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  const getMembershipIdQuery = `
    SELECT m_id 
    FROM users 
    WHERE id = ?
  `;

  db.query(getMembershipIdQuery, [userId], (err, results) => {
    if (err) {
      console.error(
        `Error retrieving membership ID for user_id: ${userId}`,
        err
      );
      return res
        .status(500)
        .json({ message: "Error retrieving membership ID" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const m_id = results[0].m_id;

    const getMembershipTitleQuery = `
      SELECT title 
      FROM membership 
      WHERE m_id = ?
    `;

    db.query(getMembershipTitleQuery, [m_id], (err, results) => {
      if (err) {
        console.error(
          `Error retrieving membership title for m_id: ${m_id}`,
          err
        );
        return res
          .status(500)
          .json({ message: "Error retrieving membership title" });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: "Membership not found" });
      }

      const title = results[0].title;

      const getProductCountQuery = `
        SELECT COUNT(*) AS productCount 
        FROM product 
        WHERE membership_type = ?
      `;

      db.query(getProductCountQuery, [title], (err, results) => {
        if (err) {
          console.error(
            `Error counting products with membership_type: ${title}`,
            err
          );
          return res.status(500).json({ message: "Error counting products" });
        }

        const productCount = results[0].productCount;

        res.json({
          userId: userId,
          membershipTitle: title,
          productCount: productCount,
        });
      });
    });
  });
});

app.get("/totalProfit/:u_id", (req, res) => {
  const { u_id } = req.params;

  if (!u_id) {
    return res.status(400).json({ message: "User ID is required" });
  }

  const today = new Date().toISOString().split("T")[0];

  const getTotalProfitQuery = `
    SELECT 
      SUM(profit) AS totalProfit,
      COUNT(*) AS totalPaidToday
    FROM orders 
    WHERE u_id = ? 
      AND status = 'paid'
      AND DATE(created_at) = ?
  `;

  db.query(getTotalProfitQuery, [u_id, today], (err, results) => {
    if (err) {
      console.error(`Error calculating total profit for user_id: ${u_id}`, err);
      return res
        .status(500)
        .json({ message: "Error calculating total profit" });
    }

    const totalProfit = results[0].totalProfit || 0;
    const totalPaidToday = results[0].totalPaidToday || 0;

    res.json({
      userId: u_id,
      totalProfit: totalProfit,
      totalPaidToday: totalPaidToday,
    });
  });
});

// get user
app.get("/user/:userId", (req, res) => {
  const sql = "SELECT * FROM users WHERE id = ?";
  db.query(sql, [req.params.userId], (err, data) => {
    if (err) {
      return res.json({ message: "Server Side Error" });
    }
    if (data.length > 0) {
      return res.json(data[0]);
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  });
});

//Lucky order
//product counts memberships vise
app.get("/product-count", (req, res) => {
  const sql = `
    SELECT membership_type, COUNT(*) AS product_count
    FROM product
    GROUP BY membership_type
  `;

  db.query(sql, (err, data) => {
    if (err) {
      return res.json({ message: "Server Side Error" });
    }
    if (data.length > 0) {
      return res.json(data);
    } else {
      return res.status(404).json({ message: "No products found" });
    }
  });
});

app.get("/smallestProductCount", (req, res) => {
  const sqlQuery = `SELECT membership_type, COUNT(*) AS product_count
    FROM product
    GROUP BY membership_type`;

  db.query(sqlQuery, (err, data) => {
    if (err) {
      return res.json({ message: "Server Side Error" });
    }

    if (data.length > 0) {
      const smallestCount = data.reduce((min, current) => {
        return current.product_count < min ? current.product_count : min;
      }, data[0].product_count);

      return res.json({ smallestProductCount: smallestCount });
    } else {
      return res.status(404).json({ message: "No products found" });
    }
  });
});

//update lucky product
app.put("/product/lucky/:number", (req, res) => {
  const { number } = req.params;

  db.beginTransaction((err) => {
    if (err) {
      return res.status(500).json({ message: "Transaction Error" });
    }

    const unsetPreviousLuckySql =
      "UPDATE product SET lucky = 'no' WHERE lucky = 'yes'";
    db.query(unsetPreviousLuckySql, (err, result) => {
      if (err) {
        return db.rollback(() => {
          res
            .status(500)
            .json({ message: "Error unsetting previous lucky product" });
        });
      }

      const setNewLuckySql = `
        UPDATE product p
        JOIN (
          SELECT product_id
          FROM (
            SELECT product_id, membership_type, ROW_NUMBER() OVER (PARTITION BY membership_type ORDER BY product_id) AS row_num
            FROM product
          ) AS ranked_products
          WHERE row_num = ?
        ) AS nth_products
        ON p.product_id = nth_products.product_id
        SET p.lucky = 'yes';
      `;

      db.query(setNewLuckySql, [parseInt(number)], (err, result) => {
        if (err) {
          return db.rollback(() => {
            res
              .status(500)
              .json({ message: "Error setting new lucky product" });
          });
        }

        db.commit((err) => {
          if (err) {
            return db.rollback(() => {
              res.status(500).json({ message: "Transaction Commit Error" });
            });
          }
          res.json({ message: "Lucky products updated successfully" });
        });
      });
    });
  });
});

//fetch lucky products
app.get("/products/lucky", (req, res) => {
  const getLuckyProductsSql = "SELECT * FROM product WHERE lucky = 'yes'";

  db.query(getLuckyProductsSql, (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Server Side Error" });
    }

    if (data.length > 0) {
      return res.json(data);
    } else {
      return res.status(404).json({ message: "No lucky products found" });
    }
  });
});

//////////

app.put("/withdrawalrequests/:user_id/:request_id", (req, res) => {
  const { user_id, request_id } = req.params;
  const { status, amount } = req.body;

  // Validate the status value
  if (status !== "accepted" && status !== "rejected") {
    return res.status(400).json({ error: "Invalid status" });
  }

  // Set the current date as the processed_date
  const processedDate = new Date().toISOString().slice(0, 19).replace("T", " ");

  // Begin transaction
  db.beginTransaction((err) => {
    if (err)
      return res
        .status(500)
        .json({ error: "Transaction failed", details: err.message });

    // Update the status and processed_date in the database
    db.query(
      "UPDATE withdrawalrequests SET status = ?, processed_date = ? WHERE user_id = ? AND request_id = ?",
      [status, processedDate, user_id, request_id],
      (error, results) => {
        if (error) {
          return db.rollback(() => {
            res.status(500).json({
              error: "Database update failed",
              details: error.message,
            });
          });
        }

        if (results.affectedRows > 0 && status === "accepted") {
          // Reduce the total_profit in the user table
          db.query(
            "UPDATE users SET total_profit = total_profit - ? WHERE id = ?",
            [amount, user_id],
            (error, results) => {
              if (error) {
                return db.rollback(() => {
                  res.status(500).json({
                    error: "Failed to update total_profit",
                    details: error.message,
                  });
                });
              }

              // Commit the transaction
              db.commit((err) => {
                if (err) {
                  return db.rollback(() => {
                    res.status(500).json({
                      error: "Transaction commit failed",
                      details: err.message,
                    });
                  });
                }

                // Return the updated processedDate in the response
                res.status(200).json({
                  message: "Status and processed date updated successfully",
                  processedDate,
                });
              });
            }
          );
        } else if (results.affectedRows > 0 && status === "rejected") {
          // Commit the transaction for rejection
          db.commit((err) => {
            if (err) {
              return db.rollback(() => {
                res.status(500).json({
                  error: "Transaction commit failed",
                  details: err.message,
                });
              });
            }

            // Return the updated processedDate in the response
            res.status(200).json({
              message: "Status and processed date updated successfully",
              processedDate,
            });
          });
        } else {
          res.status(404).json({ error: "Request not found" });
        }
      }
    );
  });
});
///////////////////////////////////////////////////////////////
// Handle withdrawal request
app.post("/withdrawal", (req, res) => {
  const { name, customerId, amount } = req.body;

  const userId = customerId; // Assuming customerId is equivalent to userId
  const status = "Pending";
  const requestDate = new Date().toISOString().slice(0, 19).replace("T", " "); // Format to 'YYYY-MM-DD HH:MM:SS'

  // Insert data into withdrawalrequests table
  const query = `
    INSERT INTO withdrawalrequests (user_id, name, amount, status, request_date)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [userId, name, amount, status, requestDate],
    (err, result) => {
      if (err) {
        console.error("Error inserting data:", err);
        res
          .status(500)
          .json({ message: "Failed to submit withdrawal request." });
      } else {
        res
          .status(200)
          .json({ message: "Withdrawal request submitted successfully!" });
      }
    }
  );
});

// Route to get count of pending withdrawal requests
app.get('/withdrawal_requests/count', (req, res) => {
  const query = 'SELECT COUNT(*) AS count FROM withdrawalrequests WHERE status = "Pending"';

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Server Side Error" });
    }
    res.json(results[0]);
  });
});

// Route to fetch withdrawal requests (for completeness)
app.get("/fetch_withdrawalrequests", (req, res) => {
  const query = "SELECT * FROM withdrawalrequests";
  db.query(query, (error, results) => {
    if (error) {
      return res.json({ message: "Server Side Error" });
    }
    res.json(results);
  });
});

// Assuming you're using a middleware that sets req.user based on the logged-in user
app.get("/withdrawal_history", (req, res) => {
  const userId = req.query.user_id; // Get the user_id from the query parameter

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  // Fetch withdrawal history from the database for the given user ID
  const query =
    "SELECT request_id, request_date, amount, status, processed_date FROM withdrawalrequests WHERE user_id = ?";

  db.query(query, [userId], (error, results) => {
    if (error) {
      return res.status(500).json({ error: "Database query failed" });
    }
    res.status(200).json(results);
  });
});


app.use('/forgot', require('./routes/ForgotPassword'));


app.listen(3000, () => {
  console.log("Server is running on port 3000");
  deleteOldOrdersOnStartup();
});
