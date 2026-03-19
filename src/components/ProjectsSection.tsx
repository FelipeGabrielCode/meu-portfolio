"use client";

import { useRef, useEffect, useState } from "react";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

function useFadeIn(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
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

type Project = {
  id: string;
  tags: string[];
  gradient: string;
  patternOpacity: number;
  demoUrl: string;
  codeUrl: string;
};

function ProjectCard({
  project,
  i,
  t,
}: {
  project: Project;
  i: number;
  t: (key: string) => string;
}) {
  const { ref, visible } = useFadeIn();

  return (
    <div
      ref={ref}
      className={`group flex flex-col glass rounded-2xl overflow-hidden transition-all duration-500 ease-out hover:scale-[1.018] hover:-translate-y-1.5 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      style={{ transitionDelay: visible ? `${i * 100}ms` : "0ms" }}
    >
      <div className="relative h-48 overflow-hidden">
        <div
          className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110"
          style={{ background: project.gradient }}
          aria-hidden="true"
        />
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
        <div
          className="absolute bottom-0 left-0 right-0 h-16"
          style={{ background: "linear-gradient(to bottom, transparent, hsl(var(--card) / 0.3))" }}
          aria-hidden="true"
        />
        <div className="absolute top-4 right-4 w-8 h-8 rounded-lg glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-1 group-hover:translate-y-0">
          <ArrowUpRight className="w-4 h-4 text-foreground" />
        </div>
      </div>

      <div className="flex flex-col flex-1 p-6 gap-4">
        <h3 className="font-display text-2xl font-black text-foreground leading-tight group-hover:text-primary transition-colors duration-300">
          {t(`projects.${project.id}.title`)}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed flex-1">{t(`projects.${project.id}.description`)}</p>

        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <TagPill key={tag} label={tag} />
          ))}
        </div>

        <div className="h-px bg-border/50 my-2" />

        <div className="flex items-center gap-4">
          <Link
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-primary transition-colors duration-200 group/link"
          >
            <span className="w-7 h-7 rounded-lg border border-border/60 hover:border-primary/50 flex items-center justify-center glass transition-all duration-200 group-hover/link:border-primary/50">
              <ExternalLink className="w-3.5 h-3.5" />
            </span>
            {t("aria.liveDemo")}
          </Link>

          <Link
            href={project.codeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-primary transition-colors duration-200 group/link"
          >
            <span className="w-7 h-7 rounded-lg border border-border/60 hover:border-primary/50 flex items-center justify-center glass transition-all duration-200 group-hover/link:border-primary/50">
              <Github className="w-3.5 h-3.5" />
            </span>
            {t("aria.code")}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const t = useTranslations("Projects");
  const { ref: headRef, visible: headVisible } = useFadeIn(0.1);

  // Aqui definimos a estrutura, mas os textos vêm do dicionário JSON
  const projects = [
    {
      id: "agencia",
      tags: ["Next.js", "Tailwind CSS", "Framer Motion", "SEO"],
      gradient: "linear-gradient(135deg, hsl(221 83% 35%) 0%, hsl(262 83% 40%) 60%, hsl(190 83% 30%) 100%)",
      patternOpacity: 0.12,
      demoUrl: "/demos/agencia",
      codeUrl: "https://github.com/FelipeGabrielCode",
    },
    {
      id: "clinica",
      tags: ["React", "UI/UX", "Vite", "Acessibilidade"],
      gradient: "linear-gradient(135deg, hsl(145 63% 22%) 0%, hsl(213 95% 30%) 60%, hsl(217 75% 22%) 100%)",
      patternOpacity: 0.12,
      demoUrl: "/demos/clinica",
      codeUrl: "https://github.com/FelipeGabrielCode",
    },
    {
      id: "escritorio",
      tags: ["Next.js", "Glassmorphism", "TypeScript"],
      gradient: "linear-gradient(135deg, hsl(240 60% 28%) 0%, hsl(262 83% 35%) 55%, hsl(221 83% 28%) 100%)",
      patternOpacity: 0.12,
      demoUrl: "/demos/escritorio",
      codeUrl: "https://github.com/FelipeGabrielCode",
    },
    {
      id: "gestao",
      tags: ["React", "Dashboards", "Node.js", "PostgreSQL"],
      gradient: "linear-gradient(135deg, hsl(16 100% 35%) 0%, hsl(32 95% 32%) 55%, hsl(291 64% 30%) 100%)",
      patternOpacity: 0.12,
      demoUrl: "/demos/gestao",
      codeUrl: "https://github.com/FelipeGabrielCode",
    },
  ];

  return (
    <section id="projects" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="blob absolute w-[400px] h-[400px] -left-32 top-20 opacity-15" style={{ background: "hsl(var(--blob-1))" }} />
        <div className="blob blob-2 absolute w-[320px] h-[320px] right-0 bottom-20 opacity-15" style={{ background: "hsl(var(--blob-3))" }} />
      </div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div ref={headRef} className={`text-center mb-14 transition-all duration-700 ${headVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 xl:grid-cols-2 xl:gap-8">
          {projects.map((project, i) => {
            return (
              <ProjectCard key={project.id} project={project as Project} i={i} t={t} />
            );
          })}
        </div>

        <div className={`mt-12 text-center transition-all duration-700 delay-500 ${headVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <Link href="https://github.com/FelipeGabrielCode" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass border border-border/60 text-sm font-semibold text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300 hover:-translate-y-0.5">
            <Github className="w-4 h-4" />
            {t("aria.codeSrOnly")}
            <ExternalLink className="w-3.5 h-3.5 opacity-60" />
          </Link>
        </div>
      </div>
    </section>
  );
}