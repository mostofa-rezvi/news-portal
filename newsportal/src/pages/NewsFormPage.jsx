import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { NewsService } from "../services/api";
import { useAuth } from "../context/AuthContext";

const NewsFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [formData, setFormData] = useState({ title: "", body: "", image: "" });

  useEffect(() => {
    if (id) {
      NewsService.getNewsById(id).then((data) => {
        setFormData({ title: data.title, body: data.body, image: data.image || "" });
      });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.body.length < 20) {
      alert("Content must be 20 chars min");
      return;
    }

    if (id) {
      await NewsService.updateNews(id, formData);
    } else {
      await NewsService.createNews({
        ...formData, // backend attaches author from token
      });
    }
    navigate("/");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container py-5">
      <div
        className="bg-white p-5 rounded-4 shadow mx-auto"
        style={{ maxWidth: "800px" }}
      >
        <h2 className="mb-4 fw-bold text-primary">{id ? "Edit News" : "Publish News"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-bold small text-secondary text-uppercase">Title</label>
            <input
              type="text"
              name="title"
              className="form-control input-custom"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Enter a catchy headline"
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold small text-secondary text-uppercase">Cover Image URL</label>
            <input
              type="url"
              name="image"
              className="form-control input-custom"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
            />
            <div className="form-text">Provide a direct link to an image (optional)</div>
          </div>

          <div className="mb-4">
            <label className="form-label fw-bold small text-secondary text-uppercase">Content Body</label>
            <textarea
              className="form-control input-custom"
              name="body"
              rows="10"
              value={formData.body}
              onChange={handleChange}
              required
              placeholder="Write your article content here..."
            ></textarea>
            <div className={`form-text text-end ${formData.body.length < 20 ? 'text-danger' : 'text-success'}`}>
              {formData.body.length} / 20 chars min
            </div>
          </div>

          <div className="d-flex justify-content-end gap-2 pt-3 border-top">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="btn btn-light rounded-pill px-4 fw-bold"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-custom-primary rounded-pill px-5 shadow-sm">
              {id ? "Update Article" : "Publish Article"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewsFormPage;
