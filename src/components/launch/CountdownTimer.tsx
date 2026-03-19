"use client";

import { useState, useEffect } from "react";
import { Clock, Zap, Target, Sparkles } from "lucide-react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Set target date to 7 days from now
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 7);
    targetDate.setHours(23, 59, 59, 999);

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const target = targetDate.getTime();
      const difference = target - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!mounted) {
    return (
      <div className="glass-morphism rounded-2xl border border-white/10 dark:border-white/5 p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="text-center">
                <div className="h-16 bg-slate-200 dark:bg-slate-700 rounded-lg mb-2"></div>
                <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="text-center">
      <div className="relative">
        <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl bg-gradient-to-br from-primary/20 to-primary/40 border border-primary/30 flex items-center justify-center">
          <span className="text-2xl md:text-3xl font-bold text-primary tabular-nums">
            {String(value).padStart(2, '0')}
          </span>
        </div>
        {value === 0 && (
          <div className="absolute inset-0 rounded-xl bg-red-500/20 border border-red-500/30 animate-pulse"></div>
        )}
      </div>
      <span className="text-xs font-medium text-slate-600 dark:text-slate-400 mt-2 block">
        {label}
      </span>
    </div>
  );

  const isExpired = timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0;

  return (
    <div className="glass-morphism rounded-2xl border border-white/10 dark:border-white/5 p-6">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Clock className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            {isExpired ? "Lançamento Encerrado" : "Lançamento em Andamento"}
          </h3>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          {isExpired 
            ? "O período de lançamento encerrou. Fique atento para próximos eventos!"
            : "Aproveite a oferta especial por tempo limitado"
          }
        </p>
      </div>

      {!isExpired && (
        <div className="grid grid-cols-4 gap-4 mb-6">
          <TimeUnit value={timeLeft.days} label="Dias" />
          <TimeUnit value={timeLeft.hours} label="Horas" />
          <TimeUnit value={timeLeft.minutes} label="Minutos" />
          <TimeUnit value={timeLeft.seconds} label="Segundos" />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-emerald-500" />
            <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
              Oferta Limitada
            </span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300">
            Desconto exclusivo de 50% apenas durante o lançamento
          </p>
        </div>

        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-semibold text-amber-600 dark:text-amber-400">
              Bônus Exclusivos
            </span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300">
            +3 bônus especiais para os primeiros 100 compradores
          </p>
        </div>

        <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">
              Garantia Estendida
            </span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300">
            30 dias de garantia incondicional + suporte premium
          </p>
        </div>
      </div>

      {isExpired && (
        <div className="mt-6 p-4 rounded-xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-600 dark:text-slate-300 text-center">
            Não perca! Inscreva-se na lista de espera para ser notificado sobre próximos lançamentos.
          </p>
        </div>
      )}
    </div>
  );
}
