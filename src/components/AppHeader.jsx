import React from "react";
import { useTranslation } from "react-i18next";

export default function AppHeader() {
  const { i18n, t } = useTranslation();

  const changeLang = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  return (
    <header className="flex justify-between items-center p-4 border-b bg-gray-50 dark:bg-gray-800">
      <h1 className="text-lg font-bold text-gray-800 dark:text-gray-200">
        {t("title")}
      </h1>

      <nav className="flex items-center space-x-4">
        <button
          onClick={() => changeLang("ua")}
          className={`px-2 py-1 rounded ${
            i18n.language === "ua" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          🇺🇦 UA
        </button>
        <button
          onClick={() => changeLang("en")}
          className={`px-2 py-1 rounded ${
            i18n.language === "en" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          🇬🇧 EN
        </button>
      </nav>
    </header>
  );
}