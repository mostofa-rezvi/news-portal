import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { NewsService, UserService } from "../services/api";
import { useAuth } from "../context/AuthContext";
import Loading from "../components/Loading";

const NewsListPage = () => {
  const [news, setNews] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const { user: currentUser } = useAuth();

  useEffect(() => {
    Promise.all([NewsService.getAllNews(), UserService.getAllUsers()]).then(
      ([newsData, usersData]) => {
        setNews(newsData);
        setUsers(usersData);
        setLoading(false);
      }
    );
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to remove this article?")) {
      await NewsService.deleteNews(id);
      setNews(news.filter((n) => n.id !== id));
    }
  };

  const getUserName = (id) =>
    users.find((u) => String(u.id) === String(id))?.name || "Unknown";

  const filteredNews = news.filter((n) =>
    n.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <Loading />;

  return (
    <div className="container py-5">
      <div className="row justify-content-center mb-5">
        <div className="col-lg-8 text-center">
          <h2 className="display-6 fw-bold mb-3">Discover the Latest</h2>
          <div className="position-relative">
            <input
              type="text"
              className="form-control form-control-lg search-input"
              placeholder="Search articles by title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <span className="position-absolute top-50 end-0 translate-middle-y me-3 text-muted"></span>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="row g-4">
        {filteredNews.map((item) => (
          <div key={item.id} className="col-md-4">
            <div className="card-custom h-100 d-flex flex-column">
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span className="badge bg-light text-primary border rounded-pill px-3">
                    News
                  </span>
                  <small className="text-muted" style={{ fontSize: "0.8rem" }}>
                    {new Date().toLocaleDateString()}
                  </small>
                </div>
                <h5 className="card-title mb-3" style={{ minHeight: "3rem" }}>
                  {item.title}
                </h5>
                <p
                  className="card-text text-secondary mb-4"
                  style={{ lineHeight: "1.6" }}
                >
                  {item.body.substring(0, 120)}...
                </p>

                <div className="d-flex align-items-center gap-2 mb-3">
                  <div
                    className="bg-light rounded-circle d-flex align-items-center justify-content-center"
                    style={{ width: "32px", height: "32px" }}
                  >
                    👤
                  </div>
                  <div>
                    <small className="d-block fw-bold text-dark lh-1">
                      {getUserName(item.author_id)}
                    </small>
                    <small
                      className="text-muted"
                      style={{ fontSize: "0.75rem" }}
                    >
                      Author
                    </small>
                  </div>
                </div>
              </div>

              <div className="card-footer bg-white border-0 p-4 pt-0 d-flex justify-content-between align-items-center">
                <Link
                  to={`/news/${item.id}`}
                  className="fw-bold text-primary text-decoration-none"
                >
                  Read Article →
                </Link>

                {String(currentUser.id) === String(item.author_id) && (
                  <div className="d-flex gap-2">
                    <Link
                      to={`/edit/${item.id}`}
                      className="btn btn-sm btn-light text-secondary"
                      title="Edit"
                    ></Link>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="btn btn-sm btn-light text-danger"
                      title="Delete"
                    ></button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {filteredNews.length === 0 && (
          <div className="text-center py-5 text-muted">
            <h4>No articles found</h4>
            <p>Try searching for something else</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsListPage;
