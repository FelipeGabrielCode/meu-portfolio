"use client";

import { useState } from "react";
import { ArrowUpRight, ArrowDownRight, MoreVertical, Search, Filter, Receipt, Eye } from "lucide-react";
import { useTranslations } from "next-intl";

interface Transaction {
  id: string;
  description: string;
  category: string;
  amount: string;
  type: 'income' | 'expense';
  date: string;
  status: 'completed' | 'pending';
}

const recentTransactions: Transaction[] = [
  {
    id: "1",
    description: "Pagamento Cliente #4521",
    category: "Receita",
    amount: "R$ 8.750",
    type: "income",
    date: "Hoje, 14:23",
    status: "completed"
  },
  {
    id: "2", 
    description: "Aluguel Escritório",
    category: "Fixo",
    amount: "R$ 3.200",
    type: "expense",
    date: "Ontem, 09:00",
    status: "completed"
  },
  {
    id: "3",
    description: "Software SaaS",
    category: "Variável",
    amount: "R$ 487",
    type: "expense", 
    date: "2 dias atrás",
    status: "pending"
  },
  {
    id: "4",
    description: "Consulta Projeto X",
    category: "Receita",
    amount: "R$ 2.150",
    type: "income",
    date: "3 dias atrás",
    status: "completed"
  },
  {
    id: "5",
    description: "Marketing Digital",
    category: "Marketing",
    amount: "R$ 1.230",
    type: "expense",
    date: "4 dias atrás", 
    status: "completed"
  }
];

// Componente de Botão Fantasma
function GhostButton({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className="opacity-0 group-hover:opacity-100 transition-all duration-300 px-3 py-1 text-xs font-medium text-violet-400 hover:text-violet-300 hover:bg-violet-500/10 rounded-lg border border-violet-500/20 hover:border-violet-400/30"
    >
      {children}
    </button>
  );
}

export function RecentTransactions() {
  const t = useTranslations("Dashboard");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  
  const filters = [
    { id: "all", label: t("transactions.filters.all") },
    { id: "month", label: t("transactions.filters.thisMonth") },
    { id: "week", label: t("transactions.filters.last7Days") }
  ];
  
  const handleViewDetails = (transactionId: string) => {
    console.log(`Viewing details for transaction ${transactionId}`);
  };
  
  const handleViewReceipt = (transactionId: string) => {
    console.log(`Viewing receipt for transaction ${transactionId}`);
  };

  return (
    <div className="bg-white/[0.02] backdrop-blur-xl rounded-2xl border border-white/5 shadow-2xl">
      {/* Header com busca e filtros */}
      <div className="p-6 border-b border-white/5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-slate-100">
              {t("transactions.title")}
            </h3>
            <p className="text-sm text-slate-400 mt-1">
              {t("transactions.subtitle")}
            </p>
          </div>
          <button className="w-8 h-8 rounded-lg hover:bg-white/5 flex items-center justify-center transition-colors duration-300">
            <MoreVertical className="w-4 h-4 text-slate-400" />
          </button>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          {/* Busca */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder={t("transactions.searchPlaceholder")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/[0.02] border border-white/5 rounded-lg text-slate-100 placeholder-slate-500 focus:border-violet-500/30 focus:outline-none transition-colors duration-300"
            />
          </div>
          
          {/* Filtros */}
          <div className="flex gap-2">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-3 py-2 text-xs font-medium rounded-lg transition-all duration-300 ${
                  activeFilter === filter.id
                    ? 'bg-violet-500/20 text-violet-400 border border-violet-500/30'
                    : 'bg-white/[0.02] text-slate-400 border border-white/5 hover:bg-white/[0.05] hover:text-slate-300'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Lista de transações */}
      <div className="divide-y divide-white/5">
        {recentTransactions.map((transaction) => (
          <div 
            key={transaction.id} 
            className="group p-4 hover:bg-white/[0.02] transition-all duration-300 hover:border-l-2 hover:border-l-violet-500"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${
                  transaction.type === 'income' 
                    ? 'bg-emerald-500/10 border border-emerald-500/20 group-hover:bg-emerald-500/20' 
                    : 'bg-red-500/10 border border-red-500/20 group-hover:bg-red-500/20'
                }`}>
                  {transaction.type === 'income' ? (
                    <ArrowUpRight className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <ArrowDownRight className="w-5 h-5 text-red-400" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-slate-100">
                    {transaction.description}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-slate-400">
                      {transaction.category}
                    </span>
                    <span className="text-xs text-slate-500">
                      • {transaction.date}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className={`font-bold font-mono text-lg ${
                    transaction.type === 'income' 
                      ? 'text-emerald-400' 
                      : 'text-red-400'
                  }`}>
                    {transaction.type === 'income' ? '+' : '-'}{transaction.amount}
                  </p>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    transaction.status === 'completed'
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  }`}>
                    {transaction.status === 'completed' ? t("transactions.status.completed") : t("transactions.status.pending")}
                  </span>
                </div>
                
                {/* Botões fantasma que aparecem no hover */}
                <div className="flex items-center gap-2">
                  <GhostButton onClick={() => handleViewReceipt(transaction.id)}>
                    <Receipt className="w-3 h-3 mr-1" />
                    {t("transactions.actions.receipt")}
                  </GhostButton>
                  <GhostButton onClick={() => handleViewDetails(transaction.id)}>
                    <Eye className="w-3 h-3 mr-1" />
                    {t("transactions.actions.details")}
                  </GhostButton>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
