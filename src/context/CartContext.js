
import React, {
  createContext,
  useEffect,
  useState,
} from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      const parsedCart = savedCart
        ? JSON.parse(savedCart)
        : [];

      return Array.isArray(parsedCart) ? parsedCart : [];
    } catch (error) {
      console.error("Помилка завантаження кошика:", error);
      return [];
    }
  });

  // Зберігаємо кошик після кожної зміни
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Додавання товару
  const addToCart = (product) => {
    setCart((previousCart) => {
      const existingItem = previousCart.find(
        (item) => String(item.id) === String(product.id)
      );

      if (existingItem) {
        return previousCart.map((item) =>
          String(item.id) === String(product.id)
            ? {
                ...item,
                quantity: Number(item.quantity || 1) + 1,
              }
            : item
        );
      }

      return [
        ...previousCart,
        { ...product, quantity: 1 },
      ];
    });
  };

  // Встановлення кількості товару
  const updateQuantity = (id, quantity) => {
    const newQuantity = Math.floor(Number(quantity));

    if (!Number.isFinite(newQuantity) || newQuantity < 1) {
      return;
    }

    setCart((previousCart) =>
      previousCart.map((item) =>
        String(item.id) === String(id)
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  // Збільшення кількості
  const increaseQuantity = (id) => {
    setCart((previousCart) =>
      previousCart.map((item) =>
        String(item.id) === String(id)
          ? {
              ...item,
              quantity: Number(item.quantity || 1) + 1,
            }
          : item
      )
    );
  };

  // Зменшення кількості
  const decreaseQuantity = (id) => {
    setCart((previousCart) =>
      previousCart.map((item) =>
        String(item.id) === String(id)
          ? {
              ...item,
              quantity: Math.max(
                1,
                Number(item.quantity || 1) - 1
              ),
            }
          : item
      )
    );
  };

  // Видалення товару
  const removeFromCart = (id) => {
    setCart((previousCart) =>
      previousCart.filter(
        (item) => String(item.id) !== String(id)
      )
    );
  };

  // Очищення кошика
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
