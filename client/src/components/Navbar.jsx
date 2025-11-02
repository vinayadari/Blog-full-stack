import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 40px',
        background: '#00809D',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        backdropFilter: 'blur(10px)',
      }}
    >
      <div>
        <Link
          to="/"
          style={{
            color: 'white',
            textDecoration: 'none',
            fontSize: '28px',
            fontWeight: '800',
            letterSpacing: '-0.5px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span style={{ fontSize: '32px' }}>✨</span>
          Star_Dust
        </Link>
      </div>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        {isAuthenticated() ? (
          <>
            <Link
              to="/feed"
              style={{
                color: 'white',
                textDecoration: 'none',
                padding: '10px 20px',
                borderRadius: '8px',
                fontSize: '15px',
                fontWeight: '500',
                transition: 'all 0.3s ease',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              }}
              onMouseEnter={e => {
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'
                e.target.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={e => {
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'
                e.target.style.transform = 'translateY(0)'
              }}
            >
              📰 Feed
            </Link>
            <Link
              to="/my-blogs"
              style={{
                color: 'white',
                textDecoration: 'none',
                padding: '10px 20px',
                borderRadius: '8px',
                fontSize: '15px',
                fontWeight: '500',
                transition: 'all 0.3s ease',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              }}
              onMouseEnter={e => {
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'
                e.target.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={e => {
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'
                e.target.style.transform = 'translateY(0)'
              }}
            >
              📝 My Blogs
            </Link>
            <Link
              to="/create"
              style={{
                color: 'white',
                textDecoration: 'none',
                padding: '10px 20px',
                borderRadius: '8px',
                fontSize: '15px',
                fontWeight: '500',
                transition: 'all 0.3s ease',
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
              }}
              onMouseEnter={e => {
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.25)'
                e.target.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={e => {
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.15)'
                e.target.style.transform = 'translateY(0)'
              }}
            >
              ➕ Create
            </Link>
            <button
              onClick={handleLogout}
              style={{
                padding: '10px 24px',
                backgroundColor: 'rgba(220, 53, 69, 0.9)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '15px',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                marginLeft: '8px',
              }}
              onMouseEnter={e => {
                e.target.style.backgroundColor = '#dc3545'
                e.target.style.transform = 'translateY(-2px)'
                e.target.style.boxShadow = '0 4px 12px rgba(220, 53, 69, 0.4)'
              }}
              onMouseLeave={e => {
                e.target.style.backgroundColor = 'rgba(220, 53, 69, 0.9)'
                e.target.style.transform = 'translateY(0)'
                e.target.style.boxShadow = 'none'
              }}
            >
              🚪 Logout
            </button>
          </>
        ) : (
          <Link
            to="/"
            style={{
              color: 'white',
              textDecoration: 'none',
              padding: '10px 24px',
              borderRadius: '8px',
              fontSize: '15px',
              fontWeight: '600',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => {
              e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'
            }}
            onMouseLeave={e => {
              e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'
            }}
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  )
}

export default Navbar
