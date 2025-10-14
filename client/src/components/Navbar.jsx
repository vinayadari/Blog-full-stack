import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          ✨ Star_Dust
        </Link>
        <div className="nav-links">
          <Link to="/" className="nav-link">
            Feed
          </Link>
          {isAuthenticated ? (
            <>
              <Link to="/my-blogs" className="nav-link">
                My Blogs
              </Link>
              <Link to="/create" className="nav-link">
                Create
              </Link>
              <button onClick={logout} className="nav-button">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/register" className="nav-link">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;