import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <button onClick={toggleTheme} className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 transition mr-5">
      {theme === "dark" ? (
        <div className="flex text-yellow-400 items-center gap-2">
          {" "}
          <Sun size={20} /> 
        </div>
      ) : (
        <div className="flex items-center gap-2">
          {" "}
          <Moon size={20} className="text-gray-800"/> 
        </div>
      )}{" "}
    </button>
  );
};

export default ThemeToggle;