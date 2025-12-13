import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { NewsService, UserService } from "../services/api";
import { useAuth } from "../context/AuthContext";
import Loading from "../components/Loading";

const NewsDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [article, setArticle] = useState(null);
  const [userList, setUserList] = useState([]);
  const [authorName, setAuthorName] = useState("");
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [newsData, allUsers] = await Promise.all([
          NewsService.getNewsById(id),
          UserService.getAllUsers(),
        ]);

        const author = allUsers.find(
          (u) => String(u.id) === String(newsData.author_id)
        );

        setArticle(newsData);
        setUserList(allUsers);
        setAuthorName(author ? author.name : "Unknown");
        setLoading(false);
      } catch (err) {
        navigate("/");
      }
    };
    fetchData();
  }, [id, navigate]);

  const getCommentUserName = (userId) => {
    const foundUser = userList.find((u) => String(u.id) === String(userId));
    return foundUser ? foundUser.name : `User #${userId}`;
  };

  const handleDeleteArticle = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this article? This action cannot be undone."
    );
    if (confirmDelete) {
      try {
        await NewsService.deleteNews(id);
        navigate("/");
      } catch (error) {
        alert("Failed to delete article");
      }
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newComment = {
      id: Date.now(),
      user_id: user.id,
      text: commentText,
      timestamp: new Date().toISOString(),
    };

    const updatedComments = [...(article.comments || []), newComment];
    setArticle({ ...article, comments: updatedComments });
    setCommentText("");

    await NewsService.updateNews(id, { comments: updatedComments });
  };

  if (loading) return <Loading />;

  const isAuthor = user && String(user.id) === String(article.author_id);

  return (
    <div className="container py-5">
      <button
        onClick={() => navigate(-1)}
        className="btn btn-link text-secondary mb-4 text-decoration-none fw-bold"
      >
        ← Back to News
      </button>

      <div className="bg-white p-5 rounded-4 shadow-sm mb-5 border border-light position-relative">
        {isAuthor && (
          <div className="position-absolute top-0 end-0 m-4 d-flex gap-2">
            <Link
              to={`/edit/${id}`}
              className="btn btn-light border text-primary fw-bold px-3 shadow-sm"
            >
              Edit
            </Link>
            <button
              onClick={handleDeleteArticle}
              className="btn btn-light border text-danger fw-bold px-3 shadow-sm"
            >
              Delete
            </button>
          </div>
        )}

        <h1 className="display-5 fw-bold mb-4 text-dark pe-5">
          {article.title}
        </h1>

        <div className="detail-meta d-flex align-items-center gap-3 mb-5">
          <div
            className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold"
            style={{ width: "45px", height: "45px", fontSize: "1.2rem" }}
          >
            {authorName.charAt(0)}
          </div>
          <div>
            <span className="d-block fw-bold text-dark">By {authorName}</span>
            <span className="text-muted small">
              Published on {new Date().toLocaleDateString()}
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

      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <h3 className="mb-4 fw-bold">
          Discussion{" "}
          <span className="text-muted fs-5">
            ({article.comments?.length || 0})
          </span>
        </h3>

        <div className="d-flex flex-column gap-3 mb-5">
          {article.comments?.length > 0 ? (
            article.comments.map((c) => (
              <div
                key={c.id}
                className="p-4 bg-white border-0 rounded-4 shadow-sm position-relative"
              >
                <div className="d-flex justify-content-between mb-2">
                  <div className="d-flex align-items-center gap-2">
                    <div
                      className="bg-light text-primary rounded-circle d-flex align-items-center justify-content-center fw-bold"
                      style={{
                        width: "30px",
                        height: "30px",
                        fontSize: "0.8rem",
                      }}
                    >
                      {getCommentUserName(c.user_id).charAt(0)}
                    </div>
                    <span className="fw-bold text-dark">
                      {getCommentUserName(c.user_id)}
                    </span>
                  </div>
                  <small className="text-muted">
                    {new Date(c.timestamp).toLocaleDateString()}
                  </small>
                </div>
                <p
                  className="mb-0 text-secondary ps-5"
                  style={{ marginTop: "-5px" }}
                >
                  {c.text}
                </p>
              </div>
            ))
          ) : (
            <div className="text-center p-4 bg-light rounded-3 text-muted">
              No comments yet. Be the first to share your thoughts!
            </div>
          )}
        </div>

        <div className="card-custom p-4 bg-white">
          <h4 className="mb-3 fs-5 fw-bold">Leave a comment</h4>
          <form onSubmit={handleComment}>
            <textarea
              className="form-control input-custom mb-3"
              rows="3"
              placeholder="What are your thoughts?"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              required
            ></textarea>
            <div className="text-end">
              <button className="btn btn-custom-primary">Post Comment</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewsDetailPage;
