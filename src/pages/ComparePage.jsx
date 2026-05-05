import React, { useContext } from "react";
import { CompareContext } from "../context/CompareContext";

export default function ComparePage() {
  const { compareList, removeFromCompare, clearCompare } =
    useContext(CompareContext);

  if (compareList.length === 0) {
    return (
      <div className="p-4">
        <h2 className="font-bold text-xl mb-3">Порівняння товарів</h2>
        <p>Поки що немає вибраних товарів ⚖️</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="font-bold text-xl mb-3">Порівняння товарів</h2>
      <button
        onClick={clearCompare}
        className="mb-4 bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
      >
        Очистити все
      </button>

      <div className="overflow-x-auto">
        <table className="min-w-full border text-center">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Характеристика</th>
              {compareList.map((p) => (
                <th key={p.id} className="p-2 border">
                  {p.name}
                  <button
                    onClick={() => removeFromCompare(p.id)}
                    className="ml-2 text-red-500"
                  >
                    ✖
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2 font-semibold">Ціна</td>
              {compareList.map((p) => (
                <td key={p.id} className="border p-2">
                  {p.price} ₴
                </td>
              ))}
            </tr>
            <tr>
              <td className="border p-2 font-semibold">Рейтинг</td>
              {compareList.map((p) => (
                <td key={p.id} className="border p-2">⭐⭐⭐⭐⭐</td>
              ))}
            </tr>
            <tr>
              <td className="border p-2 font-semibold">Опис</td>
              {compareList.map((p) => (
                <td key={p.id} className="border p-2 text-sm text-gray-600">
                  Високоякісний {p.name}, зручний у використанні.
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}