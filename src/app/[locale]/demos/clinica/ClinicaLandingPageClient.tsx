"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { 
  ArrowLeft, Stethoscope, Heart, Brain, Bone, Eye, Baby, Activity, Calendar,
  Star, Quote, Clock, MapPin, Phone, CheckCircle2, ChevronRight, Linkedin, Github, Mail,
  Sparkles, PartyPopper, CalendarCheck, Clock3, MapPinCheck
} from "lucide-react";
import { useState, useEffect } from "react";
import RatingModal from "@/components/RatingModal";

// Especialidades Médicas
function SpecialtiesGrid() {
  const specialties = [
    { icon: Heart, name: "Cardiologia", desc: "Cuidados completos para seu coração", color: "rose" },
    { icon: Brain, name: "Neurologia", desc: "Saúde cerebral e nervosa", color: "purple" },
    { icon: Bone, name: "Ortopedia", desc: "Tratamento de ossos e articulações", color: "blue" },
    { icon: Eye, name: "Oftalmologia", desc: "Cuidados com a visão", color: "cyan" },
    { icon: Baby, name: "Pediatria", desc: "Cuidado especializado para crianças", color: "amber" },
    { icon: Activity, name: "Clínica Geral", desc: "Atendimento integral à saúde", color: "emerald" },
  ];
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {specialties.map((spec) => (
        <div 
          key={spec.name} 
          className={`p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-${spec.color}-500/50 transition-all duration-300 hover:-translate-y-1 group cursor-pointer`}
        >
          <div className={`w-12 h-12 rounded-xl bg-${spec.color}-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
            <spec.icon className={`w-6 h-6 text-${spec.color}-400`} />
          </div>
          <h4 className="font-display font-bold text-slate-100 mb-2">{spec.name}</h4>
          <p className="text-sm text-slate-400">{spec.desc}</p>
        </div>
      ))}
    </div>
  );
}

// Depoimentos com estrelas
function TestimonialsCarousel() {
  const testimonials = [
    { 
      name: "Maria Silva", 
      rating: 5, 
      text: "Atendimento excepcional! O sistema de agendamento online facilitou muito minha vida. Consegui marcar consulta à noite sem precisar ligar.",
      date: "2 dias atrás",
      avatar: "MS"
    },
    { 
      name: "João Pereira", 
      rating: 5, 
      text: "Profissionais altamente qualificados. A telemedicina funcionou perfeitamente e me poupou tempo. Recomendo a todos!",
      date: "1 semana atrás",
      avatar: "JP"
    },
    { 
      name: "Ana Carolina", 
      rating: 4, 
      text: "Clínica moderna com tecnologia de ponta. O prontuário digital é muito prático e seguro.",
      date: "3 dias atrás",
      avatar: "AC"
    },
  ];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {testimonials.map((t, i) => (
        <div key={i} className="p-6 rounded-2xl bg-gradient-to-br from-slate-900/80 to-slate-800/50 border border-slate-700/50">
          <div className="flex items-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-4 h-4 ${i < t.rating ? "text-amber-400 fill-amber-400" : "text-slate-600"}`} 
              />
            ))}
          </div>
          <Quote className="w-8 h-8 text-emerald-500/30 mb-3" />
          <p className="text-slate-300 text-sm mb-4 leading-relaxed">&ldquo;{t.text}&rdquo;</p>
          <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-semibold text-sm">
              {t.avatar}
            </div>
            <div>
              <p className="font-semibold text-slate-200 text-sm">{t.name}</p>
              <p className="text-xs text-slate-500">{t.date}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Simulador de Agendamento com Confirmação
function BookingSimulator() {
  const [step, setStep] = useState(1);
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  const specialties = ["Cardiologia", "Neurologia", "Ortopedia", "Oftalmologia", "Pediatria", "Clínica Geral"];
  const dates = ["Seg, 20 Jan", "Ter, 21 Jan", "Qua, 22 Jan", "Qui, 23 Jan", "Sex, 24 Jan"];
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
      <div className="p-4 md:p-6 rounded-2xl bg-gradient-to-br from-emerald-600/30 to-teal-600/20 border border-emerald-500/50 animate-in fade-in zoom-in duration-300">
        <div className="text-center">
          <div className="w-16 h-16 md:w-20 md:h-20 mx-auto rounded-full bg-emerald-500/20 flex items-center justify-center mb-4 animate-bounce">
            <PartyPopper className="w-8 h-8 md:w-10 md:h-10 text-emerald-400" />
          </div>
          
          <h3 className="text-xl md:text-2xl font-bold text-white mb-3 flex items-center justify-center gap-2 flex-wrap">
            <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-amber-400" />
            <span>Agendado com Sucesso!</span>
            <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-amber-400" />
          </h3>
          
          <div className="bg-slate-900/50 rounded-xl p-3 md:p-4 mb-4 border border-emerald-500/30 text-left">
            <p className="text-base md:text-lg text-slate-200 mb-2">
              <span className="font-bold text-emerald-400">{selectedSpecialty}</span>
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 text-slate-300 text-sm">
              <span className="flex items-center gap-2">
                <CalendarCheck className="w-4 h-4 md:w-5 md:h-5 text-emerald-400 flex-shrink-0" />
                {selectedDate}
              </span>
              <span className="flex items-center gap-2">
                <Clock3 className="w-4 h-4 md:w-5 md:h-5 text-emerald-400 flex-shrink-0" />
                {selectedTime}
              </span>
            </div>
          </div>
          
          <p className="text-xs md:text-sm text-slate-400 mb-4">
            Você receberá uma confirmação por WhatsApp em instantes!
          </p>
          
          <div className="flex items-center justify-center gap-2 text-xs text-slate-500 mb-4">
            <MapPinCheck className="w-4 h-4 flex-shrink-0" />
            <span>Unidade Principal - Av. Paulista, 1000</span>
          </div>
          
          <button 
            onClick={resetBooking}
            className="w-full sm:w-auto px-4 md:px-6 py-2 rounded-xl bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition-colors text-sm"
          >
            Agendar Nova Consulta
          </button>
        </div>
      </div>
    );
  }
   
  return (
    <div className="p-4 md:p-6 rounded-2xl bg-gradient-to-br from-emerald-900/30 to-teal-900/20 border border-emerald-500/30">
      <div className="flex items-center gap-2 md:gap-4 mb-4 md:mb-6 text-xs md:text-sm overflow-x-auto pb-2">
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center font-bold ${step >= 1 ? "bg-emerald-500 text-white" : "bg-slate-800 text-slate-400"}`}>1</div>
          <span className="text-slate-300 hidden sm:inline">Especialidade</span>
        </div>
        <div className="h-px w-4 md:w-8 bg-slate-800 flex-shrink-0" />
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center font-bold ${step >= 2 ? "bg-emerald-500 text-white" : "bg-slate-800 text-slate-400"}`}>2</div>
          <span className="text-slate-300 hidden sm:inline">Data</span>
        </div>
        <div className="h-px w-4 md:w-8 bg-slate-800 flex-shrink-0" />
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center font-bold ${step >= 3 ? "bg-emerald-500 text-white" : "bg-slate-800 text-slate-400"}`}>3</div>
          <span className="text-slate-300 hidden sm:inline">Horário</span>
        </div>
      </div>
      
      {step === 1 && (
        <div className="space-y-3">
          <p className="text-slate-400 text-sm">Selecione a especialidade:</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {specialties.map((s) => (
              <button
                key={s}
                onClick={() => { setSelectedSpecialty(s); setStep(2); }}
                className={`p-2 md:p-3 rounded-xl text-xs md:text-sm font-medium transition-all ${selectedSpecialty === s ? "bg-emerald-500 text-white" : "bg-slate-800 text-slate-300 hover:bg-slate-700"}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {step === 2 && (
        <div className="space-y-3">
          <p className="text-slate-400 text-sm">Escolha a data para <span className="text-emerald-400 font-semibold">{selectedSpecialty}</span>:</p>
          <div className="grid grid-cols-2 gap-2">
            {dates.map((d) => (
              <button
                key={d}
                onClick={() => { setSelectedDate(d); setStep(3); }}
                className={`p-2 md:p-3 rounded-xl text-xs md:text-sm font-medium transition-all ${selectedDate === d ? "bg-emerald-500 text-white" : "bg-slate-800 text-slate-300 hover:bg-slate-700"}`}
              >
                <Calendar className="w-4 h-4 inline mr-1" />
                {d}
              </button>
            ))}
          </div>
          <button onClick={() => setStep(1)} className="text-xs md:text-sm text-slate-500 hover:text-slate-300">← Voltar</button>
        </div>
      )}
      
      {step === 3 && (
        <div className="space-y-3">
          <p className="text-slate-400 text-sm">Horários para <span className="text-emerald-400 font-semibold">{selectedDate}</span>:</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {times.map((t) => (
              <button
                key={t}
                onClick={() => handleTimeSelection(t)}
                className="p-2 md:p-3 rounded-xl text-xs md:text-sm font-medium bg-slate-800 text-slate-300 hover:bg-emerald-500 hover:text-white transition-all"
              >
                <Clock className="w-4 h-4 inline mr-1" />
                {t}
              </button>
            ))}
          </div>
          <button onClick={() => setStep(2)} className="text-xs md:text-sm text-slate-500 hover:text-slate-300">← Voltar</button>
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
        demoName="Plataforma HealthTech"
      />

      {/* Botão Voltar */}
      <div className="fixed top-20 md:top-24 left-3 md:left-6 z-50">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-1.5 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full glass border border-emerald-500/30 text-xs md:text-sm font-semibold text-emerald-400 hover:bg-emerald-500/10 transition-all"
        >
          <ArrowLeft className="w-3 h-3 md:w-4 md:h-4" />
          {common("backToPortfolio")}
        </Link>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden pt-20 md:pt-32 pb-10 md:pb-16">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-24 left-1/2 w-[30rem] md:w-[58rem] h-[30rem] md:h-[58rem] -translate-x-1/2 rounded-full bg-gradient-to-tr from-emerald-500/20 via-teal-500/10 to-transparent blur-3xl" />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl">
            <span className="inline-flex items-center gap-1.5 md:gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 md:px-4 md:py-2 mb-3 md:mb-6 text-xs md:text-sm font-semibold text-emerald-400">
              <Stethoscope className="w-3 h-3 md:w-4 md:h-4" />
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
                href="#agendamento" 
                className="inline-flex items-center justify-center gap-1.5 md:gap-2 rounded-xl bg-emerald-500 text-white font-semibold px-3 py-2 md:px-6 md:py-3 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-500/25 text-xs md:text-base"
              >
                {t("cta_primary")}
                <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
              </Link>
              <Link 
                href="#especialidades" 
                className="inline-flex items-center justify-center gap-1.5 md:gap-2 rounded-xl border border-slate-700 bg-slate-800/50 px-3 py-2 md:px-6 md:py-3 font-semibold text-slate-300 transition-all hover:-translate-y-0.5 hover:border-slate-600 text-xs md:text-base"
              >
                {t("cta_secondary")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Especialidades */}
      <section id="especialidades" className="py-8 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-6 md:mb-12">
            <h2 className="font-display text-xl md:text-3xl font-bold text-slate-100 mb-2 md:mb-4">{t("specialties_title")}</h2>
            <p className="text-slate-400 text-xs md:text-base">Atendimento especializado em diversas áreas da saúde</p>
          </div>
          <SpecialtiesGrid />
        </div>
      </section>

      {/* Depoimentos */}
      <section className="py-8 md:py-16 bg-gradient-to-b from-slate-900/50 to-slate-950">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-6 md:mb-12">
            <h2 className="font-display text-xl md:text-3xl font-bold text-slate-100 mb-2 md:mb-4">{t("testimonials_title")}</h2>
            <p className="text-slate-400 text-xs md:text-base">A experiência de quem já confia em nossos serviços</p>
          </div>
          <TestimonialsCarousel />
        </div>
      </section>

      {/* Agendamento */}
      <section id="agendamento" className="py-8 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 items-start">
            <div>
              <h2 className="font-display text-xl md:text-3xl font-bold text-slate-100 mb-2 md:mb-4">{t("booking_title")}</h2>
              <p className="text-slate-400 text-xs md:text-base mb-4 md:mb-6">{t("booking_desc")}</p>
              
              <div className="space-y-3 md:space-y-4">
                <div className="flex items-center gap-3 text-slate-300">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-teal-500/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-teal-400" />
                  </div>
                  <span className="text-sm md:text-base">Agendamento 24/7 online</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-teal-500/20 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 md:w-5 md:h-5 text-teal-400" />
                  </div>
                  <span className="text-sm md:text-base">Múltiplas unidades</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-teal-500/20 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 md:w-5 md:h-5 text-teal-400" />
                  </div>
                  <span className="text-sm md:text-base">Confirmação via WhatsApp</span>
                </div>
              </div>
            </div>
            
            <BookingSimulator />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-6 md:py-10 mt-8 md:mt-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-5">
            <p className="text-xs md:text-sm text-slate-500">{common("footer")}</p>
            <div className="flex items-center gap-2 md:gap-3">
              <a href="#" className="p-1.5 md:p-2 rounded-lg border border-slate-800 hover:border-teal-500/50 transition-colors text-slate-400 hover:text-teal-400">
                <Linkedin className="w-4 h-4 md:w-5 md:h-5" />
              </a>
              <a href="#" className="p-1.5 md:p-2 rounded-lg border border-slate-800 hover:border-teal-500/50 transition-colors text-slate-400 hover:text-teal-400">
                <Github className="w-4 h-4 md:w-5 md:h-5" />
              </a>
              <a href="#" className="p-1.5 md:p-2 rounded-lg border border-slate-800 hover:border-teal-500/50 transition-colors text-slate-400 hover:text-teal-400">
                <Mail className="w-4 h-4 md:w-5 md:h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}