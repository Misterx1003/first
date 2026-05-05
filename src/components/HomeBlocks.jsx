import { Link } from "react-router-dom";

export default function HomeBlocks() {
  const blocks = [
    {
      title: "Каталог",
      color: "from-blue-400 to-blue-600",
      icon: "📦",
      link: "/catalog",
    },
    {
      title: "Замовити роботу",
      color: "from-green-400 to-green-600",
      icon: "🛠",
      link: "/order",
    },
    {
      title: "Ліцензія",
      color: "from-purple-400 to-purple-600",
      icon: "🛡",
      link: "/license",
    },
    {
      title: "Історія робіт",
      color: "from-orange-400 to-orange-600",
      icon: "⏳",
      link: "/history",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 px-6">

      {blocks.map((b, i) => (
        <Link
          key={i}
          to={b.link}
          className={`
            rounded-2xl p-6 text-center text-white font-semibold shadow-xl 
            bg-gradient-to-br ${b.color}
            transition-all duration-300 
            hover:scale-[1.04]
            hover:shadow-2xl
            relative overflow-hidden
          `}
        >

          {/* деко-світіння */}
          <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-20 transition duration-300"></div>

          {/* inner shadow */}
          <div className="absolute inset-0 shadow-inner"></div>

          {/* іконка */}
          <div className="text-5xl mb-3 drop-shadow">{b.icon}</div>

          <div className="text-xl">{b.title}</div>
        </Link>
      ))}
    </div>
  );
}