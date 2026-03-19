import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ExpertiseSection from "@/components/ExpertiseSection";
import FeaturedProjectsAndAutomations from "@/components/FeaturedProjectsAndAutomations";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Index() {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState<"EN" | "PT">("EN");

  // Sync dark class on <html>
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-500">
      <Navbar
        darkMode={darkMode}
        onToggleDark={() => setDarkMode((d) => !d)}
        language={language}
        onToggleLang={() => setLanguage((l) => (l === "EN" ? "PT" : "EN"))}
      />
      <main>
        <HeroSection />

        <ExpertiseSection />

        <FeaturedProjectsAndAutomations />

        <ContactSection />

        <Footer />
      </main>
    </div>
  );
}
