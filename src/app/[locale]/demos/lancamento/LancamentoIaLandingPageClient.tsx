"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { 
  ArrowLeft, Timer, MessageCircle, Zap, ArrowRight, ChevronDown, ChevronUp,
  CheckCircle2, AlertCircle, Gift, Sparkles, Linkedin, Github, Mail, Flame,
  User, ThumbsUp, MessageSquare, Crown, Star, ZapIcon, Clock
} from "lucide-react";
import { useState, useEffect } from "react";
import RatingModal from "@/components/RatingModal";

// Countdown Timer de 1 hora com efeitos chamativos
function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState(3600);
  const [isPulsing, setIsPulsing] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) return 0;
        if (prev <= 600) setIsPulsing(true);
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  const TimeBox = ({ value, label, isUrgent }: { value: number; label: string; isUrgent?: boolean }) => (
    <div className={`flex flex-col items-center ${isUrgent && isPulsing ? "animate-pulse" : ""}`}>
      <div className={`relative w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center ${isUrgent ? "bg-gradient-to-br from-red-500 to-orange-500" : "bg-gradient-to-br from-orange-500 to-amber-500"} ${isPulsing && isUrgent ? "animate-bounce" : ""}`}>
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent" />
        <span className="relative text-3xl md:text-4xl font-black text-white drop-shadow-lg">
          {value.toString().padStart(2, '0')}
        </span>
        {isUrgent && (
          <>
            <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-300 animate-ping" />
            <Flame className="absolute -bottom-1 -left-1 w-5 h-5 text-red-400" />
          </>
        )}
      </div>
      <span className="text-xs md:text-sm text-slate-400 mt-2 uppercase tracking-wider font-semibold">{label}</span>
    </div>
  );

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-amber-500/20 to-red-500/20 blur-3xl -z-10" />
      <div className="flex items-center justify-center gap-2 md:gap-4">
        <TimeBox value={hours} label="Horas" />
        <span className="text-3xl md:text-4xl font-bold text-orange-400 animate-pulse">:</span>
        <TimeBox value={minutes} label="Min" isUrgent />
        <span className="text-3xl md:text-4xl font-bold text-orange-400 animate-pulse">:</span>
        <TimeBox value={seconds} label="Seg" isUrgent />
      </div>
      <div className="mt-6 max-w-md mx-auto">
        <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-orange-500 via-amber-500 to-red-500 transition-all duration-1000" style={{ width: `${(timeLeft / 3600) * 100}%` }} />
        </div>
        <p className="text-center text-sm text-slate-500 mt-2 flex items-center justify-center gap-2">
          <Clock className="w-4 h-4" />
          Oferta encerra em breve!
        </p>
      </div>
    </div>
  );
}

// FAQ Accordion
function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const faqs = [
    { q: "O que está incluso no curso?", a: "Você recebe acesso vitalício a mais de 50 horas de conteúdo, materiais complementares em PDF, acesso à comunidade exclusiva e certificado de conclusão." },
    { q: "Por quanto tempo tenho acesso?", a: "O acesso é vitalício! Inclui todas as atualizações futuras do conteúdo." },
    { q: "Tem garantia de satisfação?", a: "Sim! Garantia incondicional de 7 dias. Se não ficar satisfeito, devolvemos 100%." },
    { q: "Como recebo o acesso?", a: "Após a confirmação do pagamento, você recebe um email com credenciais em até 5 minutos." },
    { q: "Preciso de experiência prévia?", a: "Não! O curso foi desenvolvido para todos os níveis." },
  ];

  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <div key={i} className={`rounded-xl border ${openIndex === i ? 'border-orange-500/50 bg-orange-500/5' : 'border-slate-800 bg-slate-900/50'} transition-all duration-300`}>
          <button onClick={() => setOpenIndex(openIndex === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left">
            <span className="font-semibold text-slate-200 pr-4">{faq.q}</span>
            {openIndex === i ? <ChevronUp className="w-5 h-5 text-orange-400 flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-slate-500 flex-shrink-0" />}
          </button>
          {openIndex === i && <div className="px-5 pb-5"><p className="text-slate-400 leading-relaxed">{faq.a}</p></div>}
        </div>
      ))}
    </div>
  );
}

// Seção de Comentários
function CommentsSection() {
  const comments = [
    { name: "Roberto Almeida", avatar: "RA", comment: "Melhor investimento que fiz! Já recuperei 10x o valor investido!", likes: 234, time: "2 horas atrás", verified: true },
    { name: "Fernanda Costa", avatar: "FC", comment: "Aplicando as estratégias na primeira semana já fechei 3 novos clientes!", likes: 189, time: "5 horas atrás", verified: true },
    { name: "Marcelo Santos", avatar: "MS", comment: "Já fiz vários cursos, mas este é diferente. Super recomendo!", likes: 156, time: "1 dia atrás", verified: true },
    { name: "Patricia Lima", avatar: "PL", comment: "A comunidade exclusiva vale o investimento sozinha!", likes: 142, time: "1 dia atrás", verified: false }
  ];

  return (
    <div className="space-y-4">
      {comments.map((c, i) => (
        <div key={i} className="p-5 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-all">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white font-bold flex-shrink-0">{c.avatar}</div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-slate-200">{c.name}</span>
                {c.verified && <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs"><CheckCircle2 className="w-3 h-3" /> Verificado</span>}
              </div>
              <p className="text-slate-400 text-sm mb-3">{c.comment}</p>
              <div className="flex items-center gap-4 text-xs text-slate-500">
                <button className="flex items-center gap-1 hover:text-orange-400 transition-colors"><ThumbsUp className="w-4 h-4" /> {c.likes}</button>
                <span className="flex items-center gap-1"><MessageSquare className="w-4 h-4" /> Responder</span>
                <span>{c.time}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Seção de Preços
function PricingSection() {
  const plans = [
    { name: "Starter", price: "R$ 297", originalPrice: "R$ 597", description: "Ideal para quem está começando", features: ["Acesso aos 3 primeiros módulos", "Material em PDF", "Certificado", "Suporte por email"], popular: false, color: "blue" },
    { name: "Professional", price: "R$ 497", originalPrice: "R$ 997", description: "Acesso completo ao conteúdo", features: ["Acesso a todos os módulos", "Material + Bônus", "Certificado premium", "Suporte prioritário", "Comunidade VIP", "Mentoria mensal"], popular: true, color: "orange" },
    { name: "Enterprise", price: "R$ 997", originalPrice: "R$ 1.997", description: "Para equipes e empresas", features: ["Tudo do Professional", "Licença para 5 usuários", "Consultoria personalizada", "Suporte 24/7", "Acesso vitalício", "Bônus exclusivos"], popular: false, color: "purple" }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {plans.map((plan) => (
        <div key={plan.name} className={`relative p-6 rounded-2xl border ${plan.popular ? 'border-orange-500/50 bg-gradient-to-b from-orange-500/10 to-slate-900/50' : 'border-slate-800 bg-slate-900/50'} transition-all duration-300 hover:-translate-y-2`}>
          {plan.popular && <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold flex items-center gap-1"><Star className="w-3 h-3" /> MAIS POPULAR</div>}
          <div className="text-center mb-6">
            <h3 className="font-display text-xl font-bold text-slate-100 mb-2">{plan.name}</h3>
            <p className="text-slate-400 text-sm mb-4">{plan.description}</p>
            <div className="flex items-baseline justify-center gap-2">
              <span className="text-3xl font-black text-white">{plan.price}</span>
              <span className="text-sm text-slate-500 line-through">{plan.originalPrice}</span>
            </div>
            <p className="text-xs text-emerald-400 mt-1">Economia de 50%</p>
          </div>
          <ul className="space-y-3 mb-6">
            {plan.features.map((f, i) => <li key={i} className="flex items-center gap-2 text-sm text-slate-300"><CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />{f}</li>)}
          </ul>
          <button className={`w-full py-3 rounded-xl font-bold transition-all ${plan.popular ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:shadow-lg hover:shadow-orange-500/30' : 'bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700'}`}>Quero Este Plano</button>
        </div>
      ))}
    </div>
  );
}

export default function LancamentoLandingPageClient() {
  const t = useTranslations("Demos.lancamento");
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
      <RatingModal isOpen={isRatingOpen} onClose={() => setIsRatingOpen(false)} demoName="Ecossistema de Vendas" />

      <div className="fixed top-24 left-6 z-50">
        <Link href="/#projects" className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-orange-500/30 text-sm font-semibold text-orange-400 hover:bg-orange-500/10 transition-all duration-300 hover:-translate-y-0.5">
          <ArrowLeft className="w-4 h-4" />{common("backToPortfolio")}
        </Link>
      </div>

      <section className="relative overflow-hidden pt-32 pb-16">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-24 left-1/2 w-[58rem] h-[58rem] -translate-x-1/2 rounded-full bg-gradient-to-tr from-orange-500/30 via-amber-500/20 to-transparent blur-3xl animate-pulse" />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/20 border border-red-500/40 text-red-400 text-sm font-bold animate-pulse">
              <Flame className="w-4 h-4" />{t("urgency")}<Flame className="w-4 h-4" />
            </div>
          </div>
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-2 mb-6 text-sm font-semibold text-orange-400"><Sparkles className="w-4 h-4" />{t("badge")}</span>
            <h1 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.05] mb-6">{t("title")}</h1>
            <p className="text-lg text-slate-400 leading-relaxed mb-8 max-w-2xl mx-auto">{t("hero_desc")}</p>
            <div className="mb-8">
              <p className="text-lg text-slate-300 mb-4 flex items-center justify-center gap-2"><ZapIcon className="w-5 h-5 text-amber-400" />{t("countdown_title")}<ZapIcon className="w-5 h-5 text-amber-400" /></p>
              <CountdownTimer />
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="#precos" className="group relative inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold px-8 py-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-500/30 overflow-hidden">
                <span className="absolute inset-0 bg-gradient-to-r from-orange-400/0 via-white/20 to-orange-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <Gift className="w-5 h-5 relative z-10" /><span className="relative z-10">{t("cta_primary")}</span>
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping" />
              </Link>
              <Link href="#faq" className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/50 px-8 py-4 font-semibold text-slate-300 transition-all duration-300 hover:-translate-y-1 hover:border-slate-600">{t("cta_secondary")}</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-b from-slate-900/50 to-slate-950">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-orange-500/10 to-transparent border border-orange-500/20 hover:border-orange-500/40 transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 rounded-xl bg-orange-500/20 flex items-center justify-center mb-6"><Timer className="w-7 h-7 text-orange-400" /></div>
              <h3 className="font-display text-xl font-bold text-slate-100 mb-3">{t("feature_1")}</h3><p className="text-slate-400">{t("feature_1_desc")}</p>
            </div>
            <div className="p-8 rounded-2xl bg-gradient-to-br from-amber-500/10 to-transparent border border-amber-500/20 hover:border-amber-500/40 transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 rounded-xl bg-amber-500/20 flex items-center justify-center mb-6"><MessageCircle className="w-7 h-7 text-amber-400" /></div>
              <h3 className="font-display text-xl font-bold text-slate-100 mb-3">{t("feature_2")}</h3><p className="text-slate-400">{t("feature_2_desc")}</p>
            </div>
            <div className="p-8 rounded-2xl bg-gradient-to-br from-red-500/10 to-transparent border border-red-500/20 hover:border-red-500/40 transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 rounded-xl bg-red-500/20 flex items-center justify-center mb-6"><Zap className="w-7 h-7 text-red-400" /></div>
              <h3 className="font-display text-xl font-bold text-slate-100 mb-3">{t("feature_3")}</h3><p className="text-slate-400">{t("feature_3_desc")}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="precos" className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-slate-100 mb-4">Escolha Seu Plano</h2>
            <p className="text-slate-400">Investimento único - Acesso vitalício</p>
          </div>
          <PricingSection />
        </div>
      </section>

      <section className="py-16 bg-gradient-to-b from-slate-900/80 to-slate-950">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl font-bold text-slate-100 mb-4">O Que Dizem Nossos Alunos</h2>
              <p className="text-slate-400">Resultados reais de pessoas que transformaram suas vidas</p>
            </div>
            <CommentsSection />
          </div>
        </div>
      </section>

      <section id="faq" className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl font-bold text-slate-100 mb-4">{t("faq_title")}</h2>
              <p className="text-slate-400">{t("faq_subtitle")}</p>
            </div>
            <FAQAccordion />
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-800 py-10 mt-16">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-5">
            <p className="text-sm text-slate-500">{common("footer")}</p>
            <div className="flex items-center gap-3">
              <a href="#" className="p-2 rounded-lg border border-slate-800 hover:border-orange-500/50 transition-colors text-slate-400 hover:text-orange-400"><Linkedin className="w-5 h-5" /></a>
              <a href="#" className="p-2 rounded-lg border border-slate-800 hover:border-orange-500/50 transition-colors text-slate-400 hover:text-orange-400"><Github className="w-5 h-5" /></a>
              <a href="#" className="p-2 rounded-lg border border-slate-800 hover:border-orange-500/50 transition-colors text-slate-400 hover:text-orange-400"><Mail className="w-5 h-5" /></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}