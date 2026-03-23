"use client";

import { useState } from "react";
import { ArrowLeft, Play, Pause, RotateCcw, Settings, BarChart3, Users, Zap, Shield, Check, Star, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

export default function SystemTrial() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  const demoSteps = [
    { title: "Dashboard Principal", description: "Visão geral de métricas e KPIs" },
    { title: "Gestão de Usuários", description: "Administração de equipes e permissões" },
    { title: "Análise de Dados", description: "Relatórios detalhados e insights" },
    { title: "Configurações", description: "Personalização do sistema" }
  ];

  const nextStep = () => {
    setCurrentStep((prev) => (prev + 1) % demoSteps.length);
  };

  const prevStep = () => {
    setCurrentStep((prev) => (prev - 1 + demoSteps.length) % demoSteps.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para o site
        </Link>

        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Demo do Sistema de Gestão
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              Experimente nossa plataforma de gestão empresarial com uma demonstração interativa
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Demo Interface */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden">
                {/* Demo Controls */}
                <div className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                        <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                      </div>
                      <span className="text-sm text-slate-600 dark:text-slate-400 ml-4">
                        Sistema de Gestão v2.0 - Demo
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
                      >
                        {isPlaying ? (
                          <Pause className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                        ) : (
                          <Play className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                        )}
                      </button>
                      <button
                        onClick={() => setCurrentStep(0)}
                        className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
                      >
                        <RotateCcw className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Demo Content */}
                <div className="p-6">
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                      {demoSteps[currentStep].title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400">
                      {demoSteps[currentStep].description}
                    </p>
                  </div>

                  {/* Demo Dashboard */}
                  <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-6 min-h-[400px]">
                    {currentStep === 0 && (
                      <div className="space-y-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="bg-white dark:bg-slate-800 p-4 rounded-xl">
                            <div className="flex items-center justify-between mb-2">
                              <Users className="w-5 h-5 text-blue-500" />
                              <span className="text-xs text-emerald-500">+12%</span>
                            </div>
                            <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">1,234</div>
                            <div className="text-sm text-slate-600 dark:text-slate-400">Usuários Ativos</div>
                          </div>
                          <div className="bg-white dark:bg-slate-800 p-4 rounded-xl">
                            <div className="flex items-center justify-between mb-2">
                              <BarChart3 className="w-5 h-5 text-emerald-500" />
                              <span className="text-xs text-emerald-500">+23%</span>
                            </div>
                            <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">R$ 45.6K</div>
                            <div className="text-sm text-slate-600 dark:text-slate-400">Receita Mensal</div>
                          </div>
                          <div className="bg-white dark:bg-slate-800 p-4 rounded-xl">
                            <div className="flex items-center justify-between mb-2">
                              <Zap className="w-5 h-5 text-amber-500" />
                              <span className="text-xs text-red-500">-5%</span>
                            </div>
                            <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">89.3%</div>
                            <div className="text-sm text-slate-600 dark:text-slate-400">Taxa de Conversão</div>
                          </div>
                          <div className="bg-white dark:bg-slate-800 p-4 rounded-xl">
                            <div className="flex items-center justify-between mb-2">
                              <Shield className="w-5 h-5 text-purple-500" />
                              <span className="text-xs text-emerald-500">+8%</span>
                            </div>
                            <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">456</div>
                            <div className="text-sm text-slate-600 dark:text-slate-400">Projetos Ativos</div>
                          </div>
                        </div>
                        
                        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl">
                          <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-3">Atividade Recente</h4>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg">
                              <div className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                                <span className="text-sm text-slate-700 dark:text-slate-300">Novo projeto criado</span>
                              </div>
                              <span className="text-xs text-slate-500">há 2 min</span>
                            </div>
                            <div className="flex items-center justify-between p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg">
                              <div className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                <span className="text-sm text-slate-700 dark:text-slate-300">Usuário adicionado à equipe</span>
                              </div>
                              <span className="text-xs text-slate-500">há 15 min</span>
                            </div>
                            <div className="flex items-center justify-between p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg">
                              <div className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                                <span className="text-sm text-slate-700 dark:text-slate-300">Relatório gerado</span>
                              </div>
                              <span className="text-xs text-slate-500">há 1 hora</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {currentStep === 1 && (
                      <div className="space-y-6">
                        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl">
                          <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-3">Gerenciar Equipe</h4>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 border border-slate-200 dark:border-slate-700 rounded-lg">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                                  JS
                                </div>
                                <div>
                                  <div className="font-medium text-slate-900 dark:text-slate-100">João Silva</div>
                                  <div className="text-sm text-slate-600 dark:text-slate-400">Administrador</div>
                                </div>
                              </div>
                              <span className="px-2 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-xs rounded-full">
                                Ativo
                              </span>
                            </div>
                            <div className="flex items-center justify-between p-3 border border-slate-200 dark:border-slate-700 rounded-lg">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full flex items-center justify-center text-white font-semibold">
                                  AS
                                </div>
                                <div>
                                  <div className="font-medium text-slate-900 dark:text-slate-100">Ana Santos</div>
                                  <div className="text-sm text-slate-600 dark:text-slate-400">Gerente</div>
                                </div>
                              </div>
                              <span className="px-2 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-xs rounded-full">
                                Ativo
                              </span>
                            </div>
                            <div className="flex items-center justify-between p-3 border border-slate-200 dark:border-slate-700 rounded-lg">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center text-white font-semibold">
                                  RC
                                </div>
                                <div>
                                  <div className="font-medium text-slate-900 dark:text-slate-100">Roberto Costa</div>
                                  <div className="text-sm text-slate-600 dark:text-slate-400">Desenvolvedor</div>
                                </div>
                              </div>
                              <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 text-xs rounded-full">
                                Offline
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {currentStep === 2 && (
                      <div className="space-y-6">
                        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl">
                          <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-3">Análise de Performance</h4>
                          <div className="space-y-4">
                            <div>
                              <div className="flex justify-between text-sm mb-2">
                                <span className="text-slate-600 dark:text-slate-400">Taxa de Conclusão</span>
                                <span className="font-medium text-slate-900 dark:text-slate-100">87%</span>
                              </div>
                              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                                <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full" style={{ width: '87%' }}></div>
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between text-sm mb-2">
                                <span className="text-slate-600 dark:text-slate-400">Satisfação do Cliente</span>
                                <span className="font-medium text-slate-900 dark:text-slate-100">92%</span>
                              </div>
                              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                                <div className="bg-gradient-to-r from-emerald-500 to-teal-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between text-sm mb-2">
                                <span className="text-slate-600 dark:text-slate-400">Eficiência Operacional</span>
                                <span className="font-medium text-slate-900 dark:text-slate-100">78%</span>
                              </div>
                              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                                <div className="bg-gradient-to-r from-amber-500 to-orange-600 h-2 rounded-full" style={{ width: '78%' }}></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {currentStep === 3 && (
                      <div className="space-y-6">
                        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl">
                          <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-3">Configurações do Sistema</h4>
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Nome da Empresa
                              </label>
                              <input
                                type="text"
                                value="Minha Empresa Ltda"
                                readOnly
                                className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Email de Contato
                              </label>
                              <input
                                type="email"
                                value="contato@empresa.com"
                                readOnly
                                className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Chave de API
                              </label>
                              <div className="flex gap-2">
                                <input
                                  type={showPassword ? "text" : "password"}
                                  value="sk_live_1234567890abcdef"
                                  readOnly
                                  className="flex-1 px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                                />
                                <button
                                  onClick={() => setShowPassword(!showPassword)}
                                  className="p-2 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                                >
                                  {showPassword ? (
                                    <EyeOff className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                                  ) : (
                                    <Eye className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Navigation */}
                  <div className="flex items-center justify-between mt-6">
                    <button
                      onClick={prevStep}
                      className="px-4 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
                    >
                      ← Anterior
                    </button>
                    <div className="flex gap-2">
                      {demoSteps.map((_, index) => (
                        <div
                          key={index}
                          className={`w-2 h-2 rounded-full transition-colors ${
                            index === currentStep ? 'bg-primary' : 'bg-slate-300 dark:bg-slate-600'
                          }`}
                        />
                      ))}
                    </div>
                    <button
                      onClick={nextStep}
                      className="px-4 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
                    >
                      Próximo →
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Trial Info */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
                  Período de Teste
                </h3>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <span className="font-medium text-blue-900 dark:text-blue-100">
                        14 dias gratuitos
                      </span>
                    </div>
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      Experimente todos os recursos sem compromisso
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-500" />
                      <span className="text-sm text-slate-700 dark:text-slate-300">Acesso completo</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-500" />
                      <span className="text-sm text-slate-700 dark:text-slate-300">Suporte prioritário</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-500" />
                      <span className="text-sm text-slate-700 dark:text-slate-300">Sem cartão necessário</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
                  Recursos Principais
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <BarChart3 className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <div className="font-medium text-slate-900 dark:text-slate-100">Analytics Avançado</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">Relatórios detalhados em tempo real</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <div className="font-medium text-slate-900 dark:text-slate-100">Gestão de Equipe</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">Controle de acesso e permissões</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <div className="font-medium text-slate-900 dark:text-slate-100">Automação</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">Fluxos de trabalho inteligentes</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <div className="font-medium text-slate-900 dark:text-slate-100">Segurança</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">Criptografia de ponta a ponta</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl shadow-xl p-6 text-white">
                <h3 className="text-lg font-semibold mb-4">
                  Comece Agora!
                </h3>
                <p className="text-sm mb-4 opacity-90">
                  Crie sua conta e comece a transformar sua gestão hoje mesmo.
                </p>
                <Link
                  href="/checkout/starter"
                  className="block w-full py-3 bg-white text-primary rounded-xl font-semibold hover:bg-slate-50 transition-colors text-center"
                >
                  Iniciar Teste Grátis
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
