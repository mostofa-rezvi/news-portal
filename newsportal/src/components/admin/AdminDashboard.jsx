import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { NewsService } from "../../services/api";

const AdminDashboard = () => {
    const { user } = useAuth();
    const [users, setUsers] = useState([]);
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    const [showUserForm, setShowUserForm] = useState(false);
    const [newUser, setNewUser] = useState({ name: "", email: "", password: "", role: "user" });

    const fetchData = async () => {
        try {
            const token = localStorage.getItem("token");
            const userRes = await axios.get("http://localhost:3000/users", {
                headers: { Authorization: `Bearer ${token}` }
            });
            const newsRes = await NewsService.getAllNews();

            setUsers(userRes.data);
            setNews(newsRes);
            setLoading(false);
        } catch (error) {
            console.error("Failed to fetch admin data", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const deleteUser = async (id) => {
        if (!window.confirm("Are you sure? This user and their news will be deleted.")) return;
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`http://localhost:3000/users/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers(users.filter(u => u.id !== id));
            // Also refetch news as they might have been deleted on server cascade
            const newsRes = await NewsService.getAllNews();
            setNews(newsRes);
        } catch (error) {
            alert("Failed to delete user");
        }
    };

    const deleteNews = async (id) => {
        if (!window.confirm("Delete this news?")) return;
        try {
            await NewsService.deleteNews(id);
            setNews(news.filter(n => n.id !== id));
        } catch (error) {
            alert("Failed to delete news");
        }
    };

    const handleCreateUser = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const res = await axios.post("http://localhost:3000/users", newUser, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers([...users, res.data]);
            setNewUser({ name: "", email: "", password: "", role: "user" });
            setShowUserForm(false);
            alert("User created successfully");
        } catch (error) {
            alert(error.response?.data?.message || "Failed to create user");
        }
    };

    if (loading) return <div className="text-center mt-5">Loading Dashboard...</div>;

    return (
        <div className="container py-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h1 className="mb-1">Admin Dashboard</h1>
                    <p className="text-muted mb-0">Welcome, {user.name}</p>
                </div>
                <div className="d-flex gap-2">
                    <button
                        onClick={() => setShowUserForm(!showUserForm)}
                        className="btn btn-primary"
                    >
                        {showUserForm ? "Close Form" : "+ Add User"}
                    </button>
                    <Link to="/create" className="btn btn-outline-primary">
                        + Post News
                    </Link>
                </div>
            </div>

            {showUserForm && (
                <div className="card shadow-sm border-0 mb-5 p-4 bg-light">
                    <h5 className="mb-3">Add New Member</h5>
                    <form onSubmit={handleCreateUser} className="row g-3">
                        <div className="col-md-3">
                            <input
                                type="text" className="form-control" placeholder="Name" required
                                value={newUser.name} onChange={e => setNewUser({ ...newUser, name: e.target.value })}
                            />
                        </div>
                        <div className="col-md-3">
                            <input
                                type="email" className="form-control" placeholder="Email" required
                                value={newUser.email} onChange={e => setNewUser({ ...newUser, email: e.target.value })}
                            />
                        </div>
                        <div className="col-md-3">
                            <input
                                type="password" className="form-control" placeholder="Password" required
                                value={newUser.password} onChange={e => setNewUser({ ...newUser, password: e.target.value })}
                            />
                        </div>
                        <div className="col-md-2">
                            <select
                                className="form-select"
                                value={newUser.role} onChange={e => setNewUser({ ...newUser, role: e.target.value })}
                            >
                                <option value="user">User</option>
                                <option value="author">Author</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                        <div className="col-md-1">
                            <button type="submit" className="btn btn-success w-100">Add</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="row">
                {/* Users List */}
                <div className="col-md-6 mb-4">
                    <div className="card shadow-sm border-0 h-100">
                        <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
                            <h5 className="mb-0">Members</h5>
                            <span className="badge bg-primary rounded-pill">{users.length}</span>
                        </div>
                        <div className="overflow-auto" style={{ maxHeight: "500px" }}>
                            <ul className="list-group list-group-flush">
                                {users.map(u => (
                                    <li key={u.id} className="list-group-item d-flex justify-content-between align-items-center">
                                        <div>
                                            <div className="fw-bold">{u.name}</div>
                                            <div className="text-muted small">
                                                {u.email} • <span className={`badge ${u.role === 'admin' ? 'bg-danger' : 'bg-secondary'} text-uppercase`}>{u.role}</span>
                                            </div>
                                        </div>
                                        {u.role !== 'admin' && (
                                            <button
                                                onClick={() => deleteUser(u.id)}
                                                className="btn btn-light text-danger btn-sm border"
                                            >
                                                ×
                                            </button>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* News List */}
                <div className="col-md-6 mb-4">
                    <div className="card shadow-sm border-0 h-100">
                        <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
                            <h5 className="mb-0">Published News</h5>
                            <span className="badge bg-primary rounded-pill">{news.length}</span>
                        </div>
                        <div className="overflow-auto" style={{ maxHeight: "500px" }}>
                            <ul className="list-group list-group-flush">
                                {news.map(n => (
                                    <li key={n.id} className="list-group-item d-flex justify-content-between align-items-center">
                                        <div style={{ maxWidth: "80%" }}>
                                            <div className="text-truncate fw-bold">{n.title}</div>
                                            <div className="text-muted small">
                                                Author: {n.author?.name || "Unknown"}
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => deleteNews(n.id)}
                                            className="btn btn-light text-danger btn-sm border"
                                        >
                                            ×
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
