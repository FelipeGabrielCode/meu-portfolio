"use client";

import { useState } from "react";
import { ArrowLeft, CheckCircle2, ArrowRight, Rocket, Zap, TrendingUp, Shield, Phone, Mail } from "lucide-react";
import { Link } from "@/i18n/routing";

export default function ComecarAgoraPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    website: "",
    challenge: ""
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const challenges = [
    { value: "", label: "Qual seu maior desafio hoje?" },
    { value: "roas", label: "ROAS baixo ou campanhas no vermelho" },
    { value: "leads", label: "Falta de leads qualificados" },
    { value: "tempo", label: "Falta de tempo para gerenciar campanhas" },
    { value: "relatorios", label: "Dificuldade em provar valor ao cliente" },
    { value: "escalar", label: "Dificuldade em escalar operações" },
    { value: "outro", label: "Outro desafio" }
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
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-emerald-500/20 to-violet-500/20 flex items-center justify-center mb-6">
              <CheckCircle2 className="w-8 h-8 text-emerald-400" />
            </div>
            
            <h1 className="text-2xl font-bold text-slate-100 mb-4">
              Bem-vindo à Nova Era!
            </h1>
            
            <p className="text-slate-400 mb-6">
              Seu acesso foi liberado. Enviamos as credenciais para seu email.
            </p>
            
            <div className="bg-slate-900/50 rounded-xl p-4 mb-6 text-left">
              <div className="flex justify-between mb-2">
                <span className="text-slate-400">Status:</span>
                <span className="text-emerald-400 font-medium">Ativo</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-slate-400">Email:</span>
                <span className="text-slate-100 font-medium">{formData.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Próximo passo:</span>
                <span className="text-slate-100 font-medium">Onboarding</span>
              </div>
            </div>
            
            <Link 
              href="/demos/agencia"
              className="inline-flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-violet-500 to-amber-500 text-white rounded-xl font-semibold hover:opacity-90 transition-opacity"
            >
              Ir para Plataforma
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

      {/* Hero */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-500/10 to-amber-500/10 border border-violet-500/20 text-violet-400 text-sm font-medium mb-6">
            <Rocket className="w-4 h-4" />
            Setup Express em 2 minutos
          </div>
          
          <h1 className="text-3xl md:text-5xl font-bold text-slate-100 mb-4">
            Comece a Escalar Agora
          </h1>
          
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Configure sua conta em poucos passos e comece a transformar resultados hoje mesmo.
          </p>
        </div>

        {/* Steps */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center gap-4">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step >= s ? 'bg-violet-500 text-white' : 'bg-slate-800 text-slate-400'
                }`}>
                  {s}
                </div>
                {s < 3 && (
                  <div className={`w-16 h-0.5 ${step > s ? 'bg-violet-500' : 'bg-slate-800'}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="max-w-xl mx-auto">
          <div className="bg-slate-900/50 border border-slate-700 rounded-2xl p-8">
            {step === 1 && (
              <>
                <h2 className="text-xl font-bold text-slate-100 mb-6 text-center">
                  Seus dados de acesso
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Nome completo</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:border-violet-500/30 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                      placeholder="Seu nome"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Email profissional</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:border-violet-500/30 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                      placeholder="voce@empresa.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">WhatsApp</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:border-violet-500/30 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                      placeholder="(11) 99999-9999"
                    />
                  </div>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <h2 className="text-xl font-bold text-slate-100 mb-6 text-center">
                  Sobre sua agência
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Nome da agência</label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:border-violet-500/30 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                      placeholder="Sua Agência"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Website (opcional)</label>
                    <input
                      type="url"
                      value={formData.website}
                      onChange={(e) => setFormData({...formData, website: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:border-violet-500/30 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                      placeholder="https://suaagencia.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Seu maior desafio</label>
                    <select
                      value={formData.challenge}
                      onChange={(e) => setFormData({...formData, challenge: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-100 focus:border-violet-500/30 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                    >
                      {challenges.map((c) => (
                        <option key={c.value} value={c.value}>{c.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <h2 className="text-xl font-bold text-slate-100 mb-6 text-center">
                  Tudo pronto!
                </h2>
                <div className="text-center mb-6">
                  <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-violet-500/20 to-amber-500/20 flex items-center justify-center mb-4">
                    <Zap className="w-8 h-8 text-amber-400" />
                  </div>
                  <p className="text-slate-400">
                    Revise seus dados e finalize para liberar acesso imediato.
                  </p>
                </div>
                <div className="bg-slate-900/70 rounded-xl p-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Nome:</span>
                    <span className="text-slate-100">{formData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Email:</span>
                    <span className="text-slate-100">{formData.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Agência:</span>
                    <span className="text-slate-100">{formData.company}</span>
                  </div>
                </div>
              </>
            )}

            {/* Navigation */}
            <div className="flex gap-4 mt-8">
              {step > 1 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="flex-1 py-3 bg-slate-800 text-slate-300 rounded-xl font-semibold hover:bg-slate-700 transition-colors"
                >
                  Voltar
                </button>
              )}
              {step < 3 ? (
                <button
                  onClick={() => setStep(step + 1)}
                  className="flex-1 py-3 bg-gradient-to-r from-violet-500 to-amber-500 text-white rounded-xl font-semibold hover:opacity-90 transition-opacity"
                >
                  Continuar
                  <ArrowRight className="w-4 h-4 inline ml-2" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isProcessing}
                  className="flex-1 py-3 bg-gradient-to-r from-violet-500 to-amber-500 text-white rounded-xl font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {isProcessing ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-transparent rounded-full animate-spin" />
                      Finalizando...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <Rocket className="w-5 h-5" />
                      Começar Agora
                    </span>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Trust badges */}
          <div className="flex items-center justify-center gap-6 mt-8 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              ROI comprovado
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              100% seguro
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Suporte 24/7
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
