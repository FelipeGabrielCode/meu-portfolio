"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { 
  ArrowLeft, TrendingUp, Target, Palette, ArrowRight, Users, Award, Zap,
  BarChart3, MousePointerClick, Globe, Megaphone, Linkedin, Github, Mail
} from "lucide-react";
import { useState, useEffect } from "react";
import RatingModal from "@/components/RatingModal";

// Cases de Sucesso
function SuccessCases() {
  const cases = [
    { client: "TechCorp", metric: "+320%", label: "Aumento em Tráfego", icon: TrendingUp, color: "emerald" },
    { client: "FashionStore", metric: "+150%", label: "Crescimento em Vendas", icon: BarChart3, color: "purple" },
    { client: "Consultoria Pro", metric: "85%", label: "Taxa de Conversão", icon: MousePointerClick, color: "amber" },
    { client: "StartupX", metric: "2M+", label: "Impressões/Ano", icon: Globe, color: "blue" },
  ];
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {cases.map((c) => (
        <div key={c.client} className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-fuchsia-500/30 transition-all duration-300 hover:-translate-y-1">
          <div className={`w-12 h-12 rounded-xl bg-${c.color}-500/20 flex items-center justify-center mb-4`}>
            <c.icon className={`w-6 h-6 text-${c.color}-400`} />
          </div>
          <p className="text-3xl font-bold text-slate-100 mb-1">{c.metric}</p>
          <p className="text-sm text-slate-400">{c.label}</p>
        </div>
      ))}
    </div>
  );
}

// Grid de Logos de Clientes
function ClientsGrid() {
  const clients = [
    { name: "TechCorp", abbr: "TC" },
    { name: "FashionStore", abbr: "FS" },
    { name: "Consultoria Pro", abbr: "CP" },
    { name: "StartupX", abbr: "SX" },
    { name: "Imobiliária Plus", abbr: "IP" },
    { name: "FoodDelivery App", abbr: "FD" },
  ];
  
  return (
    <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
      {clients.map((c) => (
        <div 
          key={c.name} 
          className="aspect-square rounded-xl bg-slate-800/50 border border-slate-700 flex items-center justify-center hover:border-fuchsia-500/50 transition-all duration-300 hover:scale-105"
        >
          <span className="font-bold text-2xl text-slate-600">{c.abbr}</span>
        </div>
      ))}
    </div>
  );
}

// Equipe Criativa
function CreativeTeam() {
  const team = [
    { role: "SEO Specialist", name: "Ana Silva", skill: "SEO Técnico", color: "emerald" },
    { role: "Ads Manager", name: "Carlos Santos", skill: "Google & Meta Ads", color: "blue" },
    { role: "Designer", name: "Maria Oliveira", skill: "UI/UX Design", color: "purple" },
    { role: "Copywriter", name: "João Lima", skill: "Copy Persuasivo", color: "amber" },
  ];
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {team.map((m) => (
        <div key={m.name} className="p-6 rounded-2xl bg-gradient-to-br from-slate-900/80 to-slate-800/50 border border-slate-700/50 text-center hover:border-fuchsia-500/30 transition-all duration-300">
          <div className={`w-16 h-16 mx-auto rounded-full bg-${m.color}-500/20 flex items-center justify-center mb-4`}>
            <span className={`text-xl font-bold text-${m.color}-400`}>{m.name.split(' ').map(n => n[0]).join('')}</span>
          </div>
          <p className="font-semibold text-slate-100 mb-1">{m.name}</p>
          <p className="text-sm text-fuchsia-400 mb-2">{m.role}</p>
          <p className="text-xs text-slate-500">{m.skill}</p>
        </div>
      ))}
    </div>
  );
}

export default function AgenciaLandingPageClient() {
  const t = useTranslations("Demos.agencia");
  const common = useTranslations("Demos.common");
  const [isRatingOpen, setIsRatingOpen] = useState(false);
  const [hasShownRating, setHasShownRating] = useState(false);

  // Mostrar avaliação após 10 segundos, apenas uma vez
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
      <RatingModal
        isOpen={isRatingOpen}
        onClose={() => setIsRatingOpen(false)}
        demoName="Agência de Marketing Digital"
      />

      {/* Botão Voltar */}
      <div className="fixed top-24 left-6 z-50">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-fuchsia-500/30 text-sm font-semibold text-fuchsia-400 hover:bg-fuchsia-500/10 transition-all duration-300 hover:-translate-y-0.5"
        >
          <ArrowLeft className="w-4 h-4" />
          {common("backToPortfolio")}
        </Link>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-16">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-24 left-1/2 w-[58rem] h-[58rem] -translate-x-1/2 rounded-full bg-gradient-to-tr from-fuchsia-500/20 via-purple-500/10 to-transparent blur-3xl" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-fuchsia-500/30 bg-fuchsia-500/10 px-4 py-2 mb-6 text-sm font-semibold text-fuchsia-400">
              <Megaphone className="w-4 h-4" />
              {t("badge")}
            </span>
            
            <h1 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.05] mb-6">
              {t("title")}
            </h1>
            
            <p className="text-lg text-slate-400 leading-relaxed mb-8 max-w-2xl">
              {t("hero_desc")}
            </p>

            <div className="flex flex-wrap gap-4">
              <Link 
                href="#cases" 
                className="inline-flex items-center gap-2 rounded-xl bg-fuchsia-500 text-white font-semibold px-6 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-fuchsia-500/25"
              >
                {t("cta_primary")}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                href="#clientes" 
                className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/50 px-6 py-3 font-semibold text-slate-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-600"
              >
                {t("cta_secondary")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Cases de Sucesso */}
      <section id="cases" className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-slate-100 mb-4">{t("cases_title")}</h2>
            <p className="text-slate-400">Resultados reais de campanhas que geraram crescimento</p>
          </div>
          <SuccessCases />
        </div>
      </section>

      {/* Clientes */}
      <section id="clientes" className="py-16 bg-gradient-to-b from-slate-900/50 to-slate-950">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-slate-100 mb-4">{t("clients_title")}</h2>
            <p className="text-slate-400">Empresas que confiam em nosso trabalho</p>
          </div>
          <ClientsGrid />
        </div>
      </section>

      {/* Equipe */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-slate-100 mb-4">{t("team_title")}</h2>
            <p className="text-slate-400">Profissionais especializados em cada área do marketing digital</p>
          </div>
          <CreativeTeam />
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-gradient-to-b from-slate-900/50 to-slate-950">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-fuchsia-500/10 to-transparent border border-fuchsia-500/20 hover:border-fuchsia-500/40 transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 rounded-xl bg-fuchsia-500/20 flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-fuchsia-400" />
              </div>
              <h3 className="font-display text-xl font-bold text-slate-100 mb-3">{t("feature_1")}</h3>
              <p className="text-slate-400">{t("feature_1_desc")}</p>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 rounded-xl bg-blue-500/20 flex items-center justify-center mb-6">
                <Users className="w-7 h-7 text-blue-400" />
              </div>
              <h3 className="font-display text-xl font-bold text-slate-100 mb-3">{t("feature_2")}</h3>
              <p className="text-slate-400">{t("feature_2_desc")}</p>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 rounded-xl bg-purple-500/20 flex items-center justify-center mb-6">
                <Palette className="w-7 h-7 text-purple-400" />
              </div>
              <h3 className="font-display text-xl font-bold text-slate-100 mb-3">{t("feature_3")}</h3>
              <p className="text-slate-400">{t("feature_3_desc")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-10 mt-16">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-5">
            <p className="text-sm text-slate-500">{common("footer")}</p>
            <div className="flex items-center gap-3">
              <a href="#" className="p-2 rounded-lg border border-slate-800 hover:border-fuchsia-500/50 transition-colors text-slate-400 hover:text-fuchsia-400">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 rounded-lg border border-slate-800 hover:border-fuchsia-500/50 transition-colors text-slate-400 hover:text-fuchsia-400">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 rounded-lg border border-slate-800 hover:border-fuchsia-500/50 transition-colors text-slate-400 hover:text-fuchsia-400">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}