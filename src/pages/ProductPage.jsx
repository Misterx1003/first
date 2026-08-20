import React, { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import products from "../products/products.json";
import toast from "react-hot-toast";

export default function ProductPage({ showAddButton = true }) {
  const { id } = useParams();

  const product = products.find(
    (p) => p.id === parseInt(id)
  );

  const { addToCart } = useContext(CartContext);

  if (!product) {
    return (
      <div className="p-6">
        ❌ Товар не знайдено
      </div>
    );
  }

  // =========================
  // ДОДАТИ В КОШИК
  // =========================

  const handleAddToCart = () => {
    console.log("Додаємо товар у кошик:", product);

    addToCart(product);

    toast.success("🛒 Товар додано до кошика!");
  };

  // =========================
  // ДОДАТИ В УЛЮБЛЕНІ
  // =========================

  const handleAddToFavorites = () => {
    const favorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );

    const exists = favorites.find(
      (f) => f.id === product.id
    );

    if (!exists) {
      favorites.push(product);

      localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
      );

      toast.success("❤️ Додано до улюблених!");
    } else {
      toast("✅ Цей товар уже в улюблених!");
    }
  };

  return (
    <div className="p-6">

      {/* Назад */}
      <Link
        to="/catalog"
        className="text-blue-600 underline"
      >
        ← Назад до каталогу
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

        {/* Фото */}
        <div>
          <img
            src={product.img}
            alt={product.name}
            className="rounded-lg shadow-lg w-full"
          />
        </div>

        {/* Інформація */}
        <div>

          <h2 className="text-2xl font-bold">
            {product.name}
          </h2>

          <p className="text-gray-600 mt-2">
            {product.desc}
          </p>

          <p className="text-2xl font-semibold mt-3 text-green-600">
            {product.price} ₴
          </p>

          {/* Кнопки */}
          <div className="flex gap-3 mt-4 flex-wrap">

            {showAddButton && (
              <button
                type="button"
                onClick={handleAddToCart}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg transition"
              >
                🛒 Додати в кошик
              </button>
            )}

            <button
              type="button"
              onClick={handleAddToFavorites}
              className="bg-pink-500 hover:bg-pink-600 text-white px-5 py-3 rounded-lg transition"
            >
              ❤️ Улюблене
            </button>

          </div>

        </div>
      </div>

    </div>
  );
}