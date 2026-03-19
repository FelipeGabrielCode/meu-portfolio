"use client";

import { useState } from "react";
import { Scale, Briefcase, FileText, Users, ChevronRight, Calendar, Clock, Eye } from "lucide-react";

interface PracticeArea {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  services: string[];
  experience: string;
  cases: number;
}

const practiceAreas: PracticeArea[] = [
  {
    id: "1",
    title: "Direito Empresarial",
    description: "Assessoria completa para empresas em todas as fases do negócio",
    icon: <Briefcase className="w-6 h-6" />,
    services: [
      "Constituição de empresas",
      "Reorganização societária",
      "Contratos comerciais",
      "Due diligence",
      "Governança corporativa"
    ],
    experience: "15+ anos",
    cases: 127
  },
  {
    id: "2",
    title: "Direito Tributário",
    description: "Planejamento e defesa fiscal para otimização de cargas tributárias",
    icon: <FileText className="w-6 h-6" />,
    services: [
      "Planejamento tributário",
      "Defesa administrativa",
      "Recuperação de tributos",
      "Consultoria fiscal",
      "Tax compliance"
    ],
    experience: "12+ anos",
    cases: 89
  },
  {
    id: "3",
    title: "Direito Trabalhista",
    description: "Prevenção e defesa em relações de trabalho e compliance trabalhista",
    icon: <Users className="w-6 h-6" />,
    services: [
      "Consultoria preventiva",
      "Defesa em reclamações",
      "Acordos coletivos",
      "Compliance trabalhista",
      "Treinamentos internos"
    ],
    experience: "10+ anos",
    cases: 156
  },
  {
    id: "4",
    title: "Direito Digital",
    description: "Proteção de dados, privacidade e regulamentação de tecnologias",
    icon: <Scale className="w-6 h-6" />,
    services: [
      "LGPD e proteção de dados",
      "Contratos digitais",
      "Propriedade intelectual",
      "E-commerce",
      "Startup e tecnologia"
    ],
    experience: "8+ anos",
    cases: 73
  },
  {
    id: "5",
    title: "Direito Imobiliário",
    description: "Assessoria em transações imobiliárias e regularização de imóveis",
    icon: <FileText className="w-6 h-6" />,
    services: [
      "Compra e venda",
      "Locação comercial",
      "Incorporações",
      "Regularização de imóveis",
      "Due diligence imobiliária"
    ],
    experience: "14+ anos",
    cases: 94
  },
  {
    id: "6",
    title: "Direito de Família",
    description: "Atuação sensível e especializada em questões familiares e sucessórias",
    icon: <Users className="w-6 h-6" />,
    services: [
      "Divórcio e separação",
      "Guarda e alimentos",
      "Inventário e partilha",
      "Testamentos e sucessões",
      "União estável"
    ],
    experience: "11+ anos",
    cases: 112
  }
];

export function PracticeAreas() {
  const [selectedArea, setSelectedArea] = useState<string | null>(null);

  return (
    <div className="glass-morphism rounded-2xl border border-white/10 dark:border-white/5">
      <div className="p-6 border-b border-white/10 dark:border-white/5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Áreas de Atuação
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Especialidades jurídicas e consultivas com experiência comprovada
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-primary" />
            <span className="text-sm font-semibold text-primary">
              {practiceAreas.length} áreas
            </span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {practiceAreas.map((area) => (
            <div
              key={area.id}
              className={`
                p-5 rounded-xl border cursor-pointer transition-all duration-300
                ${selectedArea === area.id
                  ? 'bg-primary/10 border-primary/30 dark:bg-primary/20 dark:border-primary/40'
                  : 'bg-white/5 border-white/10 dark:bg-white/2 dark:border-white/5 hover:bg-white/10 dark:hover:bg-white/5'
                }
              `}
              onClick={() => setSelectedArea(selectedArea === area.id ? null : area.id)}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  {area.icon}
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-primary">
                    {area.cases}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-500">
                    casos
                  </div>
                </div>
              </div>

              <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
                {area.title}
              </h4>
              
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                {area.description}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 dark:text-slate-500">
                  {area.experience} de experiência
                </span>
                <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${
                  selectedArea === area.id ? 'rotate-90' : ''
                }`} />
              </div>

              {/* Expanded Content */}
              {selectedArea === area.id && (
                <div className="mt-4 pt-4 border-t border-white/10 dark:border-white/5">
                  <h5 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Serviços:</h5>
                  <div className="space-y-2">
                    {area.services.map((service, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        <span className="text-xs text-slate-600 dark:text-slate-300">
                          {service}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">
                {practiceAreas.reduce((sum, area) => sum + area.cases, 0)}
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-300">
                Casos atendidos
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">
                {practiceAreas.length}
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-300">
                Áreas de atuação
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">
                15+
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-300">
                Anos de experiência
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">
                98%
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-300">
                Taxa de sucesso
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
