import { useState } from "react";
import "./CreateProduct.css";
import { Form, Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function CreateCustomer() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, SetPassword] = useState("");
  const [role, SetRole] = useState("visitor");
  const [errors, setErrors] = useState({}); // New state for errors

  const navigate = useNavigate();
  const validate = () => {
    let errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name) {
      errors.name = "Customer name is required";
    }

    if (!email) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      errors.email = "Invalid email format";
    }

    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }

    if (!mobile) {
      errors.mobile = "Mobile number is required";
    } else if (mobile.length !== 10) {
      errors.mobile = "Mobile number must be 10 digits long";
    }

    return errors;
  };

  function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate(); // Validate the form
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); // Set errors if validation fails
      return;
    }

    axios
      .post("http://localhost:3000/createcustomer", {
        name: name,
        email: email,
        mobile: mobile,
        password: password,
        role: role,
      })
      .then((res) => {
        if (res.data.status === "200OK") {
          Swal.fire({
            icon: "success",
            title: "Customer Created Successfully",
            text: "Customer has been added.",
            confirmButtonText: "OK",
          });
          navigate("/customer");
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => console.log(err));
  }

  function handleCancel() {
    navigate("/customer");
  }

  return (
    <Container className="mt-3 product-container">
      <h1 className="text-center mb-4">Create Customer</h1>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="productname">
            <Form.Label>Customer Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter product name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <p className="text-danger">{errors.name}</p>}
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="text-danger">{errors.email}</p>}
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => SetPassword(e.target.value)}
            />
            {errors.password && (
              <p className="text-danger">{errors.password}</p>
            )}
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="mobile">
            <Form.Label>whatsapp Number</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter phone Number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
            {errors.mobile && <p className="text-danger">{errors.mobile}</p>}
          </Form.Group>
        </Row>

        <select
          style={{ display: "none" }}
          value={role.role}
          onChange={(e) => SetRole({ ...role, role: e.target.value })}
        >
          <option value="visitor">visitor</option>
        </select>

        <Row className="mb-3">
          <Col className="text-center">
            <Button variant="secondary" className="me-3" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default CreateCustomer;
