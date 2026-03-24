"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { 
  ArrowLeft, TrendingUp, TrendingDown, Target, Users, Award, Zap,
  BarChart3, DollarSign, Search, CheckCircle2, Star, Quote, ChevronRight,
  Megaphone, Linkedin, Github, Mail, ArrowRight, X, PieChart,
  LineChart, Activity, Globe, Smartphone, FileText, Download, Filter,
  Play, Pause, RefreshCw, MousePointerClick, TrendingUpIcon,
  LayoutDashboard, Wallet, Layers, Share2, BarChart, Eye, User, Users as UsersIcon, Building2,
  Palette, Phone, Sparkles, Shield, Clock
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import RatingModal from "@/components/RatingModal";
import SignupModal from "@/components/agency/SignupModal";
import ContactSalesModal from "@/components/agency/ContactSalesModal";

// ==========================================
// DIAGNOSTIC TOOL - AUDITORIA DE CAMPANHAS
// ==========================================
function CampaignAuditTool({ t }: { t: (key: string, params?: Record<string, string | number>) => string }) {
  const [url, setUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [loadingText, setLoadingText] = useState("");

  const loadingSteps = [
    t("analysis_loading_1"),
    t("analysis_loading_2"),
    t("analysis_loading_3")
  ];

  const startAudit = () => {
    if (!url.trim()) return;
    setIsAnalyzing(true);
    setProgress(0);
    
    let step = 0;
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsAnalyzing(false);
            setShowResults(true);
          }, 500);
          return 100;
        }
        return prev + 2;
      });
      
      if (step < loadingSteps.length && Math.random() > 0.7) {
        setLoadingText(loadingSteps[step]);
        step++;
      }
    }, 50);
  };

  const resetAudit = () => {
    setShowResults(false);
    setProgress(0);
    setLoadingText("");
    setUrl("");
  };

  if (showResults) {
    return (
      <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-violet-600/20 via-slate-900/90 to-amber-500/10 border border-violet-500/30 shadow-2xl shadow-violet-500/10">
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
            <CheckCircle2 className="w-8 h-8 text-emerald-400" />
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
            {t("diagnosis_complete")}
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="p-4 rounded-xl bg-slate-900/70 border border-amber-500/30 hover:border-amber-500/50 transition-all">
            <div className="flex items-center gap-3 mb-3">
              <TrendingDown className="w-5 h-5 text-amber-400" />
              <span className="font-semibold text-slate-200">{t("waste_detected")}</span>
            </div>
            <p className="text-3xl font-black text-amber-400 font-mono">
              R$ 2.450,00
            </p>
            <p className="text-xs text-slate-500 mt-1">{t("per_month")}</p>
          </div>
          
          <div className="p-4 rounded-xl bg-slate-900/70 border border-emerald-500/30 hover:border-emerald-500/50 transition-all">
            <div className="flex items-center gap-3 mb-3">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              <span className="font-semibold text-slate-200">{t("optimization_potential")}</span>
            </div>
            <p className="text-3xl font-black text-emerald-400 font-mono shadow-[0_0_15px_rgba(16,185,129,0.2)]">
              +34%
            </p>
            <p className="text-xs text-slate-500 mt-1">{t("estimated_roas")}</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-700/50 mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-semibold text-slate-300">{t("campaign_performance")}</span>
            <span className="text-xs text-slate-500 font-mono">{t("real_time")}</span>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-xs text-slate-500 mb-1">CTR</p>
              <p className="text-lg font-bold text-violet-400 font-mono">1.8%</p>
              <p className="text-xs text-emerald-400">↓ 0.4%</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-slate-500 mb-1">CPM</p>
              <p className="text-lg font-bold text-amber-400 font-mono">R$12.40</p>
              <p className="text-xs text-red-400">↑ 23%</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-slate-500 mb-1">ROAS</p>
              <p className="text-lg font-bold text-emerald-400 font-mono">2.1x</p>
              <p className="text-xs text-emerald-400">↑ 34% pot.</p>
            </div>
          </div>
        </div>
        
        <div className="flex gap-3">
          <button 
            onClick={resetAudit}
            className="flex-1 py-3 rounded-xl bg-slate-800 text-slate-300 font-semibold hover:bg-slate-700 transition-colors"
          >
            {t("new_diagnosis")}
          </button>
          <button className="flex-1 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-amber-500 text-white font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
            <TrendingUp className="w-4 h-4" />
            {t("contact_specialist")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-violet-600/10 via-slate-900/90 to-amber-500/5 border border-violet-500/20">
      <div className="text-center mb-6">
        <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{t("diagnosis_title")}</h3>
        <p className="text-slate-400">{t("diagnosis_subtitle")}</p>
      </div>
      
      <div className="space-y-4">
        <div className="relative">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://cliente.com.br/conta-ads"
            className="w-full px-4 py-4 rounded-xl bg-slate-900/80 border border-slate-700 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 transition-all"
            disabled={isAnalyzing}
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <Globe className="w-5 h-5 text-slate-500" />
          </div>
        </div>

        {isAnalyzing && (
          <div className="space-y-3">
            <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-violet-500 via-amber-500 to-emerald-500 transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-violet-400 animate-pulse">{loadingText || t("analyzing")}</span>
              <span className="text-slate-500 font-mono">{progress}%</span>
            </div>
          </div>
        )}
        
        <button 
          onClick={startAudit}
          disabled={isAnalyzing || !url.trim()}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-violet-500 to-amber-500 text-white font-bold hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-violet-500/20"
        >
          {isAnalyzing ? (
            <>
              <RefreshCw className="w-5 h-5 animate-spin" />
              {t("analyzing")}...
            </>
          ) : (
            <>
              <Search className="w-5 h-5" />
              {t("analyze_roi")}
            </>
          )}
        </button>
      </div>
    </div>
  );
}

// ==========================================
// FEATURE TABS - DEMONSTRACAO DO DASHBOARD
// ==========================================
function FeatureTabs({ t }: { t: (key: string, params?: Record<string, string | number>) => string }) {
  const [activeTab, setActiveTab] = useState("campaigns");

  const tabs = [
    { id: "campaigns", icon: Megaphone, title: t("tabs.campaigns.title"), subtitle: t("tabs.campaigns.subtitle") },
    { id: "crm", icon: Users, title: t("tabs.crm.title"), subtitle: t("tabs.crm.subtitle") },
    { id: "reports", icon: FileText, title: t("tabs.reports.title"), subtitle: t("tabs.reports.subtitle") },
  ];

  const getBenefits = (tabId: string) => {
    const benefitsKey = `tabs.${tabId}.benefits`;
    const benefits = t(benefitsKey);
    return benefits.split(',').map((benefit: string) => benefit.trim());
  };

  const renderCampaignMock = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 rounded-lg bg-slate-900/70 border border-slate-800">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded bg-blue-600 flex items-center justify-center text-xs text-white font-bold">f</div>
            <span className="text-xs font-semibold text-slate-300">Meta Ads</span>
          </div>
          <p className="text-lg font-bold text-white font-mono">R$ 12.4k</p>
          <p className="text-xs text-emerald-400">ROAS 3.2x</p>
        </div>
        <div className="p-3 rounded-lg bg-slate-900/70 border border-slate-800">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded bg-orange-500 flex items-center justify-center text-xs text-white font-bold">G</div>
            <span className="text-xs font-semibold text-slate-300">Google Ads</span>
          </div>
          <p className="text-lg font-bold text-white font-mono">R$ 8.7k</p>
          <p className="text-xs text-emerald-400">ROAS 4.1x</p>
        </div>
      </div>

      <div className="p-3 rounded-lg bg-slate-900/70 border border-slate-800">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-slate-400">Daily Spend</span>
          <span className="text-xs text-violet-400">Last 7 days</span>
        </div>
        <div className="flex items-end gap-1 h-16">
          {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
            <div key={i} className="flex-1 bg-gradient-to-t from-violet-500/50 to-violet-400/80 rounded-t" style={{ height: `${h}%` }} />
          ))}
        </div>
        <div className="flex justify-between mt-1 text-[10px] text-slate-500">
          <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
        </div>
      </div>

      <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30">
        <div className="flex items-center gap-2">
          <TrendingDown className="w-4 h-4 text-amber-400" />
          <span className="text-xs text-amber-400 font-semibold">{t("waste_alert")}</span>
        </div>
        <p className="text-xs text-slate-400 mt-1">{t("campaign_summer")}</p>
      </div>
    </div>
  );

  const renderCRMMock = () => (
    <div className="space-y-3">
      <div className="grid grid-cols-4 gap-2">
        {[
          { name: "New", count: 12, color: "bg-slate-700" },
          { name: "Contacted", count: 8, color: "bg-violet-500/50" },
          { name: "Proposal", count: 5, color: "bg-amber-500/50" },
          { name: "Closed", count: 3, color: "bg-emerald-500/50" },
        ].map((stage) => (
          <div key={stage.name} className="text-center">
            <div className={`${stage.color} rounded-lg p-2 mb-1`}>
              <p className="text-lg font-bold text-white font-mono">{stage.count}</p>
            </div>
            <p className="text-[10px] text-slate-400">{stage.name}</p>
          </div>
        ))}
      </div>

      <div className="p-3 rounded-lg bg-slate-900/70 border border-slate-800">
        <p className="text-xs font-semibold text-slate-400 mb-2">Recent Leads</p>
        {[
          { name: "João Silva", source: "Meta", score: 85 },
          { name: "Maria Souza", source: "Google", score: 92 },
          { name: "Pedro Costa", source: "Organic", score: 67 },
        ].map((lead, i) => (
          <div key={i} className="flex items-center justify-between py-2 border-b border-slate-800 last:border-0">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-xs text-slate-300">
                {lead.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <p className="text-xs text-slate-300">{lead.name}</p>
                <p className="text-[10px] text-slate-500">{lead.source}</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <div className={`w-2 h-2 rounded-full ${lead.score > 80 ? 'bg-emerald-400' : lead.score > 60 ? 'bg-amber-400' : 'bg-red-400'}`} />
              <span className="text-xs font-mono text-slate-400">{lead.score}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderReportsMock = () => (
    <div className="space-y-3">
      <div className="p-4 rounded-lg bg-white/5 border border-slate-700">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-slate-700 flex items-center justify-center">
              <span className="text-xs font-bold text-violet-400">AG</span>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-300">Monthly Report - Client XYZ</p>
              <p className="text-[10px] text-slate-500">Generated automatically</p>
            </div>
          </div>
          <span className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-semibold">Sent</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <path className="text-slate-700" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
              <path className="text-violet-500" strokeDasharray="75, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-bold text-white font-mono">75%</span>
            </div>
          </div>
          <div>
            <p className="text-xs text-slate-400">Goal Achievement</p>
            <p className="text-sm font-bold text-white font-mono">R$ 45k / R$ 60k</p>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <button className="flex-1 py-2 rounded-lg bg-slate-800 border border-slate-700 text-xs text-slate-300 flex items-center justify-center gap-1 hover:border-violet-500/50">
          <Download className="w-3 h-3" /> PDF
        </button>
        <button className="flex-1 py-2 rounded-lg bg-slate-800 border border-slate-700 text-xs text-slate-300 flex items-center justify-center gap-1 hover:border-violet-500/50">
          <Share2 className="w-3 h-3" /> Share
        </button>
      </div>
    </div>
  );

  const renderMockup = () => {
    switch (activeTab) {
      case "campaigns": return renderCampaignMock();
      case "crm": return renderCRMMock();
      case "reports": return renderReportsMock();
      default: return renderCampaignMock();
    }
  };

  return (
    <div className="bg-slate-900/50 rounded-2xl border border-slate-800 p-6 md:p-8">
      <div className="flex flex-wrap gap-2 mb-6 md:mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all text-sm ${
              activeTab === tab.id 
                ? "bg-gradient-to-r from-violet-500 to-violet-600 text-white shadow-lg shadow-violet-500/25" 
                : "bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span className="hidden sm:inline">{tab.title}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        <div className="text-left">
          <h3 className="text-xl md:text-2xl font-bold text-slate-100 mb-2">
            {tabs.find(tab => tab.id === activeTab)?.title}
          </h3>
          <p className="text-slate-400 mb-4 text-sm md:text-base">
            {tabs.find(tab => tab.id === activeTab)?.subtitle}
          </p>
          
          <div className="space-y-3">
            {getBenefits(activeTab).map((benefit: string, index: number) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-300 text-sm">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-950/70 rounded-xl border border-slate-800 p-4">
          {renderMockup()}
        </div>
      </div>
    </div>
  );
}

// Cases de Sucesso Reais com Prova Social
function RealSuccessCases({ t }: { t: (key: string, params?: Record<string, string | number>) => string }) {
  const cases = [
    {
      client: "Clínica Vida Ativa",
      industry: "Saúde",
      logo: "VA",
      roi: "450%",
      metric: "+22%",
      label: "Aumento em Conversão",
      period: "6 meses",
      image: "saude",
      testimonial: "Nossas agendamentos aumentaram 300% e o ROI foi impressionante. Equipe excepcional!",
      author: "Dra. Ana Paula",
      role: "Diretora Clínica",
      color: "violet"
    },
    {
      client: "TechStore E-commerce",
      industry: "Varejo Online",
      logo: "TS",
      roi: "320%",
      metric: "+180%",
      label: "Crescimento em Vendas",
      period: "4 meses",
      image: "ecommerce",
      testimonial: "Passamos de 50 para 140 vendas/dia. O melhor investimento que fizemos!",
      author: "Carlos Mendes",
      role: "CEO",
      color: "amber"
    },
    {
      client: "Amaral Advogados",
      industry: "Jurídico",
      logo: "AA",
      roi: "280%",
      metric: "85%",
      label: "Taxa de Conversão",
      period: "3 meses",
      image: "juridico",
      testimonial: "Nossos casos novos aumentaram 200%. Estratégia de marketing impecável.",
      author: "Dr. Roberto Amaral",
      role: "Sócio",
      color: "violet"
    }
  ];

  return (
    <div className="space-y-6">
      {cases.map((c, i) => (
        <div key={c.client} className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-slate-900/80 to-slate-800/50 border border-slate-700/50 hover:border-violet-500/30 transition-all duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Logo e Informações */}
            <div className="flex items-center gap-4">
              <div className={`w-16 h-16 rounded-xl bg-${c.color}-500/20 flex items-center justify-center`}>
                <span className={`text-2xl font-bold text-${c.color}-400`}>{c.logo}</span>
              </div>
              <div>
                <h3 className="font-bold text-slate-100 text-lg">{c.client}</h3>
                <p className="text-sm text-slate-500">{c.industry}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                </div>
              </div>
            </div>

            {/* Métricas */}
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-black text-white mb-1">
                {c.roi}
              </div>
              <p className="text-sm text-slate-400 mb-3">ROI em {c.period}</p>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400 font-semibold">{c.metric}</span>
              </div>
            </div>

            {/* Depoimento */}
            <div className="relative">
              <Quote className="absolute -top-2 -left-2 w-8 h-8 text-violet-500/20" />
              <p className="text-slate-300 text-sm leading-relaxed mb-3 italic">
                "{c.testimonial}"
              </p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
                  <span className="text-xs font-bold text-slate-300">{c.author.split(' ').map(n => n[0]).join('')}</span>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-200">{c.author}</p>
                  <p className="text-xs text-slate-500">{c.role}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Equipe Criativa
function CreativeTeam() {
  const team = [
    { role: "SEO Specialist", name: "Ana Silva", skill: "SEO Técnico", color: "violet" },
    { role: "Ads Manager", name: "Carlos Santos", skill: "Google & Meta Ads", color: "amber" },
    { role: "Designer", name: "Maria Oliveira", skill: "UI/UX Design", color: "violet" },
    { role: "Copywriter", name: "João Lima", skill: "Copy Persuasivo", color: "amber" },
  ];
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {team.map((m) => (
        <div key={m.name} className="p-6 rounded-2xl bg-gradient-to-br from-slate-900/80 to-slate-800/50 border border-slate-700/50 text-center hover:border-fuchsia-500/30 transition-all duration-300">
          <div className={`w-16 h-16 mx-auto rounded-full bg-${m.color}-500/20 flex items-center justify-center mb-4`}>
            <span className={`text-xl font-bold text-${m.color}-400`}>{m.name.split(' ').map(n => n[0]).join('')}</span>
          </div>
          <p className="font-semibold text-slate-100 mb-1">{m.name}</p>
          <p className="text-sm text-fuchsia-400 mb-2">{m.role}</p>
          <p className="text-xs text-slate-500">{m.skill}</p>
        </div>
      ))}
    </div>
  );
}

// ==========================================
// PRICING SECTION
// ==========================================
function PricingSection({ t, features, onSignup, onContact }: { 
  t: (key: string, params?: Record<string, string | number>) => string;
  features: Record<string, string[]>;
  onSignup: () => void;
  onContact: () => void;
}) {
  const plans = [
    {
      id: "freelancer",
      icon: User,
      popular: false,
      color: "violet",
      action: "contact"
    },
    {
      id: "growth",
      icon: Users,
      popular: true,
      color: "amber",
      action: "signup"
    },
    {
      id: "enterprise",
      icon: Building2,
      popular: false,
      color: "emerald",
      action: "contact"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {plans.map((plan) => (
        <div 
          key={plan.id}
          className={`relative p-6 rounded-2xl border transition-all duration-300 ${
            plan.popular 
              ? "bg-gradient-to-b from-violet-600/20 to-slate-900/90 border-violet-500/50 shadow-2xl shadow-violet-500/10 scale-105" 
              : "bg-slate-900/50 border-slate-800 hover:border-slate-700"
          }`}
        >
          {plan.popular && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-violet-500 to-amber-500 text-white text-xs font-bold">
                {t(`pricing.${plan.id}.badge`)}
              </span>
            </div>
          )}

          <div className="text-center mb-6">
            <div className={`w-12 h-12 mx-auto rounded-xl bg-${plan.color}-500/20 flex items-center justify-center mb-3`}>
              <plan.icon className={`w-6 h-6 text-${plan.color}-400`} />
            </div>
            <h3 className="text-lg font-bold text-white mb-1">{t(`pricing.${plan.id}.name`)}</h3>
            <p className="text-sm text-slate-400">{t(`pricing.${plan.id}.description`)}</p>
          </div>

          <div className="text-center mb-6">
            <span className="text-3xl font-black text-white font-mono">{t(`pricing.${plan.id}.price`)}</span>
            <span className="text-slate-400 text-sm">{t(`pricing.${plan.id}.period`)}</span>
          </div>

          <ul className="space-y-3 mb-6">
            {features[plan.id].map((feature: string, idx: number) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <button 
            onClick={() => plan.action === "signup" ? onSignup() : onContact()}
            className={`w-full py-3 rounded-xl font-semibold transition-all ${
              plan.popular 
                ? "bg-gradient-to-r from-violet-500 to-amber-500 text-white hover:opacity-90" 
                : "bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700"
            }`}>
            {t(`pricing.${plan.id}.cta`)}
          </button>
        </div>
      ))}
    </div>
  );
}

// Pain Points Banner
function PainPointsBanner({ t }: { t: (key: string, params?: Record<string, string | number>) => string }) {
  const points = [
    { key: "pain_spreadsheet", icon: X, color: "red" },
    { key: "pain_roas", icon: TrendingUp, color: "emerald" },
    { key: "pain_value", icon: Award, color: "violet" },
    { key: "pain_dashboard", icon: LayoutDashboard, color: "amber" },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-3 md:gap-6 py-6">
      {points.map((point) => (
        <div key={point.key} className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 border border-slate-800">
          <point.icon className={`w-4 h-4 text-${point.color}-400`} />
          <span className="text-sm text-slate-300 font-medium">{t(point.key)}</span>
        </div>
      ))}
    </div>
  );
}

export default function AgenciaLandingPageClient() {
  const t = useTranslations("Demos.agencia");
  const common = useTranslations("Demos.common");
  const [isRatingOpen, setIsRatingOpen] = useState(false);
  const [hasShownRating, setHasShownRating] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const pricingRef = useRef<HTMLDivElement>(null);

  // Mostrar avaliação após 10 segundos, apenas uma vez
  useEffect(() => {
    if (!hasShownRating) {
      const timer = setTimeout(() => {
        setIsRatingOpen(true);
        setHasShownRating(true);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [hasShownRating]);

  const scrollToPricing = () => {
    pricingRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <RatingModal
        isOpen={isRatingOpen}
        onClose={() => setIsRatingOpen(false)}
        demoName={t("demo_name")}
      />
      
      <SignupModal
        isOpen={isSignupOpen}
        onClose={() => setIsSignupOpen(false)}
        t={t}
      />
      
      <ContactSalesModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        t={t}
      />

      {/* Botão Voltar */}
      <div className="fixed top-20 md:top-24 left-3 md:left-6 z-50">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full glass border border-violet-400/50 bg-slate-900/80 backdrop-blur-sm text-xs md:text-sm font-semibold text-violet-300 hover:bg-violet-500/20 hover:border-violet-400 hover:text-violet-200 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
        >
          <ArrowLeft className="w-3 h-3 md:w-4 md:h-4" />
          {common("backToPortfolio")}
        </Link>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden pt-20 md:pt-32 pb-10 md:pb-16">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-24 left-1/2 w-[30rem] md:w-[58rem] h-[30rem] md:h-[58rem] -translate-x-1/2 rounded-full bg-gradient-to-tr from-violet-500/20 via-amber-500/10 to-transparent blur-3xl" />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl">
            <span className="inline-flex items-center gap-1.5 md:gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-2.5 py-1 md:px-4 md:py-2 mb-3 md:mb-6 text-xs md:text-sm font-semibold text-violet-400">
              <Megaphone className="w-3 h-3 md:w-4 md:h-4" />
              {t("badge")}
            </span>
            
            <h1 className="font-display text-2xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-3 md:mb-6">
              {t("title")}
            </h1>
            
            <p className="text-sm md:text-lg text-slate-400 leading-relaxed mb-4 md:mb-6 max-w-2xl">
              {t("hero_desc")}
            </p>

            {/* Pain Points */}
            <PainPointsBanner t={t} />

            <div className="flex flex-col sm:flex-row gap-2 md:gap-4 mt-6">
              <button 
                onClick={() => setIsSignupOpen(true)}
                className="inline-flex items-center justify-center gap-1.5 md:gap-2 rounded-xl bg-violet-500 text-white font-semibold px-3 py-2 md:px-6 md:py-3 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-violet-500/25 text-xs md:text-base"
              >
                {t("cta_primary")}
                <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
              </button>
              <button 
                onClick={scrollToPricing}
                className="inline-flex items-center justify-center gap-1.5 md:gap-2 rounded-xl border border-slate-700 bg-slate-800/50 px-3 py-2 md:px-6 md:py-3 font-semibold text-slate-300 transition-all hover:-translate-y-0.5 hover:border-slate-600 text-xs md:text-base"
              >
                {t("cta_secondary")}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Diagnóstico Gratuito - Lead Magnet */}
      <section id="diagnostico" className="py-8 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-6 md:mb-12">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 mb-3 text-xs font-semibold text-emerald-400">
              <Sparkles className="w-3 h-3" />
              {t("free_tool")}
            </span>
            <h2 className="font-display text-xl md:text-3xl font-bold text-slate-100 mb-2 md:mb-4">{t("diagnosis_title")}</h2>
            <p className="text-slate-400 text-xs md:text-base max-w-2xl mx-auto">{t("diagnosis_subtitle")}</p>
          </div>
          <div className="max-w-2xl mx-auto">
            <CampaignAuditTool t={t} />
          </div>
        </div>
      </section>

      {/* Feature Tabs - Dashboard Demo */}
      <section id="features" className="py-8 md:py-16 bg-gradient-to-b from-slate-900/30 to-slate-950">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-6 md:mb-12">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 mb-3 text-xs font-semibold text-violet-400">
              <LayoutDashboard className="w-3 h-3" />
              {t("interactive_demo")}
            </span>
            <h2 className="font-display text-xl md:text-3xl font-bold text-slate-100 mb-2 md:mb-4">
              {t("dashboard_demo_title")}
            </h2>
            <p className="text-slate-400 text-xs md:text-base max-w-2xl mx-auto">
              {t("dashboard_demo_subtitle")}
            </p>
          </div>
          <FeatureTabs t={t} />
        </div>
      </section>

      {/* Cases de Sucesso Reais */}
      <section id="cases" className="py-8 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-6 md:mb-12">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 mb-3 text-xs font-semibold text-amber-400">
              <TrendingUp className="w-3 h-3" />
              {t("roi_proven")}
            </span>
            <h2 className="font-display text-xl md:text-3xl font-bold text-slate-100 mb-2 md:mb-4">{t("real_cases_title")}</h2>
            <p className="text-slate-400 text-xs md:text-base max-w-2xl mx-auto">{t("real_cases_subtitle")}</p>
          </div>
          <RealSuccessCases t={t} />
        </div>
      </section>

      {/* Equipe */}
      <section className="py-8 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-6 md:mb-12">
            <h2 className="font-display text-xl md:text-3xl font-bold text-slate-100 mb-2 md:mb-4">{t("team_title")}</h2>
            <p className="text-slate-400 text-xs md:text-base">{t("marketing_specialists")}</p>
          </div>
          <CreativeTeam />
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-8 md:py-16 bg-gradient-to-b from-slate-900/50 to-slate-950">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className="p-4 md:p-6 lg:p-8 rounded-2xl bg-gradient-to-br from-violet-500/10 to-transparent border border-violet-500/20 hover:border-violet-500/40 transition-all duration-300 hover:-translate-y-1">
              <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl bg-violet-500/20 flex items-center justify-center mb-4 md:mb-6">
                <Target className="w-5 h-5 md:w-7 md:h-7 text-violet-400" />
              </div>
              <h3 className="font-display text-lg md:text-xl font-bold text-slate-100 mb-2 md:mb-3">{t("feature_1")}</h3>
              <p className="text-slate-400 text-sm md:text-base">{t("feature_1_desc")}</p>
            </div>

            <div className="p-4 md:p-6 lg:p-8 rounded-2xl bg-gradient-to-br from-amber-500/10 to-transparent border border-amber-500/20 hover:border-amber-500/40 transition-all duration-300 hover:-translate-y-1">
              <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl bg-amber-500/20 flex items-center justify-center mb-4 md:mb-6">
                <Users className="w-5 h-5 md:w-7 md:h-7 text-amber-400" />
              </div>
              <h3 className="font-display text-lg md:text-xl font-bold text-slate-100 mb-2 md:mb-3">{t("feature_2")}</h3>
              <p className="text-slate-400 text-sm md:text-base">{t("feature_2_desc")}</p>
            </div>

            <div className="p-4 md:p-6 lg:p-8 rounded-2xl bg-gradient-to-br from-violet-500/10 to-transparent border border-violet-500/20 hover:border-violet-500/40 transition-all duration-300 hover:-translate-y-1">
              <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl bg-violet-500/20 flex items-center justify-center mb-4 md:mb-6">
                <Palette className="w-5 h-5 md:w-7 md:h-7 text-violet-400" />
              </div>
              <h3 className="font-display text-lg md:text-xl font-bold text-slate-100 mb-2 md:mb-3">{t("feature_3")}</h3>
              <p className="text-slate-400 text-sm md:text-base">{t("feature_3_desc")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" ref={pricingRef} className="py-8 md:py-16 bg-gradient-to-b from-slate-900/50 to-slate-950">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-6 md:mb-12">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 mb-3 text-xs font-semibold text-violet-400">
              <DollarSign className="w-3 h-3" />
              {t("plans_prices")}
            </span>
            <h2 className="font-display text-xl md:text-3xl font-bold text-slate-100 mb-2 md:mb-4">{t("pricing.title")}</h2>
            <p className="text-slate-400 text-xs md:text-base max-w-2xl mx-auto">{t("pricing.subtitle")}</p>
          </div>
          <PricingSection 
            t={t} 
            features={{
              freelancer: t.raw("pricing.freelancer.features") as string[],
              growth: t.raw("pricing.growth.features") as string[],
              enterprise: t.raw("pricing.enterprise.features") as string[]
            }}
            onSignup={() => setIsSignupOpen(true)}
            onContact={() => setIsContactOpen(true)}
          />
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center p-8 md:p-12 rounded-3xl bg-gradient-to-br from-violet-600/20 via-slate-900/90 to-amber-500/10 border border-violet-500/30">
            <h2 className="font-display text-2xl md:text-4xl font-bold text-white mb-4">
              {t("ready_to_scale")}
            </h2>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto">
              {t("join_agencies")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setIsSignupOpen(true)}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-amber-500 text-white font-bold px-8 py-4 transition-all hover:opacity-90 hover:shadow-lg hover:shadow-violet-500/25"
              >
                <Sparkles className="w-5 h-5" />
                {t("start_free_trial")}
              </button>
              <button 
                onClick={() => setIsContactOpen(true)}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800/50 px-8 py-4 font-semibold text-slate-300 transition-all hover:bg-slate-800"
              >
                <Phone className="w-5 h-5" />
                {t("talk_sales")}
              </button>
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
              <a href="#" className="p-1.5 md:p-2 rounded-lg border border-slate-800 hover:border-violet-500/50 transition-colors text-slate-400 hover:text-violet-400">
                <Linkedin className="w-4 h-4 md:w-5 md:h-5" />
              </a>
              <a href="#" className="p-1.5 md:p-2 rounded-lg border border-slate-800 hover:border-violet-500/50 transition-colors text-slate-400 hover:text-violet-400">
                <Github className="w-4 h-4 md:w-5 md:h-5" />
              </a>
              <a href="#" className="p-1.5 md:p-2 rounded-lg border border-slate-800 hover:border-violet-500/50 transition-colors text-slate-400 hover:text-violet-400">
                <Mail className="w-4 h-4 md:w-5 md:h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}