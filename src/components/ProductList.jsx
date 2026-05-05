import React, { useEffect, useState } from "react";
import ProductSkeleton from "./ProductSkeleton";
import toast from "react-hot-toast";
import ProductCard from "./ProductCard";

const ProductList = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setProducts([
        { id: 1, name: "Ноутбук Acer", price: 24999 },
        { id: 2, name: "Телефон Samsung", price: 19999 },
      ]);
      setLoading(false);
    }, 1500);
  }, []);

  const handleAddToCart = (product) => {
    toast.success(`✅ ${product.name} додано в кошик!`);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
      {loading
        ? Array(6)
            .fill(0)
            .map((_, i) => <ProductSkeleton key={i} />)
        : products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAdd={() => handleAddToCart(product)}
            />
          ))}
    </div>
  );
};

export default ProductList;