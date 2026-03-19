"use client";

import { useEffect, useRef, useState } from "react";
import { ExternalLink, Github, type LucideIcon, Cloud, FileCode2, Sparkles, Workflow } from "lucide-react";
import { useTranslations } from "next-intl";

type FeaturedProject = {
  id: string;
  titleKey: string;
  descriptionKey: string;
  tags: string[];
  demoUrl: string;
  codeUrl: string;
  gradient: string;
  patternOpacity: number;
  icon: LucideIcon;
};

const featuredProjects: FeaturedProject[] = [
  {
    id: "hub-ecommerce-estoque",
    titleKey: "projects.hubEcommerce.title",
    descriptionKey: "projects.hubEcommerce.description",
    tags: ["Next.js", "Node.js", "n8n", "API Integration", "PostgreSQL"],
    demoUrl: "#",
    codeUrl: "#",
    gradient:
      "linear-gradient(135deg, hsl(221 83% 35%) 0%, hsl(262 83% 40%) 60%, hsl(190 83% 30%) 100%)",
    patternOpacity: 0.12,
    icon: Workflow,
  },
  {
    id: "pipeline-cicd-aws",
    titleKey: "projects.cicdAws.title",
    descriptionKey: "projects.cicdAws.description",
    tags: ["AWS", "Kubernetes", "Terraform", "GitHub Actions", "Docker"],
    demoUrl: "#",
    codeUrl: "#",
    gradient:
      "linear-gradient(135deg, hsl(145 63% 22%) 0%, hsl(213 95% 30%) 60%, hsl(217 75% 22%) 100%)",
    patternOpacity: 0.12,
    icon: Cloud,
  },
  {
    id: "bpa-onboarding-ia-crm",
    titleKey: "projects.onboardingAiCrm.title",
    descriptionKey: "projects.onboardingAiCrm.description",
    tags: ["n8n", "OpenAI API", "HubSpot", "Automatização", "Python"],
    demoUrl: "#",
    codeUrl: "#",
    gradient:
      "linear-gradient(135deg, hsl(16 100% 35%) 0%, hsl(32 95% 32%) 55%, hsl(291 64% 30%) 100%)",
    patternOpacity: 0.12,
    icon: Sparkles,
  },
  {
    id: "pwa-agendamento-seo-whatsapp",
    titleKey: "projects.pwaClinics.title",
    descriptionKey: "projects.pwaClinics.description",
    tags: ["React", "Tailwind", "Vite", "PWA", "SEO Técnico"],
    demoUrl: "#",
    codeUrl: "#",
    gradient:
      "linear-gradient(135deg, hsl(240 60% 28%) 0%, hsl(262 83% 35%) 55%, hsl(221 83% 28%) 100%)",
    patternOpacity: 0.12,
    icon: FileCode2,
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
      className={`group flex flex-col glass rounded-2xl overflow-hidden
        transition-all duration-500 ease-out
        hover:scale-[1.018] hover:-translate-y-1.5
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
      `}
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
            className="glass rounded-2xl p-4 border border-primary/20 transition-all duration-500 group-hover:scale-105 group-hover:rotate-[0.5deg]"
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
        <h3 className="font-display text-xl font-bold text-foreground leading-tight">{t(project.titleKey)}</h3>

        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1">
          {t(project.descriptionKey)}
        </p>

        {/* Tags line */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <TagPill key={tag} label={tag} />
          ))}
        </div>

        <div className="h-px bg-border/50" />

        {/* Minimal icon footer */}
        <div className="flex items-center gap-3 pt-1">
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-primary transition-colors duration-200 group/link"
            aria-label={`${t("aria.liveDemo")} - ${t(project.titleKey)}`}
          >
            <span className="w-7 h-7 rounded-lg border border-border/60 hover:border-primary/50 flex items-center justify-center glass transition-all duration-200 group-hover/link:border-primary/50">
              <ExternalLink className="w-3.5 h-3.5" />
            </span>
            <span className="sr-only">{t("aria.liveDemo")}</span>
          </a>

          <a
            href={project.codeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-primary transition-colors duration-200 group/link"
            aria-label={`${t("aria.code")} - ${t(project.titleKey)}`}
          >
            <span className="w-7 h-7 rounded-lg border border-border/60 hover:border-primary/50 flex items-center justify-center glass transition-all duration-200 group-hover/link:border-primary/50">
              <Github className="w-3.5 h-3.5" />
            </span>
            <span className="sr-only">{t("aria.codeSrOnly")}</span>
          </a>
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

