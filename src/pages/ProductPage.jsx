import React, { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import products from "../products/products.json";

export default function ProductPage({ showAddButton = true }) {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));
  const { addToCart } = useContext(CartContext);

  if (!product) return <div className="p-4">❌ Товар не знайдено</div>;

  const handleAddToFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    const exists = favorites.find((f) => f.id === product.id);
    if (!exists) {
      favorites.push(product);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      alert("❤️ Додано до улюблених!");
    } else {
      alert("✅ Цей товар уже в улюблених!");
    }
  };

  return (
    <div className="p-6">
      <Link to="/" className="text-blue-600 underline">
        ← Назад до каталогу
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <img src={product.img} alt={product.name} className="rounded-lg shadow-lg" />
        <div>
          <h2 className="text-2xl font-bold">{product.name}</h2>
          <p className="text-gray-600 mt-2">{product.desc}</p>
          <p className="text-2xl font-semibold mt-3">{product.price} ₴</p>

          <div className="flex gap-3 mt-4">
            {showAddButton && (
              <button
                onClick={() => addToCart(product)}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                🛒 Додати у кошик
              </button>
            )}
            <button
              onClick={handleAddToFavorites}
              className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
            >
              ❤️ Улюблене
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
