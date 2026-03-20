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

// Cadastro Rápido de Produto - Interativo
function QuickProductForm() {
  const [product, setProduct] = useState({ name: "", price: "", stock: "" });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (product.name && product.price) {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setProduct({ name: "", price: "", stock: "" });
      }, 2000);
    }
  };

  if (showSuccess) {
    return (
      <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center animate-in fade-in">
        <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500/20 flex items-center justify-center mb-2">
          <CheckCircle2 className="w-6 h-6 text-emerald-400" />
        </div>
        <p className="text-emerald-400 font-semibold text-sm">Produto cadastrado!</p>
        <p className="text-slate-400 text-xs mt-1">{product.name} adicionado</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input 
        type="text" 
        placeholder="Nome do produto"
        value={product.name}
        onChange={(e) => setProduct({...product, name: e.target.value})}
        className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 text-sm focus:border-emerald-500 focus:outline-none"
      />
      <div className="flex gap-2">
        <input 
          type="number" 
          placeholder="Preço"
          value={product.price}
          onChange={(e) => setProduct({...product, price: e.target.value})}
          className="flex-1 px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 text-sm focus:border-emerald-500 focus:outline-none"
        />
        <input 
          type="number" 
          placeholder="Qtd"
          value={product.stock}
          onChange={(e) => setProduct({...product, stock: e.target.value})}
          className="w-20 px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 text-sm focus:border-emerald-500 focus:outline-none"
        />
      </div>
      <button 
        type="submit"
        className="w-full py-2 rounded-lg bg-emerald-500 text-white font-semibold text-sm hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2"
      >
        <Package className="w-4 h-4" /> Cadastrar
      </button>
    </form>
  );
}

// Simulador de Meta de Vendas
function SalesGoalSimulator() {
  const [goal, setGoal] = useState(50000);
  const [current, setCurrent] = useState(32500);
  const percentage = Math.round((current / goal) * 100);

  return (
    <div className="space-y-3">
      <div className="flex justify-between text-sm">
        <span className="text-slate-400">Progresso</span>
        <span className="text-indigo-400 font-semibold">{percentage}%</span>
      </div>
      <div className="h-3 rounded-full bg-slate-800 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500"
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
      <div className="flex justify-between text-xs text-slate-500">
        <span>R$ {current.toLocaleString()}</span>
        <span>Meta: R$ {goal.toLocaleString()}</span>
      </div>
      <div className="flex gap-2 pt-2">
        <button 
          onClick={() => setCurrent(prev => Math.min(prev + 2500, goal * 1.2))}
          className="flex-1 py-2 rounded-lg bg-indigo-500/20 text-indigo-400 text-xs font-semibold hover:bg-indigo-500/30 transition-colors"
        >
          + Venda R$ 2.500
        </button>
        <button 
          onClick={() => setCurrent(32500)}
          className="px-3 py-2 rounded-lg bg-slate-800 text-slate-400 text-xs hover:bg-slate-700 transition-colors"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

// Calculadora de ROI
function ROICalculator() {
  const [investment, setInvestment] = useState(1000);
  const [returnValue, setReturnValue] = useState(1500);
  const roi = ((returnValue - investment) / investment * 100).toFixed(1);

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-xs text-slate-500 block mb-1">Investimento</label>
          <input 
            type="number"
            value={investment}
            onChange={(e) => setInvestment(Number(e.target.value))}
            className="w-full px-2 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 text-sm"
          />
        </div>
        <div>
          <label className="text-xs text-slate-500 block mb-1">Retorno</label>
          <input 
            type="number"
            value={returnValue}
            onChange={(e) => setReturnValue(Number(e.target.value))}
            className="w-full px-2 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 text-sm"
          />
        </div>
      </div>
      <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/30 text-center">
        <p className="text-xs text-slate-400">ROI</p>
        <p className={`text-2xl font-bold ${Number(roi) >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
          {roi}%
        </p>
      </div>
    </div>
  );
}
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

// Modal de Vendas - Mostra todas as vendas fake
function SalesModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  const allSales = [
    { id: "#1234", client: "Empresa ABC", value: 12450, status: "completed", time: "2 min", products: "Notebook Dell XPS, Mouse Logitech" },
    { id: "#1233", client: "Tech Solutions", value: 8320, status: "processing", time: "5 min", products: "Monitor 27\" 4K" },
    { id: "#1232", client: "Consultoria XYZ", value: 15780, status: "completed", time: "12 min", products: "Cadeira Ergonômica, Mesa Digital" },
    { id: "#1231", client: "Startup Inno", value: 4590, status: "pending", time: "18 min", products: "Webcam HD" },
    { id: "#1230", client: "Grupo Martins", value: 23400, status: "completed", time: "25 min", products: "5x Notebook Dell XPS" },
    { id: "#1229", client: "Comercial Silva", value: 6780, status: "processing", time: "32 min", products: "Teclado Mecânico, Mouse Logitech" },
    { id: "#1228", client: "Indústria Beta", value: 45600, status: "completed", time: "45 min", products: "20x Monitor 27\" 4K" },
    { id: "#1227", client: "Escritório Central", value: 12300, status: "pending", time: "1h 10min", products: "3x Cadeira Ergonômica" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs"><CheckCircle2 className="w-3 h-3" /> Concluído</span>;
      case "processing":
        return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs"><Clock className="w-3 h-3" /> Processando</span>;
      case "pending":
        return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-slate-500/10 text-slate-400 text-xs"><AlertCircle className="w-3 h-3" /> Pendente</span>;
      default:
        return null;
    }
  };

  const totalValue = allSales.reduce((acc, sale) => acc + sale.value, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-slate-100 text-lg">Todas as Vendas</h3>
              <p className="text-sm text-slate-400">{allSales.length} vendas • Total: R$ {totalValue.toLocaleString()}</p>
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-200 p-2">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="overflow-y-auto max-h-[50vh] p-4">
          <div className="space-y-3">
            {allSales.map((sale) => (
              <div key={sale.id} className="flex items-center justify-between p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:bg-slate-800 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                    <ShoppingCart className="w-6 h-6 text-indigo-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-200">{sale.client}</p>
                    <p className="text-xs text-slate-500">{sale.id} • {sale.time}</p>
                    <p className="text-xs text-slate-400 mt-1">{sale.products}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-slate-100">R$ {sale.value.toLocaleString()}</p>
                  <div className="mt-1">{getStatusBadge(sale.status)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="p-4 border-t border-slate-800 bg-slate-900/50">
          <button 
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-indigo-500 text-white font-semibold hover:bg-indigo-600 transition-colors"
          >
            Fechar
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
      <SalesModal 
        isOpen={isSalesModalOpen} 
        onClose={() => setIsSalesModalOpen(false)}
      />

      {/* Botão Voltar */}
      <div className="fixed top-20 md:top-24 left-3 md:left-6 z-50">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-1.5 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full glass border border-indigo-500/30 text-xs md:text-sm font-semibold text-indigo-400 hover:bg-indigo-500/10 transition-all"
        >
          <ArrowLeft className="w-3 h-3 md:w-4 md:h-4" />
          {common("backToPortfolio")}
        </Link>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden pt-20 md:pt-32 pb-8 md:pb-12">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-24 left-1/2 w-[30rem] md:w-[58rem] h-[30rem] md:h-[58rem] -translate-x-1/2 rounded-full bg-gradient-to-tr from-indigo-500/20 via-purple-500/10 to-transparent blur-3xl" />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl">
            <span className="inline-flex items-center gap-1.5 md:gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-2.5 py-1 md:px-4 md:py-2 mb-3 md:mb-6 text-xs md:text-sm font-semibold text-indigo-400">
              <BarChart3 className="w-3 h-3 md:w-4 md:h-4" />
              {t("badge")}
            </span>
            
            <h1 className="font-display text-2xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-3 md:mb-6">
              {t("title")}
            </h1>
            
            <p className="text-sm md:text-lg text-slate-400 leading-relaxed mb-4 md:mb-8 max-w-2xl">
              {t("hero_desc")}
            </p>

            <div className="flex flex-col sm:flex-row gap-2 md:gap-4">
              <Link 
                href="#dashboard" 
                className="inline-flex items-center justify-center gap-1.5 md:gap-2 rounded-xl bg-indigo-500 text-white font-semibold px-3 py-2 md:px-6 md:py-3 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/25 text-xs md:text-base"
              >
                {t("cta_primary")}
                <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
              </Link>
              <Link 
                href="#features" 
                className="inline-flex items-center justify-center gap-1.5 md:gap-2 rounded-xl border border-slate-700 bg-slate-800/50 px-3 py-2 md:px-6 md:py-3 font-semibold text-slate-300 transition-all hover:-translate-y-0.5 hover:border-slate-600 text-xs md:text-base"
              >
                {t("cta_secondary")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Stats */}
      <section id="dashboard" className="py-4 md:py-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-4 md:mb-8">
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
            {/* Revenue Chart */}
            <div className="lg:col-span-2 p-4 md:p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 md:mb-6">
                <h3 className="font-display text-base md:text-lg font-bold text-slate-100">
                  {period === "month" ? "Faturamento Mensal" : "Faturamento Anual"}
                </h3>
                <div className="flex items-center gap-2 bg-slate-800/50 rounded-lg p-1">
                  <button 
                    onClick={() => setPeriod("month")}
                    className={`px-2 md:px-3 py-1.5 rounded-md text-xs font-medium transition-all ${period === "month" ? "bg-indigo-500 text-white shadow-lg" : "text-slate-400 hover:text-slate-200"}`}
                  >
                    Mensal
                  </button>
                  <button 
                    onClick={() => setPeriod("year")}
                    className={`px-2 md:px-3 py-1.5 rounded-md text-xs font-medium transition-all ${period === "year" ? "bg-indigo-500 text-white shadow-lg" : "text-slate-400 hover:text-slate-200"}`}
                  >
                    Anual
                  </button>
                </div>
              </div>
              <RevenueChart period={period} />
            </div>

            {/* Recent Sales */}
            <div className="p-4 md:p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <h3 className="font-display text-base md:text-lg font-bold text-slate-100">{t("sales_widget")}</h3>
                <button 
                  onClick={() => setIsSalesModalOpen(true)}
                  className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                >
                  Ver todas <ArrowRight className="w-3 h-3" />
                </button>
              </div>
              <SalesWidget />
            </div>
          </div>

          {/* Stock Table */}
          <div className="mt-4 md:mt-6 p-4 md:p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 md:mb-6">
              <h3 className="font-display text-base md:text-lg font-bold text-slate-100">{t("stock_table")}</h3>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setIsFilterOpen(true)}
                  className={`px-2 md:px-3 py-1.5 md:py-2 rounded-lg text-xs font-medium border transition-colors flex items-center gap-1 ${filter !== "all" ? "bg-indigo-500/20 text-indigo-400 border-indigo-500/50" : "text-slate-400 border-slate-700 hover:border-slate-600 hover:text-slate-200"}`}
                >
                  <Filter className="w-3 h-3" /> 
                  Filtrar
                  {filter !== "all" && <span className="ml-1 w-2 h-2 rounded-full bg-indigo-400" />}
                </button>
                <button 
                  onClick={() => setIsDownloadOpen(true)}
                  className="px-2 md:px-3 py-1.5 md:py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-200 border border-slate-700 hover:border-slate-600 transition-colors flex items-center gap-1"
                >
                  <Download className="w-3 h-3" /> Exportar
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <StockTable filter={filter} />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-8 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-6 md:mb-12">
            <h2 className="font-display text-xl md:text-3xl font-bold text-slate-100 mb-2 md:mb-4">{t("feature_1")}</h2>
            <p className="text-slate-400 text-xs md:text-base">{t("feature_1_desc")}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className="p-4 md:p-6 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-transparent border border-indigo-500/20 hover:border-indigo-500/40 transition-all duration-300 hover:-translate-y-1">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center mb-4">
                <BarChart3 className="w-5 h-5 md:w-6 md:h-6 text-indigo-400" />
              </div>
              <h3 className="font-display text-base md:text-lg font-bold text-slate-100 mb-3">{t("feature_card_1")}</h3>
              <SalesGoalSimulator />
            </div>

            <div className="p-4 md:p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300 hover:-translate-y-1">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-4">
                <Package className="w-5 h-5 md:w-6 md:h-6 text-emerald-400" />
              </div>
              <h3 className="font-display text-base md:text-lg font-bold text-slate-100 mb-3">{t("feature_card_2")}</h3>
              <QuickProductForm />
            </div>

            <div className="p-4 md:p-6 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-transparent border border-indigo-500/20 hover:border-indigo-500/40 transition-all duration-300 hover:-translate-y-1">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center mb-4">
                <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-indigo-400" />
              </div>
              <h3 className="font-display text-base md:text-lg font-bold text-slate-100 mb-3">{t("feature_card_3")}</h3>
              <ROICalculator />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-6 md:py-10 mt-8 md:mt-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-5">
            <p className="text-xs md:text-sm text-slate-500">{common("footer")}</p>
            <div className="flex items-center gap-2 md:gap-3">
              <a href="#" className="p-1.5 md:p-2 rounded-lg border border-slate-800 hover:border-indigo-500/50 transition-colors text-slate-400 hover:text-indigo-400">
                <Linkedin className="w-4 h-4 md:w-5 md:h-5" />
              </a>
              <a href="#" className="p-1.5 md:p-2 rounded-lg border border-slate-800 hover:border-indigo-500/50 transition-colors text-slate-400 hover:text-indigo-400">
                <Github className="w-4 h-4 md:w-5 md:h-5" />
              </a>
              <a href="#" className="p-1.5 md:p-2 rounded-lg border border-slate-800 hover:border-indigo-500/50 transition-colors text-slate-400 hover:text-indigo-400">
                <Mail className="w-4 h-4 md:w-5 md:h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}