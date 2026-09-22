import React, { createContext, useEffect, useState } from "react";

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem("favorites");
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Помилка завантаження улюблених:", error);
      return [];
    }
  });

  // Зберігаємо улюблені товари
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Додати / прибрати з улюблених
  const toggleFavorite = (product) => {
    setFavorites((prev) => {
      const exists = prev.some(
        (item) => String(item.id) === String(product.id)
      );

      if (exists) {
        return prev.filter(
          (item) => String(item.id) !== String(product.id)
        );
      }

      return [...prev, product];
    });
  };

  // Перевірка, чи товар уже в улюблених
  const isFavorite = (productId) => {
    return favorites.some(
      (item) => String(item.id) === String(productId)
    );
  };

  // Очистити всі улюблені
  const clearFavorites = () => {
    setFavorites([]);
    localStorage.removeItem("favorites");
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite,
        clearFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};