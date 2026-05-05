import React from "react";
import { useParams } from "react-router-dom";
import products from "../products/products.json";

import Reviews from "../components/Reviews";
import AddReview from "../components/AddReview";

export default function ProductPage() {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return <h2 className="p-6 text-xl font-bold">Товар не знайдено</h2>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <img
        src={product.img}
        alt={product.name}
        className="w-full h-80 object-cover rounded-lg"
      />

      <h1 className="text-3xl font-bold mt-4">{product.name}</h1>

      <p className="text-green-700 text-xl font-semibold mt-2">
        {product.price} ₴
      </p>

      {product.description && (
        <p className="mt-4 text-gray-700">{product.description}</p>
      )}

      <button className="mt-6 px-4 py-2 bg-blue-600 text-white rounded">
        Додати в кошик
      </button>

      {/* ⭐⭐⭐ ВІДГУКИ */}
      <Reviews productId={product.id} />

      <AddReview
        productId={product.id}
        onReviewAdded={() => window.location.reload()}
      />
    </div>
  );
}