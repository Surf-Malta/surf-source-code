"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedSection } from "@/components/AnimatedSection";
import { ArrowRight, ArrowLeft, Check, Building2, Globe, Mail, Briefcase, MessageSquare, TrendingUp, Loader2 } from "lucide-react";
import { toast } from "sonner";

const steps = [
  { number: 1, title: "Your Business", icon: Building2 },
  { number: 2, title: "Project Details", icon: Briefcase },
  { number: 3, title: "Submit", icon: Check },
];

const services = ["Website Design & Development", "Custom Software", "AI & Automation", "Business Intelligence", "Workflow Automation", "API Integration", "E-Commerce Platform", "Other"];
const industries = ["E-Commerce & Retail", "Corporate Services", "Financial Services", "iGaming", "Hospitality", "Startups", "Education", "Other"];
const budgets = ["Under €5,000", "€5,000 - €15,000", "€15,000 - €50,000", "€50,000 - €100,000", "€100,000+", "Not sure yet"];

export default function ApplyPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({ companyName: "", website: "", email: "", service: "", industry: "", budget: "", message: "" });

  const updateField = (field: string, value: string) => setFormData((prev) => ({ ...prev, [field]: value }));
  const canProceed = () => {
    if (currentStep === 1) return formData.companyName && formData.email;
    if (currentStep === 2) return formData.service && formData.industry;
    return true;
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit request.");
      }
      setSubmitted(true);
      toast.success("Project request submitted successfully!");
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Failed to submit request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-og-bg">
      <div className="max-w-[600px] mx-auto px-6 py-12 md:py-16">
        {!submitted ? (
          <>
            <AnimatedSection className="text-center mb-8">
              <h1 className="text-[clamp(28px,4vw,40px)] tracking-[-0.03em] text-og-text mb-3 font-bold">Start a Project</h1>
              <p className="text-[16px] text-og-text-secondary font-normal">Tell us about your project. We'll get back to you within 24 hours.</p>
            </AnimatedSection>

            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                {steps.map((step, i) => (
                  <div key={step.number} className="flex items-center">
                    <div className="flex items-center gap-2">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${currentStep >= step.number ? "bg-og-accent text-[#09090F] font-bold" : "bg-og-bg-alt text-og-text-secondary border border-og-border"}`}>
                        {currentStep > step.number ? <Check size={16} /> : <step.icon size={16} />}
                      </div>
                      <span className={`text-[13px] hidden md:inline transition-colors ${currentStep >= step.number ? "text-og-text" : "text-og-text-secondary"}`} style={{ fontWeight: 500 }}>{step.title}</span>
                    </div>
                    {i < steps.length - 1 && (
                      <div className="w-12 md:w-24 h-px bg-og-border mx-3">
                        <div className="h-full bg-og-accent transition-all duration-500" style={{ width: currentStep > step.number ? "100%" : "0%" }} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="space-y-6">
                  {[
                    { icon: Building2, label: "Company / Name", field: "companyName", type: "text", placeholder: "Your company or full name" },
                    { icon: Globe, label: "Website (optional)", field: "website", type: "url", placeholder: "https://yourcompany.com" },
                    { icon: Mail, label: "Email", field: "email", type: "email", placeholder: "hello@yourcompany.com" },
                  ].map((input) => (
                    <div key={input.field}>
                      <label className="text-[14px] text-og-text mb-2 flex items-center gap-2 font-medium">
                        <input.icon size={14} className="text-og-accent" />{input.label}
                      </label>
                      <input
                        type={input.type}
                        placeholder={input.placeholder}
                        value={(formData as any)[input.field]}
                        onChange={(e) => updateField(input.field, e.target.value)}
                        className="w-full h-12 px-4 rounded-xl bg-og-input-bg border border-og-border focus:border-og-accent focus:bg-og-surface outline-none text-[15px] text-og-text placeholder:text-og-text-secondary/60 transition-all duration-200"
                      />
                    </div>
                  ))}
                </motion.div>
              )}
              {currentStep === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="space-y-6">
                  <div>
                    <label className="text-[14px] text-og-text mb-2 flex items-center gap-2 font-medium">
                      <Briefcase size={14} className="text-og-accent" />What do you need?
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {services.map((svc) => (
                        <button
                          key={svc}
                          type="button"
                          onClick={() => updateField("service", svc)}
                          className={`h-11 px-4 rounded-xl text-[14px] text-left transition-all duration-200 cursor-pointer ${
                            formData.service === svc
                              ? "bg-og-accent text-[#09090F] font-bold"
                              : "bg-og-input-bg text-og-text border border-og-border hover:border-og-accent/20"
                          }`}
                        >
                          {svc}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-[14px] text-og-text mb-2 flex items-center gap-2 font-medium">
                      <Building2 size={14} className="text-og-accent" />Industry
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {industries.map((ind) => (
                        <button
                          key={ind}
                          type="button"
                          onClick={() => updateField("industry", ind)}
                          className={`h-11 px-4 rounded-xl text-[14px] text-left transition-all duration-200 cursor-pointer ${
                            formData.industry === ind
                              ? "bg-og-accent text-[#09090F] font-bold"
                              : "bg-og-input-bg text-og-text border border-og-border hover:border-og-accent/20"
                          }`}
                        >
                          {ind}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-[14px] text-og-text mb-2 flex items-center gap-2 font-medium">
                      <TrendingUp size={14} className="text-og-accent" />Budget Range
                    </label>
                    <div className="space-y-2">
                      {budgets.map((b) => (
                        <button
                          key={b}
                          type="button"
                          onClick={() => updateField("budget", b)}
                          className={`w-full h-11 px-4 rounded-xl text-[14px] text-left transition-all duration-200 cursor-pointer ${
                            formData.budget === b
                              ? "bg-og-accent text-[#09090F] font-bold"
                              : "bg-og-input-bg text-og-text border border-og-border hover:border-og-accent/20"
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
              {currentStep === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="space-y-6">
                  <div className="bg-og-bg-alt rounded-2xl p-6 border border-og-border">
                    <h3 className="text-[16px] text-og-text mb-4 font-semibold">Review Your Request</h3>
                    <div className="space-y-3">
                      {[
                        { label: "Name / Company", value: formData.companyName },
                        { label: "Website", value: formData.website || "N/A" },
                        { label: "Email", value: formData.email },
                        { label: "Service", value: formData.service },
                        { label: "Industry", value: formData.industry },
                        { label: "Budget", value: formData.budget || "Not specified" },
                      ].map((item) => (
                        <div key={item.label} className="flex items-center justify-between py-2 border-b border-og-border last:border-0">
                          <span className="text-[13px] text-og-text-secondary font-normal">{item.label}</span>
                          <span className="text-[14px] text-og-text font-semibold">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-[14px] text-og-text mb-2 flex items-center gap-2 font-medium">
                      <MessageSquare size={14} className="text-og-accent" />Additional details (optional)
                    </label>
                    <textarea
                      placeholder="Tell us more about your project..."
                      value={formData.message}
                      onChange={(e) => updateField("message", e.target.value)}
                      className="w-full h-32 px-4 py-3 rounded-xl bg-og-input-bg border border-og-border focus:border-og-accent focus:bg-og-surface outline-none text-[15px] text-og-text placeholder:text-og-text-secondary/60 transition-all duration-200 resize-none"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex items-center justify-between mt-10">
              {currentStep > 1 ? (
                <button
                  onClick={() => setCurrentStep((s) => s - 1)}
                  type="button"
                  className="flex items-center gap-2 h-12 px-6 rounded-full border border-og-border text-og-text text-[15px] hover:bg-og-surface-hover transition-colors cursor-pointer font-medium"
                >
                  <ArrowLeft size={16} />Back
                </button>
              ) : <div />}
              {currentStep < 3 ? (
                <button
                  onClick={() => setCurrentStep((s) => s + 1)}
                  disabled={!canProceed()}
                  type="button"
                  className={`flex items-center gap-2 h-12 px-8 rounded-full text-[15px] transition-all duration-300 cursor-pointer font-semibold ${
                    canProceed()
                      ? "bg-og-accent text-[#09090F] hover:bg-og-accent-hover hover:shadow-[0_0_20px_var(--og-accent-glow)]"
                      : "bg-og-disabled-bg text-og-disabled-text border border-og-border cursor-not-allowed"
                  }`}
                >
                  Continue<ArrowRight size={16} />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  type="button"
                  className="flex items-center gap-2 h-12 px-8 rounded-full bg-og-accent text-[#09090F] text-[15px] transition-all duration-300 hover:bg-og-accent-hover hover:shadow-[0_0_30px_var(--og-accent-glow)] cursor-pointer font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Book Consultation<ArrowRight size={16} />
                    </>
                  )}
                </button>
              )}
            </div>
          </>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }} className="text-center py-16">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, duration: 0.5, type: "spring" }} className="w-20 h-20 rounded-full bg-og-accent flex items-center justify-center mx-auto mb-8 text-[#09090F]">
              <Check size={32} className="stroke-[3]" />
            </motion.div>
            <h2 className="text-[clamp(24px,4vw,36px)] tracking-[-0.03em] text-og-text mb-4 font-bold">Request submitted.</h2>
            <p className="text-[17px] text-og-text-secondary mb-2 font-normal">We'll review your project and get back to you within 24 hours.</p>
            <p className="text-[15px] text-og-text-secondary mb-8 font-normal">Check your email at <span className="text-og-accent font-semibold">{formData.email}</span> for next steps.</p>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--og-accent-muted)] text-og-accent text-[13px] font-semibold">
              <div className="w-2 h-2 rounded-full bg-og-accent animate-pulse" />We'll be in touch soon
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
