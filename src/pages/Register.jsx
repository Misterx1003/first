import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState(""); // 🔥 радив би мати
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(""); // ✅ NEW
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await register({
        username,
        email,
        phone,
        password,
      });

      toast.success("✅ Реєстрація успішна!");
      navigate("/");
    } catch (error) {
      toast.error("❌ Помилка реєстрації: " + error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md w-80">
        <h2 className="text-xl font-bold mb-4 text-center text-gray-800 dark:text-gray-200">
          Реєстрація
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* username */}
          <input
            type="text"
            placeholder="Ім'я"
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          {/* email */}
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* 🔥 PHONE */}
          <input
            type="tel"
            placeholder="Номер телефону"
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />

          {/* password */}
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
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
          >
            Зареєструватися
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 dark:text-gray-300 mt-4">
          Уже маєш акаунт?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Увійти
          </Link>
        </p>
      </div>
    </div>
  );
}
