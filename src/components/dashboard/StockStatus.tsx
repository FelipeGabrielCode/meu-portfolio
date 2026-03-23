"use client";

import { Package, AlertTriangle, CheckCircle, Clock, ShoppingCart, RefreshCw } from "lucide-react";
import { useTranslations } from "next-intl";

interface StockItem {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  minStock: number;
  maxCapacity: number;
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
    maxCapacity: 20,
    status: "normal",
    category: "Eletrônicos"
  },
  {
    id: "2",
    name: "Mouse Logitech MX3",
    sku: "MS-002", 
    quantity: 3,
    minStock: 10,
    maxCapacity: 25,
    status: "critical",
    category: "Acessórios"
  },
  {
    id: "3",
    name: "Monitor LG 27\"",
    sku: "MN-003",
    quantity: 8,
    minStock: 5,
    maxCapacity: 15,
    status: "normal", 
    category: "Eletrônicos"
  },
  {
    id: "4",
    name: "Teclado Mecânico",
    sku: "KB-004",
    quantity: 6,
    minStock: 8,
    maxCapacity: 20,
    status: "low",
    category: "Acessórios"
  }
];

// Componente de Barra de Progresso
function ProgressBar({ quantity, minStock, maxCapacity, status }: { quantity: number; minStock: number; maxCapacity: number; status: StockItem['status'] }) {
  const progressPercentage = (quantity / maxCapacity) * 100;
  const minPercentage = (minStock / maxCapacity) * 100;
  
  const getProgressColor = () => {
    switch (status) {
      case 'normal': return 'bg-emerald-500';
      case 'low': return 'bg-amber-500';
      case 'critical': return 'bg-red-500';
    }
  };
  
  return (
    <div className="relative w-full h-2 bg-slate-800 rounded-full overflow-hidden">
      {/* Linha do mínimo */}
      <div 
        className="absolute top-0 left-0 h-full w-0.5 bg-slate-600"
        style={{ left: `${minPercentage}%` }}
      />
      
      {/* Barra de progresso */}
      <div 
        className={`h-full transition-all duration-500 ${getProgressColor()}`}
        style={{ width: `${progressPercentage}%` }}
      />
      
      {/* Indicador do mínimo */}
      <div 
        className="absolute top-0 left-0 h-full w-0.5 bg-slate-600"
        style={{ left: `${minPercentage}%` }}
      />
    </div>
  );
}

// Componente de Botão de Reposição
function RestockButton({ onClick, isCritical }: { onClick: () => void; isCritical: boolean }) {
  return (
    <button
      onClick={onClick}
      className={`opacity-0 group-hover:opacity-100 transition-all duration-300 px-3 py-1.5 text-xs font-medium rounded-lg flex items-center gap-1.5 ${
        isCritical 
          ? 'bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30 animate-pulse'
          : 'bg-violet-500/20 text-violet-400 border border-violet-500/30 hover:bg-violet-500/30'
      }`}
    >
      <ShoppingCart className="w-3 h-3" />
      Solicitar Reposição
    </button>
  );
}

export function StockStatus() {
  const t = useTranslations("Dashboard");
  
  const getStatusColor = (status: StockItem['status']) => {
    switch (status) {
      case 'normal':
        return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';
      case 'low':
        return 'bg-amber-500/10 text-amber-400 border border-amber-500/20';
      case 'critical':
        return 'bg-red-500/10 text-red-400 border border-red-500/20';
    }
  };

  const getStatusIcon = (status: StockItem['status']) => {
    switch (status) {
      case 'normal':
        return <CheckCircle className="w-4 h-4" />;
      case 'low':
        return <Clock className="w-4 h-4" />;
      case 'critical':
        return <AlertTriangle className={`w-4 h-4 ${status === 'critical' ? 'animate-pulse' : ''}`} />;
    }
  };

  const getStatusText = (status: StockItem['status']) => {
    switch (status) {
      case 'normal':
        return t("stockStatus.normal");
      case 'low':
        return t("stockStatus.low");
      case 'critical':
        return t("stockStatus.critical");
    }
  };
  
  const handleRestock = (itemId: string) => {
    console.log(`Requesting restock for item ${itemId}`);
  };
  
  const criticalItems = stockItems.filter(item => item.status === 'critical').length;

  return (
    <div className="bg-white/[0.02] backdrop-blur-xl rounded-2xl border border-white/5 shadow-2xl">
      {/* Header */}
      <div className="p-6 border-b border-white/5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-100">
              {t("stockStatus.title")}
            </h3>
            <p className="text-sm text-slate-400 mt-1">
              {t("stockStatus.subtitle")}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${criticalItems > 0 ? 'bg-red-500 animate-pulse' : 'bg-emerald-500'}`}></span>
            <span className="text-xs text-slate-400">
              {criticalItems > 0 ? `${criticalItems} ${t("stockStatus.alerts")}` : t("stockStatus.noAlerts")}
            </span>
          </div>
        </div>
      </div>

      {/* Items List */}
      <div className="p-6">
        <div className="space-y-4">
          {stockItems.map((item) => (
            <div 
              key={item.id} 
              className="group relative p-4 rounded-xl hover:bg-white/[0.02] transition-all duration-300 hover:border-l-2 hover:border-l-violet-500/50"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center group-hover:bg-violet-500/20 transition-colors duration-300">
                    <Package className="w-5 h-5 text-violet-400" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-100">
                      {item.name}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-slate-400">
                        SKU: {item.sku}
                      </span>
                      <span className="text-xs text-slate-500">
                        • {item.category}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right min-w-[80px]">
                    <p className="font-bold text-slate-100">
                      {item.quantity} un
                    </p>
                    <p className="text-xs text-slate-400">
                      {t("stockStatus.min")}: {item.minStock}
                    </p>
                  </div>
                  
                  {/* Barra de Progresso */}
                  <div className="w-32">
                    <ProgressBar 
                      quantity={item.quantity}
                      minStock={item.minStock}
                      maxCapacity={item.maxCapacity}
                      status={item.status}
                    />
                  </div>
                  
                  {/* Status Badge */}
                  <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${getStatusColor(item.status)} ${
                    item.status === 'critical' ? 'animate-pulse' : ''
                  }`}>
                    {getStatusIcon(item.status)}
                    {getStatusText(item.status)}
                  </div>
                  
                  {/* Botão de Reposição (aparece no hover para itens críticos) */}
                  {item.status === 'critical' && (
                    <div className="absolute right-4 top-4">
                      <RestockButton 
                        onClick={() => handleRestock(item.id)} 
                        isCritical={true}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
