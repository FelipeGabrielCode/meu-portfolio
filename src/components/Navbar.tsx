"use client";

import { useState, useEffect } from "react";
import { Globe, Menu, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { ModeToggle } from "@/components/ModeToggle";

export default function Navbar() {
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
        scrolled ? "glass-nav py-2 md:py-3" : "py-3 md:py-5 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between max-w-6xl">
        {/* Logo */}
        <a
          href="#home"
          onClick={() => handleNavClick("#home")}
          className="font-display font-black text-xl md:text-2xl tracking-tight gradient-text-premium"
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

        {/* Controls - Always visible on both mobile and desktop */}
        <div className="flex items-center gap-2">
          {/* Language toggle - Visible on all screen sizes */}
          <button
            onClick={handleToggleLang}
            className="flex items-center gap-1 px-2.5 py-2 rounded-lg text-xs md:text-sm font-semibold text-muted-foreground border border-border/60 hover:border-primary/50 hover:text-primary transition-all duration-200 glass"
          >
            <Globe className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{locale.toUpperCase()}</span>
            <span className="sm:hidden">{locale.toUpperCase().slice(0, 2)}</span>
          </button>

          {/* Theme toggle - Visible on all screen sizes */}
          <ModeToggle />

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg glass text-muted-foreground hover:text-primary ml-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu - Only navigation links, no theme/lang toggles */}
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
          </nav>
        </div>
      )}
    </header>
  );
}
