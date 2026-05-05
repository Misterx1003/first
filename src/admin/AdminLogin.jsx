import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const res = await axios.post("http://localhost:5000/admin/login", {
        username,
        password,
      });

      localStorage.setItem("adminToken", res.data.token);
      toast.success("Адмін авторизований!");

      window.location.href = "/admin";
    } catch {
      toast.error("Невірні дані");
    }
  };

  return (
    <div className="flex justify-center mt-20">
      <div className="border p-6 rounded-xl shadow-xl w-[350px]">
        <h2 className="text-2xl font-bold mb-4">Вхід адміністратора</h2>

        <input
          className="border p-2 rounded-xl w-full mb-2"
          placeholder="Логін"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="border p-2 rounded-xl w-full mb-4"
          placeholder="Пароль"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-xl w-full"
          onClick={login}
        >
          Увійти
        </button>
      </div>
    </div>
  );
}