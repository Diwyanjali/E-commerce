import axios from "axios";
import { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const News = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = () => {
    axios
      .get("http://localhost:3000/new")
      .then((res) => setNews(res.data))
      .catch((err) => console.log(err));
  };

  const handleDelete = async (n_id) => {
    try {
      await axios.delete(`http://localhost:3000/new/${n_id}`);
      setNews(news.filter((news) => news.n_id !== n_id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mt-4">
      <Link to="/news_create" className="btn btn-primary">
        Add News +
      </Link>
      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>#</th>
            <th>News Type</th>
            <th>Title</th>
            <th>Description</th>
            <th>Date</th>
            <th>Author</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {news.map((data, index) => (
            <tr key={index + 1}>
              <td>{index + 1}</td>
              {/* <td>{data.n_id}</td> */}
              <td>{data.news_type}</td>
              <td>{data.title}</td>
              <td>{data.description}</td>
              <td>{data.date}</td>
              <td>{data.author}</td>
              <td>
                <img
                  src={`http://localhost:3000/uploads/${data.image}`}
                  alt={data.title}
                  style={{ width: "100px", height: "auto" }}
                />
              </td>
              <td>
                <Link
                  to={`/news_update/${data.n_id}`}
                  className="btn btn-warning me-3"
                >
                  Edit
                </Link>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(data.n_id)}
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

export default News;
