import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  Heart,
  Menu,
  X,
  Sun,
  Moon,
  LogOut,
} from "lucide-react";

import { CartContext } from "../context/CartContext";
import { FavoritesContext } from "../context/FavoritesContext";
import { CompareContext } from "../context/CompareContext";
import { ThemeContext } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

import { toast } from "react-hot-toast";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // 🛒 Кошик
  const { cart = [] } = useContext(CartContext) || {};

  // ❤️ Улюблені
  const {
    favorites = [],
  } = useContext(FavoritesContext) || {};

  // ⚖️ Порівняння
  const {
    compareList = [],
  } = useContext(CompareContext) || {};

  // 🌙 Тема
  const {
    theme = "light",
    toggleTheme = () => {},
  } = useContext(ThemeContext) || {};

  // 👤 Авторизація
  const {
    user,
    logout,
  } = useAuth() || {};

  const navigate = useNavigate();

  // 🚪 Вихід
  const handleLogout = async () => {
    try {
      await logout();

      toast.success("👋 Ви вийшли з акаунту");

      navigate("/");
    } catch (error) {
      toast.error("❌ Помилка виходу: " + error.message);
    }
  };

  return (
    <nav className="bg-blue-700 text-white dark:bg-gray-900 dark:text-gray-100 shadow-lg fixed top-0 w-full z-50 transition-colors duration-300">

      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* =========================
            ЛОГО
        ========================= */}

        <Link
          to="/"
          className="text-lg font-bold"
        >
          Магазин ⚡
        </Link>

        {/* =========================
            DESKTOP MENU
        ========================= */}

        <div className="hidden md:flex items-center gap-6">

          <Link
            to="/"
            className="hover:text-gray-200"
          >
            Головна
          </Link>

          <Link
            to="/about"
            className="hover:text-gray-200"
          >
            Про нас
          </Link>

          <Link
            to="/contact"
            className="hover:text-gray-200"
          >
            Контакти
          </Link>

          {/* ❤️ Улюблені */}
          <Link
            to="/favorites"
            className="hover:text-gray-200"
          >
            Улюблені
          </Link>

          {/* 📦 Замовлення */}
          <Link
            to="/orders"
            className="hover:text-gray-200"
          >
            Мої замовлення 📦
          </Link>

          <div className="flex items-center gap-4">

            {/* =========================
                🌙 ТЕМА
            ========================= */}

            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-blue-600 dark:hover:bg-gray-800 transition"
              title={
                theme === "light"
                  ? "Темна тема"
                  : "Світла тема"
              }
            >
              {theme === "light" ? (
                <Moon />
              ) : (
                <Sun />
              )}
            </button>

            {/* =========================
                ❤️ УЛЮБЛЕНІ
            ========================= */}

            <Link
              to="/favorites"
              className="relative"
              title="Улюблені"
            >
              <Heart className="w-6 h-6" />

              {favorites.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-xs rounded-full px-1.5">
                  {favorites.length}
                </span>
              )}
            </Link>

            {/* =========================
                ⚖️ ПОРІВНЯННЯ
            ========================= */}

            <Link
              to="/compare"
              className="relative"
              title="Порівняння товарів"
            >
              ⚖️

              {compareList.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-purple-500 text-xs rounded-full px-1.5">
                  {compareList.length}
                </span>
              )}
            </Link>

            {/* =========================
                🛒 КОШИК
            ========================= */}

            <Link
              to="/cart"
              className="relative"
              title="Кошик"
            >
              <ShoppingCart className="w-6 h-6" />

              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-xs rounded-full px-1.5 text-black">
                  {cart.length}
                </span>
              )}
            </Link>

            {/* =========================
                👤 КОРИСТУВАЧ
            ========================= */}

            {user ? (
              <div className="flex items-center gap-2">

                <span className="text-sm text-gray-200">
                  {user.email}
                </span>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 bg-red-600 hover:bg-red-700 px-2 py-1 rounded text-sm transition"
                >
                  <LogOut size={16} />
                  Вийти
                </button>

              </div>
            ) : (
              <Link
                to="/login"
                className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-sm transition"
              >
                Увійти
              </Link>
            )}

          </div>
        </div>

        {/* =========================
            📱 MOBILE BUTTON
        ========================= */}

        <button
          className="md:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <X size={28} />
          ) : (
            <Menu size={28} />
          )}
        </button>

      </div>

      {/* =========================
          📱 MOBILE MENU
      ========================= */}

      {menuOpen && (
        <div className="md:hidden bg-blue-600 dark:bg-gray-800 flex flex-col items-center gap-4 py-4">

          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
          >
            Головна
          </Link>

          <Link
            to="/about"
            onClick={() => setMenuOpen(false)}
          >
            Про нас
          </Link>

          <Link
            to="/contact"
            onClick={() => setMenuOpen(false)}
          >
            Контакти
          </Link>

          {/* ❤️ Улюблені */}
          <Link
            to="/favorites"
            onClick={() => setMenuOpen(false)}
          >
            Улюблені ❤️ ({favorites.length})
          </Link>

          {/* ⚖️ Порівняння */}
          <Link
            to="/compare"
            onClick={() => setMenuOpen(false)}
          >
            Порівняння ⚖️ ({compareList.length})
          </Link>

          {/* 📦 Замовлення */}
          <Link
            to="/orders"
            onClick={() => setMenuOpen(false)}
          >
            Мої замовлення 📦
          </Link>

          {/* 🛒 Кошик */}
          <Link
            to="/cart"
            onClick={() => setMenuOpen(false)}
          >
            Кошик 🛒 ({cart.length})
          </Link>

          {/* 🌙 Тема */}
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2"
          >
            {theme === "light" ? (
              <>
                <Moon size={20} />
                Темна тема
              </>
            ) : (
              <>
                <Sun size={20} />
                Світла тема
              </>
            )}
          </button>

          {/* 👤 Вихід / Вхід */}
          {user ? (
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm transition"
            >
              Вийти
            </button>
          ) : (
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-sm transition"
            >
              Увійти
            </Link>
          )}

        </div>
      )}

    </nav>
  );
};

export default Navbar;