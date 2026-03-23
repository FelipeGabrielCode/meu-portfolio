"use client";

import { useState } from "react";
import { TrendingUp, TrendingDown, DollarSign, Activity, Info } from "lucide-react";
import { useTranslations } from "next-intl";

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ReactNode;
  sparklineData?: number[];
  previousMonthChange?: string;
}

// Componente de Mini Gráfico (Sparkline)
function Sparkline({ data, isPositive }: { data: number[]; isPositive: boolean }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = 100 - ((value - min) / range) * 100;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
      <polyline
        fill="none"
        stroke={isPositive ? "#10b981" : "#ef4444"}
        strokeWidth="2"
        points={points}
        opacity="0.3"
      />
      <polyline
        fill="none"
        stroke={isPositive ? "#10b981" : "#ef4444"}
        strokeWidth="1.5"
        points={points}
      />
    </svg>
  );
}

// Componente de Tooltip
function Tooltip({ change, previousMonth, isPositive }: { change: string; previousMonth: string; isPositive: boolean }) {
  const [isVisible, setIsVisible] = useState(false);
  
  return (
    <div className="relative inline-block">
      <button
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        className={`p-1 rounded-lg transition-all duration-300 ${isPositive ? 'hover:bg-emerald-500/10' : 'hover:bg-red-500/10'}`}
      >
        <Info className="w-3 h-3 text-slate-400" />
      </button>
      
      {isVisible && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 p-3 bg-slate-900 border border-white/10 rounded-lg shadow-2xl z-50 min-w-[200px]">
          <div className="text-xs space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Mês atual:</span>
              <span className={`font-medium ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
                {change}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Mês anterior:</span>
              <span className="text-slate-300">{previousMonth}</span>
            </div>
          </div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-slate-900 border-r border-b border-white/10"></div>
        </div>
      )}
    </div>
  );
}

export function MetricCard({ title, value, change, isPositive, icon, sparklineData = [], previousMonthChange = "" }: MetricCardProps) {
  const t = useTranslations("Dashboard");
  
  return (
    <div className="group relative bg-white/[0.02] backdrop-blur-xl rounded-2xl p-6 border border-white/5 shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/20 hover:shadow-violet-500/10">
      {/* Background Sparkline */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-24 h-16">
          <Sparkline data={sparklineData} isPositive={isPositive} />
        </div>
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center group-hover:bg-violet-500/20 transition-colors duration-300">
            {icon}
          </div>
          <div className="flex items-center gap-2">
            <div className={`flex items-center gap-1 text-sm font-semibold ${
              isPositive ? 'text-emerald-400' : 'text-red-400'
            }`}>
              {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              {change}
            </div>
            <Tooltip change={change} previousMonth={previousMonthChange} isPositive={isPositive} />
          </div>
        </div>
        
        <div>
          <p className="text-2xl font-bold text-slate-100 mb-1">{value}</p>
          <p className="text-sm text-slate-400">{title}</p>
        </div>
      </div>
    </div>
  );
}

export function FinancialMetrics() {
  const t = useTranslations("Dashboard");
  
  const metrics = [
    {
      title: t("metrics.monthlyRevenue"),
      value: "R$ 48.750",
      change: "+12.5%",
      previousMonthChange: "+8.2%",
      isPositive: true,
      icon: <DollarSign className="w-6 h-6 text-violet-400" />,
      sparklineData: [45, 52, 48, 58, 55, 62, 68, 72, 65, 78, 82, 88]
    },
    {
      title: t("metrics.netMargin"),
      value: "23.8%",
      change: "+2.1%",
      previousMonthChange: "+1.5%",
      isPositive: true,
      icon: <TrendingUp className="w-6 h-6 text-violet-400" />,
      sparklineData: [18, 20, 19, 21, 22, 21, 23, 24, 22, 25, 26, 27]
    },
    {
      title: t("metrics.cashFlow"),
      value: "R$ 12.340",
      change: "-5.2%",
      previousMonthChange: "+3.1%",
      isPositive: false,
      icon: <Activity className="w-6 h-6 text-violet-400" />,
      sparklineData: [15, 14, 13, 12, 11, 13, 12, 14, 13, 12, 11, 10]
    },
    {
      title: t("metrics.runway"),
      value: "8.2 meses",
      change: "+0.8",
      previousMonthChange: "+0.5",
      isPositive: true,
      icon: <TrendingUp className="w-6 h-6 text-violet-400" />,
      sparklineData: [7.0, 7.2, 7.4, 7.6, 7.8, 8.0, 8.2, 8.4, 8.6, 8.8, 9.0, 9.2]
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <MetricCard key={index} {...metric} />
      ))}
    </div>
  );
}
