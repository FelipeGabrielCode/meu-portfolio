"use client";

import { Award, Shield, CheckCircle, Star, Users, TrendingUp } from "lucide-react";

interface TrustBadge {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  color: 'blue' | 'emerald' | 'amber' | 'purple';
  stats?: {
    value: string;
    label: string;
  };
}

const trustBadges: TrustBadge[] = [
  {
    id: "1",
    icon: <Award className="w-6 h-6" />,
    title: "Certificado de Excelência",
    description: "Reconhecimento internacional em práticas jurídicas e consultivas",
    color: "blue",
    stats: {
      value: "15+",
      label: "Anos de experiência"
    }
  },
  {
    id: "2",
    icon: <Shield className="w-6 h-6" />,
    title: "100% Conformidade Legal",
    description: "Total aderência às regulamentações e normas vigentes",
    color: "emerald",
    stats: {
      value: "0",
      label: "Infrações em 15 anos"
    }
  },
  {
    id: "3",
    icon: <Users className="w-6 h-6" />,
    title: "Clientes Satisfeitos",
    description: "Taxa de satisfação e retenção de clientes acima da média",
    color: "amber",
    stats: {
      value: "98%",
      label: "Clientes satisfeitos"
    }
  },
  {
    id: "4",
    icon: <Star className="w-6 h-6" />,
    title: "Premiado pelo Setor",
    description: "Múltiplos prêmios de excelência e inovação",
    color: "purple",
    stats: {
      value: "12",
      label: "Prêmios recebidos"
    }
  }
];

const certifications = [
  { name: "OAB/SP", description: "Ordem dos Advogados do Brasil" },
  { name: "ISO 9001", description: "Gestão de Qualidade" },
  { name: "LGPD Compliance", description: "Proteção de Dados" },
  { name: "Certificado Digital", description: "Autenticação Segura" }
];

export function TrustBadges() {
  const getColorClasses = (color: TrustBadge['color']) => {
    switch (color) {
      case 'blue':
        return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20';
      case 'emerald':
        return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20';
      case 'amber':
        return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20';
      case 'purple':
        return 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Main Trust Badges */}
      <div className="glass-morphism rounded-2xl border border-white/10 dark:border-white/5">
        <div className="p-6 border-b border-white/10 dark:border-white/5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Badges de Confiança
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Reconhecimento e certificações que validam nossa excelência
              </p>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-500" />
              <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                Verificado
              </span>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {trustBadges.map((badge) => (
              <div
                key={badge.id}
                className="p-5 rounded-xl bg-white/5 dark:bg-white/2 border border-white/10 dark:border-white/5 hover:bg-white/10 dark:hover:bg-white/5 transition-all duration-300"
              >
                <div className="flex flex-col items-center text-center">
                  <div className={`w-16 h-16 rounded-xl ${getColorClasses(badge.color)} flex items-center justify-center mb-3`}>
                    {badge.icon}
                  </div>
                  <h4 className="font-semibold text-slate-900 dark:text-slate-100 text-sm mb-2">
                    {badge.title}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                    {badge.description}
                  </p>
                  {badge.stats && (
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">
                        {badge.stats.value}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-500">
                        {badge.stats.label}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Certifications */}
      <div className="glass-morphism rounded-2xl border border-white/10 dark:border-white/5">
        <div className="p-6 border-b border-white/10 dark:border-white/5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Certificações
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Nossas certificações e conformidades regulatórias
              </p>
            </div>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-2 h-2 rounded-full bg-emerald-500" />
              ))}
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="p-4 rounded-lg bg-white/5 dark:bg-white/2 border border-white/10 dark:border-white/5 text-center hover:bg-white/10 dark:hover:bg-white/5 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold text-slate-900 dark:text-slate-100 text-sm mb-1">
                  {cert.name}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  {cert.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-morphism rounded-xl p-4 border border-white/10 dark:border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-emerald-500" />
            </div>
            <div>
              <div className="text-lg font-bold text-slate-900 dark:text-slate-100">
                98%
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-300">
                Taxa de sucesso
              </div>
            </div>
          </div>
        </div>

        <div className="glass-morphism rounded-xl p-4 border border-white/10 dark:border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <div className="text-lg font-bold text-slate-900 dark:text-slate-100">
                500+
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-300">
                Casos resolvidos
              </div>
            </div>
          </div>
        </div>

        <div className="glass-morphism rounded-xl p-4 border border-white/10 dark:border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
              <Star className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <div className="text-lg font-bold text-slate-900 dark:text-slate-100">
                4.9/5
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-300">
                Avaliação média
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
