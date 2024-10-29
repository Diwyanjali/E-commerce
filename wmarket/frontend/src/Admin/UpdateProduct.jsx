import { useState, useEffect } from "react";
import "./CreateProduct.css";
import { Form, Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function UpdateProduct() {
  const [productname, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category_type, setCategory_type] = useState("");
  const [membership_type, setMembership_type] = useState("");
  const [memberships, setMemberships] = useState([]);
  const [file, setFile] = useState(null);
  const [existingImage, setExistingImage] = useState("");
  const { product_id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/product/${product_id}`)
      .then((res) => {
        const product = res.data;
        setProductName(product.productname);
        setDescription(product.description);
        setPrice(product.price);
        setQuantity(product.quantity);
        setCategory_type(product.category_type);
        setMembership_type(product.membership_type);
        setExistingImage(product.image);
      })
      .catch((err) => console.log(err));
    axios.get("http://localhost:3000/membership_types").then((res) => {
      if (Array.isArray(res.data)) {
        setMemberships(res.data);
      } else {
        setMemberships([]);
      }
    });
  }, [product_id]);

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("productname", productname);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("quantity", quantity);
    formData.append("category_type", category_type);
    formData.append("membership_type", membership_type);

    if (file) {
      formData.append("image", file);
    } else {
      formData.append("existingImage", existingImage);
    }
    axios
      .put(`http://localhost:3000/update/${product_id}`, formData)

      .then((res) => {
        if (res.data.status === "200OK") {
          Swal.fire({
            icon: "success",
            title: "updated Successful",
            text: "You are now Updated Product",
            confirmButtonText: "OK",
          });
          navigate("/product");
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => console.log(err));
  }

  function handleCancel() {
    navigate("/product");
  }
  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <Container className="mt-3 product-container">
      {" "}
      <h1 className="text-center mb-4">Update Product</h1>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="productname">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter product name"
              value={productname}
              onChange={(e) => setProductName(e.target.value)}
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter product description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter product price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="quantity">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter product quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="category_type">
            <Form.Label>Category Type</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter category type"
              value={category_type}
              onChange={(e) => setCategory_type(e.target.value)}
              required
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="membership_type">
            <Form.Label>Membership Type</Form.Label>
            <Form.Select
              value={membership_type}
              onChange={(e) => setMembership_type(e.target.value)}
              required
            >
              <option value="">Select Membership Type</option>
              {memberships.map((membership) => (
                <option key={membership.m_id} value={membership.title}>
                  {membership.title}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="image">
            <Form.Label>Image</Form.Label>
            <Form.Control type="file" onChange={handleFile} />
            {existingImage && (
              <img
                src={`http://localhost:3000/uploads/${existingImage}`}
                alt="Existing"
                style={{ width: "50px", height: "auto", marginTop: "10px" }}
              />
            )}
          </Form.Group>
        </Row>
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

export default UpdateProduct;
