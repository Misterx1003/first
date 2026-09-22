import React from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import { Toaster } from "react-hot-toast";

// =========================
// Компоненти
// =========================

import Navbar from "./components/Navbar";
import Catalog from "./components/Catalog";
import ProductPage from "./components/ProductPage";
import ProtectedRoute from "./components/ProtectedRoute";

// =========================
// Основні сторінки
// =========================

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Orders from "./pages/Orders";
import Store from "./pages/Store";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";

// =========================
// Додаткові сторінки
// =========================

import Order from "./pages/Order";
import License from "./pages/License";
import History from "./pages/History";
import Favorites from "./pages/Favorites";
import ComparePage from "./pages/ComparePage";

// =========================
// Адмін
// =========================

import AdminPanel from "./admin/AdminPanel";
import AdminLogin from "./admin/AdminLogin";
import AdminProducts from "./admin/AdminProducts";
import AdminUsers from "./admin/AdminUsers";
import AdminOrders from "./admin/AdminOrders";

// =========================
// Контексти
// =========================

import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { CompareProvider } from "./context/CompareContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <FavoritesProvider>
          <CartProvider>
            <CompareProvider>
              <Router>

                {/* =========================
                    NAVBAR
                ========================= */}

                <Navbar />

                {/* =========================
                    TOAST
                ========================= */}

                <Toaster position="top-right" />

                {/* =========================
                    ROUTES
                ========================= */}

                <Routes>

                  {/* =========================
                      ГОЛОВНА
                  ========================= */}

                  <Route
                    path="/"
                    element={<Home />}
                  />

                  {/* =========================
                      ПРО НАС
                  ========================= */}

                  <Route
                    path="/about"
                    element={<About />}
                  />

                  {/* =========================
                      КОНТАКТИ
                  ========================= */}

                  <Route
                    path="/contact"
                    element={<Contact />}
                  />

                  {/* =========================
                      МАГАЗИН
                  ========================= */}

                  <Route
                    path="/магазин"
                    element={<Store />}
                  />

                  {/* =========================
                      КАТАЛОГ
                  ========================= */}

                  <Route
                    path="/catalog"
                    element={<Catalog />}
                  />

                  <Route
                    path="/каталог"
                    element={<Catalog />}
                  />

                  {/* =========================
                      ТОВАР
                  ========================= */}

                  <Route
                    path="/product/:id"
                    element={<ProductPage />}
                  />

                  {/* =========================
                      КОШИК
                  ========================= */}

                  <Route
                    path="/cart"
                    element={<Cart />}
                  />

                  {/* =========================
                      ОФОРМЛЕННЯ
                  ========================= */}

                  <Route
                    path="/checkout"
                    element={
                      <ProtectedRoute>
                        <Checkout />
                      </ProtectedRoute>
                    }
                  />

                  {/* =========================
                      ЗАМОВИТИ РОБОТУ
                  ========================= */}

                  <Route
                    path="/order"
                    element={<Order />}
                  />

                  {/* =========================
                      ❤️ УЛЮБЛЕНІ
                  ========================= */}

                  <Route
                    path="/favorites"
                    element={<Favorites />}
                  />

                  {/* =========================
                      ⚖️ ПОРІВНЯННЯ
                  ========================= */}

                  <Route
                    path="/compare"
                    element={<ComparePage />}
                  />

                  {/* =========================
                      ІСТОРІЯ
                  ========================= */}

                  <Route
                    path="/history"
                    element={<History />}
                  />

                  {/* =========================
                      ЛІЦЕНЗІЇ
                  ========================= */}

                  <Route
                    path="/license"
                    element={<License />}
                  />

                  <Route
                    path="/licenses"
                    element={<License />}
                  />

                  {/* =========================
                      ВХІД
                  ========================= */}

                  <Route
                    path="/login"
                    element={<Login />}
                  />

                  {/* =========================
                      РЕЄСТРАЦІЯ
                  ========================= */}

                  <Route
                    path="/register"
                    element={<Register />}
                  />

                  {/* =========================
                      МОЇ ЗАМОВЛЕННЯ
                  ========================= */}

                  <Route
                    path="/orders"
                    element={
                      <ProtectedRoute>
                        <Orders />
                      </ProtectedRoute>
                    }
                  />

                  {/* =========================
                      АДМІН — ВХІД
                  ========================= */}

                  <Route
                    path="/admin/login"
                    element={<AdminLogin />}
                  />

                  {/* =========================
                      АДМІН — ПАНЕЛЬ
                  ========================= */}

                  <Route
                    path="/admin"
                    element={
                      <ProtectedRoute adminOnly>
                        <AdminPanel />
                      </ProtectedRoute>
                    }
                  >
                    <Route
                      path="users"
                      element={<AdminUsers />}
                    />

                    <Route
                      path="products"
                      element={<AdminProducts />}
                    />

                    <Route
                      path="orders"
                      element={<AdminOrders />}
                    />
                  </Route>

                  {/* =========================
                      404
                  ========================= */}

                  <Route
                    path="*"
                    element={<NotFound />}
                  />

                </Routes>

              </Router>
            </CompareProvider>
          </CartProvider>
        </FavoritesProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;