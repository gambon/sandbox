import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/components.css";

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand">
          <div className="navbar-logo">AQMD</div>
          <span className="navbar-title">Grants &amp; Bids Portal</span>
        </Link>
        <div className="navbar-links">
          {!user ? (
            <>
              <Link
                to="/"
                className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
              >
                Home
              </Link>
              <Link
                to="/login"
                className={`nav-link ${location.pathname === "/login" ? "active" : ""}`}
              >
                Sign In
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm">
                Register
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/dashboard"
                className={`nav-link ${location.pathname === "/dashboard" ? "active" : ""}`}
              >
                Dashboard
              </Link>
              <span className="nav-user">
                {user.firstName} {user.lastName}
              </span>
              <button className="btn btn-secondary btn-sm" onClick={logout}>
                Sign Out
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
