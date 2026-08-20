import React from "react";

export default function History() {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">
          Історія робіт
        </h1>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-600">
            Тут буде представлена історія виконаних робіт.
          </p>

          <p className="text-gray-500 mt-3">
            Інформацію буде додано після отримання матеріалів.
          </p>
        </div>
      </div>
    </div>
  );
}