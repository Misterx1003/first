
import React from "react";
import { Outlet, useNavigate } from "react-router-dom"; 
import Button from "../components/Button"; // твій Button
import { Menu, LayoutDashboard, Package, Users, LogOut } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminPanel() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login"); 
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <motion.aside
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="w-64 bg-white shadow-2xl p-4 flex flex-col gap-4"
      >
        <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Menu /> Admin
        </h1>

        <Button
          className="justify-start text-lg flex gap-2"
          onClick={() => handleNavigation("/admin")} 
        >
          <LayoutDashboard /> Панель
        </Button>

        <Button
          className="justify-start text-lg flex gap-2"
          onClick={() => handleNavigation("/admin/products")}
        >
          <Package /> Товари
        </Button>

        <Button
          className="justify-start text-lg flex gap-2"
          onClick={() => handleNavigation("/admin/users")}
        >
          <Users /> Користувачі
        </Button>

        <div className="flex-1" />

        <Button
          className="justify-start text-lg flex gap-2 bg-red-500 text-white"
          onClick={handleLogout}
        >
          <LogOut /> Вихід
        </Button>
      </motion.aside>

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex-1 p-6 overflow-auto"
      >
        <Outlet />
      </motion.main>
    </div>
  );
}