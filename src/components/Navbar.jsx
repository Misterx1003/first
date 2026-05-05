import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Heart, Menu, X, Sun, Moon, LogOut } from "lucide-react";

import { CartContext } from "../context/CartContext";
import { CompareContext } from "../context/CompareContext";
import { ThemeContext } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Безпечна деструктуризація — щоб не було undefined
  const { cart = [] } = useContext(CartContext) || {};
  const { favorites = [] } = useContext(CompareContext) || {};
  const { theme = "light", toggleTheme = () => {} } = useContext(ThemeContext) || {};
  const { user, logout } = useAuth() || {};

  const navigate = useNavigate();

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
        
        {/* Лого */}
        <Link to="/" className="text-lg font-bold">
          Магазин ⚡
        </Link>

        {/* Десктоп меню */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="hover:text-gray-200">Головна</Link>
          <Link to="/about" className="hover:text-gray-200">Про нас</Link>
          <Link to="/contact" className="hover:text-gray-200">Контакти</Link>
          <Link to="/favorites" className="hover:text-gray-200">Улюблені</Link>
          <Link to="/orders" className="hover:text-gray-200">Мої замовлення 📦</Link>

          <div className="flex items-center gap-4">

            {/* Тема */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-blue-600 dark:hover:bg-gray-800 transition"
            >
              {theme === "light" ? <Moon /> : <Sun />}
            </button>

            {/* Улюблені */}
            <Link to="/favorites" className="relative">
              <Heart className="w-6 h-6" />
              {favorites.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-xs rounded-full px-1.5">
                  {favorites.length}
                </span>
              )}
            </Link>

            {/* Кошик */}
            <Link to="/cart" className="relative">
              <ShoppingCart className="w-6 h-6" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-xs rounded-full px-1.5 text-black">
                  {cart.length}
                </span>
              )}
            </Link>

            {/* Логін / Вихід */}
            {user ? (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-200">{user.email}</span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 bg-red-600 hover:bg-red-700 px-2 py-1 rounded text-sm transition"
                >
                  <LogOut size={16} /> Вийти
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

        {/* Мобільна кнопка меню */}
        <button
          className="md:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Мобільне меню */}
      {menuOpen && (
        <div className="md:hidden bg-blue-600 dark:bg-gray-800 flex flex-col items-center gap-4 py-4">
          <Link to="/" onClick={() => setMenuOpen(false)}>Головна</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>Про нас</Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>Контакти</Link>
          <Link to="/favorites" onClick={() => setMenuOpen(false)}>Улюблені ❤️</Link>
          <Link to="/orders" onClick={() => setMenuOpen(false)}>Мої замовлення 📦</Link>

          {/* Кошик у мобільному меню */}
          <Link to="/cart" onClick={() => setMenuOpen(false)}>
            Кошик 🛒 ({cart.length})
          </Link>

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