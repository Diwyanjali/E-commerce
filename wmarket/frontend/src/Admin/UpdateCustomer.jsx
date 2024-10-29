import { useState, useEffect } from "react";
import "./CreateProduct.css";
import { Form, Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function UpdateCustomer() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [currentMembershipTitle, setCurrentMembershipTitle] = useState("");
  const [membership_type, setMembership_type] = useState("");
  const [membershipOptions, setMembershipOptions] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/customer/${id}`)
      .then((res) => {
        const customer = res.data;
        setName(customer.name);
        setEmail(customer.email);
        setMobile(customer.mobile);
        setMembership_type(customer.m_id);
      })
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    const fetchMemberships = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/membership_types`
        );
        const memberships = response.data;

        setMembershipOptions(memberships);

        const currentMembership = memberships.find(
          (membership) => membership.m_id === membership_type
        );

        setCurrentMembershipTitle(
          currentMembership ? currentMembership.title : "-"
        );
      } catch (error) {
        console.error("Error fetching membership types", error);
      }
    };
    fetchMemberships();
  }, [membership_type]);

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .put(`http://localhost:3000/customer_update/${id}`, {
        name,
        email,
        mobile,
        m_title: membership_type,
      })
      .then((res) => {
        if (res.data.status === "200OK") {
          Swal.fire({
            icon: "success",
            title: "Updated Successfully",
            text: "Customer details have been updated",
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
      <h1 className="text-center mb-4">Update Customer</h1>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="name">
            <Form.Label>Customer Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="mobile">
            <Form.Label>WhatsApp Number</Form.Label>
            <Form.Control
              type="tel"
              placeholder="Enter phone Number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="membership_type">
            <Form.Label>Membership Type</Form.Label>
            <Form.Control
              as="select"
              value={membership_type}
              onChange={(e) => setMembership_type(e.target.value)}
            >
              <option value={currentMembershipTitle}>
                {currentMembershipTitle !== "-"
                  ? currentMembershipTitle
                  : "No Membership"}
              </option>
              {membershipOptions.map((membership) => (
                <option key={membership.m_id} value={membership.title}>
                  {membership.title}
                </option>
              ))}
            </Form.Control>
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

export default UpdateCustomer;
