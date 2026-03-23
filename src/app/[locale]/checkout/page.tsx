"use client";

import { useState } from "react";
import { ArrowLeft, CheckCircle2, CreditCard, Shield, Star, User, Mail, Lock, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export default function CheckoutPage() {
  const t = useTranslations("Checkout");
  const [selectedPlan, setSelectedPlan] = useState("starter");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    agreeTerms: false
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const plans = {
    starter: {
      name: "Starter",
      price: "R$ 97",
      period: "/mês",
      features: [
        "Até 5 usuários",
        "10GB de armazenamento", 
        "Suporte por email",
        "Recursos básicos",
        "API limitada"
      ]
    },
    pro: {
      name: "Pro", 
      price: "R$ 297",
      period: "/mês",
      features: [
        "Até 25 usuários",
        "100GB de armazenamento",
        "Suporte prioritário 24/7",
        "Recursos avançados",
        "API completa",
        "Integrações ilimitadas",
        "Relatórios personalizados"
      ]
    }
  };

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
              Pagamento Aprovado!
            </h1>
            
            <p className="text-slate-400 mb-6">
              Sua assinatura {plans[selectedPlan as keyof typeof plans].name} foi ativada com sucesso.
            </p>
            
            <div className="bg-slate-900/50 rounded-xl p-4 mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-slate-400">Plano:</span>
                <span className="text-slate-100 font-medium">{plans[selectedPlan as keyof typeof plans].name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Próxima cobrança:</span>
                <span className="text-slate-100 font-medium">Hoje</span>
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

      {/* Checkout Form */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Plan Selection */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-100 mb-6">Escolha seu plano</h2>
              
              {Object.entries(plans).map(([key, plan]) => (
                <div
                  key={key}
                  onClick={() => setSelectedPlan(key)}
                  className={`p-6 rounded-xl border cursor-pointer transition-all duration-300 ${
                    selectedPlan === key
                      ? 'bg-violet-500/10 border-violet-500/30'
                      : 'bg-slate-900/50 border-slate-700 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-slate-100">{plan.name}</h3>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-slate-100">{plan.price}</div>
                      <div className="text-sm text-slate-400">{plan.period}</div>
                    </div>
                  </div>
                  
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Payment Form */}
            <div>
              <h2 className="text-2xl font-bold text-slate-100 mb-6">Informações de pagamento</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Info */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Nome completo
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:border-violet-500/30 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-colors"
                      placeholder="João Silva"
                    />
                  </div>
                  
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
                </div>

                {/* Card Info */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Número do cartão
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.cardNumber}
                      onChange={(e) => setFormData({...formData, cardNumber: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:border-violet-500/30 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-colors"
                      placeholder="0000 0000 0000 0000"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Validade
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.expiry}
                        onChange={(e) => setFormData({...formData, expiry: e.target.value})}
                        className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:border-violet-500/30 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-colors"
                        placeholder="MM/AA"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.cvv}
                        onChange={(e) => setFormData({...formData, cvv: e.target.value})}
                        className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:border-violet-500/30 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-colors"
                        placeholder="123"
                      />
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
                    Eu concordo com os <a href="#" className="text-violet-400 hover:text-violet-300 underline">termos de serviço</a> e <a href="#" className="text-violet-400 hover:text-violet-300 underline">política de privacidade</a>
                  </label>
                </div>

                {/* Security Badge */}
                <div className="flex items-center justify-center gap-2 py-3 bg-slate-900/50 rounded-lg border border-slate-700">
                  <Lock className="w-4 h-4 text-slate-400" />
                  <span className="text-sm text-slate-400">Pagamento 100% seguro e criptografado</span>
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
                    <span className="flex items-center justify-center gap-2">
                      <CreditCard className="w-4 h-4" />
                      Pagar {plans[selectedPlan as keyof typeof plans].price}
                    </span>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
