import React from "react";
import { useAuth } from "../context/AuthContext.jsx";

const Navbar = ({ currentView, setCurrentView }) => {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="navbar">
      <div className="navbar-left">
        <span className="navbar-logo">📝 Blog App</span>
        {isAuthenticated && (
          <nav className="navbar-nav">
            <button
              className={`nav-link ${currentView === "feed" ? "active" : ""}`}
              onClick={() => setCurrentView("feed")}
            >
              Feed
            </button>
            <button
              className={`nav-link ${currentView === "dashboard" ? "active" : ""}`}
              onClick={() => setCurrentView("dashboard")}
            >
              My Blogs
            </button>
          </nav>
        )}
      </div>
      <div className="navbar-right">
        {isAuthenticated && user ? (
          <>
            <span className="navbar-user">Hi, {user.name || user.email}</span>
            <button className="btn btn-secondary" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <span className="navbar-guest">Login to start posting</span>
        )}
      </div>
    </header>
  );
};

export default Navbar;
