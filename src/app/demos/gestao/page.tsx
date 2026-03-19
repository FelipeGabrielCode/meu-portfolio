import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import {
  ArrowRight,
  BarChart3,
  Check,
  Github,
  Linkedin,
  Mail,
  Sparkles,
  TrendingUp,
  ShieldCheck,
} from "lucide-react";

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
      className="group inline-flex items-center justify-center rounded-xl border border-slate-200/70 dark:border-slate-800/70 bg-white/70 dark:bg-slate-950/40 px-3 py-2 transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-300/90 dark:hover:border-slate-700/90"
    >
      <span className="text-slate-600 dark:text-slate-300 group-hover:text-primary transition-colors">
        {children}
      </span>
    </a>
  );
}

export default function GestaoLandingPage() {
  const [focused, setFocused] = useState<"name" | "email" | "company" | null>(null);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="h-20" />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-20 left-1/2 w-[58rem] h-[58rem] -translate-x-1/2 rounded-full bg-gradient-to-tr from-primary/16 via-indigo-500/10 to-transparent blur-3xl" />
          <div className="absolute top-40 -left-24 w-[24rem] h-[24rem] rounded-full bg-gradient-to-br from-emerald-400/12 to-transparent blur-2xl" />
          <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] rounded-full bg-gradient-to-tr from-indigo-500/10 to-transparent blur-3xl" />
        </div>

        <div className="container mx-auto px-6 relative z-10 py-12 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div>
              <Reveal delayMs={80}>
                <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/70 dark:border-slate-800/70 bg-white/60 dark:bg-slate-950/40 px-4 py-2 mb-5">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                    SaaS de gestão financeira para decisões sem achismo
                  </span>
                </div>
              </Reveal>

              <Reveal delayMs={140}>
                <h1 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.05]">
                  Centralize suas finanças e transforme dados em{" "}
                  <span className="text-primary">margem</span>
                </h1>
              </Reveal>

              <Reveal delayMs={200}>
                <p className="mt-4 text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
                  Visualize fluxo de caixa, concilie transações e acompanhe KPIs do seu negócio. Tudo em
                  uma interface clean, rápida e pronta para crescer.
                </p>
              </Reveal>

              <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { title: "Fluxo de caixa claro", desc: "Entenda entradas/saídas com visão por período." },
                  { title: "Conciliação eficiente", desc: "Reduza trabalho manual e erros recorrentes." },
                  { title: "KPIs práticos", desc: "Margem, runway e previsões com alertas inteligentes." },
                  { title: "Segurança de nível empresarial", desc: "Acesso por papéis e trilhas de auditoria." },
                ].map((b, idx) => (
                  <Reveal key={b.title} delayMs={240 + idx * 70}>
                    <div className="rounded-2xl border border-slate-200/70 dark:border-slate-800/70 bg-white/70 dark:bg-slate-950/35 p-4 shadow-sm">
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                          {idx % 2 === 0 ? <TrendingUp className="w-4 h-4 text-primary" /> : <ShieldCheck className="w-4 h-4 text-primary" />}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-slate-100">{b.title}</p>
                          <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                            {b.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>

              <Reveal delayMs={520} className="mt-8 flex flex-col sm:flex-row gap-3">
                <a
                  href="#demo"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 border border-slate-200/70 dark:border-slate-800/70 bg-white/70 dark:bg-slate-950/40 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <span className="text-sm font-semibold">Agendar demo</span>
                  <ArrowRight className="w-4 h-4 text-primary" />
                </a>
                <a
                  href="#precos"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 bg-primary text-primary-foreground shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:brightness-105"
                >
                  <span className="text-sm font-semibold">Ver preços</span>
                  <BarChart3 className="w-4 h-4" />
                </a>
              </Reveal>
            </div>

            {/* Hero Form */}
            <Reveal delayMs={260} className="lg:sticky lg:top-28 self-start">
              <div
                id="demo"
                className="rounded-[28px] border border-slate-200/70 dark:border-slate-800/70 bg-white/85 dark:bg-slate-950/45 shadow-sm p-6 md:p-8"
              >
                <div className="mb-5">
                  <h2 className="font-display text-2xl font-bold">Receba acesso ao seu diagnóstico</h2>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">
                    Em poucos minutos você envia seu objetivo e nós retornamos com um plano inicial. (demo)
                  </p>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    alert("Solicitação enviada! (demo)");
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
                      className={[
                        "mt-2 w-full rounded-xl border bg-white/70 dark:bg-slate-950/35 px-4 py-3 text-sm outline-none transition-all duration-300",
                        focused === "name"
                          ? "border-primary/60 ring-2 ring-primary/25 shadow-[0_0_0_4px_rgba(221,83,53,0.12)]"
                          : "border-slate-200/70 dark:border-slate-800/70 focus-visible:ring-2 focus-visible:ring-primary/25 focus-visible:border-primary/50",
                      ].join(" ")}
                      onFocus={() => setFocused("name")}
                      onBlur={() => setFocused(null)}
                      placeholder="Seu nome"
                      autoComplete="name"
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
                      className={[
                        "mt-2 w-full rounded-xl border bg-white/70 dark:bg-slate-950/35 px-4 py-3 text-sm outline-none transition-all duration-300",
                        focused === "email"
                          ? "border-primary/60 ring-2 ring-primary/25 shadow-[0_0_0_4px_rgba(221,83,53,0.12)]"
                          : "border-slate-200/70 dark:border-slate-800/70 focus-visible:ring-2 focus-visible:ring-primary/25 focus-visible:border-primary/50",
                      ].join(" ")}
                      onFocus={() => setFocused("email")}
                      onBlur={() => setFocused(null)}
                      placeholder="voce@empresa.com"
                      autoComplete="email"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="company"
                      className="text-sm font-semibold text-slate-700 dark:text-slate-200"
                    >
                      Objetivo principal
                    </label>
                    <input
                      id="company"
                      name="company"
                      className={[
                        "mt-2 w-full rounded-xl border bg-white/70 dark:bg-slate-950/35 px-4 py-3 text-sm outline-none transition-all duration-300",
                        focused === "company"
                          ? "border-primary/60 ring-2 ring-primary/25 shadow-[0_0_0_4px_rgba(221,83,53,0.12)]"
                          : "border-slate-200/70 dark:border-slate-800/70 focus-visible:ring-2 focus-visible:ring-primary/25 focus-visible:border-primary/50",
                      ].join(" ")}
                      onFocus={() => setFocused("company")}
                      onBlur={() => setFocused(null)}
                      placeholder="Ex.: prever caixa, reduzir perdas, conciliar automático..."
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="mt-2 rounded-2xl bg-primary text-primary-foreground font-semibold px-5 py-3 text-sm transition-all duration-300 hover:-translate-y-0.5 hover:brightness-105 shadow-sm"
                  >
                    Quero minha análise
                  </button>

                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Sem spam. Resposta com próximos passos e recomendação de pacote. (demo)
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
                Planilhas viram dívida técnica quando o negócio acelera
              </h2>
              <ul className="mt-6 space-y-4">
                {[
                  "Você demora para enxergar o que está acontecendo com o caixa.",
                  "Conciliação manual consome horas do time financeiro.",
                  "KPIs não fecham com a realidade (e as decisões atrasam).",
                  "Alertas chegam tarde — quando o impacto já aconteceu.",
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
                Uma plataforma clean para acompanhar, prever e agir
              </h3>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    title: "Conciliação automática",
                    desc: "Classifique transações e reduza divergências com regras e revisão rápida.",
                  },
                  {
                    title: "Previsão de caixa",
                    desc: "Forecast com cenários para você decidir antes do impacto.",
                  },
                  {
                    title: "KPIs por etapa",
                    desc: "Margem, runway e performance com visões por período.",
                  },
                  {
                    title: "Acesso por papéis",
                    desc: "Controle de permissões e auditoria para manter governança.",
                  },
                ].map((card, idx) => (
                  <div
                    key={card.title}
                    className="rounded-2xl border border-slate-200/70 dark:border-slate-800/70 bg-white/65 dark:bg-slate-950/30 p-5"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                        {idx % 2 === 0 ? (
                          <TrendingUp className="w-4 h-4 text-primary" />
                        ) : (
                          <ShieldCheck className="w-4 h-4 text-primary" />
                        )}
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

              <div id="prova" className="mt-8">
                <Reveal delayMs={200}>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    Você enxerga o que importa, prioriza com clareza e executa sem ruído.
                  </p>
                </Reveal>
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
              Times financeiros que ganharam previsibilidade
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-base md:text-lg max-w-2xl mx-auto mt-3 leading-relaxed">
              Depoimentos fictícios para demonstração — mantendo tom realista para conversão.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: "Beatriz Monteiro",
              role: "CFO",
              company: "SaaS B2B",
              quote:
                "Em poucas semanas parou de existir “surpresa” no caixa. A previsão com cenários nos deu segurança para investir sem medo.",
            },
            {
              name: "Gustavo Nogueira",
              role: "Finance Lead",
              company: "E-commerce",
              quote:
                "A conciliação automática reduziu erros e acelerou nosso fechamento. A equipe ficou mais focada em análise do que em correção.",
            },
            {
              name: "Helena Carvalho",
              role: "Head de Operações",
              company: "Fintech",
              quote:
                "O dashboard é direto. Vemos margem, runway e alertas por período. Nosso time parou de discutir números desencontrados.",
            },
          ].map((t, idx) => (
            <Reveal key={t.name} delayMs={120 + idx * 90}>
              <div className="rounded-[26px] border border-slate-200/70 dark:border-slate-800/70 bg-white/80 dark:bg-slate-950/35 shadow-sm p-7">
                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-primary" />
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
              Preços
            </span>
            <h2 id="precos" className="font-display text-4xl md:text-5xl font-extrabold mt-4">
              Planos para acompanhar e prever do dia 1
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-base md:text-lg max-w-2xl mx-auto mt-3 leading-relaxed">
              Valores ilustrativos. Você pode começar pequeno e evoluir com seus dados.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              id: "start",
              title: "Start",
              price: "R$ 299/mês",
              desc: "Organização e clareza para o básico do financeiro.",
              bullets: ["Importação de transações", "Categorias + regras", "Visão de fluxo por período", "Exportações"],
              highlight: false,
            },
            {
              id: "grow",
              title: "Growth",
              price: "R$ 799/mês",
              desc: "Previsão + conciliação para acelerar decisões.",
              bullets: ["Previsão de caixa com cenários", "Conciliação assistida", "KPIs por etapa", "Alertas inteligentes"],
              highlight: true,
            },
            {
              id: "scale",
              title: "Scale",
              price: "R$ 1.990/mês",
              desc: "Governança e controle para times maiores.",
              bullets: ["Papéis e permissões", "Trilhas de auditoria", "Integrações avançadas", "Suporte prioritário"],
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
                    href="#demo"
                    className={[
                      "w-full inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 shadow-sm",
                      p.highlight
                        ? "bg-primary text-primary-foreground hover:brightness-105"
                        : "bg-white/70 dark:bg-slate-950/35 border border-slate-200/70 dark:border-slate-800/70 text-slate-900 dark:text-slate-100 hover:border-slate-300/80",
                    ].join(" ")}
                  >
                    Começar com este plano
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
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Felipe Gabriel WebDeveloper © 2026
            </p>
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

