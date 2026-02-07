import React from "react";
import { useAuth } from "../context/AuthContext.jsx";
import Login from "./Auth/Login.jsx";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Login />;
  }

  return children;
};

export default ProtectedRoute;





