import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LogoIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="me-2"
  >
    <path d="M16 2L2 9L16 16L30 9L16 2Z" fill="#4F46E5" />
    <path
      d="M2 23L16 30L30 23V9L16 16L2 9V23Z"
      fill="#6366F1"
      fillOpacity="0.6"
    />
    <path d="M16 16V30" stroke="white" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) return null;

  return (
    <header className="navbar-custom sticky-top">
      <div className="container d-flex justify-content-between align-items-center">
        <Link to="/" className="text-decoration-none d-flex align-items-center">
          <LogoIcon />
          <h2 className="logo-text m-0 fs-3">NovaNews</h2>
        </Link>

        <nav className="nav-links d-flex gap-1 bg-white p-1 rounded-pill shadow-sm border">
          <Link
            to="/"
            className={`nav-link-custom ${
              location.pathname === "/" ? "active" : ""
            }`}
          >
            Home
          </Link>
          <Link
            to="/create"
            className={`nav-link-custom ${
              location.pathname === "/create" ? "active" : ""
            }`}
          >
            Create
          </Link>
        </nav>

        <div className="d-flex align-items-center gap-3">
          <div className="d-none d-md-block text-end lh-1">
            <span
              className="d-block fw-bold text-dark"
              style={{ fontSize: "0.9rem" }}
            >
              {user.name}
            </span>
            <small className="text-muted" style={{ fontSize: "0.75rem" }}>
              Member
            </small>
          </div>
          <button
            onClick={handleLogout}
            className="btn btn-light text-danger border fw-bold rounded-pill px-3"
            style={{ fontSize: "0.85rem" }}
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
