import { useState, useEffect } from "react";
import { Form, Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function UpdateNews() {
  const [news_type, setNews_type] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [author, setAuthor] = useState("");
  const [file, setFile] = useState(null);
  const [existingImage, setExistingImage] = useState("");

  const { n_id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/new/${n_id}`)
      .then((res) => {
        const news = res.data;
        setNews_type(news.news_type);
        setTitle(news.title);
        setDescription(news.description);
        setDate(news.date);
        setAuthor(news.author);
        setExistingImage(news.image);
      })
      .catch((err) => console.log(err));
  }, [n_id]);

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("news_type", news_type);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("date", date);
    formData.append("author", author);
    if (file) {
      formData.append("image", file);
    } else {
      formData.append("existingImage", existingImage);
    }

    axios
      .put(`http://localhost:3000/news_update/${n_id}`, formData)
      .then((res) => {
        if (res.data.status === "200OK") {
          Swal.fire({
            icon: "success",
            title: "Updated Successfully",
            text: "News updated successfully.",
            confirmButtonText: "OK",
          });
          navigate("/new");
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => console.log(err));
  }

  function handleCancel() {
    navigate("/new");
  }

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <Container className="mt-3 product-container">
      <h1 className="text-center mb-4">Update News</h1>
      <Form onSubmit={handleSubmit} encType="multipart/form-data">
        <Row className="mb-3">
          <Form.Group as={Col} controlId="news_type">
            <Form.Label>News Type</Form.Label>
            <Form.Select
              value={news_type}
              onChange={(e) => setNews_type(e.target.value)}
              required
            >
              <option value="">Select News Type</option>
              <option value="Popular News">Popular News</option>
              <option value="Latest News">Latest News</option>
              <option value="Trending News">Trending News</option>
            </Form.Select>
          </Form.Group>
        </Row>
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
          <Form.Group as={Col} controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="date">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="dateTime"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="author">
            <Form.Label>Author</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Title"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
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

export default UpdateNews;
