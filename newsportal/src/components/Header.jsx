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

  // if (!user) return null; // Removed to allow public header

  return (
    <header className="navbar-custom sticky-top py-3 bg-white border-bottom">
      <div className="container d-flex justify-content-between align-items-center">
        <Link to="/" className="text-decoration-none d-flex align-items-center gap-2">
          <LogoIcon />
          <h2 className="logo-text m-0 fs-4 fw-bold text-dark tracking-tight">NovaNews</h2>
        </Link>

        {/* Desktop Nav */}
        <nav className="d-none d-md-flex align-items-center gap-1">
          <Link
            to="/"
            className={`px-3 py-2 rounded-pill text-decoration-none fw-medium transition-all ${location.pathname === "/" ? "bg-light text-primary fw-bold" : "text-secondary hover:text-primary"
              }`}
          >
            Home
          </Link>

          {user && (user.role === 'author' || user.role === 'admin') && (
            <Link
              to="/create"
              className={`px-3 py-2 rounded-pill text-decoration-none fw-medium transition-all ${location.pathname === "/create" ? "bg-light text-primary fw-bold" : "text-secondary hover:text-primary"
                }`}
            >
              Write
            </Link>
          )}

          {user && user.role === 'admin' && (
            <Link
              to="/admin"
              className={`px-3 py-2 rounded-pill text-decoration-none fw-medium transition-all ${location.pathname === "/admin" ? "bg-light text-primary fw-bold" : "text-secondary hover:text-primary"
                }`}
            >
              Dashboard
            </Link>
          )}
        </nav>

        {user ? (
          <div className="d-flex align-items-center gap-3">
            <div className="d-none d-md-block text-end lh-1">
              <span
                className="d-block fw-bold text-dark"
                style={{ fontSize: "0.9rem" }}
              >
                {user.name}
              </span>
              <small className="text-muted text-uppercase" style={{ fontSize: "0.7em", letterSpacing: '0.05em' }}>
                {user.role}
              </small>
            </div>
            <button
              onClick={handleLogout}
              className="btn btn-outline-danger btn-sm rounded-pill px-3 fw-bold border-2"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="d-flex align-items-center gap-2">
            <Link to="/login" className="btn btn-light text-primary fw-bold rounded-pill px-4">
              Login
            </Link>
            <Link to="/register" className="btn btn-primary fw-bold rounded-pill px-4">
              Register
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
