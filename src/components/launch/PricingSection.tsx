"use client";

import { useState } from "react";
import { ArrowRight, Zap, Lock, CheckCircle, AlertCircle } from "lucide-react";

interface CTAButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  pulse?: boolean;
  className?: string;
}

export function CTAButton({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  onClick, 
  disabled = false, 
  loading = false,
  pulse = false,
  className = ""
}: CTAButtonProps) {
  const baseClasses = "inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-300 relative overflow-hidden";
  
  const variantClasses = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 hover:-translate-y-0.5 hover:shadow-lg",
    secondary: "bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-600 hover:to-teal-700 hover:scale-105 hover:-translate-y-0.5 hover:shadow-lg",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground hover:scale-105 hover:-translate-y-0.5"
  };
  
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  const pulseClasses = pulse ? "animate-pulse" : "";
  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${pulseClasses}
        ${disabledClasses}
        ${className}
      `}
    >
      {/* Background animation for primary variant */}
      {variant === 'primary' && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000" />
      )}
      
      {loading ? (
        <>
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          <span>Processando...</span>
        </>
      ) : (
        <>
          {children}
          <ArrowRight className="w-4 h-4" />
        </>
      )}
    </button>
  );
}

interface PricingCard {
  id: string;
  name: string;
  price: string;
  originalPrice?: string;
  description: string;
  features: string[];
  badge?: string;
  recommended?: boolean;
  ctaText: string;
  disabled?: boolean;
}

const pricingCards: PricingCard[] = [
  {
    id: "1",
    name: "Acesso Vitalício",
    price: "R$ 497",
    originalPrice: "R$ 997",
    description: "Acesso único e vitalício a toda plataforma",
    features: [
      "Acesso imediato a todos os módulos",
      "Bônus exclusivos (valor R$ 297)",
      "Comunidade privada de alunos",
      "Suporte por 30 dias",
      "Atualizações gratuitas para sempre",
      "Certificado de conclusão"
    ],
    badge: "50% OFF",
    recommended: true,
    ctaText: "Garantir minha vaga",
    disabled: false
  },
  {
    id: "2", 
    name: "Plano Mensal",
    price: "R$ 97/mês",
    description: "Acesso mensal com cancelamento a qualquer momento",
    features: [
      "Acesso a todos os módulos",
      "Comunidade privada de alunos",
      "Suporte básico por e-mail",
      "Atualizações mensais",
      "Cancelamento sem multa"
    ],
    badge: "Popular",
    recommended: false,
    ctaText: "Começar teste grátis",
    disabled: false
  }
];

export function PricingSection() {
  const [selectedPlan, setSelectedPlan] = useState<string>("1");
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handlePurchase = (planId: string) => {
    setIsLoading(planId);
    // Simulate purchase process
    setTimeout(() => {
      setIsLoading(null);
      alert(`Compra do plano ${planId} simulada com sucesso!`);
    }, 2000);
  };

  return (
    <div className="glass-morphism rounded-2xl border border-white/10 dark:border-white/5">
      <div className="p-6 border-b border-white/10 dark:border-white/5">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Escolha seu plano
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Preços especiais de lançamento por tempo limitado
          </p>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pricingCards.map((card) => (
            <div
              key={card.id}
              className={`
                relative p-6 rounded-2xl border transition-all duration-300
                ${selectedPlan === card.id
                  ? 'bg-primary/10 border-primary/30 dark:bg-primary/20 dark:border-primary/40 scale-105'
                  : 'bg-white/5 border-white/10 dark:bg-white/2 dark:border-white/5 hover:bg-white/10 dark:hover:bg-white/5'
                }
                ${card.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              `}
              onClick={() => !card.disabled && setSelectedPlan(card.id)}
            >
              {/* Badge */}
              {card.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className={`
                    px-3 py-1 rounded-full text-xs font-bold
                    ${card.recommended 
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white' 
                      : 'bg-primary text-primary-foreground'
                    }
                  `}>
                    {card.badge}
                  </span>
                </div>
              )}

              {/* Recommended indicator */}
              {card.recommended && (
                <div className="absolute -top-2 -right-2">
                  <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center">
                    <Zap className="w-4 h-4 text-white" />
                  </div>
                </div>
              )}

              {/* Content */}
              <div className="text-center mb-6">
                <h4 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                  {card.name}
                </h4>
                
                <div className="mb-3">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-3xl font-bold text-primary">
                      {card.price}
                    </span>
                    {card.originalPrice && (
                      <span className="text-lg text-slate-400 line-through">
                        {card.originalPrice}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                    {card.description}
                  </p>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-3 mb-6">
                {card.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700 dark:text-slate-300">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <div className="space-y-3">
                <CTAButton
                  variant={card.recommended ? 'secondary' : 'primary'}
                  size="md"
                  onClick={() => handlePurchase(card.id)}
                  loading={isLoading === card.id}
                  disabled={card.disabled}
                  pulse={card.recommended}
                  className="w-full"
                >
                  {card.ctaText}
                </CTAButton>

                {card.recommended && (
                  <div className="text-center">
                    <div className="inline-flex items-center gap-1 text-xs text-amber-600 dark:text-amber-400">
                      <AlertCircle className="w-3 h-3" />
                      <span>Apenas 17 vagas restantes</span>
                    </div>
                  </div>
                )}

                {card.disabled && (
                  <div className="text-center">
                    <p className="text-xs text-slate-500 dark:text-slate-500">
                      Esgotado temporariamente
                    </p>
                  </div>
                )}
              </div>

              {/* Security badges */}
              <div className="mt-4 pt-4 border-t border-white/10 dark:border-white/5">
                <div className="flex items-center justify-center gap-4 text-xs text-slate-500 dark:text-slate-500">
                  <div className="flex items-center gap-1">
                    <Lock className="w-3 h-3" />
                    <span>Pagamento seguro</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    <span>Garantia 30 dias</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Urgency message */}
        <div className="mt-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-amber-600 dark:text-amber-400 mb-1">
                ⚠️ Oferta por tempo limitado
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Esta oferta especial de lançamento termina em breve. Os preços voltarão ao normal após o encerramento.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
