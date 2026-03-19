"use client";

import { Star, Quote } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  age: number;
  treatment: string;
  rating: number;
  text: string;
  date: string;
  beforeAfter?: {
    before: string;
    after: string;
  };
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Ana Carolina Silva",
    age: 32,
    treatment: "Preenchimento Labial",
    rating: 5,
    text: "Resultado incrível! O Dr. Felipe foi super profissional e atencioso. Meus lábios ficaram naturais e harmoniosos. Recomendo muito!",
    date: "2 semanas atrás",
    beforeAfter: {
      before: "Lábios finos e assimétricos",
      after: "Lábios volumosos e simétricos"
    }
  },
  {
    id: "2",
    name: "Mariana Santos",
    age: 28,
    treatment: "Limpeza de Pele Profunda",
    rating: 5,
    text: "Minha pele nunca esteve tão bonita! O tratamento foi indolor e o resultado superou minhas expectativas. A equipe é maravilhosa!",
    date: "1 mês atrás"
  },
  {
    id: "3",
    name: "Patricia Oliveira",
    age: 45,
    treatment: "Toxina Botulínica",
    rating: 5,
    text: "Excelente profissional! O resultado foi muito natural, ninguém percebeu que fiz procedimento, apenas notaram que estou mais descansada.",
    date: "3 semanas atrás"
  },
  {
    id: "4",
    name: "Camila Costa",
    age: 35,
    treatment: "Microagulhamento",
    rating: 4,
    text: "Ótimo tratamento para minhas cicatrizes de acne. A recuperação foi rápida e o resultado está aparecendo gradativamente.",
    date: "2 meses atrás"
  }
];

export function PatientTestimonials() {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-amber-400 fill-amber-400' : 'text-slate-300 dark:text-slate-600'
        }`}
      />
    ));
  };

  return (
    <div className="glass-morphism rounded-2xl border border-white/10 dark:border-white/5">
      <div className="p-6 border-b border-white/10 dark:border-white/5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Depoimentos de Pacientes
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Experiências reais de quem confia em nosso trabalho
            </p>
          </div>
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }, (_, i) => (
              <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
            ))}
            <span className="ml-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
              4.9/5.0
            </span>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="p-5 rounded-xl bg-white/5 dark:bg-white/2 border border-white/10 dark:border-white/5">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
                  <span className="text-primary font-semibold text-lg">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-slate-100">
                    {testimonial.name}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      {testimonial.age} anos
                    </span>
                    <span className="text-slate-400 dark:text-slate-600">•</span>
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      {testimonial.treatment}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className="flex">
                  {renderStars(testimonial.rating)}
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-500">
                  {testimonial.date}
                </span>
              </div>
            </div>

            <div className="relative">
              <Quote className="absolute -top-2 -left-2 w-8 h-8 text-primary/20" />
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed pl-6">
                {testimonial.text}
              </p>
            </div>

            {testimonial.beforeAfter && (
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="text-center p-3 rounded-lg bg-slate-100 dark:bg-slate-800/50">
                  <p className="text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Antes</p>
                  <p className="text-xs text-slate-700 dark:text-slate-300">{testimonial.beforeAfter.before}</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                  <p className="text-xs font-medium text-emerald-700 dark:text-emerald-400 mb-1">Depois</p>
                  <p className="text-xs text-emerald-700 dark:text-emerald-300">{testimonial.beforeAfter.after}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
