import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Header from "./components/Header";
import LoginPage from "./pages/LoginPage";
import NewsListPage from "./pages/NewsListPage";
import NewsDetailPage from "./pages/NewsDetailPage";
import NewsFormPage from "./pages/NewsFormPage";
import "./assets/App.css";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route
            path="/"
            element={
              <PrivateRoute>
                <NewsListPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/news/:id"
            element={
              <PrivateRoute>
                <NewsDetailPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/create"
            element={
              <PrivateRoute>
                <NewsFormPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/edit/:id"
            element={
              <PrivateRoute>
                <NewsFormPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
