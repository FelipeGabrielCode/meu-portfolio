"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle, Star, Zap, Shield, Users, Package, TrendingUp, Laptop, CreditCard, RefreshCw } from "lucide-react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'technical' | 'payment' | 'support';
  icon: React.ReactNode;
}

const faqItems: FAQItem[] = [
  {
    id: "1",
    question: "O que exatamente eu vou receber após a compra?",
    answer: "Você terá acesso imediato à plataforma completa com todos os módulos, bônus exclusivos, comunidade privada de alunos, e suporte direto comigo por 30 dias. Além disso, receberá todas as atualizações futuras sem custo adicional.",
    category: "general",
    icon: <Package className="w-4 h-4" />
  },
  {
    id: "2",
    question: "Preciso de experiência prévia para ter resultados?",
    answer: "Não! O método foi desenvolvido para todos os níveis, iniciantes completos a avançados. Começamos do zero e avançamos passo a passo. Mais de 80% dos nossos alunos nunca haviam feito nada parecido antes.",
    category: "general",
    icon: <Users className="w-4 h-4" />
  },
  {
    id: "3",
    question: "Em quanto tempo começarei a ver resultados?",
    answer: "A maioria dos alunos relata os primeiros resultados já na primeira semana, com implementações práticas que geram valor imediato. Resultados significativos geralmente aparecem entre 30-60 dias de aplicação consistente.",
    category: "technical",
    icon: <TrendingUp className="w-4 h-4" />
  },
  {
    id: "4",
    question: "Qual é a garantia oferecida?",
    answer: "Oferecemos garantia incondicional de 30 dias. Se por qualquer motivo você não ficar 100% satisfeito, basta enviar um e-mail e reembolsamos 100% do seu investimento, sem perguntas e sem burocracia.",
    category: "payment",
    icon: <Shield className="w-4 h-4" />
  },
  {
    id: "5",
    question: "Como funciona o suporte pós-compra?",
    answer: "Você terá acesso ao suporte premium por 30 dias através de nosso canal exclusivo no Discord, e-mails diretos, e sessões de Q&A semanais ao vivo. Após 30 dias, continua tendo acesso à comunidade e atualizações.",
    category: "support",
    icon: <HelpCircle className="w-4 h-4" />
  },
  {
    id: "6",
    question: "Posso acessar de qualquer dispositivo?",
    answer: "Sim! A plataforma é 100% responsiva e funciona perfeitamente em computadores, tablets e smartphones. Você pode estudar onde e quando quiser, com sincronização automática de progresso.",
    category: "technical",
    icon: <Laptop className="w-4 h-4" />
  },
  {
    id: "7",
    question: "Quais formas de pagamento são aceitas?",
    answer: "Aceitamos cartão de crédito (até 12x sem juros), PIX, boleto bancário, e PayPal. Todas as transações são processadas de forma segura através da Hotmart, plataforma líder em produtos digitais.",
    category: "payment",
    icon: <CreditCard className="w-4 h-4" />
  },
  {
    id: "8",
    question: "O conteúdo é atualizado regularmente?",
    answer: "Sim! Atualizamos o conteúdo mensalmente com novas estratégias, ferramentas e cases de sucesso. Você recebe todas as atualizações automaticamente e sem custo adicional pelo tempo de vida do produto.",
    category: "technical",
    icon: <RefreshCw className="w-4 h-4" />
  },
  {
    id: "9",
    question: "Existe algum bônus por tempo limitado?",
    answer: "Sim! Durante o período de lançamento, os primeiros 100 alunos recebem 3 bônus exclusivos: Mentoria individual de 1 hora, Template de funil pronto, e Acesso vitalício à comunidade VIP. Esses bônus não estarão disponíveis após o lançamento.",
    category: "payment",
    icon: <Star className="w-4 h-4" />
  }
];

const categoryColors = {
  general: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  technical: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  payment: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  support: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20"
};

const categoryNames = {
  general: "Geral",
  technical: "Técnico",
  payment: "Pagamento",
  support: "Suporte"
};

export function FAQAccordion() {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  const filteredItems = selectedCategory 
    ? faqItems.filter(item => item.category === selectedCategory)
    : faqItems;

  const categories = Array.from(new Set(faqItems.map(item => item.category)));

  return (
    <div className="glass-morphism rounded-2xl border border-white/10 dark:border-white/5">
      <div className="p-6 border-b border-white/10 dark:border-white/5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Perguntas Frequentes
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Tire suas dúvidas sobre o método e resultados
            </p>
          </div>
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-primary" />
            <span className="text-sm font-semibold text-primary">
              {faqItems.length} perguntas
            </span>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="p-6 border-b border-white/10 dark:border-white/5">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 ${
              selectedCategory === null
                ? 'bg-primary text-primary-foreground'
                : 'bg-white/10 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-white/20 dark:hover:bg-white/10'
            }`}
          >
            Todas
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? categoryColors[category as keyof typeof categoryColors]
                  : 'bg-white/10 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-white/20 dark:hover:bg-white/10'
              }`}
            >
              {categoryNames[category as keyof typeof categoryNames]}
            </button>
          ))}
        </div>
      </div>

      {/* FAQ Items */}
      <div className="p-6">
        <div className="space-y-3">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="rounded-xl border border-white/10 dark:border-white/5 overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full p-4 text-left hover:bg-white/5 dark:hover:bg-white/2 transition-colors duration-200"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${categoryColors[item.category]}`}>
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-slate-900 dark:text-slate-100 text-sm">
                        {item.question}
                      </h4>
                      <span className={`inline-block mt-1 px-2 py-0.5 rounded text-xs ${categoryColors[item.category]}`}>
                        {categoryNames[item.category]}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white/10 dark:bg-white/5">
                    {openItems.has(item.id) ? (
                      <ChevronUp className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                    )}
                  </div>
                </div>
              </button>
              
              {openItems.has(item.id) && (
                <div className="px-4 pb-4 pt-0">
                  <div className="pl-11">
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-8">
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Nenhuma pergunta encontrada nesta categoria.
            </p>
          </div>
        )}
      </div>

      {/* Contact CTA */}
      <div className="p-6 border-t border-white/10 dark:border-white/5">
        <div className="text-center">
          <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
            Ainda tem dúvidas? Estou aqui para ajudar!
          </p>
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium transition-all duration-300 hover:bg-primary/90">
            <Zap className="w-4 h-4" />
            Fale Conosco
          </button>
        </div>
      </div>
    </div>
  );
}
