import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import Button from "../components/Button";
import toast from "react-hot-toast";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:5000/products");
    setProducts(res.data);
  };

  const addProduct = async () => {
    try {
      await axios.post("http://localhost:5000/products", { name, price });
      toast.success("Додано!");
      fetchProducts();
    } catch {
      toast.error("Помилка");
    }
  };

  const deleteProduct = async (id) => {
    await axios.delete(`http://localhost:5000/products/${id}`);
    toast.success("Видалено!");
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Керування товарами</h2>

      <div className="flex gap-2 mb-4">
        <input
          className="border p-2 rounded-xl"
          placeholder="Назва"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="border p-2 rounded-xl"
          placeholder="Ціна"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <Button onClick={addProduct}>Додати</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.map((p) => (
          <ProductCard
            key={p._id}
            product={p}
            onAdd={() => deleteProduct(p._id)} 
          />
        ))}
      </div>
    </div>
  );
}