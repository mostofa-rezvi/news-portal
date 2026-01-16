import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <section className="login-bg d-flex vh-100 align-items-center justify-content-center px-3">
      <div
        className="card-custom p-5 bg-white text-center"
        style={{ maxWidth: "450px", width: "100%" }}
      >
        <div className="mb-4">
          <h1 className="logo-text display-5 mb-2">NovaNews</h1>
          <p className="text-muted">Stay informed, stay inspired.</p>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-3 text-start">
            <label className="form-label fw-bold text-secondary small text-uppercase">
              Email Address
            </label>
            <input
              type="email"
              className="form-control input-custom"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="e.g. alice@example.com"
            />
          </div>
          <div className="mb-4 text-start">
            <label className="form-label fw-bold text-secondary small text-uppercase">
              Password
            </label>
            <input
              type="password"
              className="form-control input-custom"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter password"
            />
          </div>
          <button
            type="submit"
            className="btn btn-custom-primary w-100 py-3 shadow-lg"
          >
            Login
          </button>
        </form>

        <div className="mt-4 pt-4 border-top">
          <p className="mb-2">
            Don't have an account? <Link to="/register" className="text-primary text-decoration-none fw-bold">Register</Link>
          </p>
          <p className="small text-muted">
            Admin Account: admin@example.com / password123
          </p>
          <p className="small text-muted">
            Author Account: alice@example.com / password123
          </p>
          <p className="small text-muted">
            Reader Account: karim@example.com / password123
          </p>
          <small className="text-muted">Designed for Web Tech Assignment</small>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
