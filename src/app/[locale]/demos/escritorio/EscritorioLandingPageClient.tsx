"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { 
  ArrowLeft, Scale, Shield, FileCheck, Users, BookOpen, ChevronRight, Award,
  Briefcase, Building2, Calculator, Home, Car, ArrowRight, Linkedin, Github, Mail,
  Gavel, FileText, Calendar, Clock, CheckCircle2, Phone, X, Star,
  TrendingUp, UserCircle, PhoneCall, MapPin, FileSearch, Scale as ScaleIcon,
  Building, ScrollText, HandshakeIcon, ArrowUpRight, Clock3
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

// Agendamento Jurídico Completo
function LegalBookingSystem() {
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
  ];

  const dates = ["Seg, 20 Jan", "Ter, 21 Jan", "Qua, 22 Jan", "Qui, 23 Jan"];
  const times = ["09:00", "10:30", "14:00", "15:30", "17:00"];

  const handleConfirm = () => {
    if (step === 4 && userData.name && userData.phone) {
      setShowConfirmation(true);
    }
  };

  const reset = () => {
    setStep(1); setArea(""); setCausa(""); setDate(""); setTime("");
    setUserData({ name: "", phone: "", email: "" });
    setShowConfirmation(false);
  };

  if (showConfirmation) {
    return (
      <div className="p-4 md:p-6 rounded-2xl bg-gradient-to-br from-blue-600/30 to-slate-900/50 border border-blue-500/50 text-center animate-in fade-in zoom-in">
        <div className="w-16 h-16 md:w-20 md:h-20 mx-auto rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
          <CheckCircle2 className="w-8 h-8 md:w-10 md:h-10 text-blue-400" />
        </div>
        <h3 className="text-lg md:text-xl font-bold text-white mb-2">Consulta Agendada!</h3>
        <div className="bg-slate-900/50 rounded-lg p-3 md:p-4 mb-4 text-left text-sm">
          <p className="text-slate-300 mb-1"><span className="font-semibold text-blue-400">Cliente:</span> {userData.name}</p>
          <p className="text-slate-300 mb-1"><span className="font-semibold text-blue-400">Área:</span> {area}</p>
          <p className="text-slate-300 mb-1"><span className="font-semibold text-blue-400">Causa:</span> {causa}</p>
          <p className="text-slate-300"><span className="font-semibold text-blue-400">Data:</span> {date} às {time}</p>
        </div>
        <p className="text-xs md:text-sm text-slate-400 mb-4">Você receberá um SMS de confirmação em instantes.</p>
        <button onClick={reset} className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm md:text-base">Novo Agendamento</button>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 rounded-2xl bg-slate-800/50 border border-slate-700">
      <div className="flex items-center gap-1 md:gap-2 mb-4 md:mb-6 text-xs md:text-sm overflow-x-auto">
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className="flex items-center gap-1 md:gap-2 flex-shrink-0">
            <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center font-bold text-xs md:text-sm ${step >= s ? "bg-blue-500 text-white" : "bg-slate-700 text-slate-500"}`}>{s}</div>
            {s < 4 && <div className="w-4 md:w-8 h-px bg-slate-700" />}
          </div>
        ))}
      </div>

      {step === 1 && (
        <div className="space-y-2 md:space-y-3">
          <p className="text-slate-400 text-sm">Selecione a área:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {areas.map((a) => (
              <button key={a.name} onClick={() => { setArea(a.name); setStep(2); }} className={`p-3 rounded-lg text-left text-sm transition-all ${area === a.name ? "bg-blue-500 text-white" : "bg-slate-700 text-slate-300 hover:bg-slate-600"}`}>
                <a.icon className="w-4 h-4 inline mr-2" />{a.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-2 md:space-y-3">
          <p className="text-slate-400 text-sm">Tipo de causa:</p>
          <div className="space-y-2">
            {areas.find(a => a.name === area)?.causas.map((c) => (
              <button key={c} onClick={() => { setCausa(c); setStep(3); }} className={`w-full p-3 rounded-lg text-left text-sm transition-all ${causa === c ? "bg-blue-500 text-white" : "bg-slate-700 text-slate-300 hover:bg-slate-600"}`}>
                <FileText className="w-4 h-4 inline mr-2" />{c}
              </button>
            ))}
          </div>
          <button onClick={() => setStep(1)} className="text-xs md:text-sm text-slate-500 hover:text-slate-300">← Voltar</button>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-2 md:space-y-3">
          <p className="text-slate-400 text-sm">Escolha a data:</p>
          <div className="grid grid-cols-2 gap-2">
            {dates.map((d) => (
              <button key={d} onClick={() => { setDate(d); setStep(4); }} className={`p-3 rounded-lg text-sm transition-all ${date === d ? "bg-blue-500 text-white" : "bg-slate-700 text-slate-300 hover:bg-slate-600"}`}>
                <Calendar className="w-4 h-4 inline mr-1" />{d}
              </button>
            ))}
          </div>
          <button onClick={() => setStep(2)} className="text-xs md:text-sm text-slate-500 hover:text-slate-300">← Voltar</button>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-3 md:space-y-4">
          <p className="text-slate-400 text-sm">Seus dados:</p>
          <input type="text" placeholder="Nome completo" value={userData.name} onChange={(e) => setUserData({...userData, name: e.target.value})} className="w-full px-3 py-2 rounded-lg bg-slate-700 border border-slate-600 text-slate-200 text-sm focus:border-blue-500 focus:outline-none" />
          <input type="tel" placeholder="Telefone" value={userData.phone} onChange={(e) => setUserData({...userData, phone: e.target.value})} className="w-full px-3 py-2 rounded-lg bg-slate-700 border border-slate-600 text-slate-200 text-sm focus:border-blue-500 focus:outline-none" />
          <input type="email" placeholder="Email (opcional)" value={userData.email} onChange={(e) => setUserData({...userData, email: e.target.value})} className="w-full px-3 py-2 rounded-lg bg-slate-700 border border-slate-600 text-slate-200 text-sm focus:border-blue-500 focus:outline-none" />
          <button onClick={handleConfirm} disabled={!userData.name || !userData.phone} className="w-full py-2 md:py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors disabled:bg-slate-700 disabled:text-slate-500 text-sm md:text-base">Confirmar Agendamento</button>
          <button onClick={() => setStep(3)} className="text-xs md:text-sm text-slate-500 hover:text-slate-300">← Voltar</button>
        </div>
      )}
    </div>
  );
}

// Depoimentos de Clientes
function ClientTestimonials() {
  const testimonials = [
    { name: "Carlos Silva", role: "CEO", company: "TechCorp", text: "Resolveram nossa fusão empresarial em tempo recorde. Excelente trabalho!", rating: 5 },
    { name: "Maria Santos", role: "Diretora RH", company: "Indústria XYZ", text: "Defenderam nossa empresa em uma reclamação trabalhista complexa.", rating: 5 },
    { name: "João Pereira", role: "Proprietário", company: "Imobiliária ABC", text: "Regularização de imóveis feita com maestria. Recomendo!", rating: 4 },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {testimonials.map((t, i) => (
        <div key={i} className="p-4 rounded-xl bg-slate-800/50 border border-slate-700">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
              <UserCircle className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="font-semibold text-slate-200 text-sm">{t.name}</p>
              <p className="text-xs text-slate-500">{t.role} - {t.company}</p>
            </div>
          </div>
          <StarRating rating={t.rating} size="sm" />
          <p className="text-slate-400 text-sm mt-3">&ldquo;{t.text}&rdquo;</p>
        </div>
      ))}
    </div>
  );
}

// Públicações Jurídicas
function LegalPublications() {
  const [expanded, setExpanded] = useState<number | null>(null);
  
  const articles = [
    { id: 1, title: "Reforma Tributária 2024: Impactos para Empresas", category: "Tributário", date: "15 Jan 2024", readTime: "5 min", summary: "Análise detalhada das mudanças na reforma tributária...", content: "A reforma tributária traz mudanças significativas para o cenário empresarial brasileiro. Neste artigo, analisamos os novos impostos sobre consumo, a unificação de tributos e as estratégias de adaptação." },
    { id: 2, title: "LGPD: Guia de Compliance para Pequenas Empresas", category: "Compliance", date: "10 Jan 2024", readTime: "4 min", summary: "Passos essenciais para adequação à LGPD...", content: "A LGPD afeta empresas de todos os tamanhos. Aprenda os passos essenciais para adequar sua empresa, desde a nomeação do DPO até políticas de privacidade." },
    { id: 3, title: "Contratos Digitais: Força Jurídica no Brasil", category: "Empresarial", date: "05 Jan 2024", readTime: "6 min", summary: "Validade e requisitos dos contratos eletrônicos...", content: "Com a digitalização, os contratos digitais ganharam destaque. Este artigo explora a validade jurídica, requisitos de assinatura digital e melhores práticas." },
  ];

  return (
    <div className="space-y-3">
      {articles.map((a) => (
        <div key={a.id} className="p-4 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-blue-500/50 transition-all cursor-pointer" onClick={() => setExpanded(expanded === a.id ? null : a.id)}>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <span className="inline-block px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 text-xs mb-2">{a.category}</span>
              <h4 className="font-semibold text-slate-200 text-sm md:text-base mb-1">{a.title}</h4>
              <p className="text-xs text-slate-500">{a.date} • {a.readTime}</p>
              {expanded === a.id && (
                <div className="mt-3 p-3 rounded-lg bg-slate-900/50 text-slate-400 text-sm animate-in fade-in">
                  {a.content}
                </div>
              )}
            </div>
            <ChevronRight className={`w-5 h-5 text-slate-600 transition-transform ${expanded === a.id ? "rotate-90" : ""}`} />
          </div>
        </div>
      ))}
    </div>
  );
}

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
      
      {/* Botão Voltar */}
      <div className="fixed top-20 md:top-24 left-3 md:left-6 z-50">
        <Link href="/#projects" className="inline-flex items-center gap-1.5 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full glass border border-sky-500/30 text-xs md:text-sm font-semibold text-sky-400 hover:bg-sky-500/10 transition-all">
          <ArrowLeft className="w-3 h-3 md:w-4 md:h-4" />{common("backToPortfolio")}
        </Link>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden pt-20 md:pt-32 pb-10 md:pb-16">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 left-1/2 w-[30rem] md:w-[58rem] h-[30rem] md:h-[58rem] -translate-x-1/2 rounded-full bg-gradient-to-tr from-sky-600/20 via-slate-500/15 to-transparent blur-3xl" />
          <div className="absolute top-20 right-0 w-[20rem] md:w-[34rem] h-[20rem] md:h-[34rem] opacity-50">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-600/10 to-transparent blur-3xl" />
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl">
            <span className="inline-flex items-center gap-1.5 md:gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-2.5 py-1 md:px-4 md:py-2 mb-3 md:mb-6 text-xs md:text-sm font-semibold text-sky-400">
              <Scale className="w-3 h-3 md:w-4 md:h-4" />{t("badge")}
            </span>
            
            <h1 className="font-display text-2xl md:text-5xl font-extrabold tracking-tight leading-tight mb-3 md:mb-6">{t("title")}</h1>
            <p className="text-sm md:text-lg text-slate-400 leading-relaxed mb-4 md:mb-8 max-w-2xl">{t("hero_desc")}</p>

            <div className="flex flex-col sm:flex-row gap-2 md:gap-4">
              <Link href="#agendamento" className="inline-flex items-center justify-center gap-1.5 md:gap-2 rounded-xl bg-sky-500 text-white font-semibold px-3 py-2 md:px-6 md:py-3 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-sky-500/25 text-xs md:text-base">
                {t("cta_primary")}<ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
              </Link>
              <Link href="#areas" className="inline-flex items-center justify-center gap-1.5 md:gap-2 rounded-xl border border-slate-700 bg-slate-800/50 px-3 py-2 md:px-6 md:py-3 font-semibold text-slate-300 transition-all hover:-translate-y-0.5 hover:border-slate-600 text-xs md:text-base">
                {t("cta_secondary")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Certificações */}
      <section className="py-8 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-6 md:mb-12">
            <h2 className="font-display text-xl md:text-3xl font-bold text-slate-100 mb-2 md:mb-4">{t("badges_title")}</h2>
            <p className="text-slate-400 text-xs md:text-base">Credibilidade garantida por certificações reconhecidas</p>
          </div>
          <CertificationBadges />
        </div>
      </section>

      {/* Áreas de Atuação */}
      <section id="areas" className="py-8 md:py-16 bg-slate-900/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-6 md:mb-12">
            <h2 className="font-display text-xl md:text-3xl font-bold text-slate-100 mb-2 md:mb-4">{t("areas_title")}</h2>
            <p className="text-slate-400 text-xs md:text-base">Atuação multidisciplinar para todas as suas necessidades jurídicas</p>
          </div>
          <PracticeAreas />
        </div>
      </section>

      {/* Agendamento + Depoimentos */}
      <section id="agendamento" className="py-8 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
            <div>
              <h2 className="font-display text-xl md:text-3xl font-bold text-slate-100 mb-2 md:mb-4">{t("booking_title")}</h2>
              <p className="text-slate-400 text-xs md:text-base mb-4 md:mb-6">{t("booking_desc")}</p>
              <LegalBookingSystem />
            </div>
            <div>
              <h2 className="font-display text-xl md:text-3xl font-bold text-slate-100 mb-2 md:mb-4">{t("testimonials_title")}</h2>
              <p className="text-slate-400 text-xs md:text-base mb-4 md:mb-6">{t("testimonials_subtitle")}</p>
              <ClientTestimonials />
            </div>
          </div>
        </div>
      </section>

      {/* Publicações */}
      <section className="py-8 md:py-16 bg-slate-900/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-6 md:mb-10">
              <h2 className="font-display text-xl md:text-3xl font-bold text-slate-100 mb-2 md:mb-3">Publicações Jurídicas</h2>
              <p className="text-slate-400 text-xs md:text-base">Conteúdo de qualidade para manter você informado</p>
            </div>
            <LegalPublications />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-6 md:py-10 mt-8 md:mt-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4">
            <p className="text-xs md:text-sm text-slate-500">{common("footer")}</p>
            <div className="flex items-center gap-2 md:gap-3">
              <a href="#" className="p-1.5 md:p-2 rounded-lg border border-slate-800 hover:border-sky-500/50 transition-colors text-slate-400 hover:text-sky-400"><Linkedin className="w-4 h-4 md:w-5 md:h-5" /></a>
              <a href="#" className="p-1.5 md:p-2 rounded-lg border border-slate-800 hover:border-sky-500/50 transition-colors text-slate-400 hover:text-sky-400"><Github className="w-4 h-4 md:w-5 md:h-5" /></a>
              <a href="#" className="p-1.5 md:p-2 rounded-lg border border-slate-800 hover:border-sky-500/50 transition-colors text-slate-400 hover:text-sky-400"><Mail className="w-4 h-4 md:w-5 md:h-5" /></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}