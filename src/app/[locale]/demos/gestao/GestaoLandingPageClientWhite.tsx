"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { 
  ArrowLeft, BarChart3, Package, TrendingUp, DollarSign, ShoppingCart, Users,
  ArrowRight, ArrowUpRight, ArrowDownRight, AlertCircle, CheckCircle2, Clock,
  Linkedin, Github, Mail, Filter, Download, Calendar, X, ChevronDown, FileText, FileSpreadsheet
} from "lucide-react";
import { useState } from "react";
import RatingModal from "@/components/RatingModal";
import PricingPlans from "@/components/saas/PricingPlans";
import FeatureShowcase from "@/components/saas/FeatureShowcase";
import { smoothScroll } from "@/utils/smoothScroll";

// Simple Bar Chart Component com dados dinâmicos
function RevenueChart({ period, t }: { period: "month" | "year"; t: (key: string, params?: Record<string, string | number>) => string }) {
  const monthData = [
    { month: "Jan", value: 45 },
    { month: "Fev", value: 52 },
    { month: "Mar", value: 48 },
    { month: "Abr", value: 65 },
    { month: "Mai", value: 58 },
    { month: "Jun", value: 82 },
  ];
  
  const yearData = [
    { month: "2020", value: 35 },
    { month: "2021", value: 48 },
    { month: "2022", value: 62 },
    { month: "2023", value: 78 },
    { month: "2024", value: 89 },
    { month: "2025", value: 95 },
  ];
  
  const data = period === "month" ? monthData : yearData;
  
  return (
    <div className="h-48 flex items-end justify-between gap-2">
      {data.map((item) => (
        <div key={item.month} className="flex-1 flex flex-col items-center gap-2">
          <div 
            className="w-full bg-gradient-to-t from-indigo-500 to-indigo-400 rounded-t-lg transition-all duration-500 hover:from-indigo-400 hover:to-indigo-300"
            style={{ height: `${item.value * 2}px` }}
          />
          <span className="text-xs text-slate-600">{item.month}</span>
        </div>
      ))}
    </div>
  );
}

// Inventory Table Component
function InventoryTable({ filter, t }: { filter: string; t: (key: string, params?: Record<string, string | number>) => string }) {
  const items = [
    { sku: "SKU001", name: "Produto Premium A", stock: 245, status: "ok", minStock: 50 },
    { sku: "SKU002", name: "Produto Standard B", stock: 23, status: "low", minStock: 25 },
    { sku: "SKU003", name: "Produto Basic C", stock: 8, status: "critical", minStock: 10 },
    { sku: "SKU004", name: "Produto Premium D", stock: 156, status: "ok", minStock: 40 },
    { sku: "SKU005", name: "Produto Standard E", stock: 67, status: "ok", minStock: 30 },
  ];

  const filteredItems = items.filter(item => filter === "all" || item.status === filter);

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-200">
            <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">{t("product")}</th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">{t("sku")}</th>
            <th className="text-center py-3 px-4 text-sm font-semibold text-slate-700">{t("stock")}</th>
            <th className="text-center py-3 px-4 text-sm font-semibold text-slate-700">{t("status")}</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {filteredItems.map((item) => (
            <tr key={item.sku} className="border-b border-slate-100 hover:bg-slate-50">
              <td className="py-3 px-4 font-medium text-slate-900">{item.name}</td>
              <td className="py-3 px-4 text-slate-500 font-mono text-xs">{item.sku}</td>
              <td className="py-3 px-4 text-center">
                <span className={`font-semibold ${item.stock < item.minStock ? 'text-amber-600' : 'text-slate-700'}`}>
                  {item.stock}
                </span>
              </td>
              <td className="py-3 px-4 text-center">
                {item.status === "ok" && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs">
                    <CheckCircle2 className="w-3 h-3" /> {t("status_ok")}
                  </span>
                )}
                {item.status === "low" && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-amber-100 text-amber-700 text-xs">
                    <AlertCircle className="w-3 h-3" /> {t("status_low")}
                  </span>
                )}
                {item.status === "critical" && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-red-100 text-red-700 text-xs">
                    <AlertCircle className="w-3 h-3" /> {t("status_critical")}
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Recent Sales Component
function RecentSales({ t }: { t: (key: string, params?: Record<string, string | number>) => string }) {
  const sales = [
    { id: "001", customer: "João Silva", value: 1250, status: "completed" },
    { id: "002", customer: "Maria Santos", value: 890, status: "processing" },
    { id: "003", customer: "Pedro Costa", value: 2100, status: "completed" },
    { id: "004", customer: "Ana Oliveira", value: 450, status: "pending" },
  ];

  return (
    <div className="space-y-3">
      {sales.map((sale) => (
        <div key={sale.id} className="flex items-center justify-between p-3 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <p className="font-medium text-slate-900">{sale.customer}</p>
              <p className="text-xs text-slate-500">#{sale.id}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-semibold text-slate-900">R$ {sale.value.toLocaleString('pt-BR')}</p>
            <p className="text-xs text-slate-500">{t(sale.status)}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// Product Registration Form
function ProductForm({ t }: { t: (key: string, params?: Record<string, string | number>) => string }) {
  const [product, setProduct] = useState({ name: "", price: "", stock: "" });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
    setProduct({ name: "", price: "", stock: "" });
  };

  if (showSuccess) {
    return (
      <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center animate-in fade-in">
        <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 flex items-center justify-center mb-2">
          <CheckCircle2 className="w-6 h-6 text-emerald-600" />
        </div>
        <p className="text-emerald-700 font-semibold text-sm">{t("product_registered")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input 
        type="text"
        placeholder={t("product_name")}
        value={product.name}
        onChange={(e) => setProduct({...product, name: e.target.value})}
        className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
      />
      <div className="flex gap-2">
        <input 
          type="text"
          placeholder={t("price")}
          value={product.price}
          onChange={(e) => setProduct({...product, price: e.target.value})}
          className="flex-1 px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
        <input 
          type="number" 
          placeholder={t("quantity")}
          value={product.stock}
          onChange={(e) => setProduct({...product, stock: e.target.value})}
          className="w-20 px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
      </div>
      <button 
        type="submit"
        className="w-full py-2 rounded-lg bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
      >
        <Package className="w-4 h-4" /> {t("register")}
      </button>
    </form>
  );
}

// Sales Progress Component
function SalesProgress({ current, goal, t, onSale }: { 
  current: number; 
  goal: number; 
  t: (key: string, params?: Record<string, string | number>) => string;
  onSale?: () => void;
}) {
  const percentage = Math.round((current / goal) * 100);

  return (
    <div className="space-y-3">
      <div className="flex justify-between text-sm">
        <span className="text-slate-600">{t("progress")}</span>
        <span className="text-indigo-600 font-semibold">{percentage}%</span>
      </div>
      <div className="h-3 rounded-full bg-slate-200 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 transition-all duration-500"
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
      <div className="flex gap-2 pt-2">
        <button 
          onClick={onSale}
          className="flex-1 py-2 rounded-lg bg-indigo-50 text-indigo-600 text-xs font-semibold hover:bg-indigo-100 transition-colors"
        >
          {t("sale_amount", { amount: "2.500" })}
        </button>
        <button 
          onClick={() => {/* Reset functionality handled by parent */}}
          className="px-3 py-2 rounded-lg bg-slate-100 text-slate-600 text-xs hover:bg-slate-200 transition-colors"
        >
          {t("reset")}
        </button>
      </div>
    </div>
  );
}

// ROI Calculator Component
function ROICalculator({ t }: { t: (key: string, params?: Record<string, string | number>) => string }) {
  const [investment, setInvestment] = useState(10000);
  const [returnValue, setReturnValue] = useState(15000);
  const roi = ((returnValue - investment) / investment * 100).toFixed(1);

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">{t("investment")}</label>
        <input
          type="number"
          value={investment}
          onChange={(e) => setInvestment(Number(e.target.value))}
          className="w-full px-2 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-900 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">{t("return")}</label>
        <input
          type="number"
          value={returnValue}
          onChange={(e) => setReturnValue(Number(e.target.value))}
          className="w-full px-2 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-900 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
      </div>
      <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-200 text-center">
        <p className="text-xs text-slate-600">ROI</p>
        <p className={`text-2xl font-bold ${Number(roi) >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
          {roi}%
        </p>
      </div>
    </div>
  );
}

// Filter Modal Component
function FilterModal({ isOpen, onClose, currentFilter, onFilterChange, t }: { 
  isOpen: boolean; 
  onClose: () => void; 
  currentFilter: string;
  onFilterChange: (filter: string) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}) {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white border border-slate-200 rounded-2xl p-6 w-80 shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-slate-900">{t("filter_stock")}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="space-y-2">
          <button 
            onClick={() => { onFilterChange("all"); onClose(); }}
            className={`w-full text-left px-4 py-3 rounded-xl transition-colors ${currentFilter === "all" ? "bg-indigo-50 text-indigo-600 border border-indigo-200" : "text-slate-700 hover:bg-slate-50"}`}
          >
            {t("all_products")}
          </button>
          <button 
            onClick={() => { onFilterChange("ok"); onClose(); }}
            className={`w-full text-left px-4 py-3 rounded-xl transition-colors ${currentFilter === "ok" ? "bg-emerald-50 text-emerald-600 border border-emerald-200" : "text-slate-700 hover:bg-slate-50"}`}
          >
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              {t("stock_ok")}
            </span>
          </button>
          <button 
            onClick={() => { onFilterChange("low"); onClose(); }}
            className={`w-full text-left px-4 py-3 rounded-xl transition-colors ${currentFilter === "low" ? "bg-amber-50 text-amber-600 border border-amber-200" : "text-slate-700 hover:bg-slate-50"}`}
          >
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              {t("stock_low")}
            </span>
          </button>
          <button 
            onClick={() => { onFilterChange("critical"); onClose(); }}
            className={`w-full text-left px-4 py-3 rounded-xl transition-colors ${currentFilter === "critical" ? "bg-red-50 text-red-600 border border-red-200" : "text-slate-700 hover:bg-slate-50"}`}
          >
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              {t("stock_critical")}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

// Download Modal Component
function DownloadModal({ isOpen, onClose, t }: { 
  isOpen: boolean; 
  onClose: () => void; 
  t: (key: string, params?: Record<string, string | number>) => string;
}) {
  if (!isOpen) return null;
  
  const generatePDF = () => {
    // Simulação de geração de PDF
    alert(t("generating_pdf"));
    onClose();
  };

  const generateCSV = () => {
    // Simulação de geração de CSV
    alert(t("generating_csv"));
    onClose();
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white border border-slate-200 rounded-2xl p-6 w-80 shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-slate-900">{t("export_report")}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="space-y-2">
          <button 
            onClick={generatePDF}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition-colors"
          >
            <FileText className="w-5 h-5" />
            <span className="font-medium">{t("download_pdf")}</span>
          </button>
          <button 
            onClick={generateCSV}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 hover:bg-emerald-100 transition-colors"
          >
            <FileSpreadsheet className="w-5 h-5" />
            <span className="font-medium">{t("download_csv")}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// Sales Modal Component
function SalesModal({ isOpen, onClose, t }: { 
  isOpen: boolean; 
  onClose: () => void; 
  t: (key: string, params?: Record<string, string | number>) => string;
}) {
  if (!isOpen) return null;

  const allSales = [
    { id: "001", customer: "João Silva", value: 1250, date: "2024-01-15", status: "completed" },
    { id: "002", customer: "Maria Santos", value: 890, date: "2024-01-14", status: "processing" },
    { id: "003", customer: "Pedro Costa", value: 2100, date: "2024-01-14", status: "completed" },
    { id: "004", customer: "Ana Oliveira", value: 450, date: "2024-01-13", status: "pending" },
    { id: "005", customer: "Carlos Ferreira", value: 3200, date: "2024-01-13", status: "completed" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs"><CheckCircle2 className="w-3 h-3" /> {t("completed")}</span>;
      case "processing":
        return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-amber-100 text-amber-700 text-xs"><Clock className="w-3 h-3" /> {t("processing")}</span>;
      case "pending":
        return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-slate-100 text-slate-700 text-xs"><AlertCircle className="w-3 h-3" /> {t("pending")}</span>;
      default:
        return null;
    }
  };

  const totalValue = allSales.reduce((acc, sale) => acc + sale.value, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-slate-900 text-lg">{t("all_sales")}</h3>
              <p className="text-sm text-slate-600">{t("total_sales")}: R$ {totalValue.toLocaleString('pt-BR')}</p>
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div className="overflow-y-auto max-h-[50vh] p-4">
          <div className="space-y-3">
            {allSales.map((sale) => (
              <div key={sale.id} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center">
                    <ShoppingCart className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">{sale.customer}</p>
                    <p className="text-sm text-slate-500">#{sale.id} • {sale.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-slate-900">R$ {sale.value.toLocaleString('pt-BR')}</p>
                  {getStatusBadge(sale.status)}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="p-4 border-t border-slate-200 bg-slate-50">
          <button 
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
          >
            {t("close")}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function GestaoLandingPageClient() {
  const t = useTranslations("Demos.gestao");
  const common = useTranslations("Demos.common");
  const [period, setPeriod] = useState<"month" | "year">("month");
  const [filter, setFilter] = useState("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [isRatingOpen, setIsRatingOpen] = useState(false);
  const [isSalesModalOpen, setIsSalesModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 text-slate-900">
      <RatingModal
        isOpen={isRatingOpen}
        onClose={() => setIsRatingOpen(false)}
        demoName="Portal de Gestão Integrada"
      />
      <FilterModal 
        isOpen={isFilterOpen} 
        onClose={() => setIsFilterOpen(false)} 
        currentFilter={filter}
        onFilterChange={setFilter}
        t={t}
      />
      <DownloadModal 
        isOpen={isDownloadOpen} 
        onClose={() => setIsDownloadOpen(false)} 
        t={t}
      />
      <SalesModal 
        isOpen={isSalesModalOpen} 
        onClose={() => setIsSalesModalOpen(false)}
        t={t}
      />

      {/* Botão Voltar */}
      <div className="fixed top-20 md:top-24 left-3 md:left-6 z-50">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full glass border border-indigo-400/50 bg-white/80 backdrop-blur-sm text-xs md:text-sm font-semibold text-indigo-600 hover:bg-indigo-50 hover:border-indigo-400 hover:text-indigo-700 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
        >
          <ArrowLeft className="w-3 h-3 md:w-4 md:h-4" />
          {common("backToPortfolio")}
        </Link>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden pt-20 md:pt-32 pb-8 md:pb-12">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-24 left-1/2 w-[30rem] md:w-[58rem] h-[30rem] md:h-[58rem] -translate-x-1/2 rounded-full bg-gradient-to-tr from-indigo-100 via-purple-50 to-transparent blur-3xl" />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl">
            <span className="inline-flex items-center gap-1.5 md:gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-2.5 py-1 md:px-4 md:py-2 mb-3 md:mb-6 text-xs md:text-sm font-semibold text-indigo-600">
              <BarChart3 className="w-3 h-3 md:w-4 md:h-4" />
              {t("badge")}
            </span>
            
            <h1 className="font-display text-2xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-3 md:mb-6">
              {t("title")}
            </h1>
            
            <p className="text-sm md:text-lg text-slate-600 leading-relaxed mb-4 md:mb-8 max-w-2xl">
              {t("hero_desc")}
            </p>

            <div className="flex flex-col sm:flex-row gap-2 md:gap-4">
              <button 
                onClick={() => smoothScroll('pricing')}
                className="inline-flex items-center justify-center gap-1.5 md:gap-2 rounded-xl bg-indigo-600 text-white font-semibold px-3 py-2 md:px-6 md:py-3 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-600/25 text-xs md:text-base"
              >
                {t("cta_primary")}
                <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
              </button>
              <button 
                onClick={() => smoothScroll('features')}
                className="inline-flex items-center justify-center gap-1.5 md:gap-2 rounded-xl border border-slate-200 bg-white text-slate-700 font-semibold px-3 py-2 md:px-6 md:py-3 transition-all hover:bg-slate-50 text-xs md:text-base"
              >
                {t("cta_secondary")}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Stats */}
      <section id="dashboard" className="py-4 md:py-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-4 md:mb-8">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-emerald-600" />
                </div>
                <span className="flex items-center gap-1 text-xs text-emerald-600">
                  <ArrowUpRight className="w-3 h-3" /> +12.5%
                </span>
              </div>
              <p className="text-slate-600 text-sm">{t("stats.revenue")}</p>
              <p className="text-2xl font-bold text-slate-900">R$ 128.450</p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6 text-indigo-600" />
                </div>
                <span className="flex items-center gap-1 text-xs text-emerald-600">
                  <ArrowUpRight className="w-3 h-3" /> +8.2%
                </span>
              </div>
              <p className="text-slate-600 text-sm">{t("stats.orders")}</p>
              <p className="text-2xl font-bold text-slate-900">1,234</p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <span className="flex items-center gap-1 text-xs text-emerald-600">
                  <ArrowUpRight className="w-3 h-3" /> +15.3%
                </span>
              </div>
              <p className="text-slate-600 text-sm">{t("stats.customers")}</p>
              <p className="text-2xl font-bold text-slate-900">8.549</p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
                <span className="flex items-center gap-1 text-xs text-red-600">
                  <ArrowDownRight className="w-3 h-3" /> -2.4%
                </span>
              </div>
              <p className="text-slate-600 text-sm">{t("stats.conversion")}</p>
              <p className="text-2xl font-bold text-slate-900">3.2%</p>
            </div>
          </div>

          {/* Interactive Dashboard */}
          <div className="grid lg:grid-cols-3 gap-4 md:gap-6">
            {/* Revenue Chart */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-slate-900">{t("revenue_chart")}</h3>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setPeriod("month")}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                      period === "month" 
                        ? "bg-indigo-100 text-indigo-700" 
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {t("monthly")}
                  </button>
                  <button 
                    onClick={() => setPeriod("year")}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                      period === "year" 
                        ? "bg-indigo-100 text-indigo-700" 
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {t("yearly")}
                  </button>
                </div>
              </div>
              <RevenueChart period={period} t={t} />
            </div>

            {/* Quick Actions */}
            <div className="space-y-4">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">{t("quick_actions")}</h3>
                <div className="space-y-2">
                  <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors text-left">
                    <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                      <Package className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-slate-900">{t("new_product")}</p>
                      <p className="text-sm text-slate-600">{t("add_inventory")}</p>
                    </div>
                  </button>
                  <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors text-left">
                    <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                      <BarChart3 className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-slate-900">{t("view_reports")}</p>
                      <p className="text-sm text-slate-600">{t("analytics")}</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Sales Progress */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <SalesProgress current={32500} goal={50000} t={t} onSale={() => console.log('Sale added')} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              {t("features_title")}
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              {t("features_desc")}
            </p>
          </div>

          <FeatureShowcase />
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <PricingPlans />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-slate-600">
              © 2024 Felipe Gabriel. {t("all_rights")}
            </div>
            <div className="flex gap-4">
              <a href="https://linkedin.com/in/fgcode" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-600 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://github.com/fgcode" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-600 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="mailto:contato@fgcode.dev" className="text-slate-400 hover:text-slate-600 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
