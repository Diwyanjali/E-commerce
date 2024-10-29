import { useState, useEffect } from "react";
import { Form, Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function UpdateMembership() {
  const [title, setTitle] = useState("");
  const [balance, setBalance] = useState("");
  const [commission, setCommission] = useState("");
  // const [orde, setOrde] = useState("");
  const [file, setFile] = useState(null);
  const [existingImage, setExistingImage] = useState("");
  const { m_id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/category/${m_id}`)
      .then((res) => {
        const membership = res.data;
        setTitle(membership.title);
        setBalance(membership.balance);
        setCommission(membership.commission);
        // setOrde(membership.orde);
        setExistingImage(membership.image);
      })
      .catch((err) => console.log(err));
  }, [m_id]);

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("balance", balance);
    formData.append("commission", commission);
    // formData.append("orde", orde);
    if (file) {
      formData.append("image", file);
    } else {
      formData.append("existingImage", existingImage);
    }

    axios
      .put(`http://localhost:3000/membership_update/${m_id}`, formData)
      .then((res) => {
        if (res.data.status === "200OK") {
          Swal.fire({
            icon: "success",
            title: "Updated Successfully",
            text: " Membership updated successfully.",
            confirmButtonText: "OK",
          });
          navigate("/category");
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => console.log(err));
  }

  function handleCancel() {
    navigate("/category");
  }

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <Container className="mt-3 product-container">
      <h1 className="text-center mb-4">Update Membership</h1>
      <Form onSubmit={handleSubmit} encType="multipart/form-data">
        <Row className="mb-3">
          <Form.Group as={Col} controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="balance">
            <Form.Label>balance</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Balance"
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
              required
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="commission">
            <Form.Label>commission Per Order</Form.Label>

            <Form.Control
              type="text"
              placeholder="Enter Commission"
              value={commission}
              onChange={(e) => setCommission(e.target.value)}
              required
            />
          </Form.Group>
        </Row>
        {/* <Row className="mb-3">
          <Form.Group as={Col} controlId="orde">
            <Form.Label>Daily Order</Form.Label>

            <Form.Control
              type="text"
              placeholder="Enter Order"
              value={orde}
              readOnly
              required
            />
          </Form.Group>
        </Row> */}
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

export default UpdateMembership;
