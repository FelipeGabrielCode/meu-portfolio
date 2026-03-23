"use client";

import { useState } from "react";
import { ArrowLeft, CheckCircle2, Calendar, Clock, Users, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export default function EnterprisePage() {
  const t = useTranslations("Enterprise");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    role: "",
    message: "",
    preferredDate: "",
    preferredTime: ""
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const timeSlots = [
    "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"
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
              Agendamento Confirmado!
            </h1>
            
            <p className="text-slate-400 mb-6">
              Sua demonstração personalizada foi agendada. Um de nossos especialistas entrará em contato para confirmar os detalhes.
            </p>
            
            <div className="bg-slate-900/50 rounded-xl p-4 mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-slate-400">Data:</span>
                <span className="text-slate-100 font-medium">{formData.preferredDate}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-slate-400">Horário:</span>
                <span className="text-slate-100 font-medium">{formData.preferredTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Email:</span>
                <span className="text-slate-100 font-medium">{formData.email}</span>
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

      {/* Enterprise Demo */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-slate-100 mb-4">
              Demonstração Personalizada Enterprise
            </h1>
            <p className="text-xl text-slate-400 mb-8">
              Agende uma demonstração 1-on-1 com nossos especialistas e veja como nossa plataforma pode transformar sua operação.
            </p>
            
            <div className="flex items-center justify-center gap-8 text-slate-400">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>45 minutos</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>Personalizada</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>Online</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Benefits */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-100 mb-6">O que você verá na demo:</h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-violet-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-100 mb-2">Dashboard Executivo</h3>
                    <p className="text-slate-400">Visualização completa de KPIs e métricas em tempo real</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-violet-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-100 mb-2">Automação Financeira</h3>
                    <p className="text-slate-400">Conciliação bancária e emissão de notas automáticas</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-violet-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-100 mb-2">Gestão de Estoque</h3>
                    <p className="text-slate-400">Controle inteligente com alertas e reposição automática</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-violet-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-100 mb-2">CRM e Vendas</h3>
                    <p className="text-slate-400">Funil completo com automação de follow-up</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-violet-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-100 mb-2">Controle de Acesso</h3>
                    <p className="text-slate-400">Permissões granulares e auditoria de segurança</p>
                  </div>
                </div>
              </div>

              {/* Testimonials */}
              <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 mt-8">
                <h3 className="text-lg font-semibold text-slate-100 mb-4">O que dizem nossos clientes:</h3>
                <div className="space-y-4">
                  <div className="text-slate-300 italic">
                    "A demonstração foi esclarecedora. Vimos exatamente como a plataforma resolveria nossos problemas de gestão."
                    <div className="text-sm text-slate-500 mt-2">— CEO, TechCorp</div>
                  </div>
                  <div className="text-slate-300 italic">
                    "Personalização e atenção aos detalhes. A demo foi adaptada para nossas necessidades específicas."
                    <div className="text-sm text-slate-500 mt-2">— Diretor Financeiro, InovaGroup</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div>
              <div className="bg-white/[0.02] backdrop-blur-xl rounded-2xl border border-white/5 shadow-2xl p-8">
                <h2 className="text-2xl font-bold text-slate-100 mb-6">Agendar Demonstração</h2>
                
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
                  <div className="space-y-4">
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
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Cargo
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.role}
                        onChange={(e) => setFormData({...formData, role: e.target.value})}
                        className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:border-violet-500/30 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-colors"
                        placeholder="CEO, Diretor, Gerente..."
                      />
                    </div>
                  </div>

                  {/* Scheduling */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Data preferida
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.preferredDate}
                        onChange={(e) => setFormData({...formData, preferredDate: e.target.value})}
                        className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-100 focus:border-violet-500/30 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-colors"
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Horário preferido
                      </label>
                      <select
                        required
                        value={formData.preferredTime}
                        onChange={(e) => setFormData({...formData, preferredTime: e.target.value})}
                        className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-100 focus:border-violet-500/30 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-colors"
                      >
                        <option value="">Selecione um horário...</option>
                        {timeSlots.map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Mensagem (opcional)
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      rows={4}
                      className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:border-violet-500/30 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-colors resize-none"
                      placeholder="Conte-nos sobre suas necessidades específicas..."
                    />
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
                        Agendando...
                      </span>
                    ) : (
                      "Agendar Demonstração"
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
