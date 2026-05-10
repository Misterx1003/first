import React, { useState } from "react";
import ReviewStars from "./ReviewStars";

const ProductCard = ({ product, onAdd, showAddButton = false }) => {
  const [avgRating] = useState(0);
  const [reviewCount] = useState(0);

  return (
    <div className="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition flex flex-col">
      <h3 className="text-lg font-semibold line-clamp-2">{product.name}</h3>
      <p className="text-gray-600 text-sm mt-1 line-clamp-3">{product.desc}</p>

      {/* ⭐ Рейтинг */}
      <div className="flex items-center gap-2 mt-2">
        <ReviewStars value={Math.round(avgRating)} readonly />
        <span className="text-sm text-gray-500">
          ({reviewCount})
        </span>
      </div>

      <p className="text-green-700 font-semibold mt-2">
        {product.price} ₴
      </p>

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