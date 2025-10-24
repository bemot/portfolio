"use client";
import { useTheme } from "../../../contexts/ThemeContext";
import { BsMoonStarsFill } from "react-icons/bs";

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg transition-all duration-300 hover:scale-110 bg-gray-700/30 hover:bg-gray-600/40 backdrop-blur-sm"
      aria-label={`Switch to ${theme === "dark" ? "Macchiato" : "Dark Blue"} theme`}
      title={`Switch to ${theme === "dark" ? "Macchiato" : "Dark Blue"} theme`}
    >
      {theme === "dark" ? (
        <BsMoonStarsFill className="w-4 h-4 text-blue-400" />
      ) : (
        <BsMoonStarsFill className="w-4 h-4 text-purple-400" />
      )}
    </button>
  );
};

export default ThemeSwitcher;
