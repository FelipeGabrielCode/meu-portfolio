import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { ArrowRight, Check, Github, Linkedin, Mail, Sparkles, Stethoscope } from "lucide-react";

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
      className="group inline-flex items-center justify-center rounded-xl border border-slate-200/70 dark:border-slate-800/70 bg-white/60 dark:bg-slate-950/40 px-3 py-2 transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-300/80 dark:hover:border-slate-700/80"
    >
      <span className="text-slate-600 dark:text-slate-300 group-hover:text-primary transition-colors">
        {children}
      </span>
    </a>
  );
}

export default function ClinicaLandingPage() {
  const [focused, setFocused] = useState<"name" | "email" | "objective" | null>(null);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="h-20" />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-24 left-1/2 w-[58rem] h-[58rem] -translate-x-1/2 rounded-full bg-gradient-to-tr from-primary/18 via-fuchsia-500/10 to-transparent blur-3xl" />
          <div className="absolute top-28 -left-24 w-[22rem] h-[22rem] rounded-full bg-gradient-to-br from-fuchsia-500/10 to-transparent blur-2xl" />
          <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] rounded-full bg-gradient-to-tr from-emerald-400/10 to-transparent blur-3xl" />
        </div>

        <div className="container mx-auto px-6 relative z-10 py-12 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div>
              <Reveal delayMs={80}>
                <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/70 dark:border-slate-800/70 bg-white/60 dark:bg-slate-950/40 px-4 py-2 mb-5">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                    Estética com protocolo, tecnologia e cuidado humano
                  </span>
                </div>
              </Reveal>

              <Reveal delayMs={140}>
                <h1 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.05]">
                  Clínica de Medicina Estética para{" "}
                  <span className="text-primary">resultado visível</span> com segurança
                </h1>
              </Reveal>

              <Reveal delayMs={200}>
                <p className="mt-4 text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
                  Você não precisa de “moda”. Precisa de um plano: avaliação criteriosa, objetivos claros e um
                  acompanhamento que faz o tratamento evoluir junto com sua rotina.
                </p>
              </Reveal>

              <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "Avaliação com entendimento do seu objetivo",
                  "Protocolo individualizado por etapa",
                  "Tecnologia para melhorar previsibilidade",
                  "Acompanhamento e orientações contínuas",
                ].map((benefit, idx) => (
                  <Reveal key={benefit} delayMs={240 + idx * 70}>
                    <div className="flex items-start gap-3 rounded-2xl border border-slate-200/70 dark:border-slate-800/70 bg-white/60 dark:bg-slate-950/35 p-4 shadow-sm">
                      <Check className="w-4 h-4 text-primary mt-1 shrink-0" />
                      <p className="text-sm text-slate-700 dark:text-slate-200">{benefit}</p>
                    </div>
                  </Reveal>
                ))}
              </div>

              <Reveal delayMs={520} className="mt-8 flex flex-col sm:flex-row gap-3">
                <a
                  href="#agendar"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 border border-slate-200/70 dark:border-slate-800/70 bg-white/70 dark:bg-slate-950/40 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <span className="text-sm font-semibold">Agendar avaliação</span>
                  <ArrowRight className="w-4 h-4 text-primary" />
                </a>
                <a
                  href="#planos"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 bg-primary text-primary-foreground shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:brightness-105"
                >
                  <span className="text-sm font-semibold">Ver planos</span>
                  <Stethoscope className="w-4 h-4" />
                </a>
              </Reveal>
            </div>

            {/* Hero Form */}
            <Reveal delayMs={260} className="lg:sticky lg:top-28 self-start" >
              <div
                id="agendar"
                className="rounded-[28px] border border-slate-200/70 dark:border-slate-800/70 bg-white/85 dark:bg-slate-950/45 shadow-sm p-6 md:p-8"
              >
                <div className="mb-5">
                  <h2 className="font-display text-2xl font-bold">Vamos entender seu objetivo</h2>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">
                    Preencha e receba um plano inicial com próximos passos. (demo)
                  </p>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    alert("Agendamento enviado! (demo)");
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
                      placeholder="voce@email.com"
                      autoComplete="email"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="objective"
                      className="text-sm font-semibold text-slate-700 dark:text-slate-200"
                    >
                      O que você quer melhorar?
                    </label>
                    <textarea
                      id="objective"
                      name="objective"
                      className={[
                        "mt-2 w-full rounded-xl border bg-white/70 dark:bg-slate-950/35 px-4 py-3 text-sm outline-none transition-all duration-300 min-h-[120px] resize-none",
                        focused === "objective"
                          ? "border-primary/60 ring-2 ring-primary/25 shadow-[0_0_0_4px_rgba(221,83,53,0.12)]"
                          : "border-slate-200/70 dark:border-slate-800/70 focus-visible:ring-2 focus-visible:ring-primary/25 focus-visible:border-primary/50",
                      ].join(" ")}
                      onFocus={() => setFocused("objective")}
                      onBlur={() => setFocused(null)}
                      placeholder="Ex.: firmeza, viço, uniformidade da pele, redução de manchas..."
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="mt-2 rounded-2xl bg-primary text-primary-foreground font-semibold px-5 py-3 text-sm transition-all duration-300 hover:-translate-y-0.5 hover:brightness-105 shadow-sm"
                  >
                    Receber plano inicial
                  </button>

                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Sem spam. Você recebe uma orientação inicial para facilitar sua decisão. (demo)
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
                Problemas comuns
              </div>
              <h2 className="font-display text-3xl font-extrabold mt-3">
                Quando você não tem protocolo, o resultado vira tentativa
              </h2>
              <ul className="mt-6 space-y-4">
                {[
                  "Você faz o tratamento “que está em alta” sem um plano claro",
                  "Fica sem acompanhamento e sem ajustes entre as sessões",
                  "As expectativas não batem com a realidade do seu caso",
                  "Você perde tempo e dinheiro por falta de previsibilidade",
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
                Nossa abordagem
              </div>
              <h3 className="font-display text-3xl font-extrabold mt-3">
                Avaliar, definir, acompanhar e evoluir
              </h3>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: "Diagnóstico e objetivos", desc: "Entendemos sua rotina, histórico e o que você quer alcançar." },
                  { title: "Plano por etapas", desc: "Tratamento dividido em fases com foco em consistência e segurança." },
                  { title: "Tecnologia e precisão", desc: "Escolhas embasadas para melhorar previsibilidade do resultado." },
                  { title: "Acompanhamento contínuo", desc: "Orientações e ajustes entre sessões para manter evolução." },
                ].map((card) => (
                  <div
                    key={card.title}
                    className="rounded-2xl border border-slate-200/70 dark:border-slate-800/70 bg-white/65 dark:bg-slate-950/30 p-5"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-slate-100">{card.title}</p>
                        <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">{card.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div id="prova" className="mt-8">
                <Reveal delayMs={200}>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    Veja depoimentos e experiências de pacientes (fictícias). Dados ilustrativos.
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
              Depoimentos de quem seguiu o protocolo
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-base md:text-lg max-w-2xl mx-auto mt-3 leading-relaxed">
              A previsibilidade começa na avaliação. O acompanhamento faz o resto.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: "Carolina Mendes",
              role: "Paciente",
              company: "Plano de pele e viço",
              quote:
                "O atendimento foi muito claro. Em vez de “receitas prontas”, tivemos um protocolo por etapas. Fiquei muito mais segura e os resultados foram crescendo com consistência.",
            },
            {
              name: "Diego Almeida",
              role: "Paciente",
              company: "Redução de manchas",
              quote:
                "Eu tinha pressa, mas não queria tentativa. O plano evoluiu em fases e o acompanhamento ajudou a ajustar detalhes sem frustração.",
            },
            {
              name: "Renata Sousa",
              role: "Paciente",
              company: "Firmeza e textura",
              quote:
                "Achei premium porque é organizado: objetivos, cronograma e orientações. Saí de lá com plano, não só com sessão.",
            },
          ].map((t, idx) => (
            <Reveal key={t.name} delayMs={120 + idx * 90}>
              <div className="rounded-[26px] border border-slate-200/70 dark:border-slate-800/70 bg-white/80 dark:bg-slate-950/35 shadow-sm p-7">
                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-primary" />
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

      {/* Pricing / Services */}
      <section className="container mx-auto px-6 pb-16 md:pb-24">
        <Reveal delayMs={80}>
          <div id="planos" className="text-center mb-10">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-200/70 dark:border-slate-800/70 bg-white/60 dark:bg-slate-950/30 text-xs font-semibold text-primary">
              Planos
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold mt-4">Escolha um caminho com clareza</h2>
            <p className="text-slate-600 dark:text-slate-300 text-base md:text-lg max-w-2xl mx-auto mt-3 leading-relaxed">
              Valores e pacotes ilustrativos para demonstração. Ajustamos conforme sua avaliação.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              id: "start",
              title: "Essentials",
              price: "R$ 390",
              desc: "Avaliação inicial e plano de começo com foco em direção e segurança.",
              bullets: ["Anamnese e análise do objetivo", "Plano inicial por etapa", "Orientações práticas para 30 dias", "Revisão do alinhamento"],
              highlight: false,
            },
            {
              id: "glow",
              title: "Glow Protocol",
              price: "R$ 1.190/mês",
              desc: "Para quem quer consistência, com ajustes progressivos e acompanhamento.",
              bullets: ["Protocolo dividido em fases", "Acompanhamento entre sessões", "Ajustes orientados por evolução", "Prioridade de agendamento"],
              highlight: true,
            },
            {
              id: "signature",
              title: "Signature Care",
              price: "R$ 2.390/mês",
              desc: "Para casos que pedem ritmo, previsibilidade e estratégia de manutenção.",
              bullets: ["Planejamento e metas mensais", "Roteiro de manutenção e evolução", "Checklist de orientações", "Sessões guiadas por protocolo"],
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
                    href="#agendar"
                    className={[
                      "w-full inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 shadow-sm",
                      p.highlight
                        ? "bg-primary text-primary-foreground hover:brightness-105"
                        : "bg-white/70 dark:bg-slate-950/35 border border-slate-200/70 dark:border-slate-800/70 text-slate-900 dark:text-slate-100 hover:border-slate-300/80",
                    ].join(" ")}
                  >
                    Agendar com este plano
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

