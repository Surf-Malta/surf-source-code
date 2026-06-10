"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedSection } from "../AnimatedSection";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    quote:
      "The platform transformed our digital presence completely. It pays for itself every single month.",
    name: "Maria Camilleri",
    role: "Director of Operations",
    company: "Malta Grand Hotel Group",
  },
  {
    quote:
      "The AI search alone was a game changer. Customers find what they need instantly and conversion is up 40%.",
    name: "David Grech",
    role: "Founder & CEO",
    company: "Island Market Ltd.",
  },
  {
    quote:
      "What used to take days now takes minutes. The dashboard gives us complete confidence in our compliance posture.",
    name: "Dr. Jonathan Borg",
    role: "Head of Compliance",
    company: "Apex Financial Services",
  },
  {
    quote:
      "Our clients love the portal. It's professional, fast, and makes us look like a much larger firm.",
    name: "Simone Farrugia",
    role: "Managing Director",
    company: "Lexis Corporate Services",
  },
  {
    quote:
      "The AI assessment feature saves our tutors hours every week and students get instant, personalised feedback.",
    name: "Prof. Claudia Vella",
    role: "Academic Director",
    company: "LearnHub Education Ltd.",
  },
];

export function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const t = testimonials[current];

  return (
    <section className="py-14 md:py-20 bg-og-bg-alt">
      <div className="max-w-[800px] mx-auto px-6">
        <AnimatedSection className="text-center mb-10">
          <h2
            className="text-[clamp(28px,4vw,48px)] tracking-[-0.03em] text-og-text mb-4 font-bold"
          >
            What our clients say.
          </h2>
        </AnimatedSection>

        <div className="relative min-h-[260px] flex items-center overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              initial={{ opacity: 0, x: direction * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -40 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="w-full"
            >
              <div className="bg-og-surface rounded-2xl p-8 md:p-10 border border-og-border text-center">
                <Quote
                  size={28}
                  className="text-og-accent mx-auto mb-5"
                  strokeWidth={1.5}
                />
                <p
                  className="text-[18px] md:text-[22px] text-og-text leading-relaxed mb-8 italic tracking-[-0.01em] font-normal"
                >
                  "{t.quote}"
                </p>
                <div className="flex items-center justify-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-og-accent flex items-center justify-center">
                    <span
                      className="text-white text-[13px] font-semibold"
                    >
                      {t.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div className="text-left">
                    <p
                      className="text-[15px] text-og-text font-semibold"
                    >
                      {t.name}
                    </p>
                    <p
                      className="text-[13px] text-og-text-secondary font-normal"
                    >
                      {t.role}, {t.company}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full border border-og-border flex items-center justify-center text-og-text-secondary hover:text-og-text hover:border-og-text transition-colors cursor-pointer"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > current ? 1 : -1);
                  setCurrent(i);
                }}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  i === current
                    ? "w-6 bg-og-accent"
                    : "w-2 bg-og-text-secondary/30 hover:bg-og-text-secondary/50"
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-10 h-10 rounded-full border border-og-border flex items-center justify-center text-og-text-secondary hover:text-og-text hover:border-og-text transition-colors cursor-pointer"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
