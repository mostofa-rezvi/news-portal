import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { NewsService } from "../services/api";
import { useAuth } from "../context/AuthContext";

const NewsFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [formData, setFormData] = useState({ title: "", body: "" });

  useEffect(() => {
    if (id) {
      NewsService.getNewsById(id).then((data) => {
        setFormData({ title: data.title, body: data.body });
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
        ...formData,
        author_id: user.id,
        comments: [],
      });
    }
    navigate("/");
  };

  return (
    <div className="container py-5">
      <div
        className="bg-white p-5 rounded shadow mx-auto"
        style={{ maxWidth: "800px" }}
      >
        <h2 className="mb-4">{id ? "Edit Article" : "Create Article"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Content</label>
            <textarea
              className="form-control"
              rows="10"
              value={formData.body}
              onChange={(e) =>
                setFormData({ ...formData, body: e.target.value })
              }
              required
            ></textarea>
            <div className="form-text text-end">
              {formData.body.length} / 20 chars min
            </div>
          </div>
          <div className="d-flex justify-content-end gap-2">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="btn btn-light"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {id ? "Update" : "Publish"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewsFormPage;
