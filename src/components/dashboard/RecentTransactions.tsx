"use client";

import { ArrowUpRight, ArrowDownRight, MoreVertical } from "lucide-react";

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

export function RecentTransactions() {
  return (
    <div className="glass-morphism rounded-2xl border border-white/10 dark:border-white/5">
      <div className="p-6 border-b border-white/10 dark:border-white/5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Últimas Movimentações
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Transações recentes da sua conta
            </p>
          </div>
          <button className="w-8 h-8 rounded-lg hover:bg-white/10 dark:hover:bg-white/5 flex items-center justify-center transition-colors">
            <MoreVertical className="w-4 h-4 text-slate-600 dark:text-slate-400" />
          </button>
        </div>
      </div>
      
      <div className="divide-y divide-white/10 dark:border-white/5">
        {recentTransactions.map((transaction) => (
          <div key={transaction.id} className="p-4 hover:bg-white/5 dark:hover:bg-white/2 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  transaction.type === 'income' 
                    ? 'bg-emerald-500/10 border border-emerald-500/20' 
                    : 'bg-red-500/10 border border-red-500/20'
                }`}>
                  {transaction.type === 'income' ? (
                    <ArrowUpRight className="w-5 h-5 text-emerald-500" />
                  ) : (
                    <ArrowDownRight className="w-5 h-5 text-red-500" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-slate-900 dark:text-slate-100">
                    {transaction.description}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-slate-600 dark:text-slate-400">
                      {transaction.category}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-500">
                      • {transaction.date}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <p className={`font-semibold ${
                  transaction.type === 'income' 
                    ? 'text-emerald-500' 
                    : 'text-red-500'
                }`}>
                  {transaction.type === 'income' ? '+' : '-'}{transaction.amount}
                </p>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  transaction.status === 'completed'
                    ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                    : 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                }`}>
                  {transaction.status === 'completed' ? 'Concluído' : 'Pendente'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
