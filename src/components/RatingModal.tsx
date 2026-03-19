"use client";

import { useState } from "react";
import { X, Star, Send, CheckCircle2, Sparkles } from "lucide-react";

interface RatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  demoName: string;
}

export default function RatingModal({ isOpen, onClose, demoName }: RatingModalProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return;
    
    setLoading(true);
    // Simula envio
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  const handleClose = () => {
    // Reset ao fechar
    setRating(0);
    setHoverRating(0);
    setName("");
    setEmail("");
    setComment("");
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800">
          <h3 className="font-semibold text-slate-100 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            Avalie esta demonstração
          </h3>
          <button 
            onClick={handleClose}
            className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            <p className="text-sm text-slate-400 text-center">
              Como foi sua experiência com o <span className="text-slate-200 font-medium">{demoName}</span>?
            </p>

            {/* Estrelas */}
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="transition-transform hover:scale-110 focus:outline-none"
                >
                  <Star
                    className={`w-10 h-10 transition-colors ${
                      star <= (hoverRating || rating)
                        ? "fill-amber-400 text-amber-400"
                        : "fill-slate-800 text-slate-600"
                    }`}
                  />
                </button>
              ))}
            </div>

            {rating > 0 && (
              <p className="text-center text-sm text-amber-400 font-medium">
                {rating === 1 && " Muito insatisfeito"}
                {rating === 2 && " Insatisfeito"}
                {rating === 3 && " Neutro"}
                {rating === 4 && " Satisfeito"}
                {rating === 5 && " Muito satisfeito!"}
              </p>
            )}

            {/* Campos */}
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 placeholder-slate-500 focus:border-amber-500/50 focus:outline-none transition-colors"
                required
              />
              <input
                type="email"
                placeholder="Seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 placeholder-slate-500 focus:border-amber-500/50 focus:outline-none transition-colors"
                required
              />
              <textarea
                placeholder="Comentário opcional - Conte-nos mais sobre sua experiência..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 placeholder-slate-500 focus:border-amber-500/50 focus:outline-none transition-colors resize-none"
              />
            </div>

            {/* Botão enviar */}
            <button
              type="submit"
              disabled={rating === 0 || loading}
              className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
                rating === 0
                  ? "bg-slate-800 text-slate-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:shadow-lg hover:shadow-amber-500/25 hover:-translate-y-0.5"
              }`}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Enviar avaliação
                </>
              )}
            </button>
            
            {/* Botão não avaliar */}
            <button
              type="button"
              onClick={handleClose}
              className="w-full py-2 text-sm text-slate-500 hover:text-slate-300 transition-colors"
            >
              Não quero avaliar agora
            </button>
          </form>
        ) : (
          /* Tela de sucesso */
          <div className="p-8 text-center">
            <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500/20 flex items-center justify-center mb-4 animate-bounce">
              <CheckCircle2 className="w-10 h-10 text-emerald-400" />
            </div>
            <h4 className="text-xl font-bold text-white mb-2">
              Obrigado pela avaliação! 
            </h4>
            <p className="text-slate-400 text-sm mb-6">
              Sua opinião nos ajuda a melhorar cada vez mais.
            </p>
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(rating)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <button
              onClick={handleClose}
              className="px-6 py-2 bg-slate-800 text-slate-200 rounded-xl hover:bg-slate-700 transition-colors"
            >
              Fechar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}