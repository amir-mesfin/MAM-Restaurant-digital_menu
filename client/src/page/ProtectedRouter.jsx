import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../api/axios";

function ProtectedRouter({ children }) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("access_token");
      
      // If no token exists, redirect immediately
      if (!token) {
        setAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        await api.get("/auth/me");
        setAuthenticated(true);
      } catch (err) {
        // Clear invalid token
        localStorage.removeItem("access_token");
        localStorage.removeItem("user");
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  // Redirect to sign page if not authenticated
  if (!authenticated) {
    return <Navigate to="/sign" replace />;
  }

  return children;
}

export default ProtectedRouter;