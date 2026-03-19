"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ExpertiseSection from "@/components/ExpertiseSection";
import FeaturedProjectsAndAutomations from "@/components/FeaturedProjectsAndAutomations";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function HomePageClient() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-500">
      <Navbar darkMode={darkMode} onToggleDark={() => setDarkMode((d) => !d)} />
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

