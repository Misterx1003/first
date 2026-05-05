import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔥 перевіряємо токен при старті
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    axios
      .get("http://localhost:5000/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch(() => {
        localStorage.removeItem("token");
      })
      .finally(() => setLoading(false));
  }, []);

  // ✅ REGISTER
  const register = async (userData) => {
    const res = await axios.post(
      "http://localhost:5000/api/auth/register",
      userData
    );

    localStorage.setItem("token", res.data.token);
    setUser(res.data.user);
  };

  // ✅ LOGIN
  const login = async (email, password) => {
    const res = await axios.post(
      "http://localhost:5000/api/auth/login",
      { email, password }
    );

    localStorage.setItem("token", res.data.token);
    setUser(res.data.user);
  };

  // ✅ LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, register, login, logout }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);