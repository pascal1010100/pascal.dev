"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Sun, Moon, Search } from "lucide-react";
import { Box } from "lucide-react";




export default function Navbar() {
  const [search, setSearch] = useState("");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  useEffect(() => {
    // Al montar, lee la preferencia guardada o la del sistema
    const saved = localStorage.getItem("theme");
    if (saved === "dark" || saved === "light") {
      setTheme(saved);
      document.documentElement.classList.toggle("dark", saved === "dark");
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(prefersDark ? "dark" : "light");
      document.documentElement.classList.toggle("dark", prefersDark);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Por ahora solo imprime la búsqueda en consola
    console.log("Buscando:", search);
  };

  return (
    <header className="w-full flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-black sticky top-0 z-50">
     <Link href="/" className="flex items-center gap-2 text-gray-900 dark:text-white">
  <span className="hidden md:inline text-2xl font-bold">pascal.dev</span>
  <Box className="md:hidden w-6 h-6" />
</Link>

      {/* Searchbar: visible en md+ */}
      <form
        onSubmit={handleSearch}
        className="hidden md:block w-full max-w-md mx-auto"
      >
        <input
          type="text"
          placeholder="Buscar artículos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </form>

      {/* Acciones lado derecho: lupa (mobile) + tema */}
      <div className="flex items-center gap-2 ml-4">
        {/* Icono lupa solo en mobile */}
        <button
          type="button"
          className="md:hidden p-2 rounded-full border bg-gray-100 dark:bg-gray-800"
          aria-label="Buscar"
          onClick={() => setShowMobileSearch(true)}
        >
          <Search className="h-5 w-5" />
        </button>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full border bg-gray-100 dark:bg-gray-800"
          aria-label="Cambiar tema"
        >
          {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
      </div>

      {/* Modal de búsqueda en mobile */}
      {showMobileSearch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white dark:bg-gray-900 rounded-lg p-4 w-11/12 max-w-sm shadow-lg flex flex-col gap-4">
            <form onSubmit={handleSearch}>
              <input
                autoFocus
                type="text"
                placeholder="Buscar artículos..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </form>
            <button
              onClick={() => setShowMobileSearch(false)}
              className="self-end text-sm text-blue-600 hover:underline"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </header>
  );
} 