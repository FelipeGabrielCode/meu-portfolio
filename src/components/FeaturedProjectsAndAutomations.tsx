"use client";

import { useEffect, useRef, useState } from "react";
import { ExternalLink, Github, ArrowUpRight, BarChart3, Activity, Users, Calendar, DollarSign, Heart, Brain, Stethoscope, TrendingUp, Target, Zap, Scale, Clock, Star, ChevronRight, Menu, X, Search, Filter } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

type FeaturedProject = {
  id: string;
  translationKey: string;
  tags: string[];
  demoUrl: string;
  gradient: string;
  patternOpacity: number;
  screenshotType: 'dashboard' | 'healthcare' | 'marketing' | 'legal' | 'launch';
};

const featuredProjects: FeaturedProject[] = [
  {
    id: "erp-gestao-pro",
    translationKey: "hubEcommerce",
    tags: ["Next.js 15", "PostgreSQL", "Analytics", "Gestão"],
    demoUrl: "/demos/gestao",
    gradient: "linear-gradient(135deg, hsl(225 85% 45%) 0%, hsl(250 70% 50%) 50%, hsl(190 80% 35%) 100%)",
    patternOpacity: 0.08,
    screenshotType: 'dashboard',
  },
  {
    id: "healthcare-connect",
    translationKey: "pwaClinics",
    tags: ["React", "PWA", "Telemedicina", "Saúde"],
    demoUrl: "/demos/clinica",
    gradient: "linear-gradient(135deg, hsl(160 85% 35%) 0%, hsl(140 70% 40%) 50%, hsl(180 75% 30%) 100%)",
    patternOpacity: 0.08,
    screenshotType: 'healthcare',
  },
  {
    id: "agencia-digital-plus",
    translationKey: "agencia",
    tags: ["Next.js", "Analytics", "Marketing", "CRM"],
    demoUrl: "/demos/agencia",
    gradient: "linear-gradient(135deg, hsl(280 75% 45%) 0%, hsl(320 70% 50%) 50%, hsl(260 80% 40%) 100%)",
    patternOpacity: 0.08,
    screenshotType: 'marketing',
  },
  {
    id: "legal-suite-premium",
    translationKey: "cicdAws",
    tags: ["Next.js 15", "Segurança", "LGPD", "Jurídico"],
    demoUrl: "/demos/escritorio",
    gradient: "linear-gradient(135deg, hsl(210 85% 35%) 0%, hsl(225 70% 45%) 50%, hsl(195 75% 30%) 100%)",
    patternOpacity: 0.08,
    screenshotType: 'legal',
  },
  {
    id: "launch-academy-pro",
    translationKey: "onboardingAiCrm",
    tags: ["React", "Stripe", "Vídeo", "Educação"],
    demoUrl: "/demos/lancamento",
    gradient: "linear-gradient(135deg, hsl(25 90% 50%) 0%, hsl(35 85% 55%) 50%, hsl(15 80% 45%) 100%)",
    patternOpacity: 0.08,
    screenshotType: 'launch',
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

// Componente que simula screenshot de site
function WebsiteScreenshot({ type }: { type: 'dashboard' | 'healthcare' | 'marketing' | 'legal' | 'launch' }) {
  const renderScreenshot = () => {
    switch (type) {
      case 'dashboard':
        return (
          <div className="w-full h-full bg-slate-900 rounded-lg overflow-hidden">
            {/* Header */}
            <div className="bg-slate-800 px-3 py-2 border-b border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-500 rounded-sm" />
                <span className="text-xs text-slate-300 font-medium">Gestão Pro</span>
              </div>
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-slate-600 rounded-full" />
                <div className="w-2 h-2 bg-slate-600 rounded-full" />
              </div>
            </div>
            {/* Navigation */}
            <div className="bg-slate-800 px-3 py-1 border-b border-slate-700 flex gap-3">
              <div className="w-8 h-1 bg-blue-400 rounded" />
              <div className="w-8 h-1 bg-slate-600 rounded" />
              <div className="w-8 h-1 bg-slate-600 rounded" />
            </div>
            {/* Dashboard Content */}
            <div className="p-3 space-y-2">
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-slate-800 rounded p-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full mb-1" />
                  <div className="w-full h-1 bg-slate-700 rounded" />
                  <div className="text-xs text-slate-400 mt-1">+24%</div>
                </div>
                <div className="bg-slate-800 rounded p-2">
                  <div className="w-3 h-3 bg-blue-400 rounded-full mb-1" />
                  <div className="w-full h-1 bg-slate-700 rounded" />
                  <div className="text-xs text-slate-400 mt-1">R$ 12k</div>
                </div>
                <div className="bg-slate-800 rounded p-2">
                  <div className="w-3 h-3 bg-amber-400 rounded-full mb-1" />
                  <div className="w-full h-1 bg-slate-700 rounded" />
                  <div className="text-xs text-slate-400 mt-1">142</div>
                </div>
              </div>
              <div className="bg-slate-800 rounded p-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-slate-400">Vendas</span>
                  <BarChart3 className="w-3 h-3 text-green-400" />
                </div>
                <div className="space-y-1">
                  <div className="w-full h-1 bg-slate-700 rounded" />
                  <div className="w-3/4 h-1 bg-green-500 rounded" />
                  <div className="w-1/2 h-1 bg-slate-700 rounded" />
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'healthcare':
        return (
          <div className="w-full h-full bg-slate-900 rounded-lg overflow-hidden">
            {/* Header */}
            <div className="bg-emerald-900/20 px-3 py-2 border-b border-emerald-800/30 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-emerald-400" />
                <span className="text-xs text-slate-300 font-medium">Clínica Plus</span>
              </div>
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-slate-600 rounded-full" />
                <div className="w-2 h-2 bg-slate-600 rounded-full" />
              </div>
            </div>
            {/* Navigation */}
            <div className="bg-slate-800 px-3 py-1 border-b border-slate-700 flex gap-3">
              <div className="w-8 h-1 bg-emerald-400 rounded" />
              <div className="w-8 h-1 bg-slate-600 rounded" />
              <div className="w-8 h-1 bg-slate-600 rounded" />
            </div>
            {/* Healthcare Content */}
            <div className="p-3 space-y-2">
              <div className="bg-emerald-900/20 rounded p-2 border border-emerald-800/30">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-emerald-400">Próxima Consulta</span>
                  <Clock className="w-3 h-3 text-emerald-400" />
                </div>
                <div className="text-xs text-slate-300">Dra. Ana - 14:30</div>
                <div className="text-xs text-slate-500">Cardiologia</div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-slate-800 rounded p-2">
                  <Stethoscope className="w-3 h-3 text-emerald-400 mb-1" />
                  <div className="text-xs text-slate-400">Especialidades</div>
                </div>
                <div className="bg-slate-800 rounded p-2">
                  <Calendar className="w-3 h-3 text-emerald-400 mb-1" />
                  <div className="text-xs text-slate-400">Agendar</div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'marketing':
        return (
          <div className="w-full h-full bg-slate-900 rounded-lg overflow-hidden">
            {/* Header */}
            <div className="bg-violet-900/20 px-3 py-2 border-b border-violet-800/30 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-violet-400" />
                <span className="text-xs text-slate-300 font-medium">Marketing Pro</span>
              </div>
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-slate-600 rounded-full" />
                <div className="w-2 h-2 bg-slate-600 rounded-full" />
              </div>
            </div>
            {/* Navigation */}
            <div className="bg-slate-800 px-3 py-1 border-b border-slate-700 flex gap-3">
              <div className="w-8 h-1 bg-violet-400 rounded" />
              <div className="w-8 h-1 bg-slate-600 rounded" />
              <div className="w-8 h-1 bg-slate-600 rounded" />
            </div>
            {/* Marketing Content */}
            <div className="p-3 space-y-2">
              <div className="bg-violet-900/20 rounded p-2 border border-violet-800/30">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-violet-400">ROI Atual</span>
                  <TrendingUp className="w-3 h-3 text-violet-400" />
                </div>
                <div className="text-lg font-bold text-white">3.2x</div>
                <div className="text-xs text-slate-400">+180% este mês</div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-slate-800 rounded p-2">
                  <Users className="w-3 h-3 text-violet-400 mb-1" />
                  <div className="text-xs text-slate-400">Leads</div>
                </div>
                <div className="bg-slate-800 rounded p-2">
                  <DollarSign className="w-3 h-3 text-violet-400 mb-1" />
                  <div className="text-xs text-slate-400">Conversão</div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'legal':
        return (
          <div className="w-full h-full bg-slate-900 rounded-lg overflow-hidden">
            {/* Header */}
            <div className="bg-sky-900/20 px-3 py-2 border-b border-sky-800/30 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Scale className="w-4 h-4 text-sky-400" />
                <span className="text-xs text-slate-300 font-medium">Legal Suite</span>
              </div>
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-slate-600 rounded-full" />
                <div className="w-2 h-2 bg-slate-600 rounded-full" />
              </div>
            </div>
            {/* Navigation */}
            <div className="bg-slate-800 px-3 py-1 border-b border-slate-700 flex gap-3">
              <div className="w-8 h-1 bg-sky-400 rounded" />
              <div className="w-8 h-1 bg-slate-600 rounded" />
              <div className="w-8 h-1 bg-slate-600 rounded" />
            </div>
            {/* Legal Content */}
            <div className="p-3 space-y-2">
              <div className="bg-sky-900/20 rounded p-2 border border-sky-800/30">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-sky-400">Próxima Consultoria</span>
                  <Clock className="w-3 h-3 text-sky-400" />
                </div>
                <div className="text-xs text-slate-300">Dr. Silva - 16:00</div>
                <div className="text-xs text-slate-500">Direito Empresarial</div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-slate-800 rounded p-2">
                  <Scale className="w-3 h-3 text-sky-400 mb-1" />
                  <div className="text-xs text-slate-400">Processos</div>
                </div>
                <div className="bg-slate-800 rounded p-2">
                  <Star className="w-3 h-3 text-sky-400 mb-1" />
                  <div className="text-xs text-slate-400">Certificações</div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'launch':
        return (
          <div className="w-full h-full bg-slate-900 rounded-lg overflow-hidden">
            {/* Header */}
            <div className="bg-rose-900/20 px-3 py-2 border-b border-rose-800/30 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-rose-400" />
                <span className="text-xs text-slate-300 font-medium">Launch Pro</span>
              </div>
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-slate-600 rounded-full" />
                <div className="w-2 h-2 bg-slate-600 rounded-full" />
              </div>
            </div>
            {/* Navigation */}
            <div className="bg-slate-800 px-3 py-1 border-b border-slate-700 flex gap-3">
              <div className="w-8 h-1 bg-rose-400 rounded" />
              <div className="w-8 h-1 bg-slate-600 rounded" />
              <div className="w-8 h-1 bg-slate-600 rounded" />
            </div>
            {/* Launch Content */}
            <div className="p-3 space-y-2">
              <div className="bg-rose-900/20 rounded p-2 border border-rose-800/30">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-rose-400">Oferta Termina</span>
                  <Clock className="w-3 h-3 text-rose-400" />
                </div>
                <div className="text-lg font-bold text-white">23:45:12</div>
                <div className="text-xs text-slate-400">Últimas 17 vagas</div>
              </div>
              <div className="bg-slate-800 rounded p-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-slate-400">Plano Professional</span>
                  <ChevronRight className="w-3 h-3 text-rose-400" />
                </div>
                <div className="text-lg font-bold text-white">R$ 497</div>
                <div className="text-xs text-slate-500 line-through">R$ 997</div>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center p-2">
      <div className="w-full h-full max-w-full max-h-full transform scale-90 origin-center">
        {renderScreenshot()}
      </div>
    </div>
  );
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
  const t = useTranslations("Projects");

  const title = t(`projects.${project.translationKey}.title`);
  const description = t(`projects.${project.translationKey}.description`);
  const isLaunchProject = project.id === "launch-academy-pro";
  const ctaText = isLaunchProject ? "Perguntas Frequentes" : "Ver Demo Interativa";

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

        {/* Website screenshot area */}
        <div className="absolute inset-0 flex items-center justify-center p-3">
          <WebsiteScreenshot type={project.screenshotType} />
        </div>

        {/* Bottom gradient fade into card */}
        <div
          className="absolute bottom-0 left-0 right-0 h-16"
          style={{ background: "linear-gradient(to bottom, transparent, hsl(var(--card) / 0.3))" }}
          aria-hidden="true"
        />
      </div>

      <div className="flex flex-col flex-1 p-6 gap-4">
        <h3 className="font-display text-xl font-bold text-foreground leading-tight">{title}</h3>

        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1">
          {description}
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
            aria-label={`${ctaText} - ${title}`}
          >
            {/* Animated background effect */}
            <span className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/20 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            
            <span className="relative flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/20 backdrop-blur-sm">
                <ExternalLink className="w-4 h-4" />
              </span>
              <span>{ctaText}</span>
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
