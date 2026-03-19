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

// Simple Bar Chart Component com dados dinâmicos
function RevenueChart({ period }: { period: "month" | "year" }) {
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
          <span className="text-xs text-slate-400">{item.month}</span>
        </div>
      ))}
    </div>
  );
}

// Stock Status Table com filtro
function StockTable({ filter }: { filter: string }) {
  const items = [
    { name: "Notebook Dell XPS", sku: "NB-DEL-001", stock: 45, min: 20, status: "ok", category: "eletronicos" },
    { name: "Mouse Logitech MX", sku: "MOUSE-LOG-002", stock: 8, min: 15, status: "low", category: "perifericos" },
    { name: "Teclado Mecânico", sku: "KEY-MECH-003", stock: 23, min: 10, status: "ok", category: "perifericos" },
    { name: "Monitor 27\" 4K", sku: "MON-27-004", stock: 3, min: 5, status: "critical", category: "eletronicos" },
    { name: "Webcam HD", sku: "CAM-HD-005", stock: 67, min: 25, status: "ok", category: "perifericos" },
    { name: "Cadeira Ergonomica", sku: "CAD-ERG-006", stock: 12, min: 8, status: "ok", category: "moveis" },
    { name: "Mesa Digital", sku: "MESA-DIG-007", stock: 5, min: 10, status: "low", category: "moveis" },
  ];
  
  const filteredItems = filter === "all" ? items : items.filter(item => item.status === filter);
  
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-700/50">
            <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase">Produto</th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase">SKU</th>
            <th className="text-center py-3 px-4 text-xs font-semibold text-slate-400 uppercase">Estoque</th>
            <th className="text-center py-3 px-4 text-xs font-semibold text-slate-400 uppercase">Status</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {filteredItems.map((item) => (
            <tr key={item.sku} className="border-b border-slate-800/50 hover:bg-slate-800/30">
              <td className="py-3 px-4 font-medium text-slate-200">{item.name}</td>
              <td className="py-3 px-4 text-slate-500 font-mono text-xs">{item.sku}</td>
              <td className="py-3 px-4 text-center">
                <span className={`font-semibold ${item.stock < item.min ? "text-red-400" : "text-emerald-400"}`}>
                  {item.stock}
                </span>
                <span className="text-slate-600 text-xs ml-1">/ {item.min} min</span>
              </td>
              <td className="py-3 px-4 text-center">
                {item.status === "ok" && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs">
                    <CheckCircle2 className="w-3 h-3" /> OK
                  </span>
                )}
                {item.status === "low" && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs">
                    <AlertCircle className="w-3 h-3" /> Baixo
                  </span>
                )}
                {item.status === "critical" && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-red-500/10 text-red-400 text-xs">
                    <AlertCircle className="w-3 h-3" /> Crítico
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

// Recent Sales Widget
function SalesWidget() {
  const sales = [
    { id: "#1234", client: "Empresa ABC", value: "R$ 12.450", status: "completed", time: "2 min" },
    { id: "#1233", client: "Tech Solutions", value: "R$ 8.320", status: "processing", time: "5 min" },
    { id: "#1232", client: "Consultoria XYZ", value: "R$ 15.780", status: "completed", time: "12 min" },
    { id: "#1231", client: "Startup Inno", value: "R$ 4.590", status: "pending", time: "18 min" },
  ];
  
  return (
    <div className="space-y-3">
      {sales.map((sale) => (
        <div key={sale.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-800/30 border border-slate-700/30 hover:bg-slate-800/50 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <p className="font-medium text-slate-200 text-sm">{sale.client}</p>
              <p className="text-xs text-slate-500">{sale.id}  {sale.time}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-semibold text-slate-200 text-sm">{sale.value}</p>
            {sale.status === "completed" && <span className="text-xs text-emerald-400">Concluído</span>}
            {sale.status === "processing" && <span className="text-xs text-amber-400">Processando</span>}
            {sale.status === "pending" && <span className="text-xs text-slate-400">Pendente</span>}
          </div>
        </div>
      ))}
    </div>
  );
}

// Modal de Filtro
function FilterModal({ isOpen, onClose, currentFilter, onFilterChange }: { 
  isOpen: boolean; 
  onClose: () => void; 
  currentFilter: string;
  onFilterChange: (filter: string) => void;
}) {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 w-80 shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-slate-100">Filtrar Estoque</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-200">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="space-y-2">
          <button 
            onClick={() => { onFilterChange("all"); onClose(); }}
            className={`w-full text-left px-4 py-3 rounded-xl transition-colors ${currentFilter === "all" ? "bg-indigo-500/20 text-indigo-400 border border-indigo-500/30" : "text-slate-300 hover:bg-slate-800"}`}
          >
            Todos os Produtos
          </button>
          <button 
            onClick={() => { onFilterChange("ok"); onClose(); }}
            className={`w-full text-left px-4 py-3 rounded-xl transition-colors ${currentFilter === "ok" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "text-slate-300 hover:bg-slate-800"}`}
          >
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Estoque OK
            </span>
          </button>
          <button 
            onClick={() => { onFilterChange("low"); onClose(); }}
            className={`w-full text-left px-4 py-3 rounded-xl transition-colors ${currentFilter === "low" ? "bg-amber-500/20 text-amber-400 border border-amber-500/30" : "text-slate-300 hover:bg-slate-800"}`}
          >
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              Estoque Baixo
            </span>
          </button>
          <button 
            onClick={() => { onFilterChange("critical"); onClose(); }}
            className={`w-full text-left px-4 py-3 rounded-xl transition-colors ${currentFilter === "critical" ? "bg-red-500/20 text-red-400 border border-red-500/30" : "text-slate-300 hover:bg-slate-800"}`}
          >
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-400" />
              Estoque Crítico
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

// Modal de Download - Gera arquivos reais
function DownloadModal({ isOpen, onClose, filter }: { isOpen: boolean; onClose: () => void; filter: string }) {
  if (!isOpen) return null;

  const items = [
    { name: "Notebook Dell XPS", sku: "NB-DEL-001", stock: 45, min: 20, status: "ok", category: "eletronicos" },
    { name: "Mouse Logitech MX", sku: "MOUSE-LOG-002", stock: 8, min: 15, status: "low", category: "perifericos" },
    { name: "Teclado Mecânico", sku: "KEY-MECH-003", stock: 23, min: 10, status: "ok", category: "perifericos" },
    { name: "Monitor 27\" 4K", sku: "MON-27-004", stock: 3, min: 5, status: "critical", category: "eletronicos" },
    { name: "Webcam HD", sku: "CAM-HD-005", stock: 67, min: 25, status: "ok", category: "perifericos" },
    { name: "Cadeira Ergonomica", sku: "CAD-ERG-006", stock: 12, min: 8, status: "ok", category: "moveis" },
    { name: "Mesa Digital", sku: "MESA-DIG-007", stock: 5, min: 10, status: "low", category: "moveis" },
  ];
  
  const filteredItems = filter === "all" ? items : items.filter(item => item.status === filter);
  
  const generateCSV = () => {
    const headers = ["Produto", "SKU", "Estoque", "Mínimo", "Status"];
    const rows = filteredItems.map(item => [
      item.name,
      item.sku,
      item.stock,
      item.min,
      item.status === "ok" ? "OK" : item.status === "low" ? "Baixo" : "Crítico"
    ]);
    
    const csvContent = [headers.join(","), ...rows.map(row => row.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `relatorio_estoque_${filter}_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    onClose();
  };

  const generatePDF = () => {
    // Criar conteúdo HTML para o PDF
    const date = new Date().toLocaleDateString('pt-BR');
    const filterLabel = filter === "all" ? "Todos" : filter === "ok" ? "OK" : filter === "low" ? "Baixo" : "Crítico";
    
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Relatório de Estoque</title>
<style>
body { font-family: Arial, sans-serif; margin: 40px; color: #333; }
h1 { color: #4f46e5; border-bottom: 2px solid #4f46e5; padding-bottom: 10px; }
.info { margin: 20px 0; color: #666; }
table { width: 100%; border-collapse: collapse; margin-top: 20px; }
th { background: #4f46e5; color: white; padding: 12px; text-align: left; }
td { padding: 10px; border-bottom: 1px solid #ddd; }
.status-ok { color: #10b981; font-weight: bold; }
.status-low { color: #f59e0b; font-weight: bold; }
.status-critical { color: #ef4444; font-weight: bold; }
.footer { margin-top: 40px; font-size: 12px; color: #999; text-align: center; }
</style>
</head>
<body>
<h1>📦 Relatório de Estoque</h1>
<div class="info">
  <strong>Data:</strong> ${date}<br>
  <strong>Filtro aplicado:</strong> ${filterLabel}<br>
  <strong>Total de itens:</strong> ${filteredItems.length}
</div>
<table>
  <tr>
    <th>Produto</th>
    <th>SKU</th>
    <th>Estoque</th>
    <th>Mínimo</th>
    <th>Status</th>
  </tr>
  ${filteredItems.map(item => {
    const statusClass = item.status === 'ok' ? 'status-ok' : item.status === 'low' ? 'status-low' : 'status-critical';
    const statusText = item.status === 'ok' ? 'OK' : item.status === 'low' ? 'Baixo' : 'Crítico';
    return `<tr>
      <td>${item.name}</td>
      <td>${item.sku}</td>
      <td>${item.stock}</td>
      <td>${item.min}</td>
      <td class="${statusClass}">${statusText}</td>
    </tr>`;
  }).join('')}
</table>
<div class="footer">
  Gerado em ${date} - Sistema de Gestão Integrada
</div>
</body>
</html>`;

    // Criar Blob do HTML
    const htmlBlob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const htmlUrl = URL.createObjectURL(htmlBlob);
    
    // Abrir em nova janela para impressão PDF
    const printWindow = window.open(htmlUrl, '_blank');
    if (printWindow) {
      printWindow.onload = () => {
        printWindow.print();
      };
    }
    
    onClose();
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 w-80 shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-slate-100">Exportar Relatório</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-200">
            <X className="w-5 h-5" />
          </button>
        </div>
        <p className="text-sm text-slate-400 mb-2">Filtro atual: <span className="text-indigo-400 font-medium">{filter === "all" ? "Todos" : filter}</span></p>
        <p className="text-sm text-slate-500 mb-4">{filteredItems.length} itens serão exportados</p>
        <div className="space-y-2">
          <button 
            onClick={generatePDF}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20 transition-colors"
          >
            <FileText className="w-5 h-5" />
            <span className="font-medium">Download PDF</span>
          </button>
          <button 
            onClick={generateCSV}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 transition-colors"
          >
            <FileSpreadsheet className="w-5 h-5" />
            <span className="font-medium">Download CSV</span>
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

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
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
      />
      <DownloadModal 
        isOpen={isDownloadOpen} 
        onClose={() => setIsDownloadOpen(false)}
        filter={filter}
      />

      {/* Botão Voltar */}
      <div className="fixed top-24 left-6 z-50">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30 text-sm font-semibold text-primary hover:bg-primary/10 transition-all duration-300 hover:-translate-y-0.5"
        >
          <ArrowLeft className="w-4 h-4" />
          {common("backToPortfolio")}
        </Link>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-12">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-24 left-1/2 w-[58rem] h-[58rem] -translate-x-1/2 rounded-full bg-gradient-to-tr from-indigo-500/20 via-purple-500/10 to-transparent blur-3xl" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 mb-6 text-sm font-semibold text-indigo-400">
              <BarChart3 className="w-4 h-4" />
              {t("badge")}
            </span>
            
            <h1 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.05] mb-6">
              {t("title")}
            </h1>
            
            <p className="text-lg text-slate-400 leading-relaxed mb-8 max-w-2xl">
              {t("hero_desc")}
            </p>

            <div className="flex flex-wrap gap-4">
              <Link 
                href="#dashboard" 
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-500 text-white font-semibold px-6 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/25"
              >
                {t("cta_primary")}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                href="#features" 
                className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/50 px-6 py-3 font-semibold text-slate-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-600"
              >
                {t("cta_secondary")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Stats */}
      <section id="dashboard" className="py-8">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-500/20">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-emerald-400" />
                </div>
                <span className="flex items-center gap-1 text-xs text-emerald-400">
                  <ArrowUpRight className="w-3 h-3" /> +12.5%
                </span>
              </div>
              <p className="text-slate-400 text-sm">{t("stats.revenue")}</p>
              <p className="text-2xl font-bold text-slate-100">R$ 128.450</p>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-indigo-600/5 border border-indigo-500/20">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6 text-indigo-400" />
                </div>
                <span className="flex items-center gap-1 text-xs text-emerald-400">
                  <ArrowUpRight className="w-3 h-3" /> +8.2%
                </span>
              </div>
              <p className="text-slate-400 text-sm">{t("stats.orders")}</p>
              <p className="text-2xl font-bold text-slate-100">1.847</p>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                  <Package className="w-6 h-6 text-purple-400" />
                </div>
                <span className="flex items-center gap-1 text-xs text-amber-400">
                  <ArrowDownRight className="w-3 h-3" /> -2.1%
                </span>
              </div>
              <p className="text-slate-400 text-sm">{t("stats.products")}</p>
              <p className="text-2xl font-bold text-slate-100">3.294</p>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/20">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
                  <Users className="w-6 h-6 text-amber-400" />
                </div>
                <span className="flex items-center gap-1 text-xs text-emerald-400">
                  <ArrowUpRight className="w-3 h-3" /> +15.3%
                </span>
              </div>
              <p className="text-slate-400 text-sm">{t("stats.clients")}</p>
              <p className="text-2xl font-bold text-slate-100">892</p>
            </div>
          </div>

          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Revenue Chart */}
            <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display text-lg font-bold text-slate-100">{t("chart_title")}</h3>
                <div className="flex items-center gap-2 bg-slate-800/50 rounded-lg p-1">
                  <button 
                    onClick={() => setPeriod("month")}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${period === "month" ? "bg-indigo-500 text-white shadow-lg" : "text-slate-400 hover:text-slate-200"}`}
                  >
                    Mensal
                  </button>
                  <button 
                    onClick={() => setPeriod("year")}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${period === "year" ? "bg-indigo-500 text-white shadow-lg" : "text-slate-400 hover:text-slate-200"}`}
                  >
                    Anual
                  </button>
                </div>
              </div>
              <RevenueChart period={period} />
            </div>

            {/* Recent Sales */}
            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display text-lg font-bold text-slate-100">{t("sales_widget")}</h3>
                <button className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
                  Ver todas <ArrowRight className="w-3 h-3" />
                </button>
              </div>
              <SalesWidget />
            </div>
          </div>

          {/* Stock Table */}
          <div className="mt-6 p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display text-lg font-bold text-slate-100">{t("stock_table")}</h3>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setIsFilterOpen(true)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium border transition-colors flex items-center gap-1 ${filter !== "all" ? "bg-indigo-500/20 text-indigo-400 border-indigo-500/50" : "text-slate-400 border-slate-700 hover:border-slate-600 hover:text-slate-200"}`}
                >
                  <Filter className="w-3 h-3" /> 
                  Filtrar
                  {filter !== "all" && <span className="ml-1 w-2 h-2 rounded-full bg-indigo-400" />}
                </button>
                <button 
                  onClick={() => setIsDownloadOpen(true)}
                  className="px-3 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-200 border border-slate-700 hover:border-slate-600 transition-colors flex items-center gap-1"
                >
                  <Download className="w-3 h-3" /> Exportar
                </button>
              </div>
            </div>
            <StockTable filter={filter} />
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-slate-100 mb-4">{t("cta_secondary")}</h2>
            <p className="text-slate-400">Tudo que você precisa para gerenciar seu negócio</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-transparent border border-indigo-500/20 hover:border-indigo-500/40 transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 rounded-xl bg-indigo-500/20 flex items-center justify-center mb-6">
                <BarChart3 className="w-7 h-7 text-indigo-400" />
              </div>
              <h3 className="font-display text-xl font-bold text-slate-100 mb-3">{t("feature_1")}</h3>
              <p className="text-slate-400">{t("feature_1_desc")}</p>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-6">
                <Package className="w-7 h-7 text-emerald-400" />
              </div>
              <h3 className="font-display text-xl font-bold text-slate-100 mb-3">{t("feature_2")}</h3>
              <p className="text-slate-400">{t("feature_2_desc")}</p>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 rounded-xl bg-purple-500/20 flex items-center justify-center mb-6">
                <TrendingUp className="w-7 h-7 text-purple-400" />
              </div>
              <h3 className="font-display text-xl font-bold text-slate-100 mb-3">{t("feature_3")}</h3>
              <p className="text-slate-400">{t("feature_3_desc")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-10 mt-16">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-5">
            <p className="text-sm text-slate-500">{common("footer")}</p>
            <div className="flex items-center gap-3">
              <a href="#" className="p-2 rounded-lg border border-slate-800 hover:border-indigo-500/50 transition-colors text-slate-400 hover:text-indigo-400">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 rounded-lg border border-slate-800 hover:border-indigo-500/50 transition-colors text-slate-400 hover:text-indigo-400">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 rounded-lg border border-slate-800 hover:border-indigo-500/50 transition-colors text-slate-400 hover:text-indigo-400">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}