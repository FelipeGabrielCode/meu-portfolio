"use client";

import { useState } from "react";
import { X, User, Building2, Scale, FileText, Shield, CheckCircle2, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface LegalTriageModalProps {
  isOpen: boolean;
  onClose: () => void;
  t: (key: string) => string;
}

export default function LegalTriageModal({ isOpen, onClose, t }: LegalTriageModalProps) {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [area, setArea] = useState("");
  const [summary, setSummary] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const areaOptions = [
    { value: "business", label: t("modals.triage.areas.business") },
    { value: "labor", label: t("modals.triage.areas.labor") },
    { value: "civil", label: t("modals.triage.areas.civil") },
    { value: "tax", label: t("modals.triage.areas.tax") },
    { value: "real_estate", label: t("modals.triage.areas.real_estate") },
    { value: "consumer", label: t("modals.triage.areas.consumer") },
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
      setArea("");
      setSummary("");
      onClose();
    }, 3000);
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setName("");
      setCompany("");
      setArea("");
      setSummary("");
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
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.3 }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
          >
            <div className="relative w-full max-w-lg bg-slate-900 border border-sky-500/30 rounded-2xl shadow-2xl shadow-sky-500/20 overflow-hidden">
              {/* Header */}
              <div className="relative p-6 bg-gradient-to-r from-sky-600/20 to-slate-800 border-b border-sky-500/20">
                <button
                  onClick={handleClose}
                  disabled={isSubmitting}
                  className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-50"
                >
                  <X className="w-5 h-5" />
                </button>
                
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500 to-slate-600 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">
                      {isSuccess ? t("modals.triage.success") : t("modals.triage.title")}
                    </h2>
                    <p className="text-sm text-slate-400">
                      {isSuccess ? t("modals.triage.successMessage") : t("modals.triage.subtitle")}
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
                    <div className="w-20 h-20 rounded-full bg-sky-500/20 flex items-center justify-center mb-4">
                      <CheckCircle2 className="w-10 h-10 text-sky-400" />
                    </div>
                    <p className="text-slate-400 text-center">{t("modals.triage.successMessage")}</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name Field */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                        <User className="w-4 h-4 text-sky-400" />
                        {t("modals.triage.name")}
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={t("modals.triage.namePlaceholder")}
                        required
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-sky-500/50 focus:ring-2 focus:ring-sky-500/20 transition-all disabled:opacity-50"
                      />
                    </div>

                    {/* Company Field (Optional) */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-sky-400" />
                        {t("modals.triage.company")}
                        <span className="text-xs text-slate-500 font-normal">({t("modals.triage.optional")})</span>
                      </label>
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder={t("modals.triage.companyPlaceholder")}
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-sky-500/50 focus:ring-2 focus:ring-sky-500/20 transition-all disabled:opacity-50"
                      />
                    </div>

                    {/* Legal Area Field */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                        <Scale className="w-4 h-4 text-sky-400" />
                        {t("modals.triage.area")}
                      </label>
                      <select
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                        required
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-sky-500/50 focus:ring-2 focus:ring-sky-500/20 transition-all disabled:opacity-50 appearance-none cursor-pointer"
                        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '16px' }}
                      >
                        <option value="" disabled>{t("modals.triage.areaPlaceholder")}</option>
                        {areaOptions.map((option) => (
                          <option key={option.value} value={option.value} className="bg-slate-800">
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Case Summary Field */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                        <FileText className="w-4 h-4 text-sky-400" />
                        {t("modals.triage.summary")}
                      </label>
                      <textarea
                        value={summary}
                        onChange={(e) => setSummary(e.target.value)}
                        placeholder={t("modals.triage.summaryPlaceholder")}
                        required
                        rows={4}
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-sky-500/50 focus:ring-2 focus:ring-sky-500/20 transition-all disabled:opacity-50 resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting || !name || !area || !summary}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-sky-500 to-slate-500 text-white font-bold hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-sky-500/25"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          {t("modals.triage.submitting")}
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          {t("modals.triage.submit")}
                        </>
                      )}
                    </button>

                    {/* Compliance Text */}
                    <div className="flex items-center gap-2 text-xs text-slate-500 justify-center">
                      <Shield className="w-4 h-4 text-sky-400" />
                      <span>{t("modals.triage.compliance")}</span>
                    </div>
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
