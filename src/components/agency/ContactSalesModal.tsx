"use client";

import { useState } from "react";
import { X, User, Building2, DollarSign, CheckCircle2, Phone, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ContactSalesModalProps {
  isOpen: boolean;
  onClose: () => void;
  t: (key: string) => string;
}

export default function ContactSalesModal({ isOpen, onClose, t }: ContactSalesModalProps) {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [budget, setBudget] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const budgetOptions = [
    { value: "option1", label: t("modals.contact.budgetOptions.option1") },
    { value: "option2", label: t("modals.contact.budgetOptions.option2") },
    { value: "option3", label: t("modals.contact.budgetOptions.option3") },
    { value: "option4", label: t("modals.contact.budgetOptions.option4") },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    
    // Reset after 3 seconds and close
    setTimeout(() => {
      setIsSuccess(false);
      setName("");
      setCompany("");
      setBudget("");
      onClose();
    }, 3000);
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setName("");
      setCompany("");
      setBudget("");
      setIsSuccess(false);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.3 }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
          >
            <div className="relative w-full max-w-md bg-slate-900 border border-violet-500/30 rounded-2xl shadow-2xl shadow-violet-500/20 overflow-hidden">
              {/* Header */}
              <div className="relative p-6 bg-gradient-to-r from-violet-600/20 to-amber-600/20 border-b border-violet-500/20">
                <button
                  onClick={handleClose}
                  disabled={isSubmitting}
                  className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-50"
                >
                  <X className="w-5 h-5" />
                </button>
                
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-amber-500 flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">
                      {isSuccess ? t("modals.contact.success") : t("modals.contact.title")}
                    </h2>
                    <p className="text-sm text-slate-400">
                      {isSuccess ? t("modals.contact.successMessage") : t("modals.contact.subtitle")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {isSuccess ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex flex-col items-center py-8"
                  >
                    <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4">
                      <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                    </div>
                    <p className="text-slate-400 text-center">{t("modals.contact.successMessage")}</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name Field */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                        <User className="w-4 h-4 text-violet-400" />
                        {t("modals.contact.name")}
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={t("modals.contact.namePlaceholder")}
                        required
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 transition-all disabled:opacity-50"
                      />
                    </div>

                    {/* Company Field */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-violet-400" />
                        {t("modals.contact.company")}
                      </label>
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder={t("modals.contact.companyPlaceholder")}
                        required
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 transition-all disabled:opacity-50"
                      />
                    </div>

                    {/* Budget Field */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-violet-400" />
                        {t("modals.contact.budget")}
                      </label>
                      <select
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        required
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 transition-all disabled:opacity-50 appearance-none cursor-pointer"
                        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '16px' }}
                      >
                        <option value="" disabled>{t("modals.contact.budgetPlaceholder")}</option>
                        {budgetOptions.map((option) => (
                          <option key={option.value} value={option.value} className="bg-slate-800">
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting || !name || !company || !budget}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-violet-500 to-amber-500 text-white font-bold hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-violet-500/25"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          {t("modals.contact.submitting")}
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          {t("modals.contact.submit")}
                        </>
                      )}
                    </button>

                    <p className="text-xs text-slate-500 text-center">
                      Entraremos em contato em até 24 horas úteis.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
