"use client";

import { TrendingUp, Users, Target, Award, ArrowRight } from "lucide-react";

interface CaseStudy {
  id: string;
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  results: {
    metric: string;
    value: string;
    improvement: string;
  }[];
  testimonial: string;
  logo: string;
  timeline: string;
}

const caseStudies: CaseStudy[] = [
  {
    id: "1",
    client: "TechStart SaaS",
    industry: "Software",
    challenge: "Baixa conversão em trial gratuito e alto churn",
    solution: "Otimização completa do funil de vendas com automação de nutrição de leads",
    results: [
      { metric: "Conversão Trial → Pago", value: "347%", improvement: "+247%" },
      { metric: "Redução Churn", value: "62%", improvement: "-38%" },
      { metric: "LTV", value: "R$ 2.840", improvement: "+185%" }
    ],
    testimonial: "A transformação foi impressionante. Em 3 meses multiplicamos nossa receita e reduzimos o churn drasticamente.",
    logo: "🚀",
    timeline: "3 meses"
  },
  {
    id: "2",
    client: "Fashion E-commerce",
    industry: "Varejo",
    challenge: "Custo de aquisição elevado e baixo retorno sobre investimento",
    solution: "Implementação de estratégia de marketing multicanal com análise preditiva",
    results: [
      { metric: "ROAS", value: "8.7x", improvement: "+340%" },
      { metric: "CAC", value: "R$ 45", improvement: "-67%" },
      { metric: "Taxa Conversão", value: "4.2%", improvement: "+180%" }
    ],
    testimonial: "Finalmente temos marketing que gera lucro real. A estratégia multicanal mudou completamente nosso jogo.",
    logo: "👗",
    timeline: "4 meses"
  },
  {
    id: "3",
    client: "HealthTech Startup",
    industry: "Saúde",
    challenge: "Dificuldade em escalar operações e manter qualidade do atendimento",
    solution: "Automação de processos e implementação de sistema de gestão integrado",
    results: [
      { metric: "Eficiência Operacional", value: "89%", improvement: "+156%" },
      { metric: "Satisfação Cliente", value: "4.8/5", improvement: "+42%" },
      { metric: "Capacidade Atendimento", value: "3.2x", improvement: "+220%" }
    ],
    testimonial: "Conseguimos triplicar nossa capacidade sem perder qualidade. A automação foi revolucionária.",
    logo: "🏥",
    timeline: "6 meses"
  }
];

export function SuccessCases() {
  return (
    <div className="glass-morphism rounded-2xl border border-white/10 dark:border-white/5">
      <div className="p-6 border-b border-white/10 dark:border-white/5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Cases de Sucesso
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Resultados reais que transformam negócios
            </p>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-500" />
            <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
              +300% ROI médio
            </span>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {caseStudies.map((caseStudy, index) => (
          <div key={caseStudy.id} className="p-6 rounded-xl bg-white/5 dark:bg-white/2 border border-white/10 dark:border-white/5">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center text-2xl">
                  {caseStudy.logo}
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-slate-100">
                    {caseStudy.client}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      {caseStudy.industry}
                    </span>
                    <span className="text-slate-400 dark:text-slate-600">•</span>
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      {caseStudy.timeline}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs font-medium text-slate-500 dark:text-slate-500 mb-1">ROI</div>
                <div className="text-lg font-bold text-emerald-500">
                  {caseStudy.results[0].improvement}
                </div>
              </div>
            </div>

            {/* Challenge & Solution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <h5 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Desafio
                </h5>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  {caseStudy.challenge}
                </p>
              </div>
              <div>
                <h5 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  Solução
                </h5>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  {caseStudy.solution}
                </p>
              </div>
            </div>

            {/* Results */}
            <div className="mb-4">
              <h5 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Resultados Alcançados
              </h5>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {caseStudy.results.map((result, resultIndex) => (
                  <div key={resultIndex} className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    <div className="text-xs text-slate-600 dark:text-slate-400 mb-1">{result.metric}</div>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                        {result.value}
                      </span>
                      <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                        {result.improvement}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonial */}
            <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
              <p className="text-sm text-slate-700 dark:text-slate-300 italic">
                "{caseStudy.testimonial}"
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
