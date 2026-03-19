"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { ArrowRight, Brain, Check, Github, Linkedin, Mail, Sparkles, Zap } from "lucide-react";

type RevealProps = {
  children: ReactNode;
  delayMs?: number;
  className?: string;
};

function Reveal({ children, delayMs = 0, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.14 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={[
        "transition-all duration-700 ease-out",
        visible ? "opacity-100 translate-y-0 animate-fade-in-up" : "opacity-0 translate-y-6",
        className ?? "",
      ].join(" ")}
      style={{ transitionDelay: `${delayMs}ms` }}
    >
      {children}
    </div>
  );
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className="group inline-flex items-center justify-center rounded-xl border border-slate-200/70 dark:border-slate-800/70 bg-white/70 dark:bg-slate-950/40 px-3 py-2 transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-300/90 dark:hover:border-slate-700/80"
    >
      <span className="text-slate-600 dark:text-slate-300 group-hover:text-primary transition-colors">
        {children}
      </span>
    </a>
  );
}

export default function LancamentoIaLandingPage() {
  const [focused, setFocused] = useState<"name" | "email" | "goal" | null>(null);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="h-20" />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-24 left-1/2 w-[62rem] h-[62rem] -translate-x-1/2 rounded-full bg-gradient-to-tr from-primary/16 via-indigo-500/10 to-transparent blur-3xl" />
          <div className="absolute top-36 -left-24 w-[24rem] h-[24rem] rounded-full bg-gradient-to-br from-fuchsia-500/12 to-transparent blur-2xl" />
          <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] rounded-full bg-gradient-to-tr from-emerald-400/10 to-transparent blur-3xl" />
        </div>

        <div className="container mx-auto px-6 relative z-10 py-12 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div>
              <Reveal delayMs={80}>
                <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/70 dark:border-slate-800/70 bg-white/60 dark:bg-slate-950/35 px-4 py-2 mb-5">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                    Lançamento de IA com método, prova e conversão
                  </span>
                </div>
              </Reveal>

              <Reveal delayMs={140}>
                <h1 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.05]">
                  Transforme uma ideia de IA em{" "}
                  <span className="text-primary">vendas previsíveis</span>
                </h1>
              </Reveal>

              <Reveal delayMs={200}>
                <p className="mt-4 text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
                  Um playbook premium para criadores e times: posicionamento, oferta, páginas de alta intenção,
                  automações de follow-up e métricas que viram decisões.
                </p>
              </Reveal>

              <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "Oferta com clareza (sem “mágica”)",
                  "Landing Page focada em intenção",
                  "Roteiro de conteúdo que aquece e converte",
                  "Automação para recuperar leads frios",
                ].map((benefit, idx) => (
                  <Reveal key={benefit} delayMs={240 + idx * 60}>
                    <div className="flex items-start gap-3 rounded-2xl border border-slate-200/70 dark:border-slate-800/70 bg-white/60 dark:bg-slate-950/30 p-4 shadow-sm">
                      <Check className="w-4 h-4 text-primary mt-1 shrink-0" />
                      <p className="text-sm text-slate-700 dark:text-slate-200">{benefit}</p>
                    </div>
                  </Reveal>
                ))}
              </div>

              <Reveal delayMs={520} className="mt-8 flex flex-col sm:flex-row gap-3">
                <a
                  href="#preload"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 border border-slate-200/70 dark:border-slate-800/70 bg-white/70 dark:bg-slate-950/35 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <span className="text-sm font-semibold">Quero o playbook</span>
                  <ArrowRight className="w-4 h-4 text-primary" />
                </a>
                <a
                  href="#precos"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 bg-primary text-primary-foreground shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:brightness-105"
                >
                  <span className="text-sm font-semibold">Ver preços</span>
                  <Zap className="w-4 h-4" />
                </a>
              </Reveal>
            </div>

            {/* Hero Form */}
            <Reveal delayMs={260} className="lg:sticky lg:top-28 self-start">
              <div className="rounded-[28px] border border-slate-200/70 dark:border-slate-800/70 bg-white/85 dark:bg-slate-950/45 shadow-sm p-6 md:p-8">
                <div className="mb-5">
                  <h2 className="font-display text-2xl font-bold">Receba o roteiro do seu próximo lançamento</h2>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">
                    Preencha e receba uma versão inicial do plano (demo).
                  </p>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    alert("Cadastro enviado! (demo)");
                  }}
                  className="flex flex-col gap-4"
                >
                  <div>
                    <label htmlFor="name" className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                      Nome
                    </label>
                    <input
                      id="name"
                      name="name"
                      autoComplete="name"
                      className={[
                        "mt-2 w-full rounded-xl border bg-white/80 dark:bg-slate-950/35 px-4 py-3 text-sm outline-none transition-all duration-300",
                        focused === "name"
                          ? "border-primary/60 ring-2 ring-primary/25 shadow-[0_0_0_4px_rgba(221,83,53,0.12)]"
                          : "border-slate-200/70 dark:border-slate-800/70 focus-visible:ring-2 focus-visible:ring-primary/25 focus-visible:border-primary/50",
                      ].join(" ")}
                      onFocus={() => setFocused("name")}
                      onBlur={() => setFocused(null)}
                      placeholder="Seu nome"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className={[
                        "mt-2 w-full rounded-xl border bg-white/80 dark:bg-slate-950/35 px-4 py-3 text-sm outline-none transition-all duration-300",
                        focused === "email"
                          ? "border-primary/60 ring-2 ring-primary/25 shadow-[0_0_0_4px_rgba(221,83,53,0.12)]"
                          : "border-slate-200/70 dark:border-slate-800/70 focus-visible:ring-2 focus-visible:ring-primary/25 focus-visible:border-primary/50",
                      ].join(" ")}
                      onFocus={() => setFocused("email")}
                      onBlur={() => setFocused(null)}
                      placeholder="voce@email.com"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="goal" className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                      Objetivo do lançamento
                    </label>
                    <textarea
                      id="goal"
                      name="goal"
                      className={[
                        "mt-2 w-full rounded-xl border bg-white/80 dark:bg-slate-950/35 px-4 py-3 text-sm outline-none transition-all duration-300 min-h-[120px] resize-none",
                        focused === "goal"
                          ? "border-primary/60 ring-2 ring-primary/25 shadow-[0_0_0_4px_rgba(221,83,53,0.12)]"
                          : "border-slate-200/70 dark:border-slate-800/70 focus-visible:ring-2 focus-visible:ring-primary/25 focus-visible:border-primary/50",
                      ].join(" ")}
                      onFocus={() => setFocused("goal")}
                      onBlur={() => setFocused(null)}
                      placeholder="Ex.: vender 100 vagas, validar produto, construir lista qualificada..."
                      required
                    />
                  </div>

                  <button
                    id="preload"
                    type="submit"
                    className="rounded-2xl bg-primary text-primary-foreground font-semibold px-5 py-3 text-sm transition-all duration-300 hover:-translate-y-0.5 hover:brightness-105 shadow-sm"
                  >
                    Enviar e destravar o roteiro
                  </button>

                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Você recebe um roteiro inicial e um resumo de prioridades. Sem spam. (demo)
                  </p>
                </form>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Problem / Solution */}
      <section className="container mx-auto px-6 py-14 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <Reveal delayMs={80}>
            <div className="rounded-[28px] border border-slate-200/70 dark:border-slate-800/70 bg-white/80 dark:bg-slate-950/35 shadow-sm p-7 md:p-9">
              <div className="inline-flex items-center gap-2 text-primary font-semibold text-sm">
                <span className="w-2 h-2 rounded-full bg-primary" />
                O problema
              </div>
              <h2 className="font-display text-3xl font-extrabold mt-3">
                Você até cria… mas a conversão fica dependente do acaso
              </h2>
              <ul className="mt-6 space-y-4">
                {[
                  "Sem oferta clara, o lead não sabe por que comprar agora.",
                  "Falta roteiro e você vira refém de reagir em vez de conduzir.",
                  "Automação inexistente deixa dinheiro na mesa (follow-up tardio).",
                  "Métricas superficiais impedem ajustes rápidos.",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <Check className="w-4 h-4 text-primary mt-1 shrink-0" />
                    <p className="text-slate-700 dark:text-slate-200">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delayMs={160}>
            <div className="rounded-[28px] border border-slate-200/70 dark:border-slate-800/70 bg-gradient-to-b from-white/85 to-white/40 dark:from-slate-950/35 dark:to-slate-950/15 shadow-sm p-7 md:p-9">
              <div className="inline-flex items-center gap-2 text-primary font-semibold text-sm">
                <span className="w-2 h-2 rounded-full bg-primary" />
                A solução
              </div>
              <h3 className="font-display text-3xl font-extrabold mt-3">
                Um lançamento de IA guiado por intenção e prova
              </h3>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: "Arquitetura da oferta", desc: "Framework para posicionar benefícios e reduzir objeções." },
                  { title: "Conteúdo que aquece", desc: "Calendário e scripts com foco em desejo e urgência." },
                  { title: "Automação de follow-up", desc: "Sequências que recuperam leads e aumentam taxa de resposta." },
                  { title: "Métricas acionáveis", desc: "KPIs por etapa para você ajustar sem travar." },
                ].map((card) => (
                  <div
                    key={card.title}
                    className="rounded-2xl border border-slate-200/70 dark:border-slate-800/70 bg-white/65 dark:bg-slate-950/30 p-5"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                        <Brain className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-slate-100">{card.title}</p>
                        <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                          {card.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Social Proof */}
      <section className="container mx-auto px-6 pb-14 md:pb-20">
        <Reveal delayMs={80}>
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-200/70 dark:border-slate-800/70 bg-white/60 dark:bg-slate-950/30 text-xs font-semibold text-primary">
              Prova social
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold mt-4">
              Depoimentos de quem saiu do “achismo”
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-base md:text-lg max-w-2xl mx-auto mt-3 leading-relaxed">
              Depoimentos fictícios para demonstração, com tom realista para conversão.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: "Luana A.",
              role: "Criadora de IA",
              company: "Lab Aurora",
              quote:
                "O playbook fez a diferença: oferta clara, sequência de conteúdo e automação. A taxa de resposta subiu e o lançamento ficou previsível.",
            },
            {
              name: "Bruno S.",
              role: "Growth",
              company: "SaaS Tutor",
              quote:
                "Finalmente métricas que guiam o que ajustar. Sem pânico de última hora. A automação recuperou leads que antes sumiam.",
            },
            {
              name: "Patrícia V.",
              role: "PM de Produto",
              company: "IA Tools",
              quote:
                "Premium porque é direto ao ponto: roteiro, estrutura e execução. A gente trabalhou com intenção, não com sorte.",
            },
          ].map((t, idx) => (
            <Reveal key={t.name} delayMs={120 + idx * 90}>
              <div className="rounded-[26px] border border-slate-200/70 dark:border-slate-800/70 bg-white/80 dark:bg-slate-950/35 shadow-sm p-7">
                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-slate-100">{t.name}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      {t.role} • {t.company}
                    </p>
                  </div>
                </div>
                <p className="mt-5 text-slate-700 dark:text-slate-200 leading-relaxed text-sm">{t.quote}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="container mx-auto px-6 pb-16 md:pb-24">
        <Reveal delayMs={80}>
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-200/70 dark:border-slate-800/70 bg-white/60 dark:bg-slate-950/30 text-xs font-semibold text-primary">
              Planos
            </span>
            <h2 id="precos" className="font-display text-4xl md:text-5xl font-extrabold mt-4">
              Estruture, execute e converta com método
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-base md:text-lg max-w-2xl mx-auto mt-3 leading-relaxed">
              Valores ilustrativos de demonstração. Ajustamos ao seu contexto.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              id: "starter",
              title: "Starter",
              price: "R$ 490",
              desc: "Para validar a oferta e montar a base do lançamento.",
              bullets: ["Template de oferta", "Roteiro de aquecimento", "Checklist de LP", "Guia de automação"],
              highlight: false,
            },
            {
              id: "pro",
              title: "Pro",
              price: "R$ 1.190/mês",
              desc: "Para execução com otimizações e acompanhamento prático.",
              bullets: ["Ciclos de CRO", "Automação avançada", "Ajustes por métricas", "Revisão de copy e CTA"],
              highlight: true,
            },
            {
              id: "elite",
              title: "Elite",
              price: "R$ 2.990/mês",
              desc: "Para times que querem previsibilidade e ritmo constante.",
              bullets: ["Estratégia multicanal", "Playbooks e governança", "SLA de ajustes", "Relatório de impacto"],
              highlight: false,
            },
          ].map((p, idx) => (
            <Reveal key={p.id} delayMs={120 + idx * 90}>
              <div
                className={[
                  "rounded-[26px] border bg-white/85 dark:bg-slate-950/35 shadow-sm p-7 md:p-8 flex flex-col",
                  p.highlight ? "border-primary/40 ring-2 ring-primary/20" : "border-slate-200/70 dark:border-slate-800/70",
                ].join(" ")}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-slate-100">{p.title}</p>
                    <p className="text-3xl font-extrabold mt-2 font-display">{p.price}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">{p.desc}</p>
                  </div>
                  {p.highlight && (
                    <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 text-primary px-3 py-1 text-xs font-semibold">
                      Mais escolhido
                    </span>
                  )}
                </div>

                <div className="mt-6 space-y-3">
                  {p.bullets.map((b) => (
                    <div key={b} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-primary mt-1 shrink-0" />
                      <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">{b}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-auto pt-7">
                  <a
                    href="#preload"
                    className={[
                      "w-full inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 shadow-sm",
                      p.highlight
                        ? "bg-primary text-primary-foreground hover:brightness-105"
                        : "bg-white/70 dark:bg-slate-950/35 border border-slate-200/70 dark:border-slate-800/70 text-slate-900 dark:text-slate-100 hover:border-slate-300/80",
                    ].join(" ")}
                  >
                    Quero este plano
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200/70 dark:border-slate-800/70">
        <div className="container mx-auto px-6 py-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
            <p className="text-sm text-slate-600 dark:text-slate-300">Felipe Gabriel WebDeveloper © 2026</p>
            <div className="flex items-center gap-3">
              <SocialIcon href="#" label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </SocialIcon>
              <SocialIcon href="#" label="GitHub">
                <Github className="w-5 h-5" />
              </SocialIcon>
              <SocialIcon href="#" label="Email">
                <Mail className="w-5 h-5" />
              </SocialIcon>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

