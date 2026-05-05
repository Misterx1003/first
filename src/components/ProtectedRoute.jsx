import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, adminOnly = false }) {
  const userToken = localStorage.getItem("token");
  const adminToken = localStorage.getItem("adminToken");

  // Якщо маршрут тільки для адміна
  if (adminOnly) {
    if (!adminToken) return <Navigate to="/admin/login" />;
    return children;
  }

  // Якщо звичайний користувач
  if (!userToken) return <Navigate to="/login" />;

  return children;
}