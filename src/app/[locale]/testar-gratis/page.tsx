"use client";

import { useState } from "react";
import { ArrowLeft, CheckCircle2, Sparkles, ArrowRight, Phone, Mail, Building2, Shield, Star } from "lucide-react";
import { Link } from "@/i18n/routing";

export default function TestarGratisPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    monthlyBudget: "",
    agreeTerms: false
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const budgetOptions = [
    { value: "", label: "Selecione seu investimento mensal" },
    { value: "ate-5k", label: "Até R$ 5.000/mês" },
    { value: "5k-20k", label: "R$ 5.000 - R$ 20.000/mês" },
    { value: "20k-50k", label: "R$ 20.000 - R$ 50.000/mês" },
    { value: "50k+", label: "Acima de R$ 50.000/mês" }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsComplete(true);
    setIsProcessing(false);
  };

  if (isComplete) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
        <div className="max-w-md w-full">
          <div className="bg-white/[0.02] backdrop-blur-xl rounded-2xl border border-white/5 shadow-2xl p-8 text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-violet-500/20 to-amber-500/20 flex items-center justify-center mb-6">
              <CheckCircle2 className="w-8 h-8 text-emerald-400" />
            </div>
            
            <h1 className="text-2xl font-bold text-slate-100 mb-4">
              Teste Grátis Ativado!
            </h1>
            
            <p className="text-slate-400 mb-6">
              Você receberá acesso completo por 7 dias. Nosso time entrará em contato em breve.
            </p>
            
            <div className="bg-slate-900/50 rounded-xl p-4 mb-6 text-left">
              <div className="flex justify-between mb-2">
                <span className="text-slate-400">Plano:</span>
                <span className="text-slate-100 font-medium">Teste Grátis 7 dias</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-slate-400">Email:</span>
                <span className="text-slate-100 font-medium">{formData.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Início:</span>
                <span className="text-slate-100 font-medium">Imediato</span>
              </div>
            </div>
            
            <Link 
              href="/demos/agencia"
              className="inline-flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-violet-500 to-amber-500 text-white rounded-xl font-semibold hover:opacity-90 transition-opacity"
            >
              Acessar Dashboard
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <div className="border-b border-white/5">
        <div className="container mx-auto px-6 py-4">
          <Link 
            href="/demos/agencia"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Teste Grátis por 7 Dias
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4">
            Experimente Grátis por 7 Dias
          </h1>
          
          <p className="text-lg text-slate-400">
            Acesso completo a todas as ferramentas. Sem cartão de crédito. Sem compromisso.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
          <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 text-center">
            <div className="w-12 h-12 mx-auto rounded-xl bg-violet-500/20 flex items-center justify-center mb-4">
              <Star className="w-6 h-6 text-violet-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-100 mb-2">Acesso Completo</h3>
            <p className="text-slate-400 text-sm">Todas as funcionalidades liberadas</p>
          </div>
          
          <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 text-center">
            <div className="w-12 h-12 mx-auto rounded-xl bg-amber-500/20 flex items-center justify-center mb-4">
              <Phone className="w-6 h-6 text-amber-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-100 mb-2">Suporte Prioritário</h3>
            <p className="text-slate-400 text-sm">Ajuda dedicada durante o teste</p>
          </div>
          
          <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 text-center">
            <div className="w-12 h-12 mx-auto rounded-xl bg-emerald-500/20 flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-100 mb-2">Sem Compromisso</h3>
            <p className="text-slate-400 text-sm">Cancele a qualquer momento</p>
          </div>
        </div>

        {/* Form */}
        <div className="max-w-xl mx-auto">
          <div className="bg-slate-900/50 border border-slate-700 rounded-2xl p-8">
            <h2 className="text-xl font-bold text-slate-100 mb-6 text-center">
              Preencha seus dados para começar
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Nome</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:border-violet-500/30 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-colors"
                    placeholder="Seu nome"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:border-violet-500/30 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-colors"
                    placeholder="seu@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Telefone</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:border-violet-500/30 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-colors"
                    placeholder="(11) 99999-9999"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Empresa</label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:border-violet-500/30 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-colors"
                    placeholder="Nome da empresa"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Investimento Mensal em Ads</label>
                <select
                  required
                  value={formData.monthlyBudget}
                  onChange={(e) => setFormData({...formData, monthlyBudget: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-100 focus:border-violet-500/30 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-colors"
                >
                  {budgetOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  required
                  checked={formData.agreeTerms}
                  onChange={(e) => setFormData({...formData, agreeTerms: e.target.checked})}
                  className="mt-1 w-4 h-4 text-violet-500 bg-slate-900/50 border-slate-700 rounded focus:ring-violet-500/20"
                />
                <label className="text-sm text-slate-300">
                  Concordo em receber comunicações e aceito os <a href="#" className="text-violet-400 hover:underline">termos de uso</a>
                </label>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 bg-gradient-to-r from-violet-500 to-amber-500 text-white rounded-xl font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-transparent rounded-full animate-spin" />
                    Ativando...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Começar Teste Grátis
                  </span>
                )}
              </button>
            </form>

            <div className="flex items-center justify-center gap-6 mt-6 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Dados seguros
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Sem spam
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                Cancelamento fácil
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
