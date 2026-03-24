"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { 
  ArrowLeft, Scale, Shield, FileCheck, Users, BookOpen, ChevronRight, Award,
  Briefcase, Building2, Calculator, Home, Car, ArrowRight, Linkedin, Github, Mail,
  Gavel, FileText, Calendar, Clock, CheckCircle2, Phone, X, Star,
  TrendingUp, UserCircle, PhoneCall, MapPin, FileSearch, Scale as ScaleIcon,
  Building, ScrollText, HandshakeIcon, ArrowUpRight, Clock3, CheckCircle,
  Target, Zap, Trophy, Eye, BarChart3, Lock, Server, Fingerprint,
  Download, Share2, LayoutDashboard, Layers
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import RatingModal from "@/components/RatingModal";
import LegalTriageModal from "@/components/office/LegalTriageModal";

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

// ==========================================
// SISTEMA DE BOOKING JURÍDICO PREMIUM (3 PASSOS)
// ==========================================
function LegalBookingSystem({ t }: { t: (key: string, params?: Record<string, string | number>) => string }) {
  const [step, setStep] = useState(1);
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const specialties = [
    { id: "tax", icon: Calculator, color: "sky" },
    { id: "labor", icon: Users, color: "amber" },
    { id: "contracts", icon: FileText, color: "sky" },
    { id: "civil", icon: Home, color: "amber" },
    { id: "corporate", icon: Briefcase, color: "sky" },
    { id: "compliance", icon: Shield, color: "amber" },
  ];

  // Simula datas dinâmicas (próximos dias úteis)
  const getNextBusinessDays = () => {
    const days = [];
    const today = new Date();
    let count = 0;
    let added = 0;
    
    while (added < 5) {
      const date = new Date(today);
      date.setDate(today.getDate() + count);
      const dayOfWeek = date.getDay();
      
      // Skip weekends (0 = Sunday, 6 = Saturday)
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        days.push({ 
          day, 
          month, 
          full: date.toLocaleDateString('pt-BR', { weekday: 'short', day: 'numeric', month: 'short' }),
          isNext: added === 0 
        });
        added++;
      }
      count++;
    }
    return days;
  };

  const dates = getNextBusinessDays();
  const times = [
    { id: "morning", time: t("booking.time_morning"), period: "morning" },
    { id: "afternoon", time: t("booking.time_afternoon"), period: "afternoon" },
    { id: "late", time: t("booking.time_late"), period: "afternoon" },
  ];

  const handleNext = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setStep(step + 1);
      setIsAnimating(false);
    }, 300);
  };

  const handleBack = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setStep(step - 1);
      setIsAnimating(false);
    }, 300);
  };

  const handleConfirm = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsConfirmed(true);
      setIsAnimating(false);
    }, 500);
  };

  const handleReset = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setStep(1);
      setSelectedSpecialty("");
      setSelectedDate("");
      setSelectedTime("");
      setIsConfirmed(false);
      setIsAnimating(false);
    }, 300);
  };

  // Success screen
  if (isConfirmed) {
    return (
      <div className="p-8 md:p-12 rounded-2xl bg-gradient-to-br from-sky-600/20 via-slate-900/90 to-slate-800/50 border border-sky-500/30 backdrop-blur-sm">
        <div className="text-center">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-sky-500 to-sky-600 flex items-center justify-center mb-6 shadow-lg shadow-sky-500/30"
          >
            <CheckCircle className="w-10 h-10 text-white" />
          </motion.div>
          
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
            {t("booking.success_title")}
          </h3>
          
          <p className="text-sky-400 font-medium mb-2">
            {t("booking.success_message")}
          </p>
          
          <p className="text-slate-400 text-sm mb-6 max-w-md mx-auto">
            {t("booking.success_detail")}
          </p>
          
          <div className="bg-slate-900/50 rounded-xl p-4 mb-6 border border-slate-800 max-w-sm mx-auto">
            <div className="flex items-center justify-center gap-2 text-slate-300 mb-2">
              <Scale className="w-5 h-5 text-sky-400" />
              <span className="font-semibold">{t(`booking.specialty_${selectedSpecialty}`)}</span>
            </div>
            <div className="flex items-center justify-center gap-4 text-sm text-slate-400">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4 text-sky-400" />
                {selectedDate}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-sky-400" />
                {selectedTime}
              </span>
            </div>
          </div>
          
          <button 
            onClick={handleReset}
            className="px-6 py-3 rounded-xl bg-slate-800 text-white font-semibold hover:bg-slate-700 transition-colors border border-slate-700"
          >
            {t("booking.new_booking")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 rounded-2xl bg-slate-900/50 border border-slate-800 backdrop-blur-sm">
      {/* Stepper Header */}
      <div className="flex items-center justify-center gap-2 md:gap-4 mb-8">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`
              w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300
              ${step >= s 
                ? "bg-gradient-to-br from-sky-500 to-sky-600 text-white shadow-lg shadow-sky-500/20" 
                : "bg-slate-800 text-slate-500 border border-slate-700"
              }
              ${step === s ? "scale-110" : ""}
            `}>
              {step > s ? <CheckCircle className="w-5 h-5" /> : s}
            </div>
            {s < 3 && (
              <div className={`
                w-8 md:w-12 h-0.5 transition-all duration-300
                ${step > s ? "bg-sky-500" : "bg-slate-800"}
              `} />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className={`transition-all duration-300 ${isAnimating ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'}`}>
        {/* Step 1: Specialty Selection */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-white mb-1">{t("booking.step1_title")}</h3>
              <p className="text-slate-400 text-sm">{t("booking.step1_subtitle")}</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {specialties.map((spec) => (
                <button
                  key={spec.id}
                  onClick={() => setSelectedSpecialty(spec.id)}
                  className={`
                    p-4 rounded-xl border transition-all duration-200 text-left group
                    ${selectedSpecialty === spec.id 
                      ? "bg-sky-500/10 border-sky-500/50 shadow-lg shadow-sky-500/10" 
                      : "bg-slate-800/50 border-slate-800 hover:border-slate-700 hover:bg-slate-800"
                    }
                  `}
                >
                  <div className={`
                    w-10 h-10 rounded-lg flex items-center justify-center mb-3 transition-colors
                    ${selectedSpecialty === spec.id 
                      ? `bg-${spec.color}-500/20` 
                      : "bg-slate-700/50 group-hover:bg-slate-700"
                    }
                  `}>
                    <spec.icon className={`
                      w-5 h-5 transition-colors
                      ${selectedSpecialty === spec.id ? `text-${spec.color}-400` : "text-slate-400"}
                    `} />
                  </div>
                  <p className={`
                    text-sm font-medium transition-colors
                    ${selectedSpecialty === spec.id ? "text-white" : "text-slate-300"}
                  `}>
                    {t(`booking.specialty_${spec.id}`)}
                  </p>
                </button>
              ))}
            </div>

            <div className="flex justify-end">
              <button 
                onClick={handleNext}
                disabled={!selectedSpecialty}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-sky-600 text-white font-semibold hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {t("booking.back_button") === "Voltar" ? "Próximo" : "Next"}
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Date & Time Selection */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-white mb-1">{t("booking.step2_title")}</h3>
              <p className="text-slate-400 text-sm">{t("booking.step2_subtitle")}</p>
            </div>

            {/* Date Selection */}
            <div className="space-y-3">
              <p className="text-sm font-medium text-slate-300 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-sky-400" />
                {t("booking.next_available")}
              </p>
              <div className="flex flex-wrap gap-2">
                {dates.map((date) => (
                  <button
                    key={date.full}
                    onClick={() => setSelectedDate(`${date.day}/${date.month}`)}
                    className={`
                      px-4 py-3 rounded-xl border text-sm font-medium transition-all
                      ${selectedDate === `${date.day}/${date.month}`
                        ? "bg-sky-500 text-white border-sky-500 shadow-lg shadow-sky-500/20"
                        : "bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-600"
                      }
                    `}
                  >
                    <span className="block text-xs opacity-70">
                      {date.isNext ? (t("booking.back_button") === "Voltar" ? "Próximo" : "Next") : date.full.split(' ')[0]}
                    </span>
                    <span className="block font-bold">{date.day}/{date.month}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Time Selection */}
            <div className="space-y-3">
              <p className="text-sm font-medium text-slate-300 flex items-center gap-2">
                <Clock className="w-4 h-4 text-sky-400" />
                Horários Disponíveis
              </p>
              <div className="flex flex-wrap gap-2">
                {times.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTime(t.time)}
                    disabled={!selectedDate}
                    className={`
                      px-6 py-3 rounded-xl border text-sm font-medium transition-all
                      ${!selectedDate ? "opacity-50 cursor-not-allowed" : ""}
                      ${selectedTime === t.time
                        ? "bg-sky-500 text-white border-sky-500 shadow-lg shadow-sky-500/20"
                        : "bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-600"
                      }
                    `}
                  >
                    {t.time}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-between">
              <button 
                onClick={handleBack}
                className="px-6 py-3 rounded-xl border border-slate-700 text-slate-300 font-semibold hover:bg-slate-800 transition-colors flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                {t("booking.back_button")}
              </button>
              <button 
                onClick={handleNext}
                disabled={!selectedDate || !selectedTime}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-sky-600 text-white font-semibold hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {t("booking.back_button") === "Voltar" ? "Próximo" : "Next"}
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Confirmation */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-white mb-1">{t("booking.step3_title")}</h3>
              <p className="text-slate-400 text-sm">{t("booking.step3_subtitle")}</p>
            </div>

            {/* Summary Card */}
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
              <div className="flex items-center gap-4 mb-4 pb-4 border-b border-slate-700">
                <div className="w-12 h-12 rounded-lg bg-sky-500/20 flex items-center justify-center">
                  <Scale className="w-6 h-6 text-sky-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider">Especialidade</p>
                  <p className="text-lg font-semibold text-white">{t(`booking.specialty_${selectedSpecialty}`)}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-slate-700/50 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-sky-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Data</p>
                    <p className="text-sm font-medium text-slate-200">{selectedDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-slate-700/50 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-sky-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Horário</p>
                    <p className="text-sm font-medium text-slate-200">{selectedTime}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <button 
                onClick={handleBack}
                className="px-6 py-3 rounded-xl border border-slate-700 text-slate-300 font-semibold hover:bg-slate-800 transition-colors flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                {t("booking.back_button")}
              </button>
              <button 
                onClick={handleConfirm}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-sky-600 text-white font-semibold hover:opacity-90 transition-all shadow-lg shadow-sky-500/25 flex items-center gap-2"
              >
                <CheckCircle className="w-5 h-5" />
                {t("booking.confirm_button")}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// COMPONENTE: FEATURE TABS (4 ABAS)
// ==========================================
function FeatureTabs({ t }: { t: (key: string, params?: Record<string, string | number>) => string }) {
  const [activeTab, setActiveTab] = useState("processes");

  const tabs = [
    { id: "processes", icon: Gavel, title: t("tabs.processes.title"), subtitle: t("tabs.processes.subtitle") },
    { id: "contracts", icon: FileText, title: t("tabs.contracts.title"), subtitle: t("tabs.contracts.subtitle") },
    { id: "consulting", icon: Calendar, title: t("tabs.consulting.title"), subtitle: t("tabs.consulting.subtitle") },
    { id: "compliance", icon: Shield, title: t("tabs.compliance.title"), subtitle: t("tabs.compliance.subtitle") },
  ];

  const getBenefits = (tabId: string) => {
    const benefitsKey = `tabs.${tabId}.benefits`;
    const benefits = t(benefitsKey);
    return benefits.split(',').map((benefit: string) => benefit.trim());
  };

  const renderProcessesMock = () => (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-semibold text-slate-300">Processos Ativos</span>
        <span className="text-xs text-sky-400">42 processos</span>
      </div>
      
      {[
        { title: "Ação Trabalhista #2024-001", client: "João Silva", deadline: "Hoje", status: "urgent" },
        { title: "Contrato Empresarial", client: "TechCorp LTDA", deadline: "Amanhã", status: "warning" },
        { title: "Audiência Cível", client: "Maria Souza", deadline: "25/01", status: "normal" },
      ].map((proc, i) => (
        <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-slate-900/70 border border-slate-800">
          <div>
            <p className="text-sm text-slate-200">{proc.title}</p>
            <p className="text-xs text-slate-500">{proc.client}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-2 py-1 rounded text-xs font-medium ${
              proc.status === "urgent" ? "bg-red-500/20 text-red-400" :
              proc.status === "warning" ? "bg-amber-500/20 text-amber-400" :
              "bg-emerald-500/20 text-emerald-400"
            }`}>
              {proc.deadline}
            </span>
          </div>
        </div>
      ))}
      
      <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-red-400" />
          <span className="text-xs text-red-400 font-semibold">Prazo Crítico</span>
        </div>
        <p className="text-xs text-slate-400 mt-1">2 processos com prazo vencendo hoje</p>
      </div>
    </div>
  );

  const renderContractsMock = () => (
    <div className="space-y-4">
      <div className="p-4 rounded-lg bg-slate-900/70 border border-slate-800">
        <div className="flex items-start gap-3 mb-3">
          <FileText className="w-5 h-5 text-sky-400 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-200">Contrato de Prestação de Serviços</p>
            <p className="text-xs text-slate-500">Cliente: Empresa ABC LTDA</p>
          </div>
          <span className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-400 text-xs">Válido</span>
        </div>
        <div className="flex gap-2">
          <button className="flex-1 py-2 rounded-lg bg-sky-500 text-white text-xs font-medium hover:bg-sky-600 transition-colors">
            Assinar Digitalmente
          </button>
          <button className="p-2 rounded-lg border border-slate-700 text-slate-400 hover:border-sky-500/50">
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 rounded-lg bg-slate-900/50 border border-slate-800">
          <p className="text-xs text-slate-500 mb-1">Templates Disponíveis</p>
          <p className="text-lg font-bold text-slate-200 font-mono">24</p>
        </div>
        <div className="p-3 rounded-lg bg-slate-900/50 border border-slate-800">
          <p className="text-xs text-slate-500 mb-1">Contratos Este Mês</p>
          <p className="text-lg font-bold text-slate-200 font-mono">18</p>
        </div>
      </div>
    </div>
  );

  const renderConsultingMock = () => (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-semibold text-slate-300">Agenda da Semana</span>
        <span className="text-xs text-sky-400">3 consultorias hoje</span>
      </div>
      
      {[
        { time: "09:00", client: "Dr. Carlos Mendes", type: "Direito Empresarial", status: "confirmed" },
        { time: "14:30", client: "Sra. Ana Paula", type: "Direito de Família", status: "pending" },
        { time: "16:00", client: "TechCorp LTDA", type: "Contratos", status: "confirmed" },
      ].map((consult, i) => (
        <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-slate-900/70 border border-slate-800">
          <div className="text-center min-w-[60px]">
            <p className="text-sm font-bold text-sky-400 font-mono">{consult.time}</p>
          </div>
          <div className="flex-1">
            <p className="text-sm text-slate-200">{consult.client}</p>
            <p className="text-xs text-slate-500">{consult.type}</p>
          </div>
          <div className={`w-2 h-2 rounded-full ${consult.status === "confirmed" ? "bg-emerald-400" : "bg-amber-400"}`} />
        </div>
      ))}
    </div>
  );

  const renderComplianceMock = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span className="text-xs text-emerald-400 font-semibold">LGPD</span>
          </div>
          <p className="text-2xl font-bold text-emerald-400 font-mono">100%</p>
          <p className="text-xs text-slate-500">Conformidade</p>
        </div>
        <div className="p-4 rounded-lg bg-sky-500/10 border border-sky-500/30">
          <div className="flex items-center gap-2 mb-2">
            <Lock className="w-4 h-4 text-sky-400" />
            <span className="text-xs text-sky-400 font-semibold">Criptografia</span>
          </div>
          <p className="text-2xl font-bold text-sky-400 font-mono">AES-256</p>
          <p className="text-xs text-slate-500">Militar</p>
        </div>
      </div>
      
      <div className="p-4 rounded-lg bg-slate-900/70 border border-slate-800">
        <p className="text-xs font-semibold text-slate-400 mb-3">Controle de Acesso</p>
        <div className="space-y-2">
          {[
            { name: "Dr. Roberto", role: "Sócio", access: "Total" },
            { name: "Dra. Maria", role: "Advogada", access: "Limitado" },
            { name: "João", role: "Estagiário", access: "Leitura" },
          ].map((user, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b border-slate-800 last:border-0">
              <div className="flex items-center gap-2">
                <UserCircle className="w-4 h-4 text-slate-500" />
                <span className="text-sm text-slate-300">{user.name}</span>
                <span className="text-xs text-slate-500">({user.role})</span>
              </div>
              <span className="text-xs text-sky-400">{user.access}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderMockup = () => {
    switch (activeTab) {
      case "processes": return renderProcessesMock();
      case "contracts": return renderContractsMock();
      case "consulting": return renderConsultingMock();
      case "compliance": return renderComplianceMock();
      default: return renderProcessesMock();
    }
  };

  return (
    <div className="bg-slate-900/50 rounded-2xl border border-slate-800 p-6 md:p-8">
      <div className="flex flex-wrap gap-2 mb-6 md:mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all text-sm ${
              activeTab === tab.id 
                ? "bg-sky-500 text-white shadow-lg shadow-sky-500/25" 
                : "bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span className="hidden sm:inline">{tab.title}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        <div className="text-left">
          <h3 className="text-xl md:text-2xl font-bold text-slate-100 mb-2">
            {tabs.find(tab => tab.id === activeTab)?.title}
          </h3>
          <p className="text-slate-400 mb-4 text-sm md:text-base">
            {tabs.find(tab => tab.id === activeTab)?.subtitle}
          </p>
          
          <div className="space-y-3">
            {getBenefits(activeTab).map((benefit: string, index: number) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-sky-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-300 text-sm">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-950/70 rounded-xl border border-slate-800 p-4">
          {renderMockup()}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// COMPONENTE: SEÇÃO DE SEGURANÇA (TRUST)
// ==========================================
function TrustSection({ t }: { t: (key: string, params?: Record<string, string | number>) => string }) {
  const features = [
    { icon: Lock, title: t("trust.encryption"), desc: t("trust.encryption_desc") },
    { icon: Server, title: t("trust.backup"), desc: t("trust.backup_desc") },
    { icon: Shield, title: t("trust.lgpd"), desc: t("trust.lgpd_desc") },
    { icon: Award, title: t("trust.oab"), desc: t("trust.oab_desc") },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {features.map((f) => (
        <div key={f.title} className="p-5 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-amber-500/30 transition-all duration-300 text-center group">
          <div className="w-14 h-14 mx-auto rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-3 group-hover:bg-amber-500/20 transition-colors">
            <f.icon className="w-7 h-7 text-amber-400" />
          </div>
          <h4 className="font-semibold text-slate-100 text-sm mb-1">{f.title}</h4>
          <p className="text-xs text-slate-500">{f.desc}</p>
        </div>
      ))}
    </div>
  );
}

// ==========================================
// COMPONENTE: MODELOS DE ATUAÇÃO (Serviços Jurídicos)
// ==========================================
function ModelsSection({ t, onOpenTriage }: { 
  t: (key: string, params?: Record<string, string | number>) => string;
  onOpenTriage: () => void;
}) {
  const models = [
    { id: "card1", icon: FileText, color: "blue" },
    { id: "card2", icon: Scale, color: "amber", popular: true },
    { id: "card3", icon: Building2, color: "emerald" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {models.map((model) => (
        <div 
          key={model.id}
          className={`relative p-6 rounded-2xl border transition-all duration-300 ${
            model.popular 
              ? "bg-gradient-to-b from-amber-600/20 to-slate-900/90 border-amber-500/50 shadow-2xl shadow-amber-500/10 scale-105" 
              : "bg-slate-900/50 border-slate-800 hover:border-slate-700"
          }`}
        >
          {model.popular && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold">
                {t(`models.${model.id}.badge`)}
              </span>
            </div>
          )}

          <div className="text-center mb-6">
            <div className={`w-12 h-12 mx-auto rounded-xl bg-${model.color}-500/20 flex items-center justify-center mb-3`}>
              <model.icon className={`w-6 h-6 text-${model.color}-400`} />
            </div>
            <h3 className="text-lg font-bold text-white mb-1">{t(`models.${model.id}.title`)}</h3>
            <p className="text-sm text-slate-400">{t(`models.${model.id}.subtitle`)}</p>
          </div>

          <ul className="space-y-3 mb-6">
            {[0, 1, 2, 3].map((idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
                <span>{t(`models.${model.id}.features.${idx}`)}</span>
              </li>
            ))}
          </ul>

          <button 
            onClick={onOpenTriage}
            className={`w-full py-3 rounded-xl font-semibold transition-all ${
            model.popular 
              ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:opacity-90" 
              : "bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700"
          }`}>
            {t(`models.${model.id}.cta`)}
          </button>
        </div>
      ))}
    </div>
  );
}

// ==========================================
// PAIN POINTS BANNER
// ==========================================
function PainPointsBanner({ t }: { t: (key: string, params?: Record<string, string | number>) => string }) {
  const points = [
    { key: "pain_deadline", icon: Clock, color: "sky" },
    { key: "pain_security", icon: Shield, color: "amber" },
    { key: "pain_automation", icon: Zap, color: "sky" },
    { key: "pain_focus", icon: Target, color: "amber" },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-3 md:gap-6 py-6">
      {points.map((point) => (
        <div key={point.key} className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 border border-slate-800">
          <point.icon className={`w-4 h-4 text-${point.color}-400`} />
          <span className="text-sm text-slate-300 font-medium">{t(point.key)}</span>
        </div>
      ))}
    </div>
  );
}

// ==========================================
// COMPONENTE PRINCIPAL
// ==========================================
export default function EscritorioLandingPageClient() {
  const t = useTranslations("Demos.escritorio");
  const common = useTranslations("Demos.common");
  const [isRatingOpen, setIsRatingOpen] = useState(false);
  const [hasShownRating, setHasShownRating] = useState(false);
  const [isTriageOpen, setIsTriageOpen] = useState(false);
  const consultoriaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasShownRating) {
      const timer = setTimeout(() => {
        setIsRatingOpen(true);
        setHasShownRating(true);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [hasShownRating]);

  const scrollToConsultoria = () => {
    consultoriaRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <RatingModal
        isOpen={isRatingOpen}
        onClose={() => setIsRatingOpen(false)}
        demoName={t("demo_name")}
      />
      
      <LegalTriageModal
        isOpen={isTriageOpen}
        onClose={() => setIsTriageOpen(false)}
        t={t}
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
            
            <p className="text-sm md:text-lg text-slate-400 leading-relaxed mb-4 md:mb-6 max-w-2xl">
              {t("hero_desc")}
            </p>

            <PainPointsBanner t={t} />

            <div className="flex flex-col sm:flex-row gap-2 md:gap-4 mt-6">
              <button 
                onClick={scrollToConsultoria}
                className="inline-flex items-center justify-center gap-1.5 md:gap-2 rounded-xl bg-sky-500 text-white font-semibold px-3 py-2 md:px-6 md:py-3 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-sky-500/25 text-xs md:text-base"
              >
                {t("cta_primary")}
                <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
              </button>
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
            <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 mb-3 text-xs font-semibold text-sky-400">
              <Award className="w-3 h-3" />
              {t("badges_title")}
            </span>
            <h2 className="font-display text-xl md:text-3xl font-bold text-slate-100 mb-2 md:mb-4">{t("badges_title")}</h2>
            <p className="text-slate-400 text-xs md:text-base">{t("badges_subtitle")}</p>
          </div>
          <CertificationBadges />
        </div>
      </section>

      {/* Áreas de Atuação */}
      <section id="areas" className="py-8 md:py-16 bg-gradient-to-b from-slate-900/50 to-slate-950">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-6 md:mb-12">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 mb-3 text-xs font-semibold text-sky-400">
              <Briefcase className="w-3 h-3" />
              {t("interactive_demo")}
            </span>
            <h2 className="font-display text-xl md:text-3xl font-bold text-slate-100 mb-2 md:mb-4">{t("areas_title")}</h2>
            <p className="text-slate-400 text-xs md:text-base max-w-2xl mx-auto">{t("areas_subtitle")}</p>
          </div>
          <PracticeAreas />
        </div>
      </section>

      {/* Consultoria Jurídica */}
      <section id="consultoria" ref={consultoriaRef} className="py-8 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-6 md:mb-12">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 mb-3 text-xs font-semibold text-sky-400">
              <Calendar className="w-3 h-3" />
              {t("interactive_demo")}
            </span>
            <h2 className="font-display text-xl md:text-3xl font-bold text-slate-100 mb-2 md:mb-4">{t("booking_title")}</h2>
            <p className="text-slate-400 text-xs md:text-base max-w-2xl mx-auto">{t("booking_desc")}</p>
          </div>
          <LegalBookingSystem t={t} />
        </div>
      </section>

      {/* Feature Tabs */}
      <section id="features" className="py-8 md:py-16 bg-gradient-to-b from-slate-900/50 to-slate-950">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-6 md:mb-12">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 mb-3 text-xs font-semibold text-sky-400">
              <LayoutDashboard className="w-3 h-3" />
              {t("interactive_demo")}
            </span>
            <h2 className="font-display text-xl md:text-3xl font-bold text-slate-100 mb-2 md:mb-4">Dashboard Jurídico Enterprise</h2>
            <p className="text-slate-400 text-xs md:text-base max-w-2xl mx-auto">Explore os módulos do sistema e veja como seu escritório pode escalar com segurança</p>
          </div>
          <FeatureTabs t={t} />
        </div>
      </section>

      {/* Segurança e Confiança */}
      <section id="trust" className="py-8 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-6 md:mb-12">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 mb-3 text-xs font-semibold text-amber-400">
              <Shield className="w-3 h-3" />
              {t("roi_proven")}
            </span>
            <h2 className="font-display text-xl md:text-3xl font-bold text-slate-100 mb-2 md:mb-4">{t("trust.title")}</h2>
            <p className="text-slate-400 text-xs md:text-base max-w-2xl mx-auto">{t("trust.subtitle")}</p>
          </div>
          <TrustSection t={t} />
        </div>
      </section>

      {/* Modelos de Atuação */}
      <section id="models" className="py-8 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-6 md:mb-12">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 mb-3 text-xs font-semibold text-sky-400">
              <Layers className="w-3 h-3" />
              {t("models.badge")}
            </span>
            <h2 className="font-display text-xl md:text-3xl font-bold text-slate-100 mb-2 md:mb-4">{t("models.title")}</h2>
            <p className="text-slate-400 text-xs md:text-base max-w-2xl mx-auto">{t("models.subtitle")}</p>
          </div>
          <ModelsSection t={t} onOpenTriage={() => setIsTriageOpen(true)} />
        </div>
      </section>

      {/* CTA Final - Agendamento de Consultoria */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center p-8 md:p-12 rounded-3xl bg-gradient-to-br from-sky-600/20 via-slate-900/90 to-amber-500/10 border border-sky-500/30">
            <h2 className="font-display text-2xl md:text-4xl font-bold text-white mb-4">
              Agende sua Consultoria Sigilosa
            </h2>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto">
              Converse com nossos especialistas de forma 100% confidencial. Análise inicial gratuita do seu caso.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setIsTriageOpen(true)}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-amber-500 text-white font-bold px-8 py-4 transition-all hover:opacity-90 hover:shadow-lg hover:shadow-sky-500/25"
              >
                <Calendar className="w-5 h-5" />
                {t("modals.triage.submit")}
              </button>
              <button 
                onClick={() => setIsTriageOpen(true)}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800/50 px-8 py-4 font-semibold text-slate-300 transition-all hover:bg-slate-800"
              >
                <Phone className="w-5 h-5" />
                {t("talk_sales")}
              </button>
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