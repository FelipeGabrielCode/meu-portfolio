"use client";

import { Building2, Star, CheckCircle } from "lucide-react";

interface Client {
  id: string;
  name: string;
  logo: string;
  industry: string;
  size: 'small' | 'medium' | 'large';
  description: string;
  results: string;
}

const clients: Client[] = [
  {
    id: "1",
    name: "TechCorp Solutions",
    logo: "💻",
    industry: "Tecnologia",
    size: "large",
    description: "Empresa de software B2B com 500+ funcionários",
    results: "Aumento de 340% em leads qualificados"
  },
  {
    id: "2",
    name: "Fashion Store Brasil",
    logo: "🛍️",
    industry: "E-commerce",
    size: "medium",
    description: "Loja de moda online com foco em jovens",
    results: "ROAS de 8.7x em campanhas de mídia"
  },
  {
    id: "3",
    name: "HealthPlus Médica",
    logo: "🏥",
    industry: "Saúde",
    size: "medium",
    description: "Clínica médica com 10 unidades",
    results: "Redução de 62% no tempo de espera"
  },
  {
    id: "4",
    name: "Educação Digital",
    logo: "📚",
    industry: "Educação",
    size: "small",
    description: "Plataforma de cursos online",
    results: "Crescimento de 450% na base de alunos"
  },
  {
    id: "5",
    name: "FinTech Innovations",
    logo: "💰",
    industry: "Financeiro",
    size: "large",
    description: "Startup de serviços financeiros",
    results: "Aquisição de 50K novos clientes"
  },
  {
    id: "6",
    name: "FoodExpress Delivery",
    logo: "🍕",
    industry: "Food Delivery",
    size: "medium",
    description: "App de delivery de comida",
    results: "Expansão para 15 novas cidades"
  },
  {
    id: "7",
    name: "GreenEnergy Solutions",
    logo: "🌱",
    industry: "Energia",
    size: "small",
    description: "Empresa de energia solar",
    results: "Vendas 3x maiores que meta anual"
  },
  {
    id: "8",
    name: "RealEstate Premium",
    logo: "🏢",
    industry: "Imobiliário",
    size: "large",
    description: "Incorporadora de alto padrão",
    results: "Lançamentos vendidos em 48h"
  }
];

const testimonials = [
  {
    name: "Carlos Silva",
    role: "CEO da TechCorp",
    company: "TechCorp Solutions",
    content: "A estratégia de marketing digital implementada pela agência transformou completamente nossos resultados. Passamos de 50 leads/mês para mais de 200 leads qualificados.",
    rating: 5,
    avatar: "👨‍💼"
  },
  {
    name: "Ana Santos",
    role: "Diretora de Marketing",
    company: "Fashion Store Brasil",
    content: "O trabalho de otimização de conversão foi excepcional. Nossas taxas de conversão mais que triplicaram e o ROI superou todas as expectativas.",
    rating: 5,
    avatar: "👩‍💼"
  },
  {
    name: "Dr. Roberto Costa",
    role: "Diretor Clínico",
    company: "HealthPlus Médica",
    content: "A automação de processos nos permitiu atender 3x mais pacientes mantendo a qualidade. A equipe é fantástica e sempre disponível.",
    rating: 5,
    avatar: "👨‍⚕️"
  }
];

export function ClientLogos() {
  const getSizeColor = (size: Client['size']) => {
    switch (size) {
      case 'small':
        return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20';
      case 'medium':
        return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20';
      case 'large':
        return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20';
    }
  };

  const getSizeText = (size: Client['size']) => {
    switch (size) {
      case 'small': return 'Pequeno';
      case 'medium': return 'Médio';
      case 'large': return 'Grande';
    }
  };

  return (
    <div className="space-y-6">
      {/* Client Logos Grid */}
      <div className="glass-morphism rounded-2xl border border-white/10 dark:border-white/5">
        <div className="p-6 border-b border-white/10 dark:border-white/5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Nossos Clientes
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Empresas que confiam em nossa estratégia
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-primary" />
              <span className="text-sm font-semibold text-primary">
                {clients.length}+ clientes
              </span>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {clients.map((client) => (
              <div
                key={client.id}
                className="group p-4 rounded-xl bg-white/5 dark:bg-white/2 border border-white/10 dark:border-white/5 hover:bg-white/10 dark:hover:bg-white/5 transition-all duration-300 cursor-pointer"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
                    {client.logo}
                  </div>
                  <h4 className="font-medium text-slate-900 dark:text-slate-100 text-sm mb-1">
                    {client.name}
                  </h4>
                  <span className={`text-xs px-2 py-1 rounded-full ${getSizeColor(client.size)}`}>
                    {getSizeText(client.size)}
                  </span>
                </div>
                
                {/* Tooltip on hover */}
                <div className="mt-3 p-2 rounded-lg bg-slate-900/90 dark:bg-slate-800/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-xs text-white text-center">
                    {client.description}
                  </p>
                  <p className="text-xs text-emerald-400 text-center mt-1 font-medium">
                    {client.results}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Customer Testimonials */}
      <div className="glass-morphism rounded-2xl border border-white/10 dark:border-white/5">
        <div className="p-6 border-b border-white/10 dark:border-white/5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Depoimentos de Clientes
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                O que nossos clientes dizem sobre nós
              </p>
            </div>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
              ))}
              <span className="ml-2 text-sm font-semibold text-amber-600 dark:text-amber-400">
                5.0/5.0
              </span>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-4">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="p-5 rounded-xl bg-white/5 dark:bg-white/2 border border-white/10 dark:border-white/5">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center text-2xl flex-shrink-0">
                  {testimonial.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-slate-100">
                        {testimonial.name}
                      </h4>
                      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <span>{testimonial.role}</span>
                        <span className="text-slate-400 dark:text-slate-600">•</span>
                        <span>{testimonial.company}</span>
                      </div>
                    </div>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    {testimonial.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
