import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";

const LanguageDropdown = () => {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);

  const languages = [
    { code: "ua", label: "Українська", flag: "🇺🇦" },
    { code: "en", label: "English", flag: "🇬🇧" },
  ];

  const changeLang = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
    setOpen(false);
  };

  return (
    <div className="relative">
      {/* Поточна мова */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-1.5 bg-white text-gray-800 dark:bg-gray-700 dark:text-white rounded-lg shadow hover:bg-gray-100 dark:hover:bg-gray-600 transition"
      >
        <Globe size={18} />
        <span>
          {languages.find((l) => l.code === i18n.language)?.flag || "🌐"}
        </span>
      </button>

      {/* Випадаюче меню */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLang(lang.code)}
                className={`flex items-center gap-2 px-4 py-2 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition ${
                  i18n.language === lang.code
                    ? "font-semibold bg-gray-100 dark:bg-gray-700"
                    : ""
                }`}
              >
                <span className="text-lg">{lang.flag}</span>
                <span>{lang.label}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageDropdown;