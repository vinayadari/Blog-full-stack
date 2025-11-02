import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const [name, setName] = useState('')
  const { login, register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()

    if (isLogin) {
      const success = await login(email, password)
      if (success) {
        navigate('/feed')
      }
    } else {
      const success = await register(name, email, password)
      if (success) {
        navigate('/feed')
      }
    }
  }

  return (
    <div
      style={{
        minHeight: 'calc(100vh - 70px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#FCF8DD',
        padding: '20px',
      }}
    >
      <div
        style={{
          maxWidth: '450px',
          width: '100%',
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '40px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          animation: 'slideIn 0.4s ease-out',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h2
            style={{
              fontSize: '32px',
              fontWeight: '700',
              color: '#333',
              marginBottom: '8px',
            }}
          >
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p style={{ color: '#666', fontSize: '14px' }}>
            {isLogin
              ? 'Enter your credentials to access your account'
              : 'Sign up to start sharing your stories'}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div style={{ marginBottom: '20px' }}>
              <label
                style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: '600',
                  color: '#333',
                  fontSize: '14px',
                }}
              >
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                required={!isLogin}
                placeholder="John Doe"
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  fontSize: '15px',
                  border: '2px solid #e0e0e0',
                  borderRadius: '10px',
                  boxSizing: 'border-box',
                  transition: 'all 0.3s ease',
                  outline: 'none',
                }}
                onFocus={e => (e.target.style.borderColor = '#00809D')}
                onBlur={e => (e.target.style.borderColor = '#e0e0e0')}
              />
            </div>
          )}
          <div style={{ marginBottom: '20px' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '600',
                color: '#333',
                fontSize: '14px',
              }}
            >
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              style={{
                width: '100%',
                padding: '14px 16px',
                fontSize: '15px',
                border: '2px solid #e0e0e0',
                borderRadius: '10px',
                boxSizing: 'border-box',
                transition: 'all 0.3s ease',
                outline: 'none',
              }}
              onFocus={e => (e.target.style.borderColor = '#667eea')}
              onBlur={e => (e.target.style.borderColor = '#e0e0e0')}
            />
          </div>
          <div style={{ marginBottom: '24px' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '600',
                color: '#333',
                fontSize: '14px',
              }}
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              style={{
                width: '100%',
                padding: '14px 16px',
                fontSize: '15px',
                border: '2px solid #e0e0e0',
                borderRadius: '10px',
                boxSizing: 'border-box',
                transition: 'all 0.3s ease',
                outline: 'none',
              }}
              onFocus={e => (e.target.style.borderColor = '#667eea')}
              onBlur={e => (e.target.style.borderColor = '#e0e0e0')}
            />
          </div>
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '16px',
              backgroundColor: '#00809D',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '600',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(0, 128, 157, 0.4)',
            }}
            onMouseEnter={e => {
              e.target.style.backgroundColor = '#006b85'
              e.target.style.transform = 'translateY(-2px)'
              e.target.style.boxShadow = '0 6px 20px rgba(0, 128, 157, 0.5)'
            }}
            onMouseLeave={e => {
              e.target.style.backgroundColor = '#00809D'
              e.target.style.transform = 'translateY(0)'
              e.target.style.boxShadow = '0 4px 15px rgba(0, 128, 157, 0.4)'
            }}
          >
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>
        <div
          style={{
            marginTop: '24px',
            textAlign: 'center',
            fontSize: '14px',
            color: '#666',
          }}
        >
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <span
            onClick={() => setIsLogin(!isLogin)}
            style={{
              color: '#00809D',
              cursor: 'pointer',
              fontWeight: '600',
              textDecoration: 'underline',
            }}
          >
            {isLogin ? 'Sign Up' : 'Sign In'}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Login
