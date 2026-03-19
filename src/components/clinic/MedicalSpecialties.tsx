"use client";

import { useState } from "react";
import { Heart, Brain, Eye, Sparkles, Clock, ChevronRight } from "lucide-react";

interface Specialty {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  treatments: string[];
  duration: string;
  popular?: boolean;
}

const specialties: Specialty[] = [
  {
    id: "1",
    name: "Preenchimento Facial",
    description: "Harmonização facial com ácido hialurônico para volume e contorno natural",
    icon: <Heart className="w-6 h-6" />,
    treatments: ["Lábios", "Maçãs do rosto", "Mandíbula", "Nasolabial"],
    duration: "30-45 min",
    popular: true
  },
  {
    id: "2", 
    name: "Toxina Botulínica",
    description: "Redução de rugas dinâmicas e tratamento de bruxismo com resultados naturais",
    icon: <Brain className="w-6 h-6" />,
    treatments: ["Frontal", "Glabela", "Pés de galinha", "Cervical"],
    duration: "20-30 min",
    popular: true
  },
  {
    id: "3",
    name: "Bioestimuladores",
    description: "Estímulo de colágeno para rejuvenescimento e melhora da qualidade da pele",
    icon: <Sparkles className="w-6 h-6" />,
    treatments: ["Sculptra", "Radiesse", "Ellansé", "Hyacorp"],
    duration: "45-60 min"
  },
  {
    id: "4",
    name: "Fios de Sustentação",
    description: "Lifting não cirúrgico com fios de PDO e PLLA para efeito imediato",
    icon: <Eye className="w-6 h-6" />,
    treatments: ["Fios de PDO", "Fios de PLLA", "Fios de sustentação", "Fios tensor"],
    duration: "60-90 min"
  },
  {
    id: "5",
    name: "Peeling Químico",
    description: "Renovação celular e tratamento de manchas com formulações personalizadas",
    icon: <Sparkles className="w-6 h-6" />,
    treatments: ["Peeling superficial", "Peeling médio", "Peeling profundo", "Peeling de combinação"],
    duration: "30-60 min"
  },
  {
    id: "6",
    name: "Microagulhamento",
    description: "Indução de colágeno e tratamento de cicatrizes com microagulhas",
    icon: <Clock className="w-6 h-6" />,
    treatments: ["Microagulhamento clássico", "MMP", "Radiofrequência", "Laser fracionado"],
    duration: "45-75 min"
  }
];

export function MedicalSpecialties() {
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null);

  return (
    <div className="glass-morphism rounded-2xl border border-white/10 dark:border-white/5">
      <div className="p-6 border-b border-white/10 dark:border-white/5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Especialidades Médicas
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Tratamentos avançados com tecnologia e segurança
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
              6 especialidades
            </span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {specialties.map((specialty) => (
            <div
              key={specialty.id}
              className={`
                p-5 rounded-xl border cursor-pointer transition-all duration-300
                ${selectedSpecialty === specialty.id
                  ? 'bg-primary/10 border-primary/30 dark:bg-primary/20 dark:border-primary/40'
                  : 'bg-white/5 border-white/10 dark:bg-white/2 dark:border-white/5 hover:bg-white/10 dark:hover:bg-white/5 hover:border-white/20'
                }
              `}
              onClick={() => setSelectedSpecialty(selectedSpecialty === specialty.id ? null : specialty.id)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  {specialty.icon}
                </div>
                {specialty.popular && (
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                    Popular
                  </span>
                )}
              </div>

              <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
                {specialty.name}
              </h4>
              
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                {specialty.description}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-500">
                  <Clock className="w-3 h-3" />
                  {specialty.duration}
                </div>
                <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${
                  selectedSpecialty === specialty.id ? 'rotate-90' : ''
                }`} />
              </div>

              {selectedSpecialty === specialty.id && (
                <div className="mt-4 pt-4 border-t border-white/10 dark:border-white/5">
                  <p className="text-xs font-medium text-slate-700 dark:text-slate-300 mb-2">Tratamentos:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {specialty.treatments.map((treatment) => (
                      <span
                        key={treatment}
                        className="px-2 py-1 rounded-lg text-xs bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 text-slate-700 dark:text-slate-300"
                      >
                        {treatment}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
