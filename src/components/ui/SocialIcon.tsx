import type { ReactNode } from "react";
import { Github, Linkedin, Mail } from "lucide-react";

interface SocialIconProps {
  href: string;
  label: string;
  children: ReactNode;
  className?: string;
}

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
};

export default function SocialIcon({ 
  href, 
  label, 
  children, 
  className = "" 
}: SocialIconProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className={`
        group inline-flex items-center justify-center 
        rounded-xl border border-slate-200/70 dark:border-slate-800/70 
        bg-white/70 dark:bg-slate-950/40 
        px-3 py-2 
        transition-all duration-300 
        hover:-translate-y-0.5 
        hover:border-slate-300/90 dark:hover:border-slate-700/90
        ${className}
      `}
    >
      <span className="text-slate-600 dark:text-slate-300 group-hover:text-primary transition-colors">
        {children}
      </span>
    </a>
  );
}

export { iconMap };
