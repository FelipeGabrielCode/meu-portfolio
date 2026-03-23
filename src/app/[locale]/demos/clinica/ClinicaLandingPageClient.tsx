"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { 
  ArrowLeft, Stethoscope, Heart, Brain, Bone, Eye, Baby, Activity, Calendar,
  Star, Quote, Clock, MapPin, Phone, CheckCircle2, ChevronRight, Linkedin, Github, Mail,
  Sparkles, PartyPopper, CalendarCheck, Clock3, MapPinCheck, Users, FileText, Video, CreditCard,
  CalendarDays, MessageSquare, Shield, TrendingUp, UserCheck, Zap
} from "lucide-react";
import { useState, useEffect } from "react";
import RatingModal from "@/components/RatingModal";

// Componente de Tabs para Features
function FeatureTabs({ t }: { t: (key: string, params?: Record<string, string | number>) => string }) {
  const [activeTab, setActiveTab] = useState("schedule");
  
  // Gerar dados consistentes para evitar erro de hidratação
  const [calendarData, setCalendarData] = useState<{ 
    days: number[], 
    today: number, 
    appointments: boolean[],
    firstDay: number,
    daysInMonth: number
  } | null>(null);
  
  useEffect(() => {
    // Gerar dados do calendário apenas no cliente
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    // Criar array com os dias do mês atual
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const appointments = days.map(() => Math.random() > 0.7);
    
    setCalendarData({ 
      days, 
      today: today.getDate(), 
      appointments,
      firstDay,
      daysInMonth
    });
  }, []);
  
  const tabs = [
    { 
      id: "schedule", 
      icon: CalendarDays, 
      title: t("features.tabs.schedule.title"),
      subtitle: t("features.tabs.schedule.subtitle")
    },
    { 
      id: "records", 
      icon: FileText, 
      title: t("features.tabs.records.title"),
      subtitle: t("features.tabs.records.subtitle")
    },
    { 
      id: "telemedicine", 
      icon: Video, 
      title: t("features.tabs.telemedicine.title"),
      subtitle: t("features.tabs.telemedicine.subtitle")
    },
    { 
      id: "billing", 
      icon: CreditCard, 
      title: t("features.tabs.billing.title"),
      subtitle: t("features.tabs.billing.subtitle")
    }
  ];

  const getBenefits = (tabId: string) => {
    const benefitsKey = `features.tabs.${tabId}.benefits`;
    const benefits = t(benefitsKey);
    // Faz split da string por vírgula e remove espaços extras
    return benefits.split(',').map((benefit: string) => benefit.trim());
  };

  // Formatar data atual
  const formatDate = () => {
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    };
    return today.toLocaleDateString('pt-BR', options);
  };

  return (
    <div className="bg-slate-900/30 rounded-2xl border border-slate-800 p-6 md:p-8">
      {/* Navegação por Abas */}
      <div className="flex flex-wrap gap-2 mb-6 md:mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all text-sm ${
              activeTab === tab.id 
                ? "bg-teal-500 text-white shadow-lg shadow-teal-500/25" 
                : "bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span className="hidden sm:inline">{tab.title}</span>
          </button>
        ))}
      </div>

      {/* Conteúdo da Aba Ativa */}
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
                <CheckCircle2 className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-300 text-sm">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* UI Simulada */}
        <div className="bg-slate-950/50 rounded-xl border border-slate-800 p-4 md:p-6">
          {activeTab === "schedule" && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-4">
                <CalendarDays className="w-5 h-5 text-teal-400" />
                <h4 className="font-semibold text-slate-200">Agenda Semanal</h4>
                <span className="text-xs text-slate-500 ml-auto">{formatDate()}</span>
              </div>
              <div className="grid grid-cols-7 gap-1 text-xs">
                {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((day, i) => (
                  <div key={day} className="text-center text-slate-500 font-medium p-2">
                    {day}
                  </div>
                ))}
                {calendarData ? (
                  <>
                    {Array.from({ length: calendarData.firstDay }, (_, i) => (
                      <div key={`empty-${i}`} className="aspect-square"></div>
                    ))}
                    {calendarData.days.map((day, i) => {
                      const hasAppointment = calendarData.appointments[i];
                      const isToday = day === calendarData.today;
                      return (
                        <div
                          key={i}
                          className={`aspect-square flex items-center justify-center rounded text-xs font-medium
                            ${isToday ? "bg-teal-500 text-white font-bold ring-2 ring-teal-300" : 
                              hasAppointment ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : 
                              "text-slate-600"}
                          `}
                        >
                          {day}
                        </div>
                      );
                    })}
                  </>
                ) : (
                  Array.from({ length: 35 }, (_, i) => (
                    <div key={i} className="aspect-square flex items-center justify-center rounded text-xs font-medium bg-slate-800 animate-pulse" />
                  ))
                )}
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <div className="w-3 h-3 bg-emerald-500/20 border border-emerald-500/30 rounded"></div>
                <span>Com consultas</span>
                <div className="w-3 h-3 bg-teal-500 rounded ml-2"></div>
                <span>Hoje</span>
              </div>
            </div>
          )}

          {activeTab === "records" && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5 text-teal-400" />
                <h4 className="font-semibold text-slate-200">Prontuário do Paciente</h4>
              </div>
              <div className="space-y-2">
                <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-200">Consulta - Cardiologia</span>
                    <span className="text-xs text-slate-500">15/03/2024</span>
                  </div>
                  <p className="text-xs text-slate-400">Paciente apresenta pressão controlada...</p>
                </div>
                <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-200">Exame - Sangue</span>
                    <span className="text-xs text-slate-500">10/03/2024</span>
                  </div>
                  <p className="text-xs text-slate-400">Resultados dentro da normalidade...</p>
                </div>
                <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-200">Receita Digital</span>
                    <span className="text-xs text-slate-500">08/03/2024</span>
                  </div>
                  <p className="text-xs text-slate-400">Medicamentos prescritos...</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "telemedicine" && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-4">
                <Video className="w-5 h-5 text-teal-400" />
                <h4 className="font-semibold text-slate-200">Sala de Espera Virtual</h4>
              </div>
              <div className="bg-slate-800/50 rounded-lg border border-slate-700 p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-full flex items-center justify-center">
                    <UserCheck className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-200">Dr. Carlos Mendes</p>
                    <p className="text-xs text-slate-400">Cardiologista</p>
                  </div>
                </div>
                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3 text-center">
                  <p className="text-xs text-emerald-400 mb-2">Consulta em andamento</p>
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                    <span className="text-xs text-slate-300">12:45</span>
                  </div>
                </div>
                <button className="w-full mt-3 bg-teal-500 text-white rounded-lg py-2 text-xs font-medium hover:bg-teal-600 transition-colors">
                  Entrar na Chamada
                </button>
              </div>
            </div>
          )}

          {activeTab === "billing" && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-4">
                <CreditCard className="w-5 h-5 text-teal-400" />
                <h4 className="font-semibold text-slate-200">Fluxo de Caixa</h4>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="bg-slate-800/50 rounded-lg border border-slate-700 p-3">
                  <p className="text-xs text-slate-500 mb-1">Receita Hoje</p>
                  <p className="text-lg font-bold text-emerald-400">R$ 2.450</p>
                </div>
                <div className="bg-slate-800/50 rounded-lg border border-slate-700 p-3">
                  <p className="text-xs text-slate-500 mb-1">Pendentes</p>
                  <p className="text-lg font-bold text-amber-400">R$ 1.200</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-slate-800/30 rounded">
                  <span className="text-xs text-slate-400">Particular</span>
                  <span className="text-xs font-medium text-slate-300">R$ 450</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-slate-800/30 rounded">
                  <span className="text-xs text-slate-400">Unimed</span>
                  <span className="text-xs font-medium text-slate-300">R$ 1.200</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-slate-800/30 rounded">
                  <span className="text-xs text-slate-400">Amil</span>
                  <span className="text-xs font-medium text-slate-300">R$ 800</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Cards de Médicos com Avatares e CRMs
function DoctorsSection({ t }: { t: (key: string, params?: Record<string, string | number>) => string }) {
  const doctors = [
    {
      name: "Dr. Carlos Mendes",
      specialty: t("booking.specialties.cardiology"),
      crm: "CRM/SP 123456",
      avatar: "CM"
    },
    {
      name: "Dra. Ana Silva", 
      specialty: t("booking.specialties.ophthalmology"),
      crm: "CRM/SP 789012",
      avatar: "AS"
    },
    {
      name: "Dr. Roberto Costa",
      specialty: t("booking.specialties.orthopedics"),
      crm: "CRM/SP 345678", 
      avatar: "RC"
    },
    {
      name: "Dra. Maria Santos",
      specialty: t("booking.specialties.pediatrics"),
      crm: "CRM/SP 901234",
      avatar: "MS"
    }
  ];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {doctors.map((doctor, index: number) => (
        <div 
          key={index}
          className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-teal-500/50 transition-all duration-300 hover:scale-[1.02] group cursor-pointer text-left"
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-white font-bold text-lg mb-3 group-hover:scale-110 transition-transform">
              {doctor.avatar}
            </div>
            <h4 className="font-bold text-slate-100 mb-1">{doctor.name}</h4>
            <p className="text-sm text-teal-400 mb-2">{doctor.specialty}</p>
            <p className="text-xs text-slate-500 font-mono bg-slate-800/50 px-2 py-1 rounded">
              {doctor.crm}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

// Depoimentos Melhorados
function TestimonialsSection({ t }: { t: (key: string, params?: Record<string, string | number>) => string }) {
  const testimonials = [
    {
      name: t("testimonials.patient1"),
      text: t("testimonials.review1"),
      rating: 5,
      date: t("testimonials.date1"),
      avatar: "JP"
    },
    {
      name: t("testimonials.patient2"),
      text: t("testimonials.review2"),
      rating: 5,
      date: t("testimonials.date2"),
      avatar: "MF"
    },
    {
      name: t("testimonials.patient3"),
      text: t("testimonials.review3"),
      rating: 4,
      date: t("testimonials.date3"),
      avatar: "CA"
    }
  ];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {testimonials.map((testimonial, index: number) => (
        <div 
          key={index}
          className="p-6 rounded-2xl bg-gradient-to-br from-slate-900/80 to-slate-800/50 border border-slate-700/50 hover:border-teal-500/30 transition-all duration-300 text-left"
        >
          <div className="flex items-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-4 h-4 ${i < testimonial.rating ? "text-amber-400 fill-amber-400" : "text-slate-600"}`} 
              />
            ))}
          </div>
          <Quote className="w-8 h-8 text-teal-500/30 mb-3" />
          <p className="text-slate-300 text-sm mb-4 leading-relaxed">&ldquo;{testimonial.text}&rdquo;</p>
          <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-white font-semibold text-sm">
              {testimonial.avatar}
            </div>
            <div>
              <p className="font-semibold text-slate-200 text-sm">{testimonial.name}</p>
              <p className="text-xs text-slate-500">{testimonial.date}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Simulador de Agendamento Refatorado
function BookingSimulator({ t }: { t: (key: string, params?: Record<string, string | number>) => string }) {
  const [step, setStep] = useState(1);
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  const specialties = [
    { key: "cardiology", name: t("booking.specialties.cardiology") },
    { key: "neurology", name: t("booking.specialties.neurology") },
    { key: "orthopedics", name: t("booking.specialties.orthopedics") },
    { key: "ophthalmology", name: t("booking.specialties.ophthalmology") },
    { key: "pediatrics", name: t("booking.specialties.pediatrics") },
    { key: "general_practice", name: t("booking.specialties.general_practice") }
  ];
  
  const dates = [
    t("booking.dates.date1"),
    t("booking.dates.date2"),
    t("booking.dates.date3"),
    t("booking.dates.date4"),
    t("booking.dates.date5")
  ];
  
  const times = ["09:00", "10:30", "14:00", "15:30", "17:00"];
   
  const handleTimeSelection = (time: string) => {
    setSelectedTime(time);
    setShowConfirmation(true);
  };

  const resetBooking = () => {
    setStep(1);
    setSelectedSpecialty("");
    setSelectedDate("");
    setSelectedTime("");
    setShowConfirmation(false);
  };
  
  if (showConfirmation) {
    return (
      <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-teal-600/30 to-emerald-600/20 border border-teal-500/50 animate-in fade-in zoom-in duration-300">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto rounded-full bg-teal-500/20 flex items-center justify-center mb-4 animate-bounce">
            <PartyPopper className="w-10 h-10 text-teal-400" />
          </div>
          
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 flex items-center justify-center gap-2 flex-wrap">
            <Sparkles className="w-6 h-6 text-amber-400" />
            <span>{t("booking.booked_successfully")}</span>
            <Sparkles className="w-6 h-6 text-amber-400" />
          </h3>
          
          <div className="bg-slate-900/50 rounded-xl p-4 mb-4 border border-teal-500/30 text-left">
            <p className="text-lg text-slate-200 mb-2">
              <span className="font-bold text-teal-400">{selectedSpecialty}</span>
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-slate-300">
              <span className="flex items-center gap-2">
                <CalendarCheck className="w-5 h-5 text-teal-400 flex-shrink-0" />
                {selectedDate}
              </span>
              <span className="flex items-center gap-2">
                <Clock3 className="w-5 h-5 text-teal-400 flex-shrink-0" />
                {selectedTime}
              </span>
            </div>
          </div>
          
          <p className="text-sm text-slate-400 mb-4">
            {t("booking.whatsapp_confirmation")}
          </p>
          
          <div className="flex items-center justify-center gap-2 text-xs text-slate-500 mb-4">
            <MapPinCheck className="w-4 h-4 flex-shrink-0" />
            <span>{t("booking.main_unit_address")}</span>
          </div>
          
          <button 
            onClick={resetBooking}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-teal-500 text-white font-semibold hover:bg-teal-600 transition-colors"
          >
            {t("booking.book_new_appointment")}
          </button>
        </div>
      </div>
    );
  }
   
  return (
    <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-slate-700">
      <div className="flex items-center gap-4 mb-6 text-sm overflow-x-auto pb-2">
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step >= 1 ? "bg-teal-500 text-white" : "bg-slate-800 text-slate-400"}`}>1</div>
          <span className="text-slate-300 hidden sm:inline">{t("booking.specialty")}</span>
        </div>
        <div className="h-px w-8 bg-slate-800 flex-shrink-0" />
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step >= 2 ? "bg-teal-500 text-white" : "bg-slate-800 text-slate-400"}`}>2</div>
          <span className="text-slate-300 hidden sm:inline">{t("booking.date")}</span>
        </div>
        <div className="h-px w-8 bg-slate-800 flex-shrink-0" />
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step >= 3 ? "bg-teal-500 text-white" : "bg-slate-800 text-slate-400"}`}>3</div>
          <span className="text-slate-300 hidden sm:inline">{t("booking.time")}</span>
        </div>
      </div>
      
      {step === 1 && (
        <div className="space-y-4">
          <p className="text-slate-400 text-sm text-left">{t("booking.select_specialty")}:</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {specialties.map((s) => (
              <button
                key={s.key}
                onClick={() => { setSelectedSpecialty(s.name); setStep(2); }}
                className={`p-3 rounded-xl text-sm font-medium transition-all text-left ${
                  selectedSpecialty === s.name ? "bg-teal-500 text-white" : "bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700"
                }`}
              >
                {s.name}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {step === 2 && (
        <div className="space-y-4">
          <p className="text-slate-400 text-sm text-left">{t("booking.select_date_for", { specialty: selectedSpecialty })}:</p>
          <div className="grid grid-cols-2 gap-3">
            {dates.map((d) => (
              <button
                key={d}
                onClick={() => { setSelectedDate(d); setStep(3); }}
                className={`p-3 rounded-xl text-sm font-medium transition-all text-left ${
                  selectedDate === d ? "bg-teal-500 text-white" : "bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700"
                }`}
              >
                <Calendar className="w-4 h-4 inline mr-2" />
                {d}
              </button>
            ))}
          </div>
          <button onClick={() => setStep(1)} className="text-sm text-slate-500 hover:text-slate-300 text-left">← {t("booking.back")}</button>
        </div>
      )}
      
      {step === 3 && (
        <div className="space-y-4">
          <p className="text-slate-400 text-sm text-left">{t("booking.times_for", { date: selectedDate })}:</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {times.map((time) => (
              <button
                key={time}
                onClick={() => handleTimeSelection(time)}
                className="p-3 rounded-xl text-sm font-medium bg-slate-800 text-slate-300 hover:bg-teal-500 hover:text-white transition-all border border-slate-700"
              >
                <Clock className="w-4 h-4 inline mr-2" />
                {time}
              </button>
            ))}
          </div>
          <button onClick={() => setStep(2)} className="text-sm text-slate-500 hover:text-slate-300 text-left">← {t("booking.back")}</button>
        </div>
      )}
    </div>
  );
}

export default function ClinicaLandingPageClient() {
  const t = useTranslations("Demos.clinica");
  const common = useTranslations("Demos.common");
  const [isRatingOpen, setIsRatingOpen] = useState(false);
  const [hasShownRating, setHasShownRating] = useState(false);

  // Mostrar avaliação após 10 segundos, apenas uma vez
  useEffect(() => {
    if (!hasShownRating) {
      const timer = setTimeout(() => {
        setIsRatingOpen(true);
        setHasShownRating(true);
      }, 10000); // 10 segundos
      return () => clearTimeout(timer);
    }
  }, [hasShownRating]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <RatingModal
        isOpen={isRatingOpen}
        onClose={() => setIsRatingOpen(false)}
        demoName="Plataforma HealthTech Enterprise"
      />

      {/* Botão Voltar */}
      <div className="fixed top-20 md:top-24 left-3 md:left-6 z-50">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-teal-500/30 text-sm font-semibold text-teal-400 hover:bg-teal-500/10 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          {common("backToPortfolio")}
        </Link>
      </div>

      {/* Hero Section com Simulador Integrado */}
      <section className="relative overflow-hidden pt-20 md:pt-32 pb-16 md:pb-24">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-24 left-1/2 w-[58rem] h-[58rem] -translate-x-1/2 rounded-full bg-gradient-to-tr from-teal-500/20 via-emerald-500/10 to-transparent blur-3xl" />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-6xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-4 py-2 mb-6 text-sm font-semibold text-teal-400">
              <Stethoscope className="w-4 h-4" />
              {t("badge")}
            </span>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
              <div className="text-left">
                <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-6">
                  {t("title")}
                </h1>
                
                <p className="text-base md:text-lg text-slate-400 leading-relaxed mb-8">
                  {t("hero_desc")}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Link 
                    href="#features" 
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-500 text-white font-semibold px-6 py-3 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-teal-500/25"
                  >
                    {t("cta_primary")}
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                  <Link 
                    href="#doctors" 
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800/50 px-6 py-3 font-semibold text-slate-300 transition-all hover:-translate-y-0.5 hover:border-slate-600"
                  >
                    {t("cta_secondary")}
                  </Link>
                </div>

                {/* Stats Rápidos */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 rounded-xl bg-slate-900/50 border border-slate-800">
                    <div className="text-2xl font-bold text-teal-400 mb-1">40%</div>
                    <div className="text-xs text-slate-500">Redução de Faltas</div>
                  </div>
                  <div className="text-center p-3 rounded-xl bg-slate-900/50 border border-slate-800">
                    <div className="text-2xl font-bold text-emerald-400 mb-1">24/7</div>
                    <div className="text-xs text-slate-500">Agendamento</div>
                  </div>
                  <div className="text-center p-3 rounded-xl bg-slate-900/50 border border-slate-800">
                    <div className="text-2xl font-bold text-cyan-400 mb-1">100%</div>
                    <div className="text-xs text-slate-500">Digital</div>
                  </div>
                </div>
              </div>
              
              {/* Simulador no Hero */}
              <div className="lg:sticky lg:top-24">
                <div className="bg-slate-900/30 backdrop-blur-sm rounded-2xl border border-slate-800 p-6">
                  <h3 className="text-xl font-bold text-slate-100 mb-2 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-amber-400" />
                    {t("hero_booking.title")}
                  </h3>
                  <p className="text-sm text-slate-400 mb-6">{t("hero_booking.subtitle")}</p>
                  <BookingSimulator t={t} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features com Tabs */}
      <section id="features" className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="font-display text-2xl md:text-4xl font-bold text-slate-100 mb-4">{t("features.title")}</h2>
            <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto">{t("features.subtitle")}</p>
          </div>
          <FeatureTabs t={t} />
        </div>
      </section>

      {/* Médicos */}
      <section id="doctors" className="py-16 md:py-24 bg-gradient-to-b from-slate-900/50 to-slate-950">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="font-display text-2xl md:text-4xl font-bold text-slate-100 mb-4">{t("doctors.title")}</h2>
            <p className="text-slate-400 text-base md:text-lg">{t("doctors.subtitle")}</p>
          </div>
          <DoctorsSection t={t} />
        </div>
      </section>

      {/* Depoimentos */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="font-display text-2xl md:text-4xl font-bold text-slate-100 mb-4">{t("testimonials.title")}</h2>
            <p className="text-slate-400 text-base md:text-lg">{t("testimonials.subtitle")}</p>
          </div>
          <TestimonialsSection t={t} />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-10 mt-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-5">
            <p className="text-sm text-slate-500">{common("footer")}</p>
            <div className="flex items-center gap-3">
              <a href="#" className="p-2 rounded-lg border border-slate-800 hover:border-teal-500/50 transition-colors text-slate-400 hover:text-teal-400">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 rounded-lg border border-slate-800 hover:border-teal-500/50 transition-colors text-slate-400 hover:text-teal-400">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 rounded-lg border border-slate-800 hover:border-teal-500/50 transition-colors text-slate-400 hover:text-teal-400">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}