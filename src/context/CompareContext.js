import React, { createContext, useState, useEffect } from "react";

export const CompareContext = createContext();

export const CompareProvider = ({ children }) => {
  const [compareList, setCompareList] = useState(() => {
    // ✅ Отримуємо збережені товари при запуску
    const saved = localStorage.getItem("compareList");
    return saved ? JSON.parse(saved) : [];
  });

  // 💾 Зберігаємо у localStorage при кожній зміні списку
  useEffect(() => {
    localStorage.setItem("compareList", JSON.stringify(compareList));
  }, [compareList]);

  const addToCompare = (product) => {
    setCompareList((prev) => {
      if (prev.find((p) => p.id === product.id)) return prev; // вже є
      if (prev.length >= 3) {
        alert("Можна порівняти максимум 3 товари!");
        return prev;
      }
      return [...prev, product];
    });
  };

  const removeFromCompare = (id) => {
    setCompareList((prev) => prev.filter((p) => p.id !== id));
  };

  const clearCompare = () => {
    setCompareList([]);
    localStorage.removeItem("compareList"); // очищаємо також у localStorage
  };

  return (
    <CompareContext.Provider
      value={{ compareList, addToCompare, removeFromCompare, clearCompare }}
    >
      {children}
    </CompareContext.Provider>
  );
};
