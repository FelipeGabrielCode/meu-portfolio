"use client";

import { TrendingUp, TrendingDown, DollarSign, Activity } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ReactNode;
}

export function MetricCard({ title, value, change, isPositive, icon }: MetricCardProps) {
  return (
    <div className="glass-morphism rounded-2xl p-6 border border-white/10 dark:border-white/5">
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
          {icon}
        </div>
        <div className={`flex items-center gap-1 text-sm font-semibold ${
          isPositive ? 'text-emerald-500' : 'text-red-500'
        }`}>
          {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          {change}
        </div>
      </div>
      <div>
        <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{value}</p>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{title}</p>
      </div>
    </div>
  );
}

export function FinancialMetrics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        title="Receita Mensal"
        value="R$ 48.750"
        change="+12.5%"
        isPositive={true}
        icon={<DollarSign className="w-6 h-6 text-primary" />}
      />
      <MetricCard
        title="Margem Líquida"
        value="23.8%"
        change="+2.1%"
        isPositive={true}
        icon={<TrendingUp className="w-6 h-6 text-primary" />}
      />
      <MetricCard
        title="Cash Flow"
        value="R$ 12.340"
        change="-5.2%"
        isPositive={false}
        icon={<Activity className="w-6 h-6 text-primary" />}
      />
      <MetricCard
        title="Runway"
        value="8.2 meses"
        change="+0.8"
        isPositive={true}
        icon={<TrendingUp className="w-6 h-6 text-primary" />}
      />
    </div>
  );
}
