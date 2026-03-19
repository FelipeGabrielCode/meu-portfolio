"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { 
  ArrowLeft, Scale, Shield, FileCheck, Users, BookOpen, ChevronRight, Award, Lock,
  Briefcase, Building2, Calculator, Home, Car, Heart, ArrowRight, Linkedin, Github, Mail,
  Gavel, FileText, User, Calendar, Clock, CheckCircle2, Phone, X
} from "lucide-react";
import { useState, useEffect } from "react";
import RatingModal from "@/components/RatingModal";

// ... component implementation with all features and RatingModal
export default function EscritorioLandingPageClient() {
  const t = useTranslations("Demos.escritorio");
  const common = useTranslations("Demos.common");
  const [isRatingOpen, setIsRatingOpen] = useState(false);
  const [hasShownRating, setHasShownRating] = useState(false);

  useEffect(() => {
    if (!hasShownRating) {
      const timer = setTimeout(() => {
        setIsRatingOpen(true);
        setHasShownRating(true);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [hasShownRating]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <RatingModal isOpen={isRatingOpen} onClose={() => setIsRatingOpen(false)} demoName="Sistema de Gestão Legal" />
      <div className="fixed top-24 left-6 z-50">
        <Link href="/#projects" className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-blue-500/30 text-sm font-semibold text-blue-400 hover:bg-blue-500/10 transition-all duration-300 hover:-translate-y-0.5">
          <ArrowLeft className="w-4 h-4" />{common("backToPortfolio")}
        </Link>
      </div>
      {/* Rest of the component */}
    </div>
  );
}