"use client";

import { useState } from "react";
import { 
  DollarSign, Package, Users, Shield, 
  TrendingUp, AlertCircle, CheckCircle, Eye,
  FileText, Settings, Lock, Database,
  ArrowRight, Zap, BarChart3, Target
} from "lucide-react";
import { useTranslations } from "next-intl";

interface FeatureTab {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  benefits: string[];
  mockupType: 'financial' | 'inventory' | 'crm' | 'rbac';
}

export default function FeatureShowcase() {
  const t = useTranslations("Features");
  const [activeTab, setActiveTab] = useState('financial');

  const tabs: FeatureTab[] = [
    {
      id: 'financial',
      title: t("tabs.financial.title"),
      description: t("tabs.financial.description"),
      icon: <DollarSign className="w-5 h-5" />,
      benefits: [
        t("tabs.financial.benefits.0"),
        t("tabs.financial.benefits.1"),
        t("tabs.financial.benefits.2"),
        t("tabs.financial.benefits.3")
      ],
      mockupType: 'financial'
    },
    {
      id: 'inventory',
      title: t("tabs.inventory.title"),
      description: t("tabs.inventory.description"),
      icon: <Package className="w-5 h-5" />,
      benefits: [
        t("tabs.inventory.benefits.0"),
        t("tabs.inventory.benefits.1"),
        t("tabs.inventory.benefits.2"),
        t("tabs.inventory.benefits.3")
      ],
      mockupType: 'inventory'
    },
    {
      id: 'crm',
      title: t("tabs.crm.title"),
      description: t("tabs.crm.description"),
      icon: <Users className="w-5 h-5" />,
      benefits: [
        t("tabs.crm.benefits.0"),
        t("tabs.crm.benefits.1"),
        t("tabs.crm.benefits.2"),
        t("tabs.crm.benefits.3")
      ],
      mockupType: 'crm'
    },
    {
      id: 'rbac',
      title: t("tabs.rbac.title"),
      description: t("tabs.rbac.description"),
      icon: <Shield className="w-5 h-5" />,
      benefits: [
        t("tabs.rbac.benefits.0"),
        t("tabs.rbac.benefits.1"),
        t("tabs.rbac.benefits.2"),
        t("tabs.rbac.benefits.3")
      ],
      mockupType: 'rbac'
    }
  ];

  const renderMockup = (type: FeatureTab['mockupType']) => {
    switch (type) {
      case 'financial':
        return (
          <div className="bg-slate-900 rounded-xl border border-slate-700 overflow-hidden">
            {/* Header */}
            <div className="bg-slate-800 px-4 py-3 border-b border-slate-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full" />
                  <span className="text-sm font-medium text-slate-300">{t("financial_hub")}</span>
                </div>
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-slate-600 rounded-full" />
                  <div className="w-2 h-2 bg-slate-600 rounded-full" />
                </div>
              </div>
            </div>
            
            {/* Content */}
            <div className="p-4 space-y-3">
              {/* Bank Reconciliation */}
              <div className="bg-emerald-500/10 rounded-lg p-3 border border-emerald-500/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-emerald-400 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    {t("bank_reconciliation")}
                  </span>
                  <span className="text-xs text-emerald-300">98.5%</span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">{t("processed")}</span>
                    <span className="text-slate-300">R$ 2.4M</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-1.5">
                    <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '98.5%' }} />
                  </div>
                </div>
              </div>

              {/* Invoice Generation */}
              <div className="bg-violet-500/10 rounded-lg p-3 border border-violet-500/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-violet-400 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    {t("invoice_generation")}
                  </span>
                  <span className="text-xs text-violet-300">247</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-2 h-2 bg-violet-400 rounded-full" />
                    <span className="text-slate-300">{t("nfe")}: 142</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-2 h-2 bg-violet-400 rounded-full" />
                    <span className="text-slate-300">{t("nfse")}: 105</span>
                  </div>
                </div>
              </div>

              {/* Cash Flow */}
              <div className="bg-slate-800 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-300 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    {t("cash_flow")}
                  </span>
                  <span className="text-xs text-emerald-400">+12.5%</span>
                </div>
                <div className="text-xs text-slate-400 space-y-1">
                  <div className="flex justify-between">
                    <span>{t("inflows")}</span>
                    <span className="text-emerald-400">R$ 458K</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t("outflows")}</span>
                    <span className="text-red-400">R$ 312K</span>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-slate-700">
                    <span>{t("balance")}</span>
                    <span className="text-slate-300 font-medium">R$ 146K</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'inventory':
        return (
          <div className="bg-slate-900 rounded-xl border border-slate-700 overflow-hidden">
            {/* Header */}
            <div className="bg-slate-800 px-4 py-3 border-b border-slate-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-amber-500 rounded-full" />
                  <span className="text-sm font-medium text-slate-300">{t("inventory_management")}</span>
                </div>
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-slate-600 rounded-full" />
                  <div className="w-2 h-2 bg-slate-600 rounded-full" />
                </div>
              </div>
            </div>
            
            {/* Content */}
            <div className="p-4 space-y-3">
              {/* Stock Alerts */}
              <div className="bg-red-500/10 rounded-lg p-3 border border-red-500/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-red-400 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    {t("stock_alerts")}
                  </span>
                  <span className="text-xs text-red-300 animate-pulse">3 {t("critical")}</span>
                </div>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Mouse MX3</span>
                    <span className="text-red-400">2 {t("units")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Teclado Mecânico</span>
                    <span className="text-amber-400">5 {t("units")}</span>
                  </div>
                </div>
              </div>

              {/* Inventory Turnover */}
              <div className="bg-emerald-500/10 rounded-lg p-3 border border-emerald-500/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-emerald-400 flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    {t("inventory_turnover")}
                  </span>
                  <span className="text-xs text-emerald-300">8.2x</span>
                </div>
                <div className="text-xs text-slate-400">
                  <div>{t("industry_average")}: 4.5x</div>
                  <div className="text-emerald-400 font-medium">+82% {t("above_average")}</div>
                </div>
              </div>

              {/* Categories */}
              <div className="bg-slate-800 rounded-lg p-3">
                <div className="text-sm font-medium text-slate-300 mb-2">{t("categories")}</div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">{t("electronics")}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-slate-700 rounded-full h-1.5">
                        <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '75%' }} />
                      </div>
                      <span className="text-xs text-slate-300">75%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">{t("peripherals")}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-slate-700 rounded-full h-1.5">
                        <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: '45%' }} />
                      </div>
                      <span className="text-xs text-slate-300">45%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'crm':
        return (
          <div className="bg-slate-900 rounded-xl border border-slate-700 overflow-hidden">
            {/* Header */}
            <div className="bg-slate-800 px-4 py-3 border-b border-slate-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full" />
                  <span className="text-sm font-medium text-slate-300">{t("crm_sales")}</span>
                </div>
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-slate-600 rounded-full" />
                  <div className="w-2 h-2 bg-slate-600 rounded-full" />
                </div>
              </div>
            </div>
            
            {/* Content */}
            <div className="p-4 space-y-3">
              {/* Sales Funnel */}
              <div className="bg-blue-500/10 rounded-lg p-3 border border-blue-500/20">
                <div className="text-sm font-medium text-blue-400 mb-2 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  {t("sales_funnel")}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">{t("leads")}</span>
                    <span className="text-slate-300">1,247</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-1.5">
                    <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '100%' }} />
                  </div>
                  
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">{t("opportunities")}</span>
                    <span className="text-slate-300">342</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-1.5">
                    <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '27%' }} />
                  </div>
                  
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">{t("closed")}</span>
                    <span className="text-emerald-400">89</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-1.5">
                    <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '7%' }} />
                  </div>
                </div>
              </div>

              {/* Contact History */}
              <div className="bg-slate-800 rounded-lg p-3">
                <div className="text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  {t("contact_history")}
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">{t("total_contacts")}</span>
                    <span className="text-slate-300">8,421</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">{t("active")}</span>
                    <span className="text-emerald-400">3,247</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">{t("last_activity")}</span>
                    <span className="text-slate-300">2 {t("minutes_ago")}</span>
                  </div>
                </div>
              </div>

              {/* Conversion Rate */}
              <div className="bg-emerald-500/10 rounded-lg p-3 border border-emerald-500/20">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-emerald-400">{t("conversion_rate")}</span>
                  <span className="text-xs text-emerald-300">+23%</span>
                </div>
                <div className="text-lg font-bold text-emerald-400">26.3%</div>
                <div className="text-xs text-slate-400">{t("target")}: 25%</div>
              </div>
            </div>
          </div>
        );

      case 'rbac':
        return (
          <div className="bg-slate-900 rounded-xl border border-slate-700 overflow-hidden">
            {/* Header */}
            <div className="bg-slate-800 px-4 py-3 border-b border-slate-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-violet-500 rounded-full" />
                  <span className="text-sm font-medium text-slate-300">{t("access_control")}</span>
                </div>
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-slate-600 rounded-full" />
                  <div className="w-2 h-2 bg-slate-600 rounded-full" />
                </div>
              </div>
            </div>
            
            {/* Content */}
            <div className="p-4 space-y-3">
              {/* User Permissions */}
              <div className="bg-violet-500/10 rounded-lg p-3 border border-violet-500/20">
                <div className="text-sm font-medium text-violet-400 mb-2 flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  {t("user_permissions")}
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">{t("admin")}</span>
                    <span className="text-slate-300">3</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">{t("managers")}</span>
                    <span className="text-slate-300">12</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">{t("operators")}</span>
                    <span className="text-slate-300">47</span>
                  </div>
                </div>
              </div>

              {/* Security Audit */}
              <div className="bg-emerald-500/10 rounded-lg p-3 border border-emerald-500/20">
                <div className="text-sm font-medium text-emerald-400 mb-2 flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  {t("security_audit")}
                </div>
                <div className="space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">{t("logs_today")}</span>
                    <span className="text-slate-300">1,247</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">{t("alerts")}</span>
                    <span className="text-amber-400">2</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">{t("status")}</span>
                    <span className="text-emerald-400">{t("secure")}</span>
                  </div>
                </div>
              </div>

              {/* Access Control */}
              <div className="bg-slate-800 rounded-lg p-3">
                <div className="text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                  <Database className="w-4 h-4" />
                  {t("data_control")}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-emerald-400" />
                    <span className="text-xs text-slate-300">{t("2fa_active")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-emerald-400" />
                    <span className="text-xs text-slate-300">{t("session_timeout")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-emerald-400" />
                    <span className="text-xs text-slate-300">{t("ip_whitelist")}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const handleExploreFeatures = () => {
    // Redirecionar para página de trial interna
    window.location.href = '/demo/system/trial';
  };

  const activeTabData = tabs.find(tab => tab.id === activeTab);

  return (
    <section id="features" className="py-20 bg-slate-950">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-medium mb-6">
            <Zap className="w-4 h-4" />
            {t("badge")}
          </div>
          
          <h2 className="font-display text-4xl md:text-5xl font-bold text-slate-100 mb-6">
            {t("title")}
          </h2>
          
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        {/* Tabs Navigation */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Tab Menu */}
          <div className="lg:w-1/3">
            <div className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-violet-500/10 border-violet-500/30 text-violet-400'
                      : 'bg-slate-900/50 border-slate-700/50 text-slate-400 hover:bg-slate-900/70 hover:border-slate-600/70 hover:text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      activeTab === tab.id ? 'bg-violet-500/20' : 'bg-slate-800/50'
                    }`}>
                      {tab.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-100 mb-1">{tab.title}</h3>
                      <p className="text-sm text-slate-400">{tab.description}</p>
                    </div>
                    {activeTab === tab.id && (
                      <ArrowRight className="w-5 h-5 text-violet-400" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="lg:w-2/3">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Mockup */}
              <div className="order-2 lg:order-1">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-violet-600/10 blur-xl rounded-xl" />
                  <div className="relative">
                    {renderMockup(activeTabData?.mockupType || 'financial')}
                  </div>
                </div>
              </div>

              {/* Benefits */}
              <div className="order-1 lg:order-2 space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-slate-100 mb-4">
                    {activeTabData?.title}
                  </h3>
                  <p className="text-slate-400 mb-6">
                    {activeTabData?.description}
                  </p>
                </div>

                <div className="space-y-4">
                  {activeTabData?.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-300">{benefit}</span>
                    </div>
                  ))}
                </div>

                <button onClick={handleExploreFeatures} className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-violet-500 text-white rounded-xl font-semibold hover:bg-violet-600 transition-colors duration-300">
                  {t("cta")}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
