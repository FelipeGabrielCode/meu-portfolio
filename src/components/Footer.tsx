"use client";

import { Github, Linkedin, Mail, MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("Footer");

  const whatsappHref =
    "https://wa.me/message/MARR3FJJM4BPK1?text=" + encodeURIComponent(t("whatsappPrefill"));

  const emailHref = "mailto:felipegabriel.code@gmail.com";
  const linkedinHref = "https://www.linkedin.com/in/felipe-gabriel-519259221";
  const githubHref = "https://github.com/FelipeGabrielCode";

  return (
    <footer className="relative py-12">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="glass rounded-3xl px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-base md:text-lg text-center md:text-left font-medium">
            {t("copyright")}
          </p>

          <div className="flex items-center gap-4">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors duration-200"
              aria-label="WhatsApp"
              title="WhatsApp"
            >
              <MessageCircle className="w-5 h-5 transition-all duration-200 hover:drop-shadow-[0_0_16px_rgba(221,83,53,0.22)]" />
            </a>

            <a
              href={linkedinHref}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors duration-200"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <Linkedin className="w-5 h-5 transition-all duration-200 hover:drop-shadow-[0_0_16px_rgba(221,83,53,0.22)]" />
            </a>

            <a
              href={githubHref}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors duration-200"
              aria-label="GitHub"
              title="GitHub"
            >
              <Github className="w-5 h-5 transition-all duration-200 hover:drop-shadow-[0_0_16px_rgba(221,83,53,0.22)]" />
            </a>

            <a
              href={emailHref}
              className="text-muted-foreground hover:text-primary transition-colors duration-200"
              aria-label="Email"
              title="Email"
            >
              <Mail className="w-5 h-5 transition-all duration-200 hover:drop-shadow-[0_0_16px_rgba(221,83,53,0.22)]" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

