import React, { useContext, useState } from "react";
import { Heart } from "lucide-react";
import ReviewStars from "./ReviewStars";
import { FavoritesContext } from "../context/FavoritesContext";

const ProductCard = ({ product, onAdd, showAddButton = false }) => {
  const [avgRating] = useState(0);
  const [reviewCount] = useState(0);

  const {
    toggleFavorite,
    isFavorite,
  } = useContext(FavoritesContext);

  const favorite = isFavorite(product.id);

  return (
    <div className="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition flex flex-col relative">

      {/* ❤️ Улюблені */}
      <button
        onClick={() => toggleFavorite(product)}
        className="absolute top-3 right-3 p-2 rounded-full bg-white shadow hover:scale-110 transition"
        title={
          favorite
            ? "Прибрати з улюблених"
            : "Додати в улюблені"
        }
      >
        <Heart
          className={`w-6 h-6 ${
            favorite
              ? "fill-red-500 text-red-500"
              : "text-gray-500"
          }`}
        />
      </button>

      <h3 className="text-lg font-semibold line-clamp-2 pr-10">
        {product.name}
      </h3>

      <p className="text-gray-600 text-sm mt-1 line-clamp-3">
        {product.desc}
      </p>

      {/* ⭐ Рейтинг */}
      <div className="flex items-center gap-2 mt-2">
        <ReviewStars
          value={Math.round(avgRating)}
          readonly
        />

        <span className="text-sm text-gray-500">
          ({reviewCount})
        </span>
      </div>

      {/* 💰 Ціна */}
      <p className="text-green-700 font-semibold mt-2">
        {product.price} ₴
      </p>

      {/* 🛒 Кошик */}
      {showAddButton && (
        <button
          onClick={onAdd}
          className="w-full bg-blue-600 text-white py-2 mt-3 rounded-lg hover:bg-blue-700 transition"
        >
          Додати в кошик
        </button>
      )}
    </div>
  );
};

export default ProductCard;