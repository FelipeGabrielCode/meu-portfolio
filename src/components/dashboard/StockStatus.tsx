"use client";

import { Package, AlertTriangle, CheckCircle, Clock } from "lucide-react";

interface StockItem {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  minStock: number;
  status: 'normal' | 'low' | 'critical';
  category: string;
}

const stockItems: StockItem[] = [
  {
    id: "1",
    name: "Notebook Dell Inspiron",
    sku: "NB-001",
    quantity: 12,
    minStock: 5,
    status: "normal",
    category: "Eletrônicos"
  },
  {
    id: "2",
    name: "Mouse Logitech MX3",
    sku: "MS-002", 
    quantity: 3,
    minStock: 10,
    status: "critical",
    category: "Acessórios"
  },
  {
    id: "3",
    name: "Monitor LG 27\"",
    sku: "MN-003",
    quantity: 8,
    minStock: 5,
    status: "normal", 
    category: "Eletrônicos"
  },
  {
    id: "4",
    name: "Teclado Mecânico",
    sku: "KB-004",
    quantity: 6,
    minStock: 8,
    status: "low",
    category: "Acessórios"
  }
];

export function StockStatus() {
  const getStatusColor = (status: StockItem['status']) => {
    switch (status) {
      case 'normal':
        return 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20';
      case 'low':
        return 'bg-amber-500/10 text-amber-500 border border-amber-500/20';
      case 'critical':
        return 'bg-red-500/10 text-red-500 border border-red-500/20';
    }
  };

  const getStatusIcon = (status: StockItem['status']) => {
    switch (status) {
      case 'normal':
        return <CheckCircle className="w-4 h-4" />;
      case 'low':
        return <Clock className="w-4 h-4" />;
      case 'critical':
        return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const getStatusText = (status: StockItem['status']) => {
    switch (status) {
      case 'normal':
        return 'Normal';
      case 'low':
        return 'Baixo';
      case 'critical':
        return 'Crítico';
    }
  };

  return (
    <div className="glass-morphism rounded-2xl border border-white/10 dark:border-white/5">
      <div className="p-6 border-b border-white/10 dark:border-white/5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Status de Estoque
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Controle de inventário em tempo real
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500"></span>
            <span className="text-xs text-slate-600 dark:text-slate-400">2 alertas</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-4">
          {stockItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4 rounded-xl hover:bg-white/5 dark:hover:bg-white/2 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Package className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-slate-900 dark:text-slate-100">
                    {item.name}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-slate-600 dark:text-slate-400">
                      SKU: {item.sku}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-500">
                      • {item.category}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="font-semibold text-slate-900 dark:text-slate-100">
                    {item.quantity} un
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Mín: {item.minStock}
                  </p>
                </div>
                
                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                  {getStatusIcon(item.status)}
                  {getStatusText(item.status)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
