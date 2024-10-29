import { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
// import { FaSearch } from "react-icons/fa";

const Product = () => {
  const [product, setProduct] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/product")
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSearch = () => {
    if (searchTerm === "") {
      return product;
    }
    return product.filter(
      (item) =>
        item.productname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.membership_type.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const handleDelete = async (product_id) => {
    try {
      await axios.delete(`http://localhost:3000/product/${product_id}`);
      setProduct(
        product.filter((product) => product.product_id !== product_id)
      );
    } catch (err) {
      console.log(err);
    }
  };

  const filteredProducts = handleSearch();

  return (
    <div className="container mt-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
        <Link to="/createproduct" className="btn btn-primary mb-3 mb-md-0">
          Add Product +
        </Link>
        <div className="input-group w-100 w-md-50">
          <input
            type="search"
            className="form-control"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="search-addon"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="btn btn-outline-warning my-2 my-sm-0"
            type="submit"
            id="search-addon"
          >
            Search
          </button>
        </div>
      </div>
      {/* <button className="btn btn-outline-warning my-2 my-sm-0" type="submit">
          Search
        </button> */}
      {/* </div> */}

      <Table striped bordered hover className="mt-4 text-center">
        <thead>
          <tr>
            <th>#</th>
            <th>Product Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Product Category</th>
            <th>Membership Type</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((data, index) => (
            <tr key={index + 1}>
              <td>{index + 1}</td>
              {/* <td>{data.product_id}</td> */}
              <td>{data.productname}</td>
              <td>{data.description}</td>
              <td>{data.price}</td>
              <td>{data.quantity}</td>
              <td>{data.category_type}</td>
              <td>{data.membership_type}</td>
              <td>
                <img
                  src={`http://localhost:3000/uploads/${data.image}`}
                  alt={data.title}
                  style={{ width: "100px", height: "auto" }}
                />
              </td>

              <td>
                <Link
                  to={`/update/${data.product_id}`}
                  className="btn btn-warning me-3"
                >
                  Edit
                </Link>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(data.product_id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Product;
