// src/components/Footer.tsx
"use client";

import { Mail, Github, Twitter, Linkedin } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t bg-background text-foreground mt-20">
      <div className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Marca y descripción */}
        <div>
          <h2 className="text-2xl font-bold tracking-tight">pascal.dev</h2>
          <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
            Estrategias y recursos para monetizar con tecnología y vivir libre desde cualquier parte del mundo.
          </p>
        </div>

        {/* Navegación */}
        <div>
          <h3 className="text-base font-semibold mb-3">Navegación</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/estrategias" className="hover:text-primary transition-colors">Estrategias</Link></li>
            <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
            <li><Link href="/contacto" className="hover:text-primary transition-colors">Contacto</Link></li>
            <li><a href="https://github.com/tuusuario" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">GitHub</a></li>
          </ul>
        </div>

        {/* Contacto y redes */}
        <div>
          <h3 className="text-base font-semibold mb-3">Conecta</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <a href="mailto:contacto@pascal.dev" className="hover:text-primary transition-colors">contacto@pascal.dev</a>
            </li>
            <li className="flex items-center gap-2">
              <Twitter className="w-4 h-4" />
              <a href="https://twitter.com/pascaldev" className="hover:text-primary transition-colors">@pascaldev</a>
            </li>
            <li className="flex items-center gap-2">
              <Linkedin className="w-4 h-4" />
              <a href="https://linkedin.com" className="hover:text-primary transition-colors">/pascal.dev</a>
            </li>
            <li className="flex items-center gap-2">
              <Github className="w-4 h-4" />
              <a href="https://github.com/tuusuario" className="hover:text-primary transition-colors">github.com/tuusuario</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer inferior */}
      <div className="border-t border-muted text-center text-xs text-muted-foreground py-6">
        © {new Date().getFullYear()} <span className="font-semibold">pascal.dev</span>. Todos los derechos reservados.
      </div>
    </footer>
  );
}
