"use client";

import { useState } from "react";
import { Calendar, Clock, User, ArrowRight, TrendingUp, Scale, FileText, Briefcase } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  featured?: boolean;
  views?: number;
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "LGPD na Prática: Como Empresas Devem se Adaptar às Novas Regras",
    excerpt: "Guia completo sobre implementação da Lei Geral de Proteção de Dados em empresas de todos os portes. Entenda as obrigações, prazos e penalidades.",
    category: "Direito Digital",
    author: "Dr. Felipe Silva",
    date: "15 de Março, 2026",
    readTime: "8 min",
    image: "🔒",
    featured: true,
    views: 1250
  },
  {
    id: "2",
    title: "Planejamento Tributário 2026: Oportunidades para Reduzir Cargas",
    excerpt: "Análise das principais oportunidades legais de planejamento tributário para pequenas e médias empresas neste novo ano fiscal.",
    category: "Direito Tributário",
    author: "Dra. Maria Santos",
    date: "12 de Março, 2026",
    readTime: "6 min",
    image: "💰",
    views: 890
  },
  {
    id: "3",
    title: "Compliance Trabalhista: Evite Multas e Processos Trabalhistas",
    excerpt: "Dicas essenciais para manter sua empresa em conformidade com as leis trabalhistas e evitar problemas com a justiça do trabalho.",
    category: "Direito Trabalhista",
    author: "Dr. João Oliveira",
    date: "10 de Março, 2026",
    readTime: "5 min",
    image: "👥",
    views: 734
  },
  {
    id: "4",
    title: "Due diligence Jurídica: O Que Investigar Antes de Comprar uma Empresa",
    excerpt: "Checklist completo para due diligence em aquisições empresariais. Saiba quais documentos analisar e quais riscos identificar.",
    category: "Direito Empresarial",
    author: "Dra. Ana Costa",
    date: "8 de Março, 2026",
    readTime: "10 min",
    image: "🔍",
    views: 567
  },
  {
    id: "5",
    title: "Novas Regras para Contratos Digitais: O Que Mudou em 2026",
    excerpt: "Atualizações importantes sobre validade jurídica e requisitos para contratos celebrados digitalmente no Brasil.",
    category: "Direito Digital",
    author: "Dr. Pedro Lima",
    date: "5 de Março, 2026",
    readTime: "7 min",
    image: "📱",
    views: 445
  },
  {
    id: "6",
    title: "Gestão de Propriedade Intelectual para Startups",
    excerpt: "Como proteger marcas, patentes e direitos autorais em ecossistemas de inovação e aceleração.",
    category: "Propriedade Intelectual",
    author: "Dra. Carla Mendes",
    date: "3 de Março, 2026",
    readTime: "9 min",
    image: "💡",
    views: 389
  }
];

const categories = [
  { name: "Todos", icon: <FileText className="w-4 h-4" />, count: blogPosts.length },
  { name: "Direito Digital", icon: "🔒", count: 2 },
  { name: "Direito Tributário", icon: "💰", count: 1 },
  { name: "Direito Trabalhista", icon: "👥", count: 1 },
  { name: "Direito Empresarial", icon: "💼", count: 1 },
  { name: "Propriedade Intelectual", icon: "💡", count: 1 }
];

export function BlogSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
  const [posts, setPosts] = useState<BlogPost[]>(blogPosts);

  const filteredPosts = selectedCategory === "Todos" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const getCategoryIcon = (category: string) => {
    const cat = categories.find(c => c.name === category);
    return cat?.icon || "📄";
  };

  return (
    <div className="glass-morphism rounded-2xl border border-white/10 dark:border-white/5">
      <div className="p-6 border-b border-white/10 dark:border-white/5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Blog & Artigos
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Conteúdo jurídico relevante para manter você atualizado
            </p>
          </div>
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            <span className="text-sm font-semibold text-primary">
              {blogPosts.length} artigos
            </span>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="p-6 border-b border-white/10 dark:border-white/5">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => setSelectedCategory(category.name)}
              className={`
                inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300
                ${selectedCategory === category.name
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-white/10 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-white/20 dark:hover:bg-white/10'
                }
              `}
            >
              <span>{category.icon}</span>
              <span>{category.name}</span>
              <span className="bg-white/20 dark:bg-white/10 px-1.5 py-0.5 rounded-full text-xs">
                {category.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Blog Posts */}
      <div className="p-6">
        <div className="space-y-4">
          {/* Featured Post */}
          {filteredPosts.filter(post => post.featured).map((post) => (
            <div key={post.id} className="p-5 rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/30">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center text-2xl flex-shrink-0">
                  {post.image}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                      <TrendingUp className="w-3 h-3" />
                      Destaque
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10">
                      {getCategoryIcon(post.category)}
                      {post.category}
                    </span>
                  </div>
                  <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2 text-lg">
                    {post.title}
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-500">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {post.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </div>
                    </div>
                    <button className="flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80 transition-colors">
                      Ler mais
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Regular Posts */}
          {filteredPosts.filter(post => !post.featured).map((post) => (
            <div key={post.id} className="p-4 rounded-xl bg-white/5 dark:bg-white/2 border border-white/10 dark:border-white/5 hover:bg-white/10 dark:hover:bg-white/5 transition-all duration-300 cursor-pointer">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center text-lg flex-shrink-0">
                  {post.image}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10">
                      {getCategoryIcon(post.category)}
                      {post.category}
                    </span>
                    {post.views && (
                      <span className="text-xs text-slate-500 dark:text-slate-500">
                        {post.views} visualizações
                      </span>
                    )}
                  </div>
                  <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
                    {post.title}
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-2 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-500">
                      <span>{post.author}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                    <button className="flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80 transition-colors">
                      Ler
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-8">
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Nenhum artigo encontrado nesta categoria.
            </p>
          </div>
        )}

        {/* Load More Button */}
        <div className="mt-6 text-center">
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 rounded-lg text-sm font-medium hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300">
            Carregar mais artigos
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="p-6 border-t border-white/10 dark:border-white/5">
        <div className="text-center">
          <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
            Receba nossos artigos por e-mail
          </h4>
          <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
            Conteúdo jurídico relevante toda semana diretamente na sua caixa de entrada
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Seu melhor e-mail"
              className="flex-1 px-4 py-2 rounded-lg bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 text-sm focus:outline-none focus:border-primary/50"
            />
            <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
              Inscrever
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
