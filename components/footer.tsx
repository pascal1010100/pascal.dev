"use client";

import { Mail, Github, Twitter, Linkedin, Send, Box, Search, MessageSquare, FileText, Code, Zap, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TrustBadges } from "@/components/ui/trust-badges";
import { cn } from "@/lib/utils";

const navigation = {
  main: [
    { name: 'Inicio', href: '/', icon: ChevronRight },
    { name: 'Estrategias', href: '/estrategias', icon: Zap },
    { name: 'Recursos', href: '/recursos', icon: FileText },
    { name: 'Blog', href: '/blog', icon: MessageSquare },
    { name: 'Tutoriales', href: '/tutoriales', icon: Code },
  ],
  resources: [
    { name: 'Documentación', href: '/docs' },
    { name: 'Guías', href: '/guias' },
    { name: 'Plantillas', href: '/plantillas' },
    { name: 'Herramientas', href: '/herramientas' },
    { name: 'Comunidad', href: '/comunidad' },
  ],
  company: [
    { name: 'Sobre Mí', href: '/sobre-mi' },
    { name: 'Proyectos', href: '/proyectos' },
    { name: 'Testimonios', href: '/testimonios' },
    { name: 'Contacto', href: '/contacto' },
    { name: 'Prensa', href: '/prensa' },
  ],
  social: [
    {
      name: 'Twitter',
      href: 'https://twitter.com/pascaldev',
      icon: Twitter,
      username: '@pascaldev',
    },
    {
      name: 'GitHub',
      href: 'https://github.com/tuusuario',
      icon: Github,
      username: 'github.com/tuusuario',
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com',
      icon: Linkedin,
      username: 'in/pascaldev',
    },
    {
      name: 'Email',
      href: 'mailto:contacto@pascal.dev',
      icon: Mail,
      username: 'contacto@pascal.dev',
    },
  ],
  legal: [
    { name: 'Términos de Servicio', href: '/terminos' },
    { name: 'Política de Privacidad', href: '/privacidad' },
    { name: 'Política de Cookies', href: '/cookies' },
    { name: 'Aviso Legal', href: '/aviso-legal' },
  ],
};

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const FooterLink = ({ href, children, className = '' }: FooterLinkProps) => (
  <Link 
    href={href} 
    className={cn(
      "text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5 group",
      className
    )}
  >
    <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
    <span>{children}</span>
  </Link>
);

export default function Footer() {
  return (
    <footer className="border-t bg-background/80 backdrop-blur-sm mt-24">
      {/* Sección de suscripción */}
      <div className="bg-gradient-to-r from-primary/5 to-primary/10 py-12">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
              ¿Listo para llevar tus habilidades al siguiente nivel?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Suscríbete a mi newsletter y recibe contenido exclusivo, estrategias avanzadas y recursos gratuitos directamente en tu bandeja de entrada.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="tu@email.com"
                className="flex-1 min-w-0 bg-background/80 backdrop-blur-sm"
                aria-label="Dirección de correo electrónico"
                required
              />
              <Button type="submit" className="gap-2 font-medium">
                Suscribirse
                <Send className="w-4 h-4" />
              </Button>
            </form>
            <p className="text-xs text-muted-foreground mt-3">
              Respetamos tu privacidad. Cancelar la suscripción en cualquier momento.
            </p>
          </div>
        </div>
      </div>

      {/* Sección principal del footer */}
      <div className="container px-4 py-16 mx-auto">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Branding */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <Box className="w-9 h-9 text-primary" />
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">pascal.dev</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Estrategias avanzadas de monetización con tecnología e IA para emprendedores y nómadas digitales. Aprende a crear ingresos pasivos y vive la libertad financiera.
            </p>
            
            {/* Buscador */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar en el sitio..."
                className="pl-10 bg-background/80 backdrop-blur-sm"
                aria-label="Buscar en el sitio"
              />
            </div>
          </div>

          {/* Navegación */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase mb-4 flex items-center gap-2 text-foreground">
              <Zap className="w-4 h-4 text-primary" />
              Navegación
            </h3>
            <ul className="space-y-2.5">
              {navigation.main.map((item) => (
                <li key={item.name}>
                  <FooterLink href={item.href}>
                    {item.name}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Recursos */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase mb-4 flex items-center gap-2 text-foreground">
              <FileText className="w-4 h-4 text-primary" />
              Recursos
            </h3>
            <ul className="space-y-2.5">
              {navigation.resources.map((item) => (
                <li key={item.name}>
                  <FooterLink href={item.href}>
                    {item.name}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase mb-4 flex items-center gap-2 text-foreground">
              <MessageSquare className="w-4 h-4 text-primary" />
              Contacto
            </h3>
            <ul className="space-y-3">
              {navigation.social.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-start gap-2 group"
                  >
                    <item.icon className="h-4 w-4 mt-0.5 flex-shrink-0 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span className="group-hover:underline">{item.username}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sección de confianza */}
        <TrustBadges />

        {/* Footer inferior */}
        <div className="flex flex-col items-center justify-between pt-8 text-sm text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} pascal.dev. Todos los derechos reservados.</p>
          <div className="flex flex-wrap justify-center gap-4 mt-4 md:mt-0">
            {navigation.legal.map((item) => (
              <Link 
                key={item.name} 
                href={item.href}
                className="hover:text-foreground transition-colors text-xs"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
