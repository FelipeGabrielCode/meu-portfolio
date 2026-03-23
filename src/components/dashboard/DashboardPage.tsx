"use client";

import { FinancialMetrics } from "./FinancialMetrics";
import { RecentTransactions } from "./RecentTransactions";
import { StockStatus } from "./StockStatus";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-100 mb-2">Dashboard Executivo</h1>
          <p className="text-slate-400">Visão geral em tempo real do seu negócio</p>
        </div>

        {/* Grid principal responsivo */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          {/* FinancialMetrics - ocupa todas as colunas em mobile, 8 colunas em xl */}
          <div className="xl:col-span-8">
            <FinancialMetrics />
          </div>
          
          {/* StockStatus - ocupa todas as colunas em mobile, 4 colunas em xl */}
          <div className="xl:col-span-4">
            <StockStatus />
          </div>
          
          {/* RecentTransactions - ocupa todas as colunas */}
          <div className="xl:col-span-12">
            <RecentTransactions />
          </div>
        </div>
      </div>
    </div>
  );
}
