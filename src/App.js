import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Компоненти
import Navbar from "./components/Navbar";

// Сторінки
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Orders from "./pages/Orders";
import Store from "./pages/Store";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";

// Каталог і товар
import Catalog from "./components/Catalog";
import ProductPage from "./components/ProductPage";

// Адмін
import AdminPanel from "./admin/AdminPanel";
import AdminLogin from "./admin/AdminLogin";
import AdminProducts from "./admin/AdminProducts";
import AdminUsers from "./admin/AdminUsers";
import AdminOrders from "./admin/AdminOrders";

// Контексти
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { CompareProvider } from "./context/CompareContext";

// Protected Route
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
        <CartProvider>
          <CompareProvider>
            <Router>

              <Navbar />
              <Toaster position="top-right" />

              <Routes>

                {/* Головні сторінки */}
                <Route path="/" element={<Home />} />
                <Route path="/магазин" element={<Store />} />

                {/* Каталог товарів */}
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/каталог" element={<Catalog />} />

                {/* Сторінка окремого товару */}
                <Route path="/product/:id" element={<ProductPage />} />

                {/* Кошик */}
                <Route path="/cart" element={<Cart />} />

                {/* Користувач */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route
                  path="/orders"
                  element={
                    <ProtectedRoute>
                      <Orders />
                    </ProtectedRoute>
                  }
                />

                {/* Адмін кабінет */}
                <Route path="/admin/login" element={<AdminLogin />} />

                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute adminOnly>
                      <AdminPanel />
                    </ProtectedRoute>
                  }
                >
                  <Route path="users" element={<AdminUsers />} />
                  <Route path="products" element={<AdminProducts />} />
                  <Route path="orders" element={<AdminOrders />} />
                </Route>

                {/* 404 */}
                <Route path="*" element={<NotFound />} />

              </Routes>
            </Router>
          </CompareProvider>
        </CartProvider>
    </AuthProvider>
  );
}

export default App;