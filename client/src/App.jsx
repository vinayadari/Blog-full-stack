import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import { AuthProvider, useAuth } from "./context/AuthContext.jsx";
import Navbar from "./components/Navbar.jsx";
import Feed from "./components/Feed/Feed.jsx";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import "./App.css";

const AppContent = () => {
  const { isAuthenticated } = useAuth();
  const [currentView, setCurrentView] = useState("feed");

  return (
    <div className="app">
      <Toaster position="top-right" />
      <Navbar currentView={currentView} setCurrentView={setCurrentView} />
      <main className="main-content">
        {isAuthenticated ? (
          currentView === "feed" ? (
            <Feed />
          ) : (
            <Dashboard />
          )
        ) : (
          <ProtectedRoute>
            <Feed />
          </ProtectedRoute>
        )}
      </main>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
