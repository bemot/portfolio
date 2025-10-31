"use client";
import { useLanguage } from "../../../contexts/LanguageContext";

const LanguageSwitcher = () => {
  const { locale, changeLocale } = useLanguage();

  const languages = [
    { code: 'de', label: 'DE', ariaLabel: 'Auf Deutsch umschalten' },
    { code: 'en', label: 'EN', ariaLabel: 'Switch to English' },
    { code: 'uk', label: 'UA', ariaLabel: 'Перемкнути на українську' }
  ];

  return (
    <div className="flex items-center gap-0.5 sm:gap-1 bg-[#1a1443] rounded-lg p-0.5 sm:p-1 border border-[#2a2e5a]">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => changeLocale(lang.code)}
          className={`px-2 sm:px-3 py-1 sm:py-1.5 text-xs font-semibold transition-all duration-300 rounded-md ${
            locale === lang.code
              ? "bg-gradient-to-r from-violet-600 to-pink-600 text-white shadow-lg scale-105"
              : "text-gray-400 hover:text-white hover:bg-[#2a2e5a]"
          }`}
          aria-label={lang.ariaLabel}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
