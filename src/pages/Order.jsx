import React from "react";

export default function Order() {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">
          Замовити роботу
        </h1>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-600">
            Тут буде форма для замовлення роботи.
          </p>

          <p className="text-gray-500 mt-3">
            Форму та необхідні поля додамо після уточнення
            інформації про послуги.
          </p>
        </div>
      </div>
    </div>
  );
}