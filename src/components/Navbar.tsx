"use client";

import { useState, useEffect } from "react";
import { Moon, Sun, Globe, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";

interface NavbarProps {
  darkMode: boolean;
  onToggleDark: () => void;
  // Props are kept optional for compatibility with older Vite residual pages.
  language?: "EN" | "PT" | string;
  onToggleLang?: () => void;
}

export default function Navbar({ darkMode, onToggleDark }: NavbarProps) {
  const t = useTranslations("Navbar");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("#home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setActiveLink(href);
    setMenuOpen(false);
  };

  const handleToggleLang = () => {
    const nextLocale = locale === "pt" ? "en" : "pt";
    
    // Captura o hash atual da URL (ex: "#contact" ou "")
    const currentHash = window.location.hash;
    
    // Faz a troca de idioma adicionando o hash e bloqueando o scroll pro topo
    router.replace(`${pathname}${currentHash}`, {
      locale: nextLocale,
      scroll: false,
    });
  };

  const navLinks = [
    { label: t("links.home"), href: "#home" },
    { label: t("links.expertise"), href: "#expertise" },
    { label: t("links.projects"), href: "#projects" },
    { label: t("links.contact"), href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-nav py-3" : "py-5 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between max-w-6xl">
        {/* Logo */}
        <a
          href="#home"
          onClick={() => handleNavClick("#home")}
          className="font-display font-black text-2xl tracking-tight gradient-text-premium"
        >
          FG.
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => handleNavClick(link.href)}
              className={`relative px-4 py-2 text-sm font-bold rounded-lg transition-all duration-200 group
                ${activeLink === link.href
                  ? "text-primary font-black"
                  : "text-muted-foreground hover:text-foreground font-semibold"
                }
              `}
            >
              {link.label}
              <span
                className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full bg-primary transition-all duration-300
                  ${activeLink === link.href ? "w-4/5 opacity-100" : "w-0 opacity-0 group-hover:w-4/5 group-hover:opacity-60"}
                `}
              />
            </a>
          ))}
        </nav>

        {/* Controls */}
        <div className="hidden md:flex items-center gap-2">
          {/* Language toggle */}
          <button
            onClick={handleToggleLang}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-muted-foreground border border-border/60 hover:border-primary/50 hover:text-primary transition-all duration-200 glass"
          >
            <Globe className="w-3.5 h-3.5" />
            {locale.toUpperCase()}
          </button>

          {/* Dark mode toggle */}
          <button
            onClick={onToggleDark}
            className="p-2 rounded-lg text-muted-foreground hover:text-primary border border-border/60 hover:border-primary/50 transition-all duration-200 glass"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-lg glass text-muted-foreground hover:text-primary"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden glass-nav mt-2 mx-4 rounded-xl overflow-hidden animate-fade-in">
          <nav className="flex flex-col p-4 gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
                  ${activeLink === link.href
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }
                `}
              >
                {link.label}
              </a>
            ))}
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border/50">
              <button
                onClick={handleToggleLang}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-muted-foreground border border-border/60 hover:text-primary transition-all duration-200"
              >
                <Globe className="w-3.5 h-3.5" />
                {locale.toUpperCase()}
              </button>
              <button
                onClick={onToggleDark}
                className="p-2 rounded-lg text-muted-foreground hover:text-primary border border-border/60 transition-all duration-200"
              >
                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
