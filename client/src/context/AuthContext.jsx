import { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../utils/api';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
    setLoading(false);
  }, [token]);

  const register = async (data) => {
    try {
      const result = await api.register(data);
      if (result.success) {
        setToken(result.token);
        toast.success(result.message || 'Registration successful!');
        return true;
      } else {
        toast.error(result.message || 'Registration failed');
        return false;
      }
    } catch (error) {
      toast.error('Registration failed');
      return false;
    }
  };

  const login = async (data) => {
    try {
      const result = await api.login(data);
      if (result.success) {
        setToken(result.token);
        toast.success(result.message || 'Login successful!');
        return true;
      } else {
        toast.error(result.message || 'Login failed');
        return false;
      }
    } catch (error) {
      toast.error('Login failed');
      return false;
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    toast.success('Logged out successfully');
  };

  const value = {
    user,
    token,
    loading,
    register,
    login,
    logout,
    isAuthenticated: !!token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};