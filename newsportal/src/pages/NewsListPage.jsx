import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { NewsService } from "../services/api";
import { useAuth } from "../context/AuthContext";
import Loading from "../components/Loading";

const NewsListPage = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const { user: currentUser } = useAuth();

  useEffect(() => {
    // Backend with sequelize supports proper relation for news->author (News.author.name)
    NewsService.getAllNews().then(setNews).finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to remove this article?")) {
      await NewsService.deleteNews(id);
      setNews(news.filter((n) => n.id !== id));
    }
  };

  const filteredNews = news.filter((n) =>
    n.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <Loading />;

  return (
    <div className="container py-5">
      {/* Hero Section */}
      <div className="row justify-content-center mb-5">
        <div className="col-lg-8 text-center">
          <div className="mb-4">
            <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill fw-bold">
              News Portal
            </span>
          </div>
          <h2 className="display-4 fw-bold mb-4 text-dark">Discover the Latest Stories</h2>
          <p className="lead text-secondary mb-5 mx-auto" style={{ maxWidth: "600px" }}>
            Stay informed with the most recent updates, in-depth analysis, and breaking news from around the world.
          </p>

          <div className="position-relative mx-auto" style={{ maxWidth: "600px" }}>
            <input
              type="text"
              className="form-control form-control-lg border-0 shadow-sm py-3 ps-4 rounded-pill"
              placeholder="Search articles by title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ paddingRight: "50px" }}
            />
            <span className="position-absolute top-50 end-0 translate-middle-y me-4 text-muted">
              🔍
            </span>
          </div>
        </div>
      </div>

      {/* News Grid */}
      <div className="row g-4">
        {filteredNews.map((item) => (
          <div key={item.id} className="col-12 col-md-6 col-lg-4">
            <Link to={`/news/${item.id}`} className="text-decoration-none text-dark">
              <div className="card h-100 border-0 shadow-sm overflow-hidden rounded-4">
                {/* Image Section */}
                <div style={{ height: "240px", overflow: "hidden", position: "relative" }}>
                  <img
                    src={item.image || "https://via.placeholder.com/600x400?text=News"}
                    alt={item.title}
                    className="w-100 h-100"
                    style={{ objectFit: "cover", transition: "transform 0.5s" }}
                  />
                  <div className="position-absolute bottom-0 start-0 bg-white px-3 py-1 m-3 rounded-pill small fw-bold shadow-sm text-uppercase" style={{ fontSize: '0.7rem', letterSpacing: '0.05em' }}>
                    News
                  </div>
                </div>

                <div className="card-body p-4 d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <small className="text-muted fw-medium">
                      {item.createdAt ? new Date(item.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : "Recently"}
                    </small>
                  </div>

                  <h5 className="card-title fw-bold mb-3 fs-4" style={{ lineHeight: 1.3 }}>
                    {item.title}
                  </h5>

                  <p
                    className="card-text text-secondary mb-4 flex-grow-1"
                    style={{ lineHeight: "1.6", fontSize: "0.95rem" }}
                  >
                    {item.body.length > 100 ? `${item.body.substring(0, 100)}...` : item.body}
                  </p>

                  <div className="d-flex align-items-center justify-content-between pt-3 border-top border-light">
                    <div className="d-flex align-items-center gap-2">
                      <div
                        className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold fs-6"
                        style={{ width: "32px", height: "32px" }}
                      >
                        {item.author?.name ? item.author.name.charAt(0).toUpperCase() : "A"}
                      </div>
                      <span className="small fw-bold text-dark">
                        {item.author?.name || "Unknown"}
                      </span>
                    </div>

                    <span className="text-primary fw-bold small">Read More →</span>
                  </div>
                </div>

                {/* Admin/Author Actions - Only show if authorized context exists */}
                {((currentUser && item.author?.id && String(currentUser.id) === String(item.author.id)) || (currentUser && currentUser.role === 'admin')) && (
                  <div className="card-footer bg-white border-top border-light d-flex justify-content-end gap-2 p-3" onClick={(e) => e.preventDefault()}>
                    <Link
                      to={`/edit/${item.id}`}
                      className="btn btn-sm btn-light text-primary border rounded-pill px-3"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleDelete(item.id);
                      }}
                      className="btn btn-sm btn-light text-danger border rounded-pill px-3"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </Link>
          </div>
        ))}

        {filteredNews.length === 0 && (
          <div className="text-center py-5 text-muted col-12">
            <div className="mb-3 display-1 opacity-25">📂</div>
            <h4>No stories found</h4>
            <p>We couldn't find any articles matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsListPage;
