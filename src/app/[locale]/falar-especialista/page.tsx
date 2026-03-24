"use client";

import { useState } from "react";
import { ArrowLeft, CheckCircle2, ArrowRight, MessageCircle, Video, Star, Zap, Target, TrendingUp, Calendar, Clock } from "lucide-react";
import { Link } from "@/i18n/routing";

export default function FalarEspecialistaPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    currentTools: "",
    biggestChallenge: "",
    monthlyAdSpend: "",
    preferredDate: "",
    preferredTime: ""
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const challenges = [
    { value: "", label: "Selecione seu maior desafio" },
    { value: "roas", label: "ROAS abaixo do esperado" },
    { value: "escala", label: "Dificuldade para escalar campanhas" },
    { value: "relatorios", label: "Relatórios manuais e demorados" },
    { value: "integracao", label: "Ferramentas não integradas" },
    { value: "time", label: "Falta de tempo da equipe" },
    { value: "outro", label: "Outro desafio" }
  ];

  const adSpendOptions = [
    { value: "", label: "Investimento mensal em ads" },
    { value: "ate-10k", label: "Até R$ 10.000" },
    { value: "10k-50k", label: "R$ 10.000 - R$ 50.000" },
    { value: "50k-100k", label: "R$ 50.000 - R$ 100.000" },
    { value: "100k-500k", label: "R$ 100.000 - R$ 500.000" },
    { value: "500k+", label: "Acima de R$ 500.000" }
  ];

  const timeSlots = [
    "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00", "18:00"
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
              Consultoria Agendada!
            </h1>
            
            <p className="text-slate-400 mb-6">
              Um especialista entrará em contato para confirmar e preparar uma análise personalizada.
            </p>
            
            <div className="bg-slate-900/50 rounded-xl p-4 mb-6 text-left">
              <div className="flex justify-between mb-2">
                <span className="text-slate-400">Tipo:</span>
                <span className="text-slate-100 font-medium">Consultoria Gratuita</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-slate-400">Duração:</span>
                <span className="text-slate-100 font-medium">30 minutos</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Formato:</span>
                <span className="text-slate-100 font-medium">Videochamada</span>
              </div>
            </div>
            
            <Link 
              href="/demos/agencia"
              className="inline-flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-violet-500 to-amber-500 text-white rounded-xl font-semibold hover:opacity-90 transition-opacity"
            >
              Voltar para Demo
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

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-medium mb-6">
              <MessageCircle className="w-4 h-4" />
              Consultoria Gratuita
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4">
              Fale com um Especialista
            </h1>
            
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Consultoria gratuita de 30 minutos com nossos experts em performance. Análise personalizada do seu cenário atual.
            </p>
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 text-center">
              <div className="w-12 h-12 mx-auto rounded-xl bg-violet-500/20 flex items-center justify-center mb-3">
                <Target className="w-6 h-6 text-violet-400" />
              </div>
              <h3 className="text-slate-100 font-semibold mb-1">Diagnóstico Personalizado</h3>
              <p className="text-slate-400 text-sm">Análise das suas campanhas atuais</p>
            </div>
            <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 text-center">
              <div className="w-12 h-12 mx-auto rounded-xl bg-amber-500/20 flex items-center justify-center mb-3">
                <Zap className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="text-slate-100 font-semibold mb-1">Plano de Ação</h3>
              <p className="text-slate-400 text-sm">Roadmap para melhorar resultados</p>
            </div>
            <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 text-center">
              <div className="w-12 h-12 mx-auto rounded-xl bg-emerald-500/20 flex items-center justify-center mb-3">
                <TrendingUp className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-slate-100 font-semibold mb-1">Projeção de ROAS</h3>
              <p className="text-slate-400 text-sm">Estimativa de potencial de crescimento</p>
            </div>
          </div>

          {/* Form */}
          <div className="bg-slate-900/50 border border-slate-700 rounded-2xl p-8">
            <h2 className="text-xl font-bold text-slate-100 mb-6">
              Agende sua consultoria gratuita
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Nome completo</label>
                  <input
                    type="text"
                    required
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
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:border-violet-500/30 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                    placeholder="seu@empresa.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">WhatsApp</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:border-violet-500/30 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                    placeholder="(11) 99999-9999"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Empresa/Agência</label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:border-violet-500/30 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                    placeholder="Nome da empresa"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Ferramentas atuais</label>
                  <input
                    type="text"
                    value={formData.currentTools}
                    onChange={(e) => setFormData({...formData, currentTools: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:border-violet-500/30 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                    placeholder="Ex: Meta Ads, Google Ads, planilhas..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Investimento mensal em ads</label>
                  <select
                    required
                    value={formData.monthlyAdSpend}
                    onChange={(e) => setFormData({...formData, monthlyAdSpend: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-100 focus:border-violet-500/30 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                  >
                    {adSpendOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Maior desafio atual</label>
                <select
                  required
                  value={formData.biggestChallenge}
                  onChange={(e) => setFormData({...formData, biggestChallenge: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-100 focus:border-violet-500/30 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                >
                  {challenges.map((c) => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Data preferida
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({...formData, preferredDate: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-100 focus:border-violet-500/30 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Horário preferido
                  </label>
                  <select
                    required
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({...formData, preferredTime: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-100 focus:border-violet-500/30 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                  >
                    <option value="">Selecione...</option>
                    {timeSlots.map((time) => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 bg-gradient-to-r from-violet-500 to-amber-500 text-white rounded-xl font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-transparent rounded-full animate-spin" />
                    Agendando...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Video className="w-5 h-5" />
                    Agendar Consultoria Gratuita
                  </span>
                )}
              </button>
            </form>
          </div>

          {/* Testimonial */}
          <div className="mt-8 bg-gradient-to-r from-violet-600/10 to-amber-500/10 border border-violet-500/20 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0">
                <span className="text-slate-300 font-bold">JS</span>
              </div>
              <div>
                <p className="text-slate-300 italic mb-2">
                  "A consultoria gratuita foi um divisor de águas. Em 30 minutos o especialista identificou gargalos que estavam custando R$ 15k por mês."
                </p>
                <p className="text-slate-400 text-sm">
                  <span className="text-slate-200 font-semibold">João Silva</span> — Diretor, Agência GrowthPro
                </p>
                <div className="flex gap-1 mt-2">
                  {[1,2,3,4,5].map((i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
