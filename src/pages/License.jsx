import React from "react";

export default function License() {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Ліцензії
          </h1>

          <p className="mt-3 text-gray-600">
            Документи та інформація про ліцензії компанії
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 md:p-8">

          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ліцензійні документи
          </h2>

          <p className="text-gray-600 leading-relaxed mb-6">
            Тут будуть розміщені офіційні документи та
            інформація щодо ліцензій компанії.
          </p>

          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">

            <div className="text-5xl mb-4">
              📄
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Ліцензійні документи
            </h3>

            <p className="text-gray-500">
              Документи будуть додані після отримання матеріалів.
            </p>

          </div>

        </div>

      </div>
    </div>
  );
}