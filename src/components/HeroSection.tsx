"use client";

import { useEffect, useState } from "react";
import { ArrowDown, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";

function useTypewriter(words: string[], speed = 80, pause = 2000) {
  const [displayed, setDisplayed] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx((c) => c + 1), speed);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx((c) => c - 1), speed / 2);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setWordIdx((w) => (w + 1) % words.length);
    }

    setDisplayed(current.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return displayed;
}

export default function HeroSection() {
  const t = useTranslations("Hero");
  const roles = t.raw("roles") as string[];
  const subtitle = useTypewriter(roles);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated gradient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div
          className="blob absolute w-[520px] h-[520px] -top-24 -left-24"
          style={{ background: "hsl(var(--blob-1))" }}
        />
        <div
          className="blob blob-2 absolute w-[420px] h-[420px] top-1/3 right-0 translate-x-1/3"
          style={{ background: "hsl(var(--blob-2))" }}
        />
        <div
          className="blob blob-3 absolute w-[380px] h-[380px] bottom-0 left-1/3"
          style={{ background: "hsl(var(--blob-3))" }}
        />
      </div>

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      {/* Hero content card (glassmorphic) */}
      <div className="relative z-10 w-full max-w-3xl mx-auto px-6 text-center">
        <div className="glass rounded-3xl p-10 md:p-16 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-primary/30 text-xs font-semibold text-primary mb-8 animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            {t("badge")}
          </div>

          {/* Name */}
          <h1
            className="font-display text-6xl md:text-8xl font-black tracking-tight mb-2 gradient-text-premium animate-fade-in text-shadow-premium"
            style={{ animationDelay: "0.35s" }}
          >
            {t("name")}
          </h1>

          {/* Animated subtitle */}
          <div
            className="h-10 md:h-12 flex items-center justify-center mt-4 mb-8 animate-fade-in"
            style={{ animationDelay: "0.5s" }}
          >
            <p className="text-xl md:text-3xl font-body font-semibold text-muted-foreground">
              <span className="text-foreground font-black">{subtitle}</span>
              <span className="cursor-blink text-primary ml-0.5">|</span>
            </p>
          </div>

          {/* Description */}
          <p
            className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10 animate-fade-in font-medium"
            style={{ animationDelay: "0.65s" }}
          >
            {t("description")}
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in"
            style={{ animationDelay: "0.8s" }}
          >
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm
                bg-primary text-primary-foreground
                hover:shadow-[0_0_32px_hsl(var(--primary)/0.45)]
                hover:-translate-y-0.5
                transition-all duration-300 animate-glow-pulse"
            >
              {t("cta.primary")}
              <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm
                glass border border-primary/30 text-foreground
                hover:border-primary/70 hover:text-primary hover:-translate-y-0.5
                transition-all duration-300"
            >
              {t("cta.secondary")}
            </a>
          </div>
        </div>

        {/* Scroll hint */}
        <div
          className="mt-10 flex flex-col items-center gap-2 text-muted-foreground animate-fade-in"
          style={{ animationDelay: "1.1s" }}
        >
          <span className="text-xs font-medium tracking-widest uppercase opacity-60">{t("scrollHint")}</span>
          <ArrowDown className="w-4 h-4 animate-bounce opacity-60" />
        </div>
      </div>
    </section>
  );
}
