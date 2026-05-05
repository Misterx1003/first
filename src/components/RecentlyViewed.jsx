import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function RecentlyViewed() {
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("recentlyViewed") || "[]");
    setRecentlyViewed(stored.slice(-5).reverse()); // показуємо останні 5
  }, []);

  if (recentlyViewed.length === 0) return null;

  return (
    <div className="bg-gray-50 border-t mt-10 py-6 px-4">
      <h3 className="text-lg font-semibold mb-3 text-center">
        👀 Нещодавно переглянуті товари
      </h3>
      <div className="flex gap-4 justify-center flex-wrap">
        {recentlyViewed.map((p) => (
          <Link
            to={`/product/${p.id}`}
            key={p.id}
            className="border rounded-lg p-3 bg-white shadow-sm hover:shadow-md transition"
          >
            <img
              src={p.img || "https://via.placeholder.com/150"}
              alt={p.name}
              className="w-32 h-24 object-cover rounded mb-2"
            />
            <div className="text-sm font-medium text-center">{p.name}</div>
            <div className="text-center text-gray-600">{p.price} ₴</div>
          </Link>
        ))}
      </div>
    </div>
  );
}