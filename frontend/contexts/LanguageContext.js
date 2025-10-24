"use client";
import { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [locale, setLocale] = useState("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedLocale = localStorage.getItem("locale") || "en";
    console.log("Loading locale from localStorage:", savedLocale);
    setLocale(savedLocale);
  }, []);

  const changeLocale = (newLocale) => {
    console.log("Changing locale to:", newLocale);
    setLocale(newLocale);
    localStorage.setItem("locale", newLocale);
    window.location.reload();
  };

  // Return a default context value during SSR
  const value = {
    locale: mounted ? locale : "en",
    changeLocale,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
