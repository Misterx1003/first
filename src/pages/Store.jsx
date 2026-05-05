import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { CompareContext } from "../context/CompareContext";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import products from "../products/products.json";

export default function Store() {
  const { addToCart } = useContext(CartContext);
  const { addToCompare } = useContext(CompareContext);

  const [search, setSearch] = useState(() => localStorage.getItem("search") || "");
  const [sort, setSort] = useState(() => localStorage.getItem("sort") || "default");
  const [filters, setFilters] = useState(() => {
    const saved = localStorage.getItem("filters");
    return saved
      ? JSON.parse(saved)
      : { inStock: false, minPrice: "", maxPrice: "", minRating: "" };
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("filters", JSON.stringify(filters));
    localStorage.setItem("search", search);
    localStorage.setItem("sort", sort);
  }, [filters, search, sort]);

  // Додаємо дефолтні поля rating та inStock
  const initialProducts = products.map((p) => ({
    ...p,
    rating: p.rating || 4.5,
    inStock: p.inStock ?? true,
  }));

  const filteredProducts = initialProducts
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    .filter((p) => (filters.inStock ? p.inStock : true))
    .filter((p) => (filters.minPrice ? p.price >= parseFloat(filters.minPrice) : true))
    .filter((p) => (filters.maxPrice ? p.price <= parseFloat(filters.maxPrice) : true))
    .filter((p) => (filters.minRating ? p.rating >= parseFloat(filters.minRating) : true))
    .sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "rating-desc") return b.rating - a.rating;
      if (sort === "rating-asc") return a.rating - b.rating;
      return 0;
    });

  const FiltersPanel = () => (
    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded shadow w-full md:w-64">
      <h3 className="text-lg font-semibold mb-3">🔍 Фільтри</h3>

      <input
        type="text"
        placeholder="Пошук..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 rounded w-full mb-3"
      />

      <label className="flex items-center mb-3 space-x-2">
        <input
          type="checkbox"
          checked={filters.inStock}
          onChange={(e) => setFilters({ ...filters, inStock: e.target.checked })}
        />
        <span>Тільки в наявності</span>
      </label>

      <div className="mb-3">
        <p className="font-semibold mb-1">💰 Ціна</p>
        <div className="flex space-x-2">
          <input
            type="number"
            placeholder="Від"
            value={filters.minPrice}
            onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
            className="border p-2 w-1/2 rounded"
          />
          <input
            type="number"
            placeholder="До"
            value={filters.maxPrice}
            onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
            className="border p-2 w-1/2 rounded"
          />
        </div>
      </div>

      <div className="mb-3">
        <p className="font-semibold mb-1">⭐ Мінімальний рейтинг</p>
        <select
          value={filters.minRating}
          onChange={(e) => setFilters({ ...filters, minRating: e.target.value })}
          className="border p-2 rounded w-full"
        >
          <option value="">Усі</option>
          <option value="4">4★ і вище</option>
          <option value="4.5">4.5★ і вище</option>
          <option value="5">Тільки 5★</option>
        </select>
      </div>

      <div className="mb-3">
        <p className="font-semibold mb-1">⚙️ Сортування</p>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border p-2 rounded w-full"
        >
          <option value="default">Без сортування</option>
          <option value="price-asc">За ціною (зрост.)</option>
          <option value="price-desc">За ціною (спад.)</option>
          <option value="rating-desc">За рейтингом (вищий → нижчий)</option>
          <option value="rating-asc">За рейтингом (нижчий → вищий)</option>
        </select>
      </div>

      <button
        onClick={() => {
          setFilters({ inStock: false, minPrice: "", maxPrice: "", minRating: "" });
          setSearch("");
          setSort("default");
          toast("🔄 Фільтри скинуто");
        }}
        className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 px-4 py-2 rounded w-full"
      >
        🔄 Скинути фільтри
      </button>
    </div>
  );

  return (
    <div className="relative flex flex-col md:flex-row mt-20">
      <div className="hidden md:block w-1/4 mr-4">
        <FiltersPanel />
      </div>

      <section className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {filteredProducts.length === 0 ? (
          <p className="text-gray-500">Немає товарів 😕</p>
        ) : (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className={`border rounded-lg p-4 shadow hover:shadow-lg transition flex flex-col ${
                !product.inStock ? "opacity-70 grayscale" : ""
              }`}
            >
              <img
                src={product.img}
                alt={product.name}
                className="w-full h-40 object-cover rounded mb-3"
              />
              <h3 className="text-lg font-bold mb-1 line-clamp-2">{product.name}</h3>
              <p className="text-gray-600 text-sm mb-2 line-clamp-3">{product.desc}</p>
              <p className="text-green-700 font-semibold mb-1">{product.price} ₴</p>
              <div className="text-yellow-500 mb-2">⭐ {product.rating}</div>
              <p
                className={`text-sm mb-3 ${
                  product.inStock ? "text-green-600" : "text-red-500"
                }`}
              >
                {product.inStock ? "Є в наявності ✅" : "Немає ❌"}
              </p>

              <div className="flex gap-2 mt-auto">
                <button
                  onClick={() => {
                    if (!product.inStock) return toast.error("Немає в наявності 😕");
                    addToCart(product);
                    toast.success("✅ Додано в кошик!");
                  }}
                  className="bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700"
                >
                  + У кошик
                </button>

                <button
                  onClick={() => addToCompare(product)}
                  className="bg-yellow-500 text-white px-3 py-2 rounded hover:bg-yellow-600"
                >
                  ⚖️ Порівняти
                </button>
              </div>
            </div>
          ))
        )}
      </section>

      <button
        onClick={() => setIsFilterOpen(true)}
        className="md:hidden fixed bottom-6 right-6 bg-blue-600 text-white px-4 py-3 rounded-full shadow-lg flex items-center gap-2"
      >
        🔍 Фільтри
      </button>

      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50"
            onClick={() => setIsFilterOpen(false)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 100 }}
              className="bg-white dark:bg-gray-900 w-full max-h-[90vh] p-6 rounded-t-2xl overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">🔍 Фільтри</h2>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="text-gray-600 dark:text-gray-300"
                >
                  ✖
                </button>
              </div>
              <FiltersPanel />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}