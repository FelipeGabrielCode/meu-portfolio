"use client";

import { useState } from "react";
import { Check, Star, Zap, Shield, Crown } from "lucide-react";
import { useTranslations } from "next-intl";

interface Plan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  highlighted?: boolean;
  icon: React.ReactNode;
  badge?: string;
}

export default function PricingPlans() {
  const t = useTranslations("Pricing");
  const [isYearly, setIsYearly] = useState(false);

  const plans: Plan[] = [
    {
      id: "starter",
      name: t("plans.starter.name"),
      description: t("plans.starter.description"),
      monthlyPrice: 97,
      yearlyPrice: 776,
      features: [
        t("plans.starter.features.0"),
        t("plans.starter.features.1"),
        t("plans.starter.features.2"),
        t("plans.starter.features.3"),
        t("plans.starter.features.4")
      ],
      icon: <Zap className="w-5 h-5" />
    },
    {
      id: "pro",
      name: t("plans.pro.name"),
      description: t("plans.pro.description"),
      monthlyPrice: 297,
      yearlyPrice: 2376,
      features: [
        t("plans.pro.features.0"),
        t("plans.pro.features.1"),
        t("plans.pro.features.2"),
        t("plans.pro.features.3"),
        t("plans.pro.features.4"),
        t("plans.pro.features.5"),
        t("plans.pro.features.6")
      ],
      highlighted: true,
      badge: t("plans.pro.badge"),
      icon: <Star className="w-5 h-5" />
    },
    {
      id: "enterprise",
      name: t("plans.enterprise.name"),
      description: t("plans.enterprise.description"),
      monthlyPrice: 997,
      yearlyPrice: 7976,
      features: [
        t("plans.enterprise.features.0"),
        t("plans.enterprise.features.1"),
        t("plans.enterprise.features.2"),
        t("plans.enterprise.features.3"),
        t("plans.enterprise.features.4"),
        t("plans.enterprise.features.5"),
        t("plans.enterprise.features.6"),
        t("plans.enterprise.features.7")
      ],
      icon: <Crown className="w-5 h-5" />
    }
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const handlePlanSelect = (planId: string) => {
    console.log(`Selected plan: ${planId}`);
    // Redirecionar para página de checkout interna
    if (planId === 'starter') {
      window.location.href = '/checkout/starter';
    } else if (planId === 'pro') {
      window.location.href = '/checkout/pro';
    } else if (planId === 'enterprise') {
      window.location.href = '/enterprise';
    }
  };

  return (
    <section id="pricing" className="relative py-20 overflow-hidden">
      {/* Background radial gradient */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-1/2 w-[1200px] h-[600px] -translate-x-1/2 bg-gradient-to-r from-violet-600/10 via-violet-500/5 to-transparent blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[400px] bg-gradient-to-l from-emerald-600/10 via-emerald-500/5 to-transparent blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-6 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-medium mb-6">
            <Shield className="w-4 h-4" />
            {t("badge")}
          </div>
          
          <h2 className="font-display text-4xl md:text-5xl font-bold text-slate-100 mb-6">
            {t("title")}
          </h2>
          
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-8">
            {t("subtitle")}
          </p>

          {/* Toggle Button */}
          <div className="inline-flex items-center gap-4 p-1 bg-slate-800/50 rounded-xl border border-slate-700">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                !isYearly
                  ? 'bg-slate-900 text-slate-100 shadow-sm'
                  : 'text-slate-400 hover:text-slate-300'
              }`}
            >
              {t("billing.monthly")}
            </button>
            
            <button
              onClick={() => setIsYearly(true)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                isYearly
                  ? 'bg-slate-900 text-slate-100 shadow-sm'
                  : 'text-slate-400 hover:text-slate-300'
              }`}
            >
              {t("billing.yearly")}
              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-medium">
                {t("billing.save")}
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => {
            const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
            const monthlyEquivalent = isYearly ? price / 12 : price;
            
            return (
              <div
                key={plan.id}
                className={`relative group ${plan.highlighted ? 'md:scale-105' : ''} transition-all duration-500`}
              >
                {/* Popular Badge */}
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                    <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-violet-500 to-violet-600 text-white text-xs font-semibold shadow-lg shadow-violet-500/25">
                      <Star className="w-3 h-3" />
                      {plan.badge}
                    </div>
                  </div>
                )}

                <div className={`relative h-full p-8 rounded-2xl border transition-all duration-300 ${
                  plan.highlighted
                    ? 'bg-slate-900/50 border-violet-500/50 shadow-2xl shadow-violet-500/10 hover:border-violet-400/60 hover:shadow-violet-400/20'
                    : 'bg-slate-900/30 border-slate-700/50 hover:border-slate-600/60 hover:bg-slate-900/40'
                }`}>

                  {/* Glow Effect for highlighted plan */}
                  {plan.highlighted && (
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-500/10 to-violet-600/10 blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
                  )}

                  <div className="relative z-10">
                    {/* Plan Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          plan.highlighted ? 'bg-violet-500/20 text-violet-400' : 'bg-slate-800/50 text-slate-400'
                        }`}>
                          {plan.icon}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-slate-100">{plan.name}</h3>
                          <p className="text-sm text-slate-400">{plan.description}</p>
                        </div>
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="mb-8">
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold text-slate-100">
                          {formatPrice(monthlyEquivalent)}
                        </span>
                        <span className="text-slate-400">/{t("billing.perMonth")}</span>
                      </div>
                      {isYearly && (
                        <p className="text-sm text-emerald-400 mt-2">
                          {t("billing.billedAnnually", { amount: formatPrice(price) })}
                        </p>
                      )}
                    </div>

                    {/* Features */}
                    <div className="space-y-4 mb-8">
                      {plan.features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-slate-300">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <button
                      onClick={() => handlePlanSelect(plan.id)}
                      className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                        plan.highlighted
                          ? 'bg-gradient-to-r from-violet-500 to-violet-600 text-white hover:from-violet-600 hover:to-violet-700 shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:-translate-y-0.5'
                          : 'bg-slate-800/50 text-slate-300 border border-slate-700 hover:bg-slate-800 hover:border-slate-600 hover:text-slate-100'
                      }`}
                    >
                      {t("cta")}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="text-center mt-16">
          <p className="text-sm text-slate-400">
            {t("guarantee")}
          </p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-400 font-medium">{t("moneyBack")}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
