const fs = require("fs");
const path = require("path");

// Шляхи до файлів
const productsPath = path.join(__dirname, "src", "products", "products.json");
const categoriesPath = path.join(__dirname, "src", "products", "categories.json");
const manufacturersPath = path.join(__dirname, "src", "products", "manufacturers.json");

// Завантаження продуктів
const products = JSON.parse(fs.readFileSync(productsPath, "utf-8"));

// Унікальні категорії
const categories = [...new Set(products.map((p) => p.category))].map((c, i) => ({
  id: i + 1,
  slug: c,
  name: c.replace(/-/g, " ").replace(/\b\w/g, (ch) => ch.toUpperCase()),
}));

// Витяг виробників з назви товару
function extractManufacturer(name) {
  const words = name.split(" ");

  // Шукаємо слова, що можуть бути виробником
  const candidates = words.filter(
    (w) =>
      w.length > 2 &&
      /^[A-Za-z0-9]+$/.test(w) && // тільки букви/цифри
      w.toLowerCase() !== "schneider" // виняток — Schneider складається з 2 слів
  );

  if (name.includes("Schneider")) return "Schneider Electric";

  return candidates.length > 0 ? candidates[candidates.length - 1] : "Unknown";
}

// Збір виробників
const manufacturerSet = new Set();

products.forEach((p) => {
  const manu = extractManufacturer(p.name);
  manufacturerSet.add(manu);
});

const manufacturers = [...manufacturerSet].map((m, i) => ({
  id: i + 1,
  name: m,
  slug: m.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
}));

// Збереження
fs.writeFileSync(categoriesPath, JSON.stringify(categories, null, 2));
fs.writeFileSync(manufacturersPath, JSON.stringify(manufacturers, null, 2));

console.log("✔ categories.json створено");
console.log("✔ manufacturers.json створено");