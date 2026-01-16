import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { NewsService } from "../services/api";
import { useAuth } from "../context/AuthContext";
import Loading from "../components/Loading";

const NewsDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [newsData, commentsData] = await Promise.all([
          NewsService.getNewsById(id),
          NewsService.getComments(id)
        ]);
        setArticle(newsData);
        setComments(commentsData);
      } catch (error) {
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, navigate]);

  const handleDeleteArticle = async () => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      try {
        await NewsService.deleteNews(id);
        navigate("/");
      } catch (error) {
        alert("Failed to delete article");
      }
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    setSubmitting(true);
    try {
      const newComment = await NewsService.createComment(id, { text: commentText });
      setComments([newComment, ...comments]); // Add new comment to top
      setCommentText("");
    } catch (error) {
      alert("Failed to post comment");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loading />;
  if (!article) return null;

  const isAuthor = user && (String(user.id) === String(article.author?.id) || user.role === 'admin');

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <button
            onClick={() => navigate("/")}
            className="btn btn-link text-secondary mb-4 text-decoration-none fw-bold p-0"
          >
            ← Back to News
          </button>

          <div className="bg-white rounded-4 shadow-sm mb-5 border border-light overflow-hidden">
            {/* Hero Image */}
            <div style={{ maxHeight: "500px", overflow: "hidden" }}>
              <img
                src={article.image || "https://via.placeholder.com/800x400?text=News+Detail"}
                alt={article.title}
                className="w-100"
                style={{ objectFit: "cover", objectPosition: "center" }}
              />
            </div>

            <div className="p-4 p-md-5 position-relative">
              {/* Actions */}
              {isAuthor && (
                <div className="position-absolute top-0 end-0 m-4 d-flex gap-2">
                  {(String(user.id) === String(article.author?.id) || user.role === 'admin') && (
                    <Link
                      to={`/edit/${id}`}
                      className="btn btn-light border text-primary fw-bold px-3 shadow-sm btn-sm"
                    >
                      Edit
                    </Link>
                  )}
                  <button
                    onClick={handleDeleteArticle}
                    className="btn btn-light border text-danger fw-bold px-3 shadow-sm btn-sm"
                  >
                    Delete
                  </button>
                </div>
              )}

              <h1 className="display-5 fw-bold mb-4 text-dark pe-md-5 mt-2">
                {article.title}
              </h1>

              <div className="detail-meta d-flex align-items-center gap-3 mb-4 pb-4 border-bottom">
                <div
                  className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold shadow-sm bg-gradient"
                  style={{ width: "48px", height: "48px", fontSize: "1.2rem" }}
                >
                  {article.author?.name ? article.author.name.charAt(0).toUpperCase() : "A"}
                </div>
                <div>
                  <span className="d-block fw-bold text-dark fs-5">{article.author?.name || "Unknown Author"}</span>
                  <span className="text-muted small">
                    Published on {article.createdAt ? new Date(article.createdAt).toLocaleDateString(undefined, { dateStyle: 'long' }) : new Date().toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div
                className="article-body fs-5 text-secondary"
                style={{ whiteSpace: "pre-wrap", lineHeight: "1.9" }}
              >
                {article.body}
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <div className="bg-white rounded-4 shadow-sm p-4 p-md-5 border border-light">
            <h3 className="fw-bold mb-4">Comments ({comments.length})</h3>

            {/* Comment Form or Login Prompt */}
            {user ? (
              <form onSubmit={handleCommentSubmit} className="mb-5 d-flex gap-3 align-items-start">
                <div
                  className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold flex-shrink-0"
                  style={{ width: "40px", height: "40px" }}
                >
                  {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                </div>
                <div className="flex-grow-1">
                  <textarea
                    className="form-control border-0 bg-light p-3 rounded-3"
                    rows="3"
                    placeholder="Join the discussion..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    style={{ resize: "none" }}
                  ></textarea>
                  <div className="d-flex justify-content-end mt-2">
                    <button
                      type="submit"
                      disabled={submitting || !commentText.trim()}
                      className="btn btn-primary rounded-pill px-4 fw-bold"
                    >
                      {submitting ? "Posting..." : "Post Comment"}
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              <div className="alert alert-secondary border-0 rounded-3 d-flex align-items-center justify-content-between p-4 mb-5">
                <div>
                  <span className="fw-bold d-block fs-5 text-dark">Join the conversation</span>
                  <span className="text-muted">Login to post a comment on this article.</span>
                </div>
                <Link to="/login" className="btn btn-dark rounded-pill px-4 fw-bold">
                  Login to Comment
                </Link>
              </div>
            )}

            {/* Comments List */}
            <div className="d-flex flex-column gap-4">
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <div key={comment.id} className="d-flex gap-3">
                    <div
                      className="bg-light text-secondary rounded-circle d-flex align-items-center justify-content-center fw-bold flex-shrink-0 border"
                      style={{ width: "40px", height: "40px", fontSize: "0.9rem" }}
                    >
                      {comment.user?.name ? comment.user.name.charAt(0).toUpperCase() : "?"}
                    </div>
                    <div>
                      <div className="bg-light rounded-4 px-3 py-2 d-inline-block">
                        <span className="fw-bold text-dark d-block small mb-1">
                          {comment.user?.name || "Anonymous"}
                          {(article.author?.id && comment.user?.id && String(article.author.id) === String(comment.user.id)) && (
                            <span className="badge bg-primary ms-2 rounded-pill" style={{ fontSize: '0.65rem' }}>Author</span>
                          )}
                        </span>
                        <p className="mb-0 text-secondary" style={{ fontSize: "0.95rem" }}>{comment.text}</p>
                      </div>
                      <div className="text-muted ms-2 mt-1" style={{ fontSize: "0.75rem" }}>
                        {comment.createdAt ? new Date(comment.createdAt).toLocaleDateString() : "Just now"}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted text-center py-4">No comments yet. Be the first to share your thoughts!</p>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default NewsDetailPage;
