import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "pascal.dev - Monetización para Emprendedores y Nómadas Digitales",
  description:
    "Estrategias innovadoras de monetización con tecnología e inteligencia artificial para emprendedores y nómadas digitales",
  keywords:
    "monetización, tecnología, inteligencia artificial, emprendedores, nómadas digitales, marketing de afiliados, ingresos pasivos",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.className} antialiased bg-background text-foreground`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {/* Skip link accesible */}
          <a
            href="#content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[100]
                       focus:rounded-md focus:px-3 focus:py-2 focus:bg-primary focus:text-primary-foreground"
          >
            Saltar al contenido
          </a>

          <div className="flex flex-col min-h-screen">
            {/* Header sticky con blur y borde inferior */}
            <div className="sticky top-0 z-50 bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/50 border-b">
              <Header />
            </div>

            <main id="content" className="flex-grow">
              {children}
            </main>

            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
