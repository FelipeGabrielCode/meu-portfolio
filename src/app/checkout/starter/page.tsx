"use client";

import { useState } from "react";
import { ArrowLeft, CreditCard, Shield, Check, Star, Zap, Crown } from "lucide-react";
import Link from "next/link";

export default function StarterCheckout() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsComplete(true);
    }, 2000);
  };

  if (isComplete) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-slate-900 rounded-2xl shadow-xl p-8 text-center border border-slate-800">
            <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 text-emerald-400" />
            </div>
            <h1 className="text-2xl font-bold text-slate-100 mb-2">
              Pagamento Aprovado!
            </h1>
            <p className="text-slate-400 mb-6">
              Bem-vindo ao plano Starter! Sua assinatura está ativa.
            </p>
            <Link 
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar para o site
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="container mx-auto px-4 py-8">
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-300 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </Link>

        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Order Summary */}
            <div className="bg-slate-900 rounded-2xl shadow-xl p-6 border border-slate-800">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center">
                  <Zap className="w-6 h-6 text-indigo-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-100">
                    Plano Starter
                  </h2>
                  <p className="text-slate-400">
                    Perfeito para começar
                  </p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-emerald-400" />
                  <span className="text-slate-300">Até 3 projetos</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-emerald-400" />
                  <span className="text-slate-300">1.000 visitas/mês</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-emerald-400" />
                  <span className="text-slate-300">Suporte por email</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-emerald-400" />
                  <span className="text-slate-300">Analytics básico</span>
                </div>
              </div>

              <div className="border-t border-slate-700 pt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-400">Subtotal</span>
                  <span className="text-slate-100">R$ 97,00</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-slate-400">Impostos</span>
                  <span className="text-slate-100">R$ 19,40</span>
                </div>
                <div className="flex justify-between items-center text-lg font-bold">
                  <span className="text-slate-100">Total</span>
                  <span className="text-indigo-400">R$ 116,40</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-amber-500/10 rounded-xl border border-amber-500/30">
                <div className="flex items-center gap-2 text-amber-400">
                  <Star className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    7 dias de garantia de devolução
                  </span>
                </div>
              </div>
            </div>

            {/* Payment Form */}
            <div className="bg-slate-900 rounded-2xl shadow-xl p-6 border border-slate-800">
              <div className="flex items-center gap-3 mb-6">
                <CreditCard className="w-6 h-6 text-slate-400" />
                <h2 className="text-xl font-bold text-slate-100">
                  Informações de Pagamento
                </h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Nome no cartão
                  </label>
                  <input
                    type="text"
                    placeholder="João Silva"
                    className="w-full px-4 py-3 border border-slate-700 rounded-xl bg-slate-800 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Número do cartão
                  </label>
                  <input
                    type="text"
                    placeholder="0000 0000 0000 0000"
                    className="w-full px-4 py-3 border border-slate-700 rounded-xl bg-slate-800 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Validade
                    </label>
                    <input
                      type="text"
                      placeholder="MM/AA"
                      className="w-full px-4 py-3 border border-slate-700 rounded-xl bg-slate-800 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      CVV
                    </label>
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full px-4 py-3 border border-slate-700 rounded-xl bg-slate-800 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                  <Shield className="w-5 h-5 text-emerald-400" />
                  <span className="text-sm text-slate-300">
                    Pagamento seguro com criptografia SSL
                  </span>
                </div>

                <button
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="w-full py-4 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processando...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5" />
                      Pagar R$ 116,40
                    </>
                  )}
                </button>

                <p className="text-xs text-slate-500 text-center">
                  Ao clicar em "Pagar", você concorda com nossos{" "}
                  <Link href="#" className="text-indigo-400 hover:underline">
                    Termos de Serviço
                  </Link>{" "}
                  e{" "}
                  <Link href="#" className="text-indigo-400 hover:underline">
                    Política de Privacidade
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
