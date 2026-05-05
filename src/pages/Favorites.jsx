import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function Favorites() {
  const { addToCart } = useContext(CartContext);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(saved);
  }, []);

  const removeFavorite = (id) => {
    const updated = favorites.filter((item) => item.id !== id);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  if (favorites.length === 0) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-bold mb-2">Мої улюблені ❤️</h2>
        <p>Поки що немає улюблених товарів.</p>
        <Link to="/" className="text-blue-600 underline mt-3 inline-block">
          ← Повернутися до магазину
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Мої улюблені ❤️</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {favorites.map((item) => (
          <div
            key={item.id}
            className="border rounded-lg p-4 shadow hover:shadow-lg transition"
          >
            <img
              src={item.img || "https://via.placeholder.com/400x300"}
              alt={item.name}
              className="rounded mb-3"
            />
            <h3 className="font-semibold text-lg">{item.name}</h3>
            <p className="text-gray-600">{item.price} ₴</p>
            <div className="flex gap-3 mt-3">
              <button
                onClick={() => addToCart(item)}
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
              >
                🛒 У кошик
              </button>
              <button
                onClick={() => removeFavorite(item.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                🗑 Видалити
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}