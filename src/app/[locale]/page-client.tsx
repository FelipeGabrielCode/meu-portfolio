"use client";

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ExpertiseSection from "@/components/ExpertiseSection";
import FeaturedProjectsAndAutomations from "@/components/FeaturedProjectsAndAutomations";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function HomePageClient() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-500">
      <Navbar />
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

