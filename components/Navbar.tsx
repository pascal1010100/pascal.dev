"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Sun, Moon, Search, Menu, X, Box, ChevronDown } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const navigation = [
  { name: "Inicio", href: "/" },
  { 
    name: "Estrategias", 
    href: "/estrategias",
    submenu: [
      { name: "Todas las Estrategias", href: "/estrategias" },
      { name: "Automatización con IA", href: "/estrategias/ia" },
      { name: "Ingresos Pasivos", href: "/estrategias/ingresos-pasivos" },
      { name: "Freelancing", href: "/estrategias/freelancing" },
    ]
  },
  { 
    name: "Recursos", 
    href: "/recursos",
    submenu: [
      { name: "Plantillas", href: "/recursos/plantillas" },
      { name: "Guías", href: "/recursos/guias" },
      { name: "Herramientas", href: "/recursos/herramientas" },
    ]
  },
  { name: "Blog", href: "/blog" },
  { name: "Sobre Mí", href: "/sobre-mi" },
];

interface SubmenuProps {
  items: { name: string; href: string }[];
  isOpen: boolean;
  onClose: () => void;
}

const Submenu = ({ items, isOpen, onClose }: SubmenuProps) => {
  if (!isOpen) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="absolute left-0 right-0 mt-2 bg-background border rounded-lg shadow-lg py-2 z-50"
      onMouseLeave={onClose}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="block px-4 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
          onClick={onClose}
        >
          {item.name}
        </Link>
      ))}
    </motion.div>
  );
};

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  // Cerrar menús al cambiar de ruta
  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
    setActiveSubmenu(null);
  }, [pathname]);

  // Evitar hidratación no coincidente
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/buscar?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setSearchOpen(false);
    }
  };

  const toggleSubmenu = (name: string) => {
    setActiveSubmenu(activeSubmenu === name ? null : name);
  };

  // No renderizar nada en el servidor para evitar hidratación no coincidente
  if (!mounted) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80">
      <nav className="container flex h-16 items-center justify-between px-4" aria-label="Navegación principal">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link 
            href="/" 
            className="flex items-center gap-2 font-bold text-foreground transition-colors hover:text-primary"
            aria-label="Ir a la página de inicio"
          >
            <Box className="h-6 w-6 text-primary" />
            <span className="hidden text-xl font-extrabold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent sm:inline-block">pascal.dev</span>
          </Link>
        </div>

        {/* Navegación para desktop */}
        <div className="hidden md:flex md:items-center md:gap-1">
          {navigation.map((item) => (
            <div key={item.name} className="relative group" onMouseEnter={() => item.submenu && setActiveSubmenu(item.name)}>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  pathname === item.href && "text-foreground font-semibold"
                )}
                onFocus={() => item.submenu && setActiveSubmenu(item.name)}
              >
                {item.name}
                {item.submenu && (
                  <ChevronDown className={cn(
                    "h-4 w-4 transition-transform",
                    activeSubmenu === item.name && "rotate-180"
                  )} />
                )}
              </Link>
              
              {item.submenu && (
                <Submenu 
                  items={item.submenu} 
                  isOpen={activeSubmenu === item.name}
                  onClose={() => setActiveSubmenu(null)}
                />
              )}
            </div>
          ))}
        </div>

        {/* Controles de búsqueda y tema */}
        <div className="flex items-center gap-2">
          {/* Barra de búsqueda en desktop */}
          <AnimatePresence>
            {searchOpen && (
              <motion.div 
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 200 }}
                exit={{ opacity: 0, width: 0 }}
                className="hidden md:block overflow-hidden"
              >
                <form onSubmit={handleSearch} className="w-full">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Buscar..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full rounded-full border border-input bg-background py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      aria-label="Buscar en el sitio"
                      autoFocus
                    />
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Botón de búsqueda */}
          <button
            type="button"
            className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            aria-label={searchOpen ? "Cerrar búsqueda" : "Buscar"}
            onClick={() => setSearchOpen(!searchOpen)}
          >
            {searchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
          </button>

          {/* Selector de tema */}
          <button
            type="button"
            onClick={toggleTheme}
            className="hidden rounded-full p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground md:block"
            aria-label={theme === "dark" ? "Cambiar a tema claro" : "Cambiar a tema oscuro"}
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>

          {/* Botón de menú móvil */}
          <button
            type="button"
            className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Menú móvil */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t bg-background shadow-lg md:hidden"
          >
            <div className="container px-4 py-3">
              <form onSubmit={handleSearch} className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Buscar..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-lg border border-input bg-background py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    aria-label="Buscar en el sitio"
                  />
                </div>
              </form>
              <nav className="flex flex-col space-y-1">
                {navigation.map((item) => (
                  <div key={item.name} className="relative">
                    <div className="flex items-center justify-between">
                      <Link
                        href={item.href}
                        className={cn(
                          "flex-1 rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-accent",
                          pathname === item.href && "font-semibold text-primary"
                        )}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                      {item.submenu && (
                        <button 
                          onClick={() => toggleSubmenu(item.name)}
                          className="p-2 text-muted-foreground"
                          aria-expanded={activeSubmenu === item.name}
                        >
                          <ChevronDown className={cn(
                            "h-4 w-4 transition-transform",
                            activeSubmenu === item.name && "rotate-180"
                          )} />
                        </button>
                      )}
                    </div>
                    
                    {item.submenu && activeSubmenu === item.name && (
                      <div className="ml-4 mt-1 space-y-1 border-l-2 border-muted pl-3 py-1">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                
                {/* Toggle de tema en móvil */}
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="flex w-full items-center rounded-md px-3 py-2 text-sm text-left text-foreground hover:bg-accent"
                >
                  {theme === "dark" ? (
                    <>
                      <Sun className="mr-2 h-4 w-4" />
                      Cambiar a tema claro
                    </>
                  ) : (
                    <>
                      <Moon className="mr-2 h-4 w-4" />
                      Cambiar a tema oscuro
                    </>
                  )}
                </button>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
