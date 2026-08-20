import React, {
  createContext,
  useEffect,
  useState,
} from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("cart");

      if (!saved) {
        return [];
      }

      const parsed = JSON.parse(saved);

      // Перевіряємо, що в localStorage справді масив
      if (!Array.isArray(parsed)) {
        console.warn("Дані кошика пошкоджені. Кошик очищено.");
        return [];
      }

      return parsed;
    } catch (error) {
      console.error(
        "Помилка завантаження кошика:",
        error
      );

      return [];
    }
  });

  // Зберігаємо кошик у localStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        "cart",
        JSON.stringify(cart)
      );
    } catch (error) {
      console.error(
        "Помилка збереження кошика:",
        error
      );
    }
  }, [cart]);

  // Додати товар
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find(
        (item) => item.id === product.id
      );

      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity:
                  (item.quantity || 0) + 1,
              }
            : item
        );
      }

      return [
        ...prev,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  };

  // Видалити товар
  const removeFromCart = (id) => {
    setCart((prev) =>
      prev.filter(
        (item) => item.id !== id
      )
    );
  };

  // Очистити кошик
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};