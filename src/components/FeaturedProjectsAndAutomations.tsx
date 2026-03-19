"use client";

import { useEffect, useRef, useState } from "react";
import { ExternalLink, Github, ArrowUpRight, type LucideIcon, LayoutDashboard, Stethoscope, Rocket, Scale } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

type FeaturedProject = {
  id: string;
  titleKey: string;
  descriptionKey: string;
  tags: string[];
  demoUrl: string;
  gradient: string;
  patternOpacity: number;
  icon: LucideIcon;
};

const featuredProjects: FeaturedProject[] = [
  {
    id: "erp-gestao-pro",
    titleKey: "ERP Gestão Pro",
    descriptionKey: "Sistema completo de gestão empresarial com dashboard em tempo real, controle de estoque inteligente e relatórios automatizados.",
    tags: ["Next.js 15", "PostgreSQL", "Analytics", "Gestão"],
    demoUrl: "/demos/gestao",
    gradient: "linear-gradient(135deg, hsl(225 85% 45%) 0%, hsl(250 70% 50%) 50%, hsl(190 80% 35%) 100%)",
    patternOpacity: 0.08,
    icon: LayoutDashboard,
  },
  {
    id: "healthcare-connect",
    titleKey: "Healthcare Connect",
    descriptionKey: "Plataforma completa para clínicas e consultórios com agendamento online, prontuário digital e telemedicina integrada.",
    tags: ["React", "PWA", "Telemedicina", "Saúde"],
    demoUrl: "/demos/clinica",
    gradient: "linear-gradient(135deg, hsl(160 85% 35%) 0%, hsl(140 70% 40%) 50%, hsl(180 75% 30%) 100%)",
    patternOpacity: 0.08,
    icon: Stethoscope,
  },
  {
    id: "agencia-digital-plus",
    titleKey: "Agência Digital Plus",
    descriptionKey: "Sistema de gestão para agências de marketing com acompanhamento de campanhas, relatórios de resultados e gestão de clientes.",
    tags: ["Next.js", "Analytics", "Marketing", "CRM"],
    demoUrl: "/demos/agencia",
    gradient: "linear-gradient(135deg, hsl(280 75% 45%) 0%, hsl(320 70% 50%) 50%, hsl(260 80% 40%) 100%)",
    patternOpacity: 0.08,
    icon: Rocket,
  },
  {
    id: "legal-suite-premium",
    titleKey: "Legal Suite Premium",
    descriptionKey: "Sistema jurídico completo com gestão de processos, agendamento de audiências, contratos digitais e compliance LGPD.",
    tags: ["Next.js 15", "Segurança", "LGPD", "Jurídico"],
    demoUrl: "/demos/escritorio",
    gradient: "linear-gradient(135deg, hsl(210 85% 35%) 0%, hsl(225 70% 45%) 50%, hsl(195 75% 30%) 100%)",
    patternOpacity: 0.08,
    icon: Scale,
  },
  {
    id: "launch-academy-pro",
    titleKey: "Launch Academy Pro",
    descriptionKey: "Plataforma de lançamento de cursos online com countdown, área de membros, pagamentos e funil de vendas completo.",
    tags: ["React", "Stripe", "Vídeo", "Educação"],
    demoUrl: "/demos/lancamento",
    gradient: "linear-gradient(135deg, hsl(25 90% 50%) 0%, hsl(35 85% 55%) 50%, hsl(15 80% 45%) 100%)",
    patternOpacity: 0.08,
    icon: Rocket,
  },
];

function useFadeIn(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, visible };
}

function TagPill({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium text-muted-foreground bg-muted/60 border border-border/50 hover:text-primary hover:border-primary/40 transition-colors duration-200">
      {label}
    </span>
  );
}

function FeaturedProjectCard({ project, delay = 0 }: { project: FeaturedProject; delay?: number }) {
  const { ref, visible } = useFadeIn();
  const Icon = project.icon;
  const t = useTranslations("Projects");

  return (
    <div
      ref={ref}
      className={`group flex flex-col glass rounded-2xl overflow-hidden transition-all duration-500 ease-out hover:scale-[1.018] hover:-translate-y-1.5 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{
        transitionDelay: visible ? `${delay}ms` : "0ms",
      }}
    >
      {/* Image area (glass card top) */}
      <div className="relative h-48 overflow-hidden">
        {/* Zoom layer */}
        <div
          className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.08]"
          style={{ background: project.gradient }}
          aria-hidden="true"
        />

        {/* Subtle pattern overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(hsl(0 0% 100%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            opacity: project.patternOpacity,
          }}
          aria-hidden="true"
        />

        {/* Technical icon (replaces image placeholder) */}
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <div
            className="glass rounded-2xl p-4 border border-primary/20 transition-all duration-500 group-hover:scale-105 group-hover:rotate-[0.5deg] will-change-transform"
          >
            <Icon className="w-7 h-7 text-primary" />
          </div>
        </div>

        {/* Bottom gradient fade into card */}
        <div
          className="absolute bottom-0 left-0 right-0 h-16"
          style={{ background: "linear-gradient(to bottom, transparent, hsl(var(--card) / 0.3))" }}
          aria-hidden="true"
        />
      </div>

      <div className="flex flex-col flex-1 p-6 gap-4">
        <h3 className="font-display text-xl font-bold text-foreground leading-tight">{project.titleKey}</h3>

        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1">
          {project.descriptionKey}
        </p>

        {/* Tags line */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <TagPill key={tag} label={tag} />
          ))}
        </div>

        <div className="h-px bg-border/50" />

        {/* CTA Button - Bigger and more eye-catching */}
        <div className="flex items-center gap-4 pt-2">
          <Link
            href={project.demoUrl}
            prefetch={true}
            className="group relative inline-flex items-center gap-3 px-6 py-3.5 rounded-xl bg-gradient-to-r from-primary to-primary/90 text-primary-foreground font-bold text-base shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            aria-label={`${project.id === "launch-academy-pro" ? "Ver perguntas frequentes" : "Ver demo"} - ${project.titleKey}`}
          >
            {/* Animated background effect */}
            <span className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/20 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            
            <span className="relative flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/20 backdrop-blur-sm">
                <ExternalLink className="w-4 h-4" />
              </span>
              <span>{project.id === "launch-academy-pro" ? "Perguntas Frequentes" : "Ver Demo Interativa"}</span>
            </span>
            
            {/* Pulse animation dot */}
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function FeaturedProjectsAndAutomations() {
  const t = useTranslations("Projects");
  const headerFade = useFadeIn(0.1);

  return (
    <section id="projects" className="relative py-20 md:py-28 overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="blob absolute w-[420px] h-[420px] -left-36 top-10 opacity-15"
          style={{ background: "hsl(var(--blob-1))" }}
        />
        <div
          className="blob blob-2 absolute w-[340px] h-[340px] right-0 bottom-0 opacity-15"
          style={{ background: "hsl(var(--blob-2))" }}
        />
      </div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        {/* Header */}
        <div
          ref={headerFade.ref}
          className={`text-center mb-12 transition-all duration-700 ${
            headerFade.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-primary/30 text-xs font-semibold text-primary mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            {t("badge")}
          </span>

          <h2 className="font-display text-4xl md:text-5xl font-extrabold gradient-text mb-4">
            {t("title")}
          </h2>

          <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            {t("description")}
          </p>
        </div>

        {/* Responsive grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project, i) => (
            <FeaturedProjectCard key={project.id} project={project} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}
