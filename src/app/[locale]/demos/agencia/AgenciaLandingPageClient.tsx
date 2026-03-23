"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { 
  ArrowLeft, TrendingUp, Target, Palette, ArrowRight, Users, Award, Zap,
  BarChart3, MousePointerClick, Globe, Megaphone, Linkedin, Github, Mail,
  Search, PieChart, LineChart, Activity, CheckCircle2, Star, Quote, ChevronRight,
  Play, FileText, Download, Calculator, TrendingDown, Eye, DollarSign, Phone
} from "lucide-react";
import { useState, useEffect } from "react";
import RatingModal from "@/components/RatingModal";

// Diagnóstico Gratuito de Marketing
function FreeDiagnosis({ t }: { t: (key: string, params?: Record<string, string | number>) => string }) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [analysisType, setAnalysisType] = useState("");

  const startDiagnosis = (type: string) => {
    setAnalysisType(type);
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
    }, 3000);
  };

  const resetDiagnosis = () => {
    setShowResults(false);
    setAnalysisType("");
  };

  if (showResults && analysisType) {
    return (
      <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-violet-600/20 to-amber-500/10 border border-violet-500/30">
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto rounded-full bg-violet-500/20 flex items-center justify-center mb-4">
            <CheckCircle2 className="w-8 h-8 text-violet-400" />
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
            {analysisType === "seo" ? t("diagnosis_seo_title") : t("diagnosis_ads_title")}
          </h3>
          <p className="text-slate-400">{t("diagnosis_complete")}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              <span className="font-semibold text-slate-200">{t("opportunities")}</span>
            </div>
            <p className="text-sm text-slate-400">
              {analysisType === "seo" ? 
                "SEO Score: 45/100 • Potencial de +180% em tráfego orgânico" : 
                "ROAS atual: 2.1x • Potencial de +340% em ROI"
              }
            </p>
          </div>
          
          <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
            <div className="flex items-center gap-3 mb-2">
              <TrendingDown className="w-5 h-5 text-amber-400" />
              <span className="font-semibold text-slate-200">{t("issues")}</span>
            </div>
            <p className="text-sm text-slate-400">
              {analysisType === "seo" ? 
                "7 problemas críticos de SEO detectados" : 
                "5 otimizações urgentes em campanhas"
              }
            </p>
          </div>
        </div>
        
        <div className="flex gap-3">
          <button 
            onClick={resetDiagnosis}
            className="flex-1 py-3 rounded-xl bg-slate-800 text-slate-300 font-semibold hover:bg-slate-700 transition-colors"
          >
            {t("new_diagnosis")}
          </button>
          <button className="flex-1 py-3 rounded-xl bg-violet-500 text-white font-semibold hover:bg-violet-600 transition-colors flex items-center justify-center gap-2">
            <Phone className="w-4 h-4" />
            {t("contact_specialist")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-violet-600/10 to-amber-500/5 border border-violet-500/20">
      <div className="text-center mb-6">
        <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{t("free_diagnosis_title")}</h3>
        <p className="text-slate-400">{t("free_diagnosis_desc")}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button 
          onClick={() => startDiagnosis("seo")}
          disabled={isAnalyzing}
          className="p-6 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-violet-500/50 transition-all group disabled:opacity-50"
        >
          <div className="flex items-center gap-4 mb-3">
            <div className="w-12 h-12 rounded-xl bg-violet-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Search className="w-6 h-6 text-violet-400" />
            </div>
            <div className="text-left">
              <h4 className="font-semibold text-slate-200">{t("seo_analysis")}</h4>
              <p className="text-sm text-slate-500">{t("seo_analysis_desc")}</p>
            </div>
          </div>
          {isAnalyzing && analysisType === "seo" ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-violet-400 rounded-full animate-pulse" />
              <span className="text-sm text-violet-400">{t("analyzing")}...</span>
            </div>
          ) : (
            <span className="text-violet-400 text-sm font-semibold">{t("start_analysis")} →</span>
          )}
        </button>
        
        <button 
          onClick={() => startDiagnosis("ads")}
          disabled={isAnalyzing}
          className="p-6 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-amber-500/50 transition-all group disabled:opacity-50"
        >
          <div className="flex items-center gap-4 mb-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <DollarSign className="w-6 h-6 text-amber-400" />
            </div>
            <div className="text-left">
              <h4 className="font-semibold text-slate-200">{t("ads_roi_analysis")}</h4>
              <p className="text-sm text-slate-500">{t("ads_analysis_desc")}</p>
            </div>
          </div>
          {isAnalyzing && analysisType === "ads" ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
              <span className="text-sm text-amber-400">{t("analyzing")}...</span>
            </div>
          ) : (
            <span className="text-amber-400 text-sm font-semibold">{t("start_analysis")} →</span>
          )}
        </button>
      </div>
    </div>
  );
}

// Cases de Sucesso Reais com Prova Social
function RealSuccessCases({ t }: { t: (key: string, params?: Record<string, string | number>) => string }) {
  const cases = [
    {
      client: "Clínica Vida Ativa",
      industry: "Saúde",
      logo: "VA",
      roi: "450%",
      metric: "+22%",
      label: "Aumento em Conversão",
      period: "6 meses",
      image: "saude",
      testimonial: "Nossas agendamentos aumentaram 300% e o ROI foi impressionante. Equipe excepcional!",
      author: "Dra. Ana Paula",
      role: "Diretora Clínica",
      color: "violet"
    },
    {
      client: "TechStore E-commerce",
      industry: "Varejo Online",
      logo: "TS",
      roi: "320%",
      metric: "+180%",
      label: "Crescimento em Vendas",
      period: "4 meses",
      image: "ecommerce",
      testimonial: "Passamos de 50 para 140 vendas/dia. O melhor investimento que fizemos!",
      author: "Carlos Mendes",
      role: "CEO",
      color: "amber"
    },
    {
      client: "Amaral Advogados",
      industry: "Jurídico",
      logo: "AA",
      roi: "280%",
      metric: "85%",
      label: "Taxa de Conversão",
      period: "3 meses",
      image: "juridico",
      testimonial: "Nossos casos novos aumentaram 200%. Estratégia de marketing impecável.",
      author: "Dr. Roberto Amaral",
      role: "Sócio",
      color: "violet"
    }
  ];

  return (
    <div className="space-y-6">
      {cases.map((c, i) => (
        <div key={c.client} className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-slate-900/80 to-slate-800/50 border border-slate-700/50 hover:border-violet-500/30 transition-all duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Logo e Informações */}
            <div className="flex items-center gap-4">
              <div className={`w-16 h-16 rounded-xl bg-${c.color}-500/20 flex items-center justify-center`}>
                <span className={`text-2xl font-bold text-${c.color}-400`}>{c.logo}</span>
              </div>
              <div>
                <h3 className="font-bold text-slate-100 text-lg">{c.client}</h3>
                <p className="text-sm text-slate-500">{c.industry}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                </div>
              </div>
            </div>

            {/* Métricas */}
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-black text-white mb-1">
                {c.roi}
              </div>
              <p className="text-sm text-slate-400 mb-3">ROI em {c.period}</p>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400 font-semibold">{c.metric}</span>
              </div>
            </div>

            {/* Depoimento */}
            <div className="relative">
              <Quote className="absolute -top-2 -left-2 w-8 h-8 text-violet-500/20" />
              <p className="text-slate-300 text-sm leading-relaxed mb-3 italic">
                "{c.testimonial}"
              </p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
                  <span className="text-xs font-bold text-slate-300">{c.author.split(' ').map(n => n[0]).join('')}</span>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-200">{c.author}</p>
                  <p className="text-xs text-slate-500">{c.role}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Equipe Criativa
function CreativeTeam() {
  const team = [
    { role: "SEO Specialist", name: "Ana Silva", skill: "SEO Técnico", color: "violet" },
    { role: "Ads Manager", name: "Carlos Santos", skill: "Google & Meta Ads", color: "amber" },
    { role: "Designer", name: "Maria Oliveira", skill: "UI/UX Design", color: "violet" },
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
      <div className="fixed top-20 md:top-24 left-3 md:left-6 z-50">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full glass border border-violet-400/50 bg-slate-900/80 backdrop-blur-sm text-xs md:text-sm font-semibold text-violet-300 hover:bg-violet-500/20 hover:border-violet-400 hover:text-violet-200 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
        >
          <ArrowLeft className="w-3 h-3 md:w-4 md:h-4" />
          {common("backToPortfolio")}
        </Link>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden pt-20 md:pt-32 pb-10 md:pb-16">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-24 left-1/2 w-[30rem] md:w-[58rem] h-[30rem] md:h-[58rem] -translate-x-1/2 rounded-full bg-gradient-to-tr from-violet-500/20 via-amber-500/10 to-transparent blur-3xl" />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl">
            <span className="inline-flex items-center gap-1.5 md:gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-2.5 py-1 md:px-4 md:py-2 mb-3 md:mb-6 text-xs md:text-sm font-semibold text-violet-400">
              <Megaphone className="w-3 h-3 md:w-4 md:h-4" />
              {t("badge")}
            </span>
            
            <h1 className="font-display text-2xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-3 md:mb-6">
              {t("title")}
            </h1>
            
            <p className="text-sm md:text-lg text-slate-400 leading-relaxed mb-4 md:mb-8 max-w-2xl">
              {t("hero_desc")}
            </p>

            <div className="flex flex-col sm:flex-row gap-2 md:gap-4">
              <Link 
                href="#diagnostico" 
                className="inline-flex items-center justify-center gap-1.5 md:gap-2 rounded-xl bg-violet-500 text-white font-semibold px-3 py-2 md:px-6 md:py-3 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-violet-500/25 text-xs md:text-base"
              >
                {t("cta_primary")}
                <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
              </Link>
              <Link 
                href="#cases" 
                className="inline-flex items-center justify-center gap-1.5 md:gap-2 rounded-xl border border-slate-700 bg-slate-800/50 px-3 py-2 md:px-6 md:py-3 font-semibold text-slate-300 transition-all hover:-translate-y-0.5 hover:border-slate-600 text-xs md:text-base"
              >
                {t("cta_secondary")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Diagnóstico Gratuito */}
      <section id="diagnostico" className="py-8 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-6 md:mb-12">
            <h2 className="font-display text-xl md:text-3xl font-bold text-slate-100 mb-2 md:mb-4">{t("diagnosis_title")}</h2>
            <p className="text-slate-400 text-xs md:text-base">{t("diagnosis_subtitle")}</p>
          </div>
          <FreeDiagnosis t={t} />
        </div>
      </section>

      {/* Cases de Sucesso Reais */}
      <section id="cases" className="py-8 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-6 md:mb-12">
            <h2 className="font-display text-xl md:text-3xl font-bold text-slate-100 mb-2 md:mb-4">{t("real_cases_title")}</h2>
            <p className="text-slate-400 text-xs md:text-base">{t("real_cases_subtitle")}</p>
          </div>
          <RealSuccessCases t={t} />
        </div>
      </section>

      {/* Equipe */}
      <section className="py-8 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-6 md:mb-12">
            <h2 className="font-display text-xl md:text-3xl font-bold text-slate-100 mb-2 md:mb-4">{t("team_title")}</h2>
            <p className="text-slate-400 text-xs md:text-base">Profissionais especializados em marketing</p>
          </div>
          <CreativeTeam />
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-8 md:py-16 bg-gradient-to-b from-slate-900/50 to-slate-950">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className="p-4 md:p-6 lg:p-8 rounded-2xl bg-gradient-to-br from-violet-500/10 to-transparent border border-violet-500/20 hover:border-violet-500/40 transition-all duration-300 hover:-translate-y-1">
              <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl bg-violet-500/20 flex items-center justify-center mb-4 md:mb-6">
                <Target className="w-5 h-5 md:w-7 md:h-7 text-violet-400" />
              </div>
              <h3 className="font-display text-lg md:text-xl font-bold text-slate-100 mb-2 md:mb-3">{t("feature_1")}</h3>
              <p className="text-slate-400 text-sm md:text-base">{t("feature_1_desc")}</p>
            </div>

            <div className="p-4 md:p-6 lg:p-8 rounded-2xl bg-gradient-to-br from-amber-500/10 to-transparent border border-amber-500/20 hover:border-amber-500/40 transition-all duration-300 hover:-translate-y-1">
              <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl bg-amber-500/20 flex items-center justify-center mb-4 md:mb-6">
                <Users className="w-5 h-5 md:w-7 md:h-7 text-amber-400" />
              </div>
              <h3 className="font-display text-lg md:text-xl font-bold text-slate-100 mb-2 md:mb-3">{t("feature_2")}</h3>
              <p className="text-slate-400 text-sm md:text-base">{t("feature_2_desc")}</p>
            </div>

            <div className="p-4 md:p-6 lg:p-8 rounded-2xl bg-gradient-to-br from-violet-500/10 to-transparent border border-violet-500/20 hover:border-violet-500/40 transition-all duration-300 hover:-translate-y-1">
              <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl bg-violet-500/20 flex items-center justify-center mb-4 md:mb-6">
                <Palette className="w-5 h-5 md:w-7 md:h-7 text-violet-400" />
              </div>
              <h3 className="font-display text-lg md:text-xl font-bold text-slate-100 mb-2 md:mb-3">{t("feature_3")}</h3>
              <p className="text-slate-400 text-sm md:text-base">{t("feature_3_desc")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-6 md:py-10 mt-8 md:mt-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-5">
            <p className="text-xs md:text-sm text-slate-500">{common("footer")}</p>
            <div className="flex items-center gap-2 md:gap-3">
              <a href="#" className="p-1.5 md:p-2 rounded-lg border border-slate-800 hover:border-fuchsia-500/50 transition-colors text-slate-400 hover:text-fuchsia-400">
                <Linkedin className="w-4 h-4 md:w-5 md:h-5" />
              </a>
              <a href="#" className="p-1.5 md:p-2 rounded-lg border border-slate-800 hover:border-fuchsia-500/50 transition-colors text-slate-400 hover:text-fuchsia-400">
                <Github className="w-4 h-4 md:w-5 md:h-5" />
              </a>
              <a href="#" className="p-1.5 md:p-2 rounded-lg border border-slate-800 hover:border-fuchsia-500/50 transition-colors text-slate-400 hover:text-fuchsia-400">
                <Mail className="w-4 h-4 md:w-5 md:h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}