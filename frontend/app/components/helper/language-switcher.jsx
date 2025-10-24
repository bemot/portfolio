"use client";
import { useLanguage } from "../../../contexts/LanguageContext";

const LanguageSwitcher = () => {
  const { locale, changeLocale } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => changeLocale("en")}
        className={`px-3 py-1 text-sm font-medium transition-colors duration-300 rounded ${
          locale === "en"
            ? "bg-[#16f2b3] text-gray-900"
            : "text-white hover:text-[#16f2b3]"
        }`}
        aria-label="Switch to English"
      >
        EN
      </button>
      <span className="text-gray-500">|</span>
      <button
        onClick={() => changeLocale("uk")}
        className={`px-3 py-1 text-sm font-medium transition-colors duration-300 rounded ${
          locale === "uk"
            ? "bg-[#16f2b3] text-gray-900"
            : "text-white hover:text-[#16f2b3]"
        }`}
        aria-label="Перемкнути на українську"
      >
        UK
      </button>
    </div>
  );
};

export default LanguageSwitcher;
