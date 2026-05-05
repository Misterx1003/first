import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success("✅ Вхід успішний!");
      navigate("/");
    } catch (error) {
      toast.error("❌ Помилка входу: " + error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md w-80">
        <h2 className="text-xl font-bold mb-4 text-center text-gray-800 dark:text-gray-200">
          Вхід до акаунту
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Пароль"
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Увійти
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 dark:text-gray-300 mt-4">
          Немає акаунту?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Зареєструватися
          </Link>
        </p>
      </div>
    </div>
  );
}