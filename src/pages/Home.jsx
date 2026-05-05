import HomeBlocks from "../components/HomeBlocks";

export default function Home() {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Пошук */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Пошук..."
          className="w-full p-3 border rounded-xl shadow-sm"
        />
      </div>

      {/* 4 великі блоки */}
      <HomeBlocks />
    </div>
  );
}