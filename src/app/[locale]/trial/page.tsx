"use client";

import { useState } from "react";
import { ArrowLeft, CheckCircle2, Users, Mail, Phone, Building2, Calendar, ArrowRight, Star, Shield } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export default function TrialPage() {
  const t = useTranslations("Trial");
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    companySize: "",
    industry: "",
    agreeTerms: false
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const companySizes = [
    { value: "1-10", label: "1-10 funcionários" },
    { value: "11-50", label: "11-50 funcionários" },
    { value: "51-200", label: "51-200 funcionários" },
    { value: "201-500", label: "201-500 funcionários" },
    { value: "500+", label: "500+ funcionários" }
  ];

  const industries = [
    { value: "technology", label: "Tecnologia" },
    { value: "retail", label: "Varejo" },
    { value: "healthcare", label: "Saúde" },
    { value: "finance", label: "Finanças" },
    { value: "education", label: "Educação" },
    { value: "other", label: "Outro" }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulação de processamento
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsComplete(true);
    setIsProcessing(false);
  };

  if (isComplete) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
        <div className="max-w-md w-full">
          <div className="bg-white/[0.02] backdrop-blur-xl rounded-2xl border border-white/5 shadow-2xl p-8 text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 flex items-center justify-center mb-6">
              <CheckCircle2 className="w-8 h-8 text-emerald-400" />
            </div>
            
            <h1 className="text-2xl font-bold text-slate-100 mb-4">
              Trial Solicitado com Sucesso!
            </h1>
            
            <p className="text-slate-400 mb-6">
              Seu trial gratuito de 14 dias foi ativado. Você receberá um email com as instruções de acesso em breve.
            </p>
            
            <div className="bg-slate-900/50 rounded-xl p-4 mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-slate-400">Email:</span>
                <span className="text-slate-100 font-medium">{formData.email}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-slate-400">Empresa:</span>
                <span className="text-slate-100 font-medium">{formData.company}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Duração:</span>
                <span className="text-slate-100 font-medium">14 dias</span>
              </div>
            </div>
            
            <Link 
              href="/demos/gestao"
              className="inline-flex items-center justify-center gap-2 w-full py-3 bg-violet-500 text-white rounded-xl font-semibold hover:bg-violet-600 transition-colors duration-300"
            >
              Ir para Dashboard
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
            href="/demos/gestao"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Link>
        </div>
      </div>

      {/* Trial Form */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-12">
            <div className="flex items-center">
              {[1, 2, 3].map((stepNumber) => (
                <div key={stepNumber} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= stepNumber
                      ? 'bg-violet-500 text-white'
                      : 'bg-slate-700 text-slate-400'
                  }`}>
                    {stepNumber}
                  </div>
                  {stepNumber < 3 && (
                    <div className={`w-16 h-0.5 ${
                      step > stepNumber ? 'bg-violet-500' : 'bg-slate-700'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-slate-100 mb-4">
              Comece seu Trial Gratuito
            </h1>
            <p className="text-lg text-slate-400">
              Teste todas as funcionalidades do nosso sistema por 14 dias, sem compromisso.
            </p>
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
              <div className="w-12 h-12 rounded-xl bg-violet-500/20 flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-violet-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-100 mb-2">Acesso Completo</h3>
              <p className="text-slate-400 text-sm">Todos os recursos disponíveis durante o trial</p>
            </div>
            
            <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
              <div className="w-12 h-12 rounded-xl bg-violet-500/20 flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-violet-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-100 mb-2">14 Dias Grátis</h3>
              <p className="text-slate-400 text-sm">Tempo suficiente para explorar tudo</p>
            </div>
            
            <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
              <div className="w-12 h-12 rounded-xl bg-violet-500/20 flex items-center justify-center mb-4">
                <Star className="w-6 h-6 text-violet-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-100 mb-2">Sem Cartão</h3>
              <p className="text-slate-400 text-sm">Não precisa de dados de pagamento</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Nome
                </label>
                <input
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:border-violet-500/30 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-colors"
                  placeholder="João"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Sobrenome
                </label>
                <input
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:border-violet-500/30 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-colors"
                  placeholder="Silva"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:border-violet-500/30 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-colors"
                  placeholder="joao@exemplo.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Telefone
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:border-violet-500/30 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-colors"
                  placeholder="(11) 99999-9999"
                />
              </div>
            </div>

            {/* Company Info */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Empresa
                </label>
                <input
                  type="text"
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:border-violet-500/30 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-colors"
                  placeholder="Nome da sua empresa"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Tamanho da Empresa
                  </label>
                  <select
                    required
                    value={formData.companySize}
                    onChange={(e) => setFormData({...formData, companySize: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-100 focus:border-violet-500/30 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-colors"
                  >
                    <option value="">Selecione...</option>
                    {companySizes.map((size) => (
                      <option key={size.value} value={size.value}>
                        {size.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Setor
                  </label>
                  <select
                    required
                    value={formData.industry}
                    onChange={(e) => setFormData({...formData, industry: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-100 focus:border-violet-500/30 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-colors"
                  >
                    <option value="">Selecione...</option>
                    {industries.map((industry) => (
                      <option key={industry.value} value={industry.value}>
                        {industry.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                required
                checked={formData.agreeTerms}
                onChange={(e) => setFormData({...formData, agreeTerms: e.target.checked})}
                className="mt-1 w-4 h-4 text-violet-500 bg-slate-900/50 border-slate-700 rounded focus:ring-violet-500/20 focus:border-violet-500/30"
              />
              <label className="text-sm text-slate-300">
                Eu concordo em receber comunicações sobre o trial e aceito os <a href="#" className="text-violet-400 hover:text-violet-300 underline">termos de serviço</a> e <a href="#" className="text-violet-400 hover:text-violet-300 underline">política de privacidade</a>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-4 bg-violet-500 text-white rounded-xl font-semibold hover:bg-violet-600 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-transparent rounded-full animate-spin" />
                  Processando...
                </span>
              ) : (
                <span>Iniciar Trial Gratuito</span>
              )}
            </button>
          </form>

          {/* Trust Badges */}
          <div className="flex items-center justify-center gap-8 mt-8">
            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <Shield className="w-4 h-4" />
              Dados Seguros
            </div>
            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <Mail className="w-4 h-4" />
              Suporte Prioritário
            </div>
            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <Building2 className="w-4 h-4" />
              Cancelamento Simples
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
