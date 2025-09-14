import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    // Agar token nahi hai to /login par redirect
    return <Navigate to="/login" replace />;
  }
  

  // Agar token hai to jo andar ka component hai wo render karo
  return children;
}
