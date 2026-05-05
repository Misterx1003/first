import React from "react";
import { Link } from "react-router-dom";
import products from "../products/products.json";

export default function Catalog() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Каталог товарів</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((p) => (
          <Link
            key={p.id}
            to={`/product/${p.id}`}
            className="border rounded-lg p-3 hover:shadow-lg transition flex flex-col"
          >
            <img
              src={p.img}
              alt={p.name}
              className="w-full h-32 sm:h-40 object-cover rounded"
            />

            <h2 className="font-bold mt-2 text-sm sm:text-base line-clamp-2">
              {p.name}
            </h2>

            <p className="text-gray-600 text-sm mt-1 line-clamp-3">{p.desc}</p>

            <p className="text-green-700 font-semibold mt-1">{p.price} ₴</p>
          </Link>
        ))}
      </div>
    </div>
  );
}