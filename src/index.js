import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./context/ThemeContext";

import { CartProvider } from "./context/CartContext";
import { CompareProvider } from "./context/CompareContext";

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <CartProvider>
        <CompareProvider>

          <App />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: "#333",
                color: "#fff",
                borderRadius: "8px",
              },
            }}
          />

        </CompareProvider>
      </CartProvider>
    </ThemeProvider>
  </React.StrictMode>
);