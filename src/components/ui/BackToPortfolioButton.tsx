"use client";

import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/routing";

interface BackToPortfolioButtonProps {
  className?: string;
}

export default function BackToPortfolioButton({ className = "" }: BackToPortfolioButtonProps) {
  return (
    <Link
      href="/"
      className={`
        fixed top-6 left-6 z-50
        inline-flex items-center gap-2.5 px-4 py-2.5
        rounded-2xl
        glass-morphism
        text-sm font-semibold
        text-slate-700 dark:text-slate-200
        hover:text-primary dark:hover:text-primary
        hover:scale-105 hover:-translate-y-0.5
        transition-all duration-300 ease-out
        shadow-lg hover:shadow-xl
        backdrop-blur-md
        border border-white/20 dark:border-white/10
        ${className}
      `}
      aria-label="Voltar para o Portfólio"
    >
      <ArrowLeft className="w-4 h-4" />
      <span className="hidden sm:inline">Voltar</span>
    </Link>
  );
}
