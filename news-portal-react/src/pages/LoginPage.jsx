import { useEffect, useState } from "react";
import { UserService } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    UserService.getAllUsers().then(setUsers);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = users.find((u) => String(u.id) === selectedId);
    if (user) {
      login(user);
      navigate("/");
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

        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4 text-start">
            <label className="form-label fw-bold text-secondary small text-uppercase">
              Select Account
            </label>
            <select
              className="form-select input-custom"
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
              required
            >
              <option value="">Choose your profile...</option>
              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="btn btn-custom-primary w-100 py-3 shadow-lg"
          >
            Enter Portal
          </button>
        </form>

        <div className="mt-4 pt-4 border-top">
          <small className="text-muted">Designed for Web Tech Assignment</small>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
