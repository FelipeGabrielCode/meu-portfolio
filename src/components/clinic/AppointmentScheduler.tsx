"use client";

import { useState } from "react";
import { Calendar, Clock, User, Phone, Mail, Check, ChevronRight } from "lucide-react";

interface TimeSlot {
  time: string;
  available: boolean;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  treatment: string;
  date: string;
  time: string;
  message: string;
}

const timeSlots: TimeSlot[] = [
  { time: "08:00", available: true },
  { time: "08:30", available: false },
  { time: "09:00", available: true },
  { time: "09:30", available: true },
  { time: "10:00", available: false },
  { time: "10:30", available: true },
  { time: "11:00", available: true },
  { time: "11:30", available: true },
  { time: "14:00", available: true },
  { time: "14:30", available: false },
  { time: "15:00", available: true },
  { time: "15:30", available: true },
  { time: "16:00", available: true },
  { time: "16:30", available: true },
  { time: "17:00", available: false },
  { time: "17:30", available: true },
];

const treatments = [
  "Preenchimento Labial",
  "Toxina Botulínica", 
  "Bioestimuladores",
  "Fios de Sustentação",
  "Peeling Químico",
  "Microagulhamento",
  "Limpeza de Pele Profunda",
  "Consulta de Avaliação"
];

export function AppointmentScheduler() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    treatment: "",
    date: "",
    time: "",
    message: ""
  });

  const [selectedDate, setSelectedDate] = useState<string>("");
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      alert("Agendamento realizado com sucesso! Entraremos em contato em breve.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        treatment: "",
        date: "",
        time: "",
        message: ""
      });
      setStep(1);
      setIsSubmitting(false);
    }, 2000);
  };

  const nextStep = () => {
    if (step === 1 && formData.name && formData.email && formData.phone) {
      setStep(2);
    } else if (step === 2 && formData.treatment && selectedDate) {
      setStep(3);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const getMinDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    return date.toISOString().split('T')[0];
  };

  const getMaxDate = () => {
    const date = new Date();
    date.setMonth(date.getMonth() + 2);
    return date.toISOString().split('T')[0];
  };

  return (
    <div className="glass-morphism rounded-2xl border border-white/10 dark:border-white/5">
      <div className="p-6 border-b border-white/10 dark:border-white/5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Agende sua Consulta
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Processo simples e rápido em 3 passos
            </p>
          </div>
          <div className="flex items-center gap-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  i <= step ? 'bg-primary' : 'bg-slate-300 dark:bg-slate-600'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6">
        {/* Step 1: Personal Information */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
                <User className="w-4 h-4" />
                Informações Pessoais
              </h4>
              
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Nome completo
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="mt-1 w-full rounded-lg border border-white/20 bg-white/10 dark:bg-white/5 px-3 py-2 text-sm focus:border-primary/50 focus:outline-none"
                    placeholder="Seu nome completo"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="mt-1 w-full rounded-lg border border-white/20 bg-white/10 dark:bg-white/5 px-3 py-2 text-sm focus:border-primary/50 focus:outline-none"
                    placeholder="seu@email.com"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="mt-1 w-full rounded-lg border border-white/20 bg-white/10 dark:bg-white/5 px-3 py-2 text-sm focus:border-primary/50 focus:outline-none"
                    placeholder="(00) 00000-0000"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={nextStep}
                disabled={!formData.name || !formData.email || !formData.phone}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium transition-all duration-300 hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Próximo passo
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Treatment and Date */}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Tratamento e Data
              </h4>
              
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Tipo de tratamento
                  </label>
                  <select
                    value={formData.treatment}
                    onChange={(e) => handleInputChange('treatment', e.target.value)}
                    className="mt-1 w-full rounded-lg border border-white/20 bg-white/10 dark:bg-white/5 px-3 py-2 text-sm focus:border-primary/50 focus:outline-none"
                    required
                  >
                    <option value="">Selecione um tratamento</option>
                    {treatments.map((treatment) => (
                      <option key={treatment} value={treatment}>{treatment}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Data desejada
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={getMinDate()}
                    max={getMaxDate()}
                    className="mt-1 w-full rounded-lg border border-white/20 bg-white/10 dark:bg-white/5 px-3 py-2 text-sm focus:border-primary/50 focus:outline-none"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="px-4 py-2 border border-white/20 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-white/10"
              >
                Voltar
              </button>
              <button
                type="button"
                onClick={nextStep}
                disabled={!formData.treatment || !selectedDate}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium transition-all duration-300 hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Próximo passo
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Time and Confirmation */}
        {step === 3 && (
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Horário e Confirmação
              </h4>
              
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Horário preferencial
                  </label>
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot.time}
                        type="button"
                        onClick={() => handleInputChange('time', slot.time)}
                        disabled={!slot.available}
                        className={`
                          px-3 py-2 text-xs rounded-lg border transition-all duration-300
                          ${formData.time === slot.time
                            ? 'bg-primary text-primary-foreground border-primary'
                            : slot.available
                            ? 'bg-white/10 border-white/20 hover:bg-white/20'
                            : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 cursor-not-allowed opacity-50'
                          }
                        `}
                      >
                        {slot.time}
                        {!slot.available && ' • Indisponível'}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Mensagem adicional (opcional)
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    rows={3}
                    className="mt-1 w-full rounded-lg border border-white/20 bg-white/10 dark:bg-white/5 px-3 py-2 text-sm focus:border-primary/50 focus:outline-none resize-none"
                    placeholder="Alguma informação adicional que gostaria de compartilhar?"
                  />
                </div>

                {/* Summary */}
                <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <h5 className="font-medium text-slate-900 dark:text-slate-100 mb-2">Resumo do agendamento:</h5>
                  <div className="space-y-1 text-sm text-slate-600 dark:text-slate-300">
                    <p><strong>Tratamento:</strong> {formData.treatment}</p>
                    <p><strong>Data:</strong> {selectedDate}</p>
                    <p><strong>Horário:</strong> {formData.time || 'Não selecionado'}</p>
                    <p><strong>Paciente:</strong> {formData.name}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="px-4 py-2 border border-white/20 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-white/10"
              >
                Voltar
              </button>
              <button
                type="submit"
                disabled={!formData.time || isSubmitting}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium transition-all duration-300 hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Agendando...' : 'Confirmar agendamento'}
                {isSubmitting ? (
                  <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Check className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
