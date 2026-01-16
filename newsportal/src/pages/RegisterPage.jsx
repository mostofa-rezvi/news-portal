import { useState } from "react";
import { AuthService } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "user", // Default to 'user' (Reader)
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await AuthService.register(formData.name, formData.email, formData.password, formData.role);
            navigate("/login");
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <section className="login-bg d-flex vh-100 align-items-center justify-content-center px-3">
            <div
                className="card-custom p-5 bg-white text-center"
                style={{ maxWidth: "500px", width: "100%" }}
            >
                <h2 className="logo-text mb-4">Join NovaNews</h2>
                {error && <div className="alert alert-danger">{error}</div>}

                <form onSubmit={handleSubmit} className="text-start">
                    <div className="mb-3">
                        <label className="form-label fw-bold small text-muted">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            className="form-control input-custom"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-bold small text-muted">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            className="form-control input-custom"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-bold small text-muted">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="form-control input-custom"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="form-label fw-bold small text-muted">Account Type</label>
                        <div className="d-flex gap-3">
                            <div className="form-check card p-3 flex-fill border-0 shadow-sm bg-light">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="role"
                                    id="roleUser"
                                    value="user"
                                    checked={formData.role === 'user'}
                                    onChange={handleChange}
                                />
                                <label className="form-check-label ms-2" htmlFor="roleUser">
                                    Reader
                                    <small className="d-block text-muted">Read and comment</small>
                                </label>
                            </div>
                            <div className="form-check card p-3 flex-fill border-0 shadow-sm bg-light">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="role"
                                    id="roleAuthor"
                                    value="author"
                                    checked={formData.role === 'author'}
                                    onChange={handleChange}
                                />
                                <label className="form-check-label ms-2" htmlFor="roleAuthor">
                                    Author
                                    <small className="d-block text-muted">Publish news</small>
                                </label>
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-custom-primary w-100 py-3 shadow-sm">
                        Create Account
                    </button>
                </form>

                <div className="mt-4 pt-3 border-top">
                    <p className="text-muted">
                        Already have an account? <Link to="/login" className="text-primary fw-bold text-decoration-none">Login</Link>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default RegisterPage;
