"use client";

import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import { Github, Linkedin, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useTranslations } from "next-intl";

type ContactButton = {
  key: "whatsapp" | "linkedin" | "github" | "email" | "instagram";
  href: string;
  Icon: typeof Mail;
  brand: {
    borderHover: string;
    glow: string;
    icon: string;
  };
};

export default function ContactSection() {
  const t = useTranslations("Contact");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<null | { type: "success" | "error"; text: string }>(null);

  const canSubmit = useMemo(() => {
    return name.trim().length > 1 && /\S+@\S+\.\S+/.test(email) && message.trim().length > 5;
  }, [name, email, message]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canSubmit) {
      setStatus({ type: "error", text: t("validation.fillAll") });
      return;
    }

    setIsSubmitting(true);
    setStatus(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const data = (await res.json().catch(() => null)) as null | { message?: string };

      if (!res.ok) {
        throw new Error(data?.message ?? t("errors.sendFailed"));
      }

      setStatus({ type: "success", text: data?.message ?? t("success.sent") });
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      const text = err instanceof Error ? err.message : t("errors.generic");
      setStatus({ type: "error", text });
    } finally {
      setIsSubmitting(false);
    }
  }

  const buttons: ContactButton[] = [
    {
      key: "whatsapp",
      href: "https://wa.me/message/MARR3FJJM4BPK1",
      Icon: MessageCircle,
      brand: {
        borderHover: "group-hover:border-emerald-400/60",
        glow: "group-hover:shadow-[0_0_38px_rgba(16,185,129,0.28)]",
        icon: "group-hover:text-emerald-300",
      },
    },
    {
      key: "linkedin",
      href: "https://www.linkedin.com/in/felipe-gabriel-519259221",
      Icon: Linkedin,
      brand: {
        borderHover: "group-hover:border-sky-400/60",
        glow: "group-hover:shadow-[0_0_38px_rgba(56,189,248,0.26)]",
        icon: "group-hover:text-sky-300",
      },
    },
    {
      key: "github",
      href: "https://github.com/FelipeGabrielCode",
      Icon: Github,
      brand: {
        borderHover: "group-hover:border-violet-400/60",
        glow: "group-hover:shadow-[0_0_38px_rgba(167,139,250,0.26)]",
        icon: "group-hover:text-violet-300",
      },
    },
    {
      key: "email",
      href: "mailto:felipegabriel.code@gmail.com",
      Icon: Mail,
      brand: {
        borderHover: "group-hover:border-amber-400/60",
        glow: "group-hover:shadow-[0_0_38px_rgba(251,191,36,0.22)]",
        icon: "group-hover:text-amber-300",
      },
    },
  ];

  return (
    <section id="contact" className="relative py-20 md:py-28 overflow-hidden">
      {/* Background blur gradient behind the card */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-24 left-1/2 w-[48rem] h-[48rem] -translate-x-1/2 opacity-60">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/25 via-accent/15 to-transparent blur-3xl" />
        </div>
        <div className="absolute top-16 right-0 w-[34rem] h-[34rem] opacity-45">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/15 via-cyan-500/10 to-transparent blur-3xl" />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.10),transparent_55%),radial-gradient(circle_at_80%_40%,hsl(var(--accent)/0.08),transparent_50%)] opacity-80" />
      </div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-primary/30 text-xs font-semibold text-primary mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            {t("badge")}
          </span>
          <h2 className="font-display text-5xl md:text-6xl font-black gradient-text mb-4">{t("title")}</h2>
          <p className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-2xl mx-auto font-medium">
            {t("description")}
          </p>
        </div>

        <div className="glass rounded-3xl p-6 md:p-10 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-start">
            {/* Left column */}
            <div className="flex flex-col gap-5">
              <div className="space-y-3">
                <h3 className="font-display text-3xl md:text-4xl font-black text-foreground">
                  {t("left.title")}
                </h3>
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-xl font-medium">
                  {t("left.description")}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {buttons.map(({ key, href, Icon, brand }) => {
                  const labelKey = `buttons.${key}.label` as const;
                  const hintKey = `buttons.${key}.hint` as const;
                  const label = t.has(labelKey) ? t(labelKey) : key;
                  const hint = t.has(hintKey) ? t(hintKey) : "";

                  return (
                    <a
                      key={key}
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className={`group relative rounded-2xl px-4 py-5 text-left
                        border border-border/60
                        bg-black/5 dark:bg-white/5
                        backdrop-blur-md
                        transition-all duration-300
                        hover:scale-[1.03] hover:-translate-y-0.5
                        ${brand.borderHover} ${brand.glow}
                      `}
                    >
                      <div className="flex items-center gap-4">
                        <span
                          className={`grid place-items-center w-14 h-14 rounded-2xl
                            bg-background/25 dark:bg-background/10
                            border border-border/60
                            transition-all duration-300
                            group-hover:border-primary/30
                          `}
                        >
                          <Icon
                            className={`w-8 h-8 text-foreground/85 transition-all duration-300 ${brand.icon} group-hover:-translate-y-0.5`}
                          />
                        </span>
                        <div className="flex flex-col">
                          <span className="text-base font-semibold text-foreground/95 leading-tight">
                            {label}
                          </span>
                          {hint ? (
                            <span className="text-xs md:text-sm text-muted-foreground leading-snug mt-0.5">
                              {hint}
                            </span>
                          ) : null}
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Right column */}
            <div className="rounded-3xl border border-border/60 bg-background/20 dark:bg-background/10 backdrop-blur-xl p-5 md:p-7">
              <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="contact-name" className="text-sm font-semibold text-foreground/90">
                      {t("fields.name.label")}
                    </label>
                    <Input
                      id="contact-name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={t("fields.name.placeholder")}
                      autoComplete="name"
                      className="bg-background/30 dark:bg-background/20 backdrop-blur-xl border-border/60"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="contact-email" className="text-sm font-semibold text-foreground/90">
                      {t("fields.email.label")}
                    </label>
                    <Input
                      id="contact-email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t("fields.email.placeholder")}
                      autoComplete="email"
                      inputMode="email"
                      className="bg-background/30 dark:bg-background/20 backdrop-blur-xl border-border/60"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-message" className="text-sm font-semibold text-foreground/90">
                    {t("fields.message.label")}
                  </label>
                  <Textarea
                    id="contact-message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t("fields.message.placeholder")}
                    className="bg-background/30 dark:bg-background/20 backdrop-blur-xl border-border/60 min-h-[140px]"
                  />
                </div>

                {status && (
                  <div
                    role="status"
                    className={`rounded-2xl border px-4 py-3 text-sm ${
                      status.type === "success"
                        ? "border-primary/40 bg-primary/10 text-primary"
                        : "border-destructive/30 bg-destructive/10 text-destructive"
                    }`}
                  >
                    {status.text}
                  </div>
                )}

                <div className="flex items-center justify-center pt-1">
                  <Button
                    type="submit"
                    disabled={!canSubmit || isSubmitting}
                    className="rounded-2xl px-6 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(221,83,53,0.18)]"
                  >
                    <Mail className="w-4 h-4" />
                    {isSubmitting ? t("cta.sending") : t("cta.send")}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

