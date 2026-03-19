"use client";

import { useRef, useEffect, useState } from "react";
import { Layers, Server, Zap } from "lucide-react";
import { useTranslations } from "next-intl";

/* ─── Tech pill data ─────────────────────────────────────── */
interface TechPill {
  label: string;
  color: string; // tailwind bg class (design-system safe via inline style)
  dot: string;   // dot hsl color
}

const cards = [
  {
    id: "fullstack",
    icon: Layers,
    titleKey: "cards.fullstack.title",
    descriptionKey: "cards.fullstack.description",
    accent: "var(--blob-1)",
    accentHsl: "var(--blob-1)",
    glowColor: "hsl(221 83% 53% / 0.22)",
    pills: [
      { label: "Next.js",     dot: "hsl(0 0% 10%)",        bg: "hsl(0 0% 10% / 0.08)"   },
      { label: "React",       dot: "hsl(193 95% 68%)",     bg: "hsl(193 95% 68% / 0.10)" },
      { label: "Node.js",     dot: "hsl(122 39% 49%)",     bg: "hsl(122 39% 49% / 0.10)" },
      { label: "TypeScript",  dot: "hsl(213 75% 50%)",     bg: "hsl(213 75% 50% / 0.10)" },
      { label: "REST / GraphQL", dot: "hsl(291 64% 52%)", bg: "hsl(291 64% 52% / 0.10)" },
      { label: "PostgreSQL",  dot: "hsl(217 55% 43%)",     bg: "hsl(217 55% 43% / 0.10)" },
    ],
    span: "lg:row-span-2", // tall card on the left
  },
  {
    id: "devops",
    icon: Server,
    titleKey: "cards.devops.title",
    descriptionKey: "cards.devops.description",
    accent: "var(--blob-2)",
    glowColor: "hsl(262 83% 60% / 0.22)",
    pills: [
      { label: "Docker",      dot: "hsl(213 95% 55%)",     bg: "hsl(213 95% 55% / 0.10)" },
      { label: "Kubernetes",  dot: "hsl(217 75% 50%)",     bg: "hsl(217 75% 50% / 0.10)" },
      { label: "CI/CD",       dot: "hsl(145 63% 42%)",     bg: "hsl(145 63% 42% / 0.10)" },
      { label: "AWS",         dot: "hsl(32 95% 55%)",      bg: "hsl(32 95% 55% / 0.10)"  },
      { label: "Terraform",   dot: "hsl(261 60% 55%)",     bg: "hsl(261 60% 55% / 0.10)" },
      { label: "Nginx",       dot: "hsl(122 39% 42%)",     bg: "hsl(122 39% 42% / 0.10)" },
    ],
    span: "",
  },
  {
    id: "automations",
    icon: Zap,
    titleKey: "cards.automations.title",
    descriptionKey: "cards.automations.description",
    accent: "var(--blob-3)",
    glowColor: "hsl(190 83% 50% / 0.22)",
    pills: [
      { label: "Python",      dot: "hsl(213 75% 50%)",     bg: "hsl(213 75% 50% / 0.10)" },
      { label: "n8n",         dot: "hsl(16 100% 60%)",     bg: "hsl(16 100% 60% / 0.10)" },
      { label: "Zapier",      dot: "hsl(22 100% 50%)",     bg: "hsl(22 100% 50% / 0.10)" },
      { label: "Custom Scripts", dot: "hsl(145 63% 42%)", bg: "hsl(145 63% 42% / 0.10)" },
      { label: "Webhooks",    dot: "hsl(291 64% 52%)",     bg: "hsl(291 64% 52% / 0.10)" },
      { label: "Cron Jobs",   dot: "hsl(0 0% 50%)",        bg: "hsl(0 0% 50% / 0.08)"   },
    ],
    span: "",
  },
];

/* ─── Intersection-observer reveal hook ─────────────────── */
function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

/* ─── Single bento card ──────────────────────────────────── */
function BentoCard({
  card,
  delay = 0,
}: {
  card: (typeof cards)[number];
  delay?: number;
}) {
  const { ref, visible } = useFadeIn();
  const Icon = card.icon;
  const t = useTranslations("Expertise");

  return (
    <div
      ref={ref}
      className={`group relative flex flex-col gap-5 rounded-3xl p-7 md:p-8 glass cursor-default
        transition-all duration-500 ease-out
        hover:scale-[1.025] hover:-translate-y-1
        ${card.span}
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
      `}
      style={{
        transitionDelay: visible ? `${delay}ms` : "0ms",
        // Glow on hover handled via CSS custom property trick
      }}
    >
      {/* Hover glow layer */}
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          boxShadow: `0 0 40px 4px ${card.glowColor}, 0 0 80px 8px ${card.glowColor}`,
        }}
        aria-hidden="true"
      />

      {/* Top accent line */}
      <div
        className="absolute top-0 left-8 right-8 h-px rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `hsl(${card.accent})` }}
        aria-hidden="true"
      />

      {/* Icon */}
      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
        style={{ background: `hsl(${card.accent} / 0.12)`, border: `1px solid hsl(${card.accent} / 0.25)` }}
      >
        <Icon className="w-6 h-6" style={{ color: `hsl(${card.accent})` }} strokeWidth={1.75} />
      </div>

      {/* Text */}
      <div className="flex flex-col gap-2">
        <h3 className="font-display text-2xl md:text-3xl font-black text-foreground leading-tight">
          {t(card.titleKey)}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {t(card.descriptionKey)}
        </p>
      </div>

      {/* Tech pills */}
      <div className="flex flex-wrap gap-2 mt-auto pt-2">
        {card.pills.map((pill) => (
          <span
            key={pill.label}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-foreground/80
              border border-border/50 transition-all duration-200
              hover:border-primary/40 hover:text-foreground"
            style={{ background: pill.bg }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{ background: pill.dot }}
            />
            {pill.label}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Section ────────────────────────────────────────────── */
export default function ExpertiseSection() {
  const t = useTranslations("Expertise");
  const { ref: headingRef, visible: headingVisible } = useFadeIn();

  return (
    <section id="expertise" className="relative py-24 md:py-32 overflow-hidden">
      {/* Subtle background accent blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="blob absolute w-[380px] h-[380px] -right-20 top-1/4 opacity-20"
          style={{ background: "hsl(var(--blob-2))" }}
        />
        <div
          className="blob blob-3 absolute w-[280px] h-[280px] left-0 bottom-0 opacity-15"
          style={{ background: "hsl(var(--blob-1))" }}
        />
      </div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        {/* Section header */}
        <div
          ref={headingRef}
          className={`text-center mb-14 transition-all duration-700 ${
            headingVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-primary/30 text-xs font-semibold text-primary mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            {t("badge")}
          </span>
          <h2 className="font-display text-5xl md:text-6xl font-black gradient-text mb-4">
            {t("title")}
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
            {t("description")}
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 gap-5 auto-rows-auto">
          {/* Card 1 — spans 2 rows on large screens */}
          <div className="lg:row-span-2">
            <BentoCard card={cards[0]} delay={0} />
          </div>

          {/* Card 2 */}
          <div className="lg:col-span-2 lg:row-span-1">
            <BentoCard card={cards[1]} delay={120} />
          </div>

          {/* Card 3 */}
          <div className="lg:col-span-2 lg:row-span-1">
            <BentoCard card={cards[2]} delay={240} />
          </div>
        </div>
      </div>
    </section>
  );
}
