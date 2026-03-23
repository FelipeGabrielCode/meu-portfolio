"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { 
  ArrowLeft, Scale, Shield, FileCheck, Users, BookOpen, ChevronRight, Award,
  Briefcase, Building2, Calculator, Home, Car, ArrowRight, Linkedin, Github, Mail,
  Gavel, FileText, Calendar, Clock, CheckCircle2, Phone, X, Star,
  TrendingUp, UserCircle, PhoneCall, MapPin, FileSearch, Scale as ScaleIcon,
  Building, ScrollText, HandshakeIcon, ArrowUpRight, Clock3, CheckCircle,
  Target, Zap, Trophy, Eye, BarChart3
} from "lucide-react";
import { useState, useEffect } from "react";
import RatingModal from "@/components/RatingModal";

// Componente de Avaliação com Estrelas
function StarRating({ rating, size = "md" }: { rating: number; size?: "sm" | "md" | "lg" }) {
  const sizeClasses = { sm: "w-4 h-4", md: "w-6 h-6", lg: "w-8 h-8" };
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star key={star} className={`${sizeClasses[size]} ${star <= rating ? "fill-amber-400 text-amber-400" : "fill-slate-700 text-slate-600"}`} />
      ))}
    </div>
  );
}

// Badges de Certificação
function CertificationBadges() {
  const badges = [
    { icon: Shield, name: "OAB Ativa", desc: "Advogados registrados", color: "text-blue-400", bg: "bg-blue-500/20" },
    { icon: FileCheck, name: "LGPD", desc: "Compliance total", color: "text-emerald-400", bg: "bg-emerald-500/20" },
    { icon: Award, name: "99% Sucesso", desc: "Taxa de vitórias", color: "text-amber-400", bg: "bg-amber-500/20" },
    { icon: TrendingUp, name: "15 Anos", desc: "Experiência", color: "text-purple-400", bg: "bg-purple-500/20" },
  ];
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
      {badges.map((b) => (
        <div key={b.name} className="p-3 md:p-4 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-slate-600 transition-all hover:-translate-y-1 text-center">
          <div className={`w-10 h-10 md:w-12 md:h-12 mx-auto rounded-lg ${b.bg} flex items-center justify-center mb-2`}>
            <b.icon className={`w-5 h-5 md:w-6 md:h-6 ${b.color}`} />
          </div>
          <p className="font-semibold text-slate-200 text-xs md:text-sm">{b.name}</p>
          <p className="text-[10px] md:text-xs text-slate-500">{b.desc}</p>
        </div>
      ))}
    </div>
  );
}

// Áreas de Atuação Interativas
function PracticeAreas() {
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  
  const areas = [
    { icon: Briefcase, name: "Empresarial", desc: "Contratos, M&A, societário", color: "blue", cases: 127 },
    { icon: Users, name: "Trabalhista", desc: "Reclamações, defesas, acordos", color: "emerald", cases: 89 },
    { icon: Home, name: "Civil", desc: "Família, sucessões, imobiliário", color: "purple", cases: 156 },
    { icon: Calculator, name: "Tributário", desc: "Planejamento fiscal, defesas", color: "amber", cases: 64 },
    { icon: Building2, name: "Imobiliário", desc: "Incorporação, regularização", color: "cyan", cases: 43 },
    { icon: Car, name: "Consumidor", desc: "Reclamações, indenizações", color: "rose", cases: 78 },
  ];
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
      {areas.map((a) => (
        <div 
          key={a.name}
          onClick={() => setSelectedArea(selectedArea === a.name ? null : a.name)}
          className={`p-4 rounded-xl bg-slate-800/50 border cursor-pointer transition-all hover:-translate-y-1 ${selectedArea === a.name ? 'border-blue-500/50 bg-blue-500/10' : 'border-slate-700 hover:border-slate-600'}`}
        >
          <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center mb-3">
            <a.icon className="w-5 h-5 text-blue-400" />
          </div>
          <h4 className="font-semibold text-slate-100 text-sm md:text-base mb-1">{a.name}</h4>
          <p className="text-xs text-slate-500 mb-2">{a.desc}</p>
          <div className="flex items-center gap-1 text-xs text-blue-400">
            <TrendingUp className="w-3 h-3" /><span>{a.cases} casos</span>
          </div>
        </div>
      ))}
    </div>
  );
}

// Consultoria Jurídica Completa
function LegalConsultingSystem({ t }: { t: (key: string, params?: Record<string, string | number>) => string }) {
  const [step, setStep] = useState(1);
  const [area, setArea] = useState("");
  const [causa, setCausa] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [userData, setUserData] = useState({ name: "", phone: "", email: "" });

  const areas = [
    { name: "Direito Empresarial", icon: Briefcase, causas: ["Contrato Social", "Fusão/Aquisição", "Contratos Comerciais", "Recuperação Judicial"] },
    { name: "Direito Trabalhista", icon: Users, causas: ["Reclamação Trabalhista", "Defesa em Processo", "Acordo Extrajudicial", "Assédio Moral"] },
    { name: "Direito Civil", icon: Home, causas: ["Divórcio", "Inventário", "Usucapião", "Indenização"] },
    { name: "Direito Tributário", icon: Calculator, causas: ["Planejamento Tributário", "Defesa em Autuação", "Recuperação de Crédito"] },
    { name: "Direito Imobiliário", icon: Building2, causas: ["Incorporação", "Regularização", "Usucapião", "Contratos de Locação"] },
    { name: "Direito de Família", icon: Users, causas: ["Guarda Compartilhada", "Pensão Alimentícia", "Investigação de Paternidade", "Partilha de Bens"] },
  ];

  const dates = ["Seg, 20 Jan", "Ter, 21 Jan", "Qua, 22 Jan", "Qui, 23 Jan", "Sex, 24 Jan"];
  const times = ["09:00", "10:30", "14:00", "15:30", "17:00"];

  const handleTimeSelection = (time: string) => {
    setTime(time);
    setShowConfirmation(true);
  };

  const resetConsulting = () => {
    setStep(1);
    setArea("");
    setCausa("");
    setDate("");
    setTime("");
    setShowConfirmation(false);
    setUserData({ name: "", phone: "", email: "" });
  };

  if (showConfirmation) {
    return (
      <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-sky-600/30 to-slate-600/20 border border-sky-500/50 animate-in fade-in zoom-in duration-300">
        <div className="text-center">
          <div className="w-16 h-16 md:w-20 md:h-20 mx-auto rounded-full bg-sky-500/20 flex items-center justify-center mb-4 animate-bounce">
            <CheckCircle className="w-8 h-8 md:w-10 md:h-10 text-sky-400" />
          </div>
          
          <h3 className="text-xl md:text-2xl font-bold text-white mb-3 flex items-center justify-center gap-2 flex-wrap">
            <Trophy className="w-5 h-5 md:w-6 md:h-6 text-amber-400" />
            <span>{t("consulting_booked_successfully")}</span>
            <Trophy className="w-5 h-5 md:w-6 md:h-6 text-amber-400" />
          </h3>
          
          <div className="bg-slate-900/50 rounded-xl p-3 md:p-4 mb-4 border border-sky-500/30 text-left">
            <p className="text-base md:text-lg text-slate-200 mb-2">
              <span className="font-bold text-sky-400">{area}</span>
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 text-slate-300 text-sm">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4 md:w-5 md:h-5 text-sky-400 flex-shrink-0" />
                {date}
              </span>
              <span className="flex items-center gap-2">
                <Clock3 className="w-4 h-4 md:w-5 md:h-5 text-sky-400 flex-shrink-0" />
                {time}
              </span>
            </div>
          </div>
          
          <p className="text-xs md:text-sm text-slate-400 mb-4">
            {t("consulting_whatsapp_confirmation")}
          </p>
          
          <div className="flex items-center justify-center gap-2 text-xs text-slate-500 mb-4">
            <MapPin className="w-4 h-4 flex-shrink-0" />
            <span>{t("main_unit_address")}</span>
          </div>
          
          <button 
            onClick={resetConsulting}
            className="w-full sm:w-auto px-4 md:px-6 py-2 rounded-xl bg-sky-500 text-white font-semibold hover:bg-sky-600 transition-colors text-sm"
          >
            {t("book_new_consulting")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 rounded-2xl bg-gradient-to-br from-slate-900/30 to-sky-900/20 border border-sky-500/30">
      <div className="flex items-center gap-2 md:gap-4 mb-4 md:mb-6 text-xs md:text-sm overflow-x-auto pb-2">
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center font-bold ${step >= 1 ? "bg-sky-500 text-white" : "bg-slate-800 text-slate-400"}`}>1</div>
          <span className="text-slate-300 hidden sm:inline">{t("area")}</span>
        </div>
        <div className="h-px w-4 md:w-8 bg-slate-800 flex-shrink-0" />
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center font-bold ${step >= 2 ? "bg-sky-500 text-white" : "bg-slate-800 text-slate-400"}`}>2</div>
          <span className="text-slate-300 hidden sm:inline">{t("case")}</span>
        </div>
        <div className="h-px w-4 md:w-8 bg-slate-800 flex-shrink-0" />
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center font-bold ${step >= 3 ? "bg-sky-500 text-white" : "bg-slate-800 text-slate-400"}`}>3</div>
          <span className="text-slate-300 hidden sm:inline">{t("date")}</span>
        </div>
        <div className="h-px w-4 md:w-8 bg-slate-800 flex-shrink-0" />
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center font-bold ${step >= 4 ? "bg-sky-500 text-white" : "bg-slate-800 text-slate-400"}`}>4</div>
          <span className="text-slate-300 hidden sm:inline">{t("time")}</span>
        </div>
      </div>
      
      {step === 1 && (
        <div className="space-y-3">
          <p className="text-slate-400 text-sm">{t("select_area")}:</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {areas.map((a) => (
              <button
                key={a.name}
                onClick={() => { setArea(a.name); setStep(2); }}
                className={`p-2 md:p-3 rounded-xl text-xs md:text-sm font-medium transition-all ${area === a.name ? "bg-sky-500 text-white" : "bg-slate-800 text-slate-300 hover:bg-slate-700"}`}
              >
                <a.icon className="w-4 h-4 inline mr-1" />
                {a.name.split(' ')[1] || a.name}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {step === 2 && (
        <div className="space-y-3">
          <p className="text-slate-400 text-sm">{t("select_case_for", { area: area.split(' ')[1] || area })}:</p>
          <div className="space-y-2">
            {areas.find(a => a.name === area)?.causas.map((c) => (
              <button
                key={c}
                onClick={() => { setCausa(c); setStep(3); }}
                className={`w-full text-left p-2 md:p-3 rounded-xl text-xs md:text-sm font-medium transition-all ${causa === c ? "bg-sky-500 text-white" : "bg-slate-800 text-slate-300 hover:bg-slate-700"}`}
              >
                <Gavel className="w-4 h-4 inline mr-2" />
                {c}
              </button>
            ))}
          </div>
          <button onClick={() => setStep(1)} className="text-xs md:text-sm text-slate-500 hover:text-slate-300">← {t("back")}</button>
        </div>
      )}
      
      {step === 3 && (
        <div className="space-y-3">
          <p className="text-slate-400 text-sm">{t("select_date_for", { area: area.split(' ')[1] || area })}:</p>
          <div className="grid grid-cols-2 gap-2">
            {dates.map((d) => (
              <button
                key={d}
                onClick={() => { setDate(d); setStep(4); }}
                className={`p-2 md:p-3 rounded-xl text-xs md:text-sm font-medium transition-all ${date === d ? "bg-sky-500 text-white" : "bg-slate-800 text-slate-300 hover:bg-slate-700"}`}
              >
                <Calendar className="w-4 h-4 inline mr-1" />
                {d}
              </button>
            ))}
          </div>
          <button onClick={() => setStep(2)} className="text-xs md:text-sm text-slate-500 hover:text-slate-300">← {t("back")}</button>
        </div>
      )}
      
      {step === 4 && (
        <div className="space-y-3">
          <p className="text-slate-400 text-sm">{t("times_for", { date: date })}:</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {times.map((t) => (
              <button
                key={t}
                onClick={() => handleTimeSelection(t)}
                className="p-2 md:p-3 rounded-xl text-xs md:text-sm font-medium bg-slate-800 text-slate-300 hover:bg-sky-500 hover:text-white transition-all"
              >
                <Clock className="w-4 h-4 inline mr-1" />
                {t}
              </button>
            ))}
          </div>
          <button onClick={() => setStep(3)} className="text-xs md:text-sm text-slate-500 hover:text-slate-300">← {t("back")}</button>
        </div>
      )}
    </div>
  );
}

// Componente Principal
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
      <RatingModal
        isOpen={isRatingOpen}
        onClose={() => setIsRatingOpen(false)}
        demoName="Escritório de Advocacia"
      />

      {/* Botão Voltar */}
      <div className="fixed top-20 md:top-24 left-3 md:left-6 z-50">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-1.5 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full glass border border-sky-500/30 text-xs md:text-sm font-semibold text-sky-400 hover:bg-sky-500/10 transition-all"
        >
          <ArrowLeft className="w-3 h-3 md:w-4 md:h-4" />
          {common("backToPortfolio")}
        </Link>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden pt-20 md:pt-32 pb-10 md:pb-16">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-24 left-1/2 w-[30rem] md:w-[58rem] h-[30rem] md:h-[58rem] -translate-x-1/2 rounded-full bg-gradient-to-tr from-sky-500/20 via-slate-500/10 to-transparent blur-3xl" />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl">
            <span className="inline-flex items-center gap-1.5 md:gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-2.5 py-1 md:px-4 md:py-2 mb-3 md:mb-6 text-xs md:text-sm font-semibold text-sky-400">
              <Scale className="w-3 h-3 md:w-4 md:h-4" />
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
                href="#consultoria" 
                className="inline-flex items-center justify-center gap-1.5 md:gap-2 rounded-xl bg-sky-500 text-white font-semibold px-3 py-2 md:px-6 md:py-3 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-sky-500/25 text-xs md:text-base"
              >
                {t("cta_primary")}
                <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
              </Link>
              <Link 
                href="#areas" 
                className="inline-flex items-center justify-center gap-1.5 md:gap-2 rounded-xl border border-slate-700 bg-slate-800/50 px-3 py-2 md:px-6 md:py-3 font-semibold text-slate-300 transition-all hover:-translate-y-0.5 hover:border-slate-600 text-xs md:text-base"
              >
                {t("cta_secondary")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Badges de Certificação */}
      <section id="badges" className="py-8 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-6 md:mb-12">
            <h2 className="font-display text-xl md:text-3xl font-bold text-slate-100 mb-2 md:mb-4">{t("badges_title")}</h2>
            <p className="text-slate-400 text-xs md:text-base">Credenciais que garantem sua segurança</p>
          </div>
          <CertificationBadges />
        </div>
      </section>

      {/* Áreas de Atuação */}
      <section id="areas" className="py-8 md:py-16 bg-gradient-to-b from-slate-900/50 to-slate-950">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-6 md:mb-12">
            <h2 className="font-display text-xl md:text-3xl font-bold text-slate-100 mb-2 md:mb-4">{t("areas_title")}</h2>
            <p className="text-slate-400 text-xs md:text-base">Atuação especializada em diversas áreas do direito</p>
          </div>
          <PracticeAreas />
        </div>
      </section>

      {/* Consultoria Jurídica */}
      <section id="consultoria" className="py-8 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-6 md:mb-12">
            <h2 className="font-display text-xl md:text-3xl font-bold text-slate-100 mb-2 md:mb-4">{t("booking_title")}</h2>
            <p className="text-slate-400 text-xs md:text-base">{t("booking_desc")}</p>
          </div>
          <LegalConsultingSystem t={t} />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-6 md:py-10 mt-8 md:mt-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-5">
            <p className="text-xs md:text-sm text-slate-500">{common("footer")}</p>
            <div className="flex items-center gap-2 md:gap-3">
              <a href="#" className="p-2 rounded-lg border border-slate-800 hover:border-sky-500/50 transition-colors text-slate-400 hover:text-sky-400"><Linkedin className="w-5 h-5" /></a>
              <a href="#" className="p-2 rounded-lg border border-slate-800 hover:border-sky-500/50 transition-colors text-slate-400 hover:text-sky-400"><Github className="w-5 h-5" /></a>
              <a href="#" className="p-2 rounded-lg border border-slate-800 hover:border-sky-500/50 transition-colors text-slate-400 hover:text-sky-400"><Mail className="w-5 h-5" /></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}