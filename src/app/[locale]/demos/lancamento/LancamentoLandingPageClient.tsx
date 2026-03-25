"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { 
  ArrowLeft, Timer, MessageCircle, Zap, ArrowRight, ChevronDown, ChevronUp,
  CheckCircle2, AlertCircle, Gift, Sparkles, Linkedin, Github, Mail, Flame,
  User, ThumbsUp, MessageSquare, Crown, Star, ZapIcon, Clock, X,
  CreditCard, Shield, Lock, TrendingUp, Users, Target, Award, ShoppingBag,
  AlertTriangle, CheckCircle, Play
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RatingModal from "@/components/RatingModal";

// Timer de urgência com animações
function UrgencyTimer() {
  const [timeLeft, setTimeLeft] = useState(2712); // 45:12 em segundos
  const [isUrgent, setIsUrgent] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) return 0;
        if (prev <= 300) setIsUrgent(true); // Últimos 5 minutos
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  const TimeBox = ({ value, label }: { value: number; label: string }) => (
    <motion.div 
      className="flex flex-col items-center"
      animate={isUrgent ? { scale: [1, 1.05, 1] } : {}}
      transition={{ repeat: Infinity, duration: 1 }}
    >
      <div className={`relative w-16 h-16 md:w-20 md:h-20 rounded-xl flex items-center justify-center ${
        isUrgent ? "bg-gradient-to-br from-red-500 to-orange-500" : "bg-gradient-to-br from-rose-500 to-orange-500"
      } shadow-lg shadow-rose-500/25`}>
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent" />
        <span className="relative text-2xl md:text-3xl font-black text-white">
          {value.toString().padStart(2, '0')}
        </span>
        {isUrgent && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="absolute -top-1 -right-1"
          >
            <Flame className="w-4 h-4 text-yellow-300" />
          </motion.div>
        )}
      </div>
      <span className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">{label}</span>
    </motion.div>
  );

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-rose-500/20 via-orange-500/20 to-red-500/20 blur-2xl -z-10" />
      <div className="flex items-center justify-center gap-1 md:gap-2">
        <TimeBox value={hours} label="H" />
        <span className="text-2xl md:text-3xl font-bold text-orange-400 animate-pulse">:</span>
        <TimeBox value={minutes} label="M" />
        <span className="text-2xl md:text-3xl font-bold text-orange-400 animate-pulse">:</span>
        <TimeBox value={seconds} label="S" />
      </div>
    </div>
  );
}

// Barra de Progresso de Urgência
function UrgencyBar({ t }: { t: (key: string) => string }) {
  const [progress, setProgress] = useState(92);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 98) return 98;
        return prev + 0.1;
      });
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-semibold text-slate-300">{t("urgency_bar.filled")}</span>
        <span className="text-sm text-orange-400 font-bold">{t("urgency_bar.remaining")}</span>
      </div>
      <div className="relative h-4 bg-slate-800 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-gradient-to-r from-rose-500 via-orange-500 to-red-500"
          initial={{ width: `${progress}%` }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
      </div>
    </div>
  );
}

// Sistema de Lotes com Preços Dinâmicos
function PricingLots({ t, onCheckout }: { t: (key: string) => string; onCheckout: (lot: string) => void }) {
  const [hoveredLot, setHoveredLot] = useState<string | null>(null);

  const lots = [
    {
      id: "lot1",
      name: t("pricing_lots.lot1.name"),
      status: t("pricing_lots.lot1.status"),
      status_desc: t("pricing_lots.lot1.status_desc"),
      original_price: t("pricing_lots.lot1.original_price"),
      price: t("pricing_lots.lot1.price"),
      discount: t("pricing_lots.lot1.discount"),
      features: t("pricing_lots.lot1.features"),
      button: t("pricing_lots.lot1.button"),
      disabled: true,
      opacity: 0.6
    },
    {
      id: "lot2",
      name: t("pricing_lots.lot2.name"),
      status: t("pricing_lots.lot2.status"),
      status_desc: t("pricing_lots.lot2.status_desc"),
      original_price: t("pricing_lots.lot2.original_price"),
      price: t("pricing_lots.lot2.price"),
      discount: t("pricing_lots.lot2.discount"),
      features: t("pricing_lots.lot2.features"),
      button: t("pricing_lots.lot2.button"),
      disabled: false,
      opacity: 1,
      highlighted: true,
      tooltip: t("pricing_lots.lot2.tooltip")
    },
    {
      id: "lot3",
      name: t("pricing_lots.lot3.name"),
      status: t("pricing_lots.lot3.status"),
      status_desc: t("pricing_lots.lot3.status_desc"),
      original_price: t("pricing_lots.lot3.original_price"),
      price: t("pricing_lots.lot3.price"),
      discount: t("pricing_lots.lot3.discount"),
      features: t("pricing_lots.lot3.features"),
      button: t("pricing_lots.lot3.button"),
      disabled: true,
      opacity: 0.7,
      locked: true
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{t("pricing_lots.title")}</h2>
        <p className="text-slate-400">{t("pricing_lots.subtitle")}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {lots.map((lot) => (
          <motion.div
            key={lot.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: lot.opacity, y: 0 }}
            whileHover={{ y: -5 }}
            onHoverStart={() => setHoveredLot(lot.id)}
            onHoverEnd={() => setHoveredLot(null)}
            className={`relative rounded-2xl border transition-all duration-300 ${
              lot.highlighted 
                ? "bg-gradient-to-b from-rose-600/20 to-slate-900/90 border-rose-500/50 shadow-2xl shadow-rose-500/20 scale-105" 
                : lot.disabled 
                  ? "bg-slate-900/50 border-slate-800 opacity-60" 
                  : "bg-slate-900/50 border-slate-800 hover:border-slate-700"
            }`}
          >
            {lot.highlighted && (
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute -top-3 left-1/2 -translate-x-1/2 z-10"
              >
                <span className="px-4 py-1 rounded-full bg-gradient-to-r from-rose-500 to-orange-500 text-white text-xs font-bold shadow-lg">
                  {lot.status}
                </span>
              </motion.div>
            )}

            {lot.locked && (
              <div className="absolute inset-0 bg-slate-900/80 rounded-2xl flex items-center justify-center z-10">
                <div className="text-center">
                  <Lock className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                  <p className="text-slate-500 text-sm">{lot.status}</p>
                </div>
              </div>
            )}

            <div className="p-6">
              <div className="text-center mb-6">
                <h3 className="text-lg font-bold text-white mb-2">{lot.name}</h3>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-slate-500 line-through text-sm">{lot.original_price}</span>
                  <span className="text-rose-500 font-bold text-sm">{lot.discount}</span>
                </div>
                <div className="text-3xl font-black text-white">{lot.price}</div>
                <p className="text-xs text-slate-400 mt-1">{lot.status_desc}</p>
              </div>

              <ul className="space-y-3 mb-6">
                {Array.isArray(lot.features) ? lot.features.map((feature: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-300">{feature}</span>
                  </li>
                )) : []}
              </ul>

              <button
                onClick={() => !lot.disabled && onCheckout(lot.id)}
                disabled={lot.disabled}
                className={`w-full py-3 rounded-xl font-semibold transition-all ${
                  lot.disabled 
                    ? "bg-slate-800 text-slate-600 cursor-not-allowed" 
                    : lot.highlighted
                      ? "bg-gradient-to-r from-rose-500 to-orange-500 text-white hover:opacity-90 shadow-lg shadow-rose-500/25"
                      : "bg-slate-800 text-white hover:bg-slate-700"
                }`}
              >
                {lot.button}
              </button>
            </div>

            {hoveredLot === lot.id && lot.tooltip && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-3 py-2 rounded-lg shadow-lg z-20 whitespace-nowrap"
              >
                {lot.tooltip}
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-800 rotate-45" />
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Notificações de Compra em Tempo Real
function SocialProofNotifications({ t }: { t: (key: string) => string }) {
  const [notifications, setNotifications] = useState<Array<{ id: number; name: string; city: string; plan: string }>>([]);
  const [visibleId, setVisibleId] = useState<number | null>(null);

  const names = ["João P.", "Maria S.", "Pedro R.", "Ana C.", "Carlos M.", "Lucia F.", "Roberto B.", "Juliana L."];
  const cities = ["São Paulo", "Rio de Janeiro", "Belo Horizonte", "Brasília", "Porto Alegre", "Recife", "Salvador", "Curitiba"];
  const plans = ["Pro", "Premium", "Enterprise", "Ultimate"];

  useEffect(() => {
    const generateNotification = () => {
      const notification = {
        id: Date.now(),
        name: names[Math.floor(Math.random() * names.length)],
        city: cities[Math.floor(Math.random() * cities.length)],
        plan: plans[Math.floor(Math.random() * plans.length)]
      };
      
      setNotifications(prev => [...prev, notification]);
      setVisibleId(notification.id);

      setTimeout(() => {
        setVisibleId(null);
      }, 4000);

      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== notification.id));
      }, 5000);
    };

    const timer = setInterval(generateNotification, 8000);
    generateNotification(); // Primeira notificação imediata

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed bottom-4 left-4 z-50 space-y-2">
      <AnimatePresence>
        {notifications.map(notification => (
          visibleId === notification.id && (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: -100, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -100, scale: 0.8 }}
              className="bg-slate-900/95 border border-rose-500/30 backdrop-blur-sm rounded-xl p-3 shadow-lg shadow-rose-500/20 max-w-sm"
            >
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                >
                  <Flame className="w-5 h-5 text-orange-400" />
                </motion.div>
                <div>
                  <p className="text-sm text-white font-medium">
                    🔥 {notification.name} de {notification.city} acabou de comprar o plano {notification.plan}
                  </p>
                </div>
              </div>
            </motion.div>
          )
        ))}
      </AnimatePresence>
    </div>
  );
}

// Modal de Checkout de Alta Conversão
function CheckoutModal({ isOpen, onClose, t, selectedLot }: { 
  isOpen: boolean; 
  onClose: () => void; 
  t: (key: string) => string;
  selectedLot: string;
}) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("credit");

  const handlePurchase = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-slate-900 rounded-2xl border border-slate-800 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        >
          {!isSuccess ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Resumo do Pedido */}
              <div className="p-6 border-r border-slate-800">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white">{t("checkout_modal.order_summary")}</h3>
                  <button onClick={onClose}>
                    <X className="w-5 h-5 text-slate-400 hover:text-white" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="bg-slate-800/50 rounded-xl p-4">
                    <h4 className="font-semibold text-white mb-2">{t("checkout_modal.product")}</h4>
                    <p className="text-slate-300">Plataforma de Lançamento - Acesso Vitalício</p>
                  </div>

                  <div className="bg-slate-800/50 rounded-xl p-4">
                    <h4 className="font-semibold text-white mb-2">{t("checkout_modal.plan")}</h4>
                    <p className="text-rose-400 font-bold">{t(`pricing_lots.${selectedLot}.name`)}</p>
                  </div>

                  <div className="space-y-2 pt-4 border-t border-slate-800">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">{t("checkout_modal.original_price")}</span>
                      <span className="text-slate-500 line-through">{t(`pricing_lots.${selectedLot}.original_price`)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-green-400">
                      <span>{t("checkout_modal.discount_applied")}</span>
                      <span>-{t(`pricing_lots.${selectedLot}.discount`)}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold text-white pt-2 border-t border-slate-800">
                      <span>{t("checkout_modal.total")}</span>
                      <span>{t(`pricing_lots.${selectedLot}.price`)}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-4">
                    <Shield className="w-4 h-4 text-green-400" />
                    <span className="text-xs text-green-400">{t("checkout_modal.secure_payment")}</span>
                  </div>
                </div>
              </div>

              {/* Formulário de Pagamento */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-6">{t("checkout_modal.payment_method")}</h3>

                <div className="flex gap-2 mb-6">
                  <button
                    onClick={() => setPaymentMethod("credit")}
                    className={`flex-1 py-2 px-4 rounded-lg border transition-all ${
                      paymentMethod === "credit" 
                        ? "border-rose-500 bg-rose-500/10 text-rose-400" 
                        : "border-slate-700 text-slate-400 hover:border-slate-600"
                    }`}
                  >
                    <CreditCard className="w-4 h-4 inline mr-2" />
                    {t("checkout_modal.credit_card")}
                  </button>
                  <button
                    onClick={() => setPaymentMethod("pix")}
                    className={`flex-1 py-2 px-4 rounded-lg border transition-all ${
                      paymentMethod === "pix" 
                        ? "border-rose-500 bg-rose-500/10 text-rose-400" 
                        : "border-slate-700 text-slate-400 hover:border-slate-600"
                    }`}
                  >
                    <Zap className="w-4 h-4 inline mr-2" />
                    {t("checkout_modal.pix")}
                  </button>
                </div>

                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      {t("checkout_modal.email")}
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:border-rose-500 focus:outline-none"
                      placeholder="seu@email.com"
                    />
                  </div>

                  {paymentMethod === "credit" && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          {t("checkout_modal.card_number")}
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:border-rose-500 focus:outline-none"
                          placeholder="0000 0000 0000 0000"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">
                            {t("checkout_modal.card_name")}
                          </label>
                          <input
                            type="text"
                            className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:border-rose-500 focus:outline-none"
                            placeholder="Nome no cartão"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">
                            {t("checkout_modal.expiry")}
                          </label>
                          <input
                            type="text"
                            className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:border-rose-500 focus:outline-none"
                            placeholder="MM/AA"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  <button
                    type="button"
                    onClick={handlePurchase}
                    disabled={isProcessing}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold hover:opacity-90 transition-all disabled:opacity-50 shadow-lg shadow-green-500/25 flex items-center justify-center gap-2"
                  >
                    {isProcessing ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        >
                          <Clock className="w-5 h-5" />
                        </motion.div>
                        {t("checkout_modal.processing")}
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-5 h-5" />
                        {t("checkout_modal.complete_purchase")}
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          ) : (
            // Success Screen
            <div className="p-8 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mb-6"
              >
                <CheckCircle className="w-10 h-10 text-white" />
              </motion.div>

              <h3 className="text-2xl font-bold text-white mb-2">
                {t("checkout_modal.success.title")}
              </h3>
              <p className="text-slate-400 mb-6">
                {t("checkout_modal.success.message")}
              </p>

              <div className="bg-slate-800/50 rounded-xl p-4 mb-6 max-w-sm mx-auto">
                <p className="text-sm text-slate-500 mb-1">{t("checkout_modal.success.access_code")}</p>
                <p className="text-lg font-bold text-green-400">LAUNCH-2024-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
              </div>

              <button
                onClick={onClose}
                className="px-6 py-3 rounded-xl bg-slate-800 text-white font-semibold hover:bg-slate-700 transition-colors"
              >
                {t("checkout_modal.success.go_to_dashboard")}
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// Componente Principal
export default function LancamentoLandingPageClient() {
  const t = useTranslations("Demos.lancamento");
  const common = useTranslations("Demos.common");
  const [isRatingOpen, setIsRatingOpen] = useState(false);
  const [hasShownRating, setHasShownRating] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedLot, setSelectedLot] = useState("lot2");

  useEffect(() => {
    if (!hasShownRating) {
      const timer = setTimeout(() => {
        setIsRatingOpen(true);
        setHasShownRating(true);
      }, 15000);
      return () => clearTimeout(timer);
    }
  }, [hasShownRating]);

  const handleCheckout = (lotId: string) => {
    setSelectedLot(lotId);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <RatingModal
        isOpen={isRatingOpen}
        onClose={() => setIsRatingOpen(false)}
        demoName={t("title")}
      />

      <SocialProofNotifications t={t} />

      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
        t={t}
        selectedLot={selectedLot}
      />

      {/* Botão Voltar */}
      <div className="fixed top-20 md:top-24 left-3 md:left-6 z-40">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-1.5 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full glass border border-rose-500/30 text-xs md:text-sm font-semibold text-rose-400 hover:bg-rose-500/10 transition-all"
        >
          <ArrowLeft className="w-3 h-3 md:w-4 md:h-4" />
          {common("backToPortfolio")}
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 md:pt-32 pb-16 md:pb-24">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-24 left-1/2 w-[40rem] md:w-[60rem] h-[40rem] md:h-[60rem] -translate-x-1/2 rounded-full bg-gradient-to-tr from-rose-500/10 via-orange-500/5 to-transparent blur-3xl" />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-1.5 md:gap-2 rounded-full border border-rose-500/30 bg-rose-500/10 px-2.5 py-1 md:px-4 md:py-2 mb-4 md:mb-6 text-xs md:text-sm font-semibold text-rose-400"
            >
              <AlertTriangle className="w-3 h-3 md:w-4 md:h-4" />
              {t("badge")}
            </motion.span>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-4 md:mb-6"
            >
              <span className="bg-gradient-to-r from-rose-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                {t("hero_title")}
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-base md:text-xl text-slate-400 leading-relaxed mb-6 md:mb-8 max-w-3xl mx-auto"
            >
              {t("hero_subtitle")}
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mb-8 md:mb-12"
            >
              <button 
                onClick={() => handleCheckout("lot2")}
                className="inline-flex items-center justify-center gap-1.5 md:gap-2 rounded-xl bg-gradient-to-r from-rose-500 to-orange-500 text-white font-bold px-6 py-3 md:px-8 md:py-4 transition-all hover:opacity-90 hover:shadow-lg hover:shadow-rose-500/25 text-sm md:text-base animate-pulse"
              >
                <ShoppingBag className="w-4 h-4 md:w-5 md:h-5" />
                {t("cta_primary")}
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
              </button>
              <Link 
                href="#pricing" 
                className="inline-flex items-center justify-center gap-1.5 md:gap-2 rounded-xl border border-slate-700 bg-slate-800/50 px-6 py-3 md:px-8 md:py-4 font-semibold text-slate-300 transition-all hover:bg-slate-800 text-sm md:text-base"
              >
                <Play className="w-4 h-4 md:w-5 md:h-5" />
                {t("cta_secondary")}
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="max-w-md mx-auto"
            >
              <UrgencyBar t={t} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timer de Urgência */}
      <section className="py-8 md:py-16 bg-gradient-to-b from-slate-900/50 to-slate-950">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-2">{t("urgency_bar.ends_in")}</h2>
            <p className="text-slate-400">A oferta termina quando o cronômetro chegar a zero</p>
          </div>
          <UrgencyTimer />
        </div>
      </section>

      {/* Sistema de Lotes */}
      <section id="pricing" className="py-8 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <PricingLots t={t} onCheckout={handleCheckout} />
        </div>
      </section>

      {/* Features */}
      <section className="py-8 md:py-16 bg-gradient-to-b from-slate-900/50 to-slate-950">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{t("features.title")}</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-slate-900/50 border border-slate-800 rounded-xl p-6"
              >
                <h3 className="text-lg font-bold text-white mb-2">{t("features.feature4.title")}</h3>
                <p className="text-slate-400">{t("features.feature4.desc")}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center p-8 md:p-12 rounded-3xl bg-gradient-to-br from-rose-600/20 via-slate-900/90 to-orange-500/10 border border-rose-500/30">
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
              {t("final_cta.title")}
            </h2>
            <p className="text-slate-400 mb-6 max-w-xl mx-auto">
              {t("final_cta.subtitle")}
            </p>
            <p className="text-orange-400 font-semibold mb-6">{t("final_cta.urgency")}</p>
            <button 
              onClick={() => handleCheckout("lot2")}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rose-500 to-orange-500 text-white font-bold px-8 py-4 transition-all hover:opacity-90 hover:shadow-lg hover:shadow-rose-500/25"
            >
              <ShoppingBag className="w-5 h-5" />
              {t("final_cta.button")}
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-6 md:py-10 mt-8 md:mt-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-5">
            <p className="text-xs md:text-sm text-slate-500">{common("footer")}</p>
            <div className="flex items-center gap-2 md:gap-3">
              <a href="#" className="p-2 rounded-lg border border-slate-800 hover:border-rose-500/50 transition-colors text-slate-400 hover:text-rose-400"><Linkedin className="w-5 h-5" /></a>
              <a href="#" className="p-2 rounded-lg border border-slate-800 hover:border-rose-500/50 transition-colors text-slate-400 hover:text-rose-400"><Github className="w-5 h-5" /></a>
              <a href="#" className="p-2 rounded-lg border border-slate-800 hover:border-rose-500/50 transition-colors text-slate-400 hover:text-rose-400"><Mail className="w-5 h-5" /></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
