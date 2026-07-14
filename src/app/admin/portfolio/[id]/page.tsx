"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Save, Plus, X, Search as SearchIcon } from "lucide-react";
import { getPortfolioItem, savePortfolioItem, slugify } from "@/lib/data/adminApi";

const industryOptions = ["Hospitality", "E-Commerce", "Financial Services", "iGaming", "Corporate Services", "Education", "Healthcare", "Startups"];

export default function PortfolioEditorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const isNew = id === "new";
  const router = useRouter();

  const [form, setForm] = useState({
    title: "", slug: "", client: "", category: "", industry: "Hospitality", tagline: "",
    image: "", stat: "", statLabel: "", duration: "", techStack: [] as string[],
    challenge: "", solution: "", results: [""], testimonialQuote: "", testimonialName: "",
    testimonialRole: "", status: "draft" as "draft" | "published", featured: false,
    seoTitle: "", seoDescription: "",
  });
  const [techInput, setTechInput] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!isNew && id) {
      getPortfolioItem(id).then(item => {
        if (item) setForm({
          title: item.title || "",
          slug: item.slug || "",
          client: item.client || "",
          category: item.category || "",
          industry: item.industry || "Hospitality",
          tagline: item.tagline || "",
          image: item.image || "",
          stat: item.stat || "",
          statLabel: item.statLabel || "",
          duration: item.duration || "",
          techStack: item.techStack || [],
          challenge: item.challenge || item.problem || "",
          solution: item.solution || "",
          results: item.results && item.results.length > 0 ? item.results : [""],
          testimonialQuote: item.testimonial?.quote || "",
          testimonialName: item.testimonial?.name || "",
          testimonialRole: item.testimonial?.role || "",
          status: item.status || "draft",
          featured: item.featured || false,
          seoTitle: item.seoTitle || "",
          seoDescription: item.seoDescription || "",
        });
      });
    }
  }, [id, isNew]);

  const updateField = (field: string, value: unknown) => {
    setForm((prev) => {
      const updated = { ...prev, [field]: value };
      if (field === "title" && (isNew || prev.slug === slugify(prev.title))) updated.slug = slugify(value as string);
      return updated;
    });
  };

  const addTech = () => { const t = techInput.trim(); if (t && !form.techStack.includes(t)) setForm((p) => ({ ...p, techStack: [...p.techStack, t] })); setTechInput(""); };

  const handleSave = async (status?: "draft" | "published") => {
    const data: any = {
      id: isNew ? undefined : id,
      title: form.title,
      slug: form.slug,
      client: form.client,
      category: form.category,
      industry: form.industry,
      tagline: form.tagline,
      image: form.image,
      stat: form.stat,
      statLabel: form.statLabel,
      duration: form.duration,
      techStack: form.techStack,
      challenge: form.challenge,
      solution: form.solution,
      results: form.results.filter((r) => r.trim()),
      testimonial: form.testimonialQuote ? { quote: form.testimonialQuote, name: form.testimonialName, role: form.testimonialRole } : undefined,
      status: status || form.status,
      featured: form.featured,
      seoTitle: form.seoTitle || form.title,
      seoDescription: form.seoDescription || form.tagline,
      problem: form.challenge,
      images: form.image ? [form.image] : [],
    };
    await savePortfolioItem(data);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    router.push("/admin/portfolio");
  };

  return (
    <div className="max-w-[900px] mx-auto">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button onClick={() => router.push("/admin/portfolio")} className="p-2 rounded-lg hover:bg-og-surface text-og-text-secondary transition-colors cursor-pointer"><ArrowLeft size={18} /></button>
          <h1 className="text-[20px] text-og-text font-bold">{isNew ? "New Project" : "Edit Project"}</h1>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => handleSave("draft")} className="px-3 py-2 rounded-lg bg-og-surface border border-og-border text-[12px] text-og-text-secondary hover:text-og-text font-medium cursor-pointer">Save Draft</button>
          <button onClick={() => handleSave("published")} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-og-accent hover:bg-og-accent-hover text-white text-[12px] font-semibold cursor-pointer"><Save size={14} /> Publish</button>
        </div>
      </motion.div>

      {saved && <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-4 px-4 py-2.5 rounded-lg bg-og-accent/10 text-og-accent text-[13px] font-medium">Project saved successfully!</motion.div>}

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-og-surface rounded-xl p-5 border border-og-border">
            <InputField label="Project Title" value={form.title} onChange={(val) => updateField("title", val)} placeholder="e.g. Malta Grand Hotel" />
            <div className="mt-2 text-[11px] text-og-text-secondary/60">Slug: <span className="text-og-accent">/portfolio/{form.slug || "..."}</span></div>
          </div>

          <div className="bg-og-surface rounded-xl p-5 border border-og-border space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <InputField label="Client Name" value={form.client} onChange={(val) => updateField("client", val)} />
              <div>
                <label className="block text-[11px] text-og-text-secondary mb-1 font-medium">Industry</label>
                <select value={form.industry} onChange={(e) => updateField("industry", e.target.value)} className="w-full h-9 px-3 rounded-lg bg-og-surface-hover border border-og-border text-[13px] text-og-text outline-none font-normal">{industryOptions.map((i) => <option key={i}>{i}</option>)}</select>
              </div>
            </div>
            <InputField label="Category" value={form.category} onChange={(val) => updateField("category", val)} placeholder="e.g. Web & Custom Software" />
            <InputField label="Tagline" value={form.tagline} onChange={(val) => updateField("tagline", val)} placeholder="One-line summary" />
            <div className="grid grid-cols-3 gap-3">
              <InputField label="Key Stat" value={form.stat} onChange={(val) => updateField("stat", val)} placeholder="+68%" />
              <InputField label="Stat Label" value={form.statLabel} onChange={(val) => updateField("statLabel", val)} placeholder="Online bookings" />
              <InputField label="Duration" value={form.duration} onChange={(val) => updateField("duration", val)} placeholder="10 weeks" />
            </div>
          </div>

          <div className="bg-og-surface rounded-xl p-5 border border-og-border space-y-3">
            <div><label className="block text-[11px] text-og-text-secondary mb-1 font-medium">Challenge / Problem</label><textarea value={form.challenge} onChange={(e) => updateField("challenge", e.target.value)} rows={3} className="w-full px-3 py-2 rounded-lg bg-og-surface-hover border border-og-border text-[13px] text-og-text outline-none resize-y font-normal" /></div>
            <div><label className="block text-[11px] text-og-text-secondary mb-1 font-medium">Solution</label><textarea value={form.solution} onChange={(e) => updateField("solution", e.target.value)} rows={3} className="w-full px-3 py-2 rounded-lg bg-og-surface-hover border border-og-border text-[13px] text-og-text outline-none resize-y font-normal" /></div>
          </div>

          <div className="bg-og-surface rounded-xl p-5 border border-og-border">
            <label className="block text-[11px] text-og-text-secondary mb-2 font-medium">Results</label>
            {form.results.map((r, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input value={r} onChange={(e) => { const results = [...form.results]; results[i] = e.target.value; setForm((p) => ({ ...p, results })); }} placeholder={`Result ${i + 1}`} className="flex-1 h-9 px-3 rounded-lg bg-og-surface-hover border border-og-border text-[13px] text-og-text outline-none font-normal" />
                {form.results.length > 1 && <button onClick={() => setForm((p) => ({ ...p, results: p.results.filter((_, j) => j !== i) }))} className="p-2 text-og-text-secondary hover:text-og-destructive cursor-pointer"><X size={14} /></button>}
              </div>
            ))}
            <button onClick={() => setForm((p) => ({ ...p, results: [...p.results, ""] }))} className="flex items-center gap-1 text-[12px] text-og-accent font-medium cursor-pointer"><Plus size={14} /> Add result</button>
          </div>

          <div className="bg-og-surface rounded-xl p-5 border border-og-border space-y-3">
            <label className="block text-[12px] text-og-text-secondary font-semibold">Testimonial (optional)</label>
            <textarea value={form.testimonialQuote} onChange={(e) => updateField("testimonialQuote", e.target.value)} rows={2} placeholder="Client quote..." className="w-full px-3 py-2 rounded-lg bg-og-surface-hover border border-og-border text-[13px] outline-none resize-none font-normal" />
            <div className="grid grid-cols-2 gap-3"><InputField label="Name" value={form.testimonialName} onChange={(val) => updateField("testimonialName", val)} /><InputField label="Role" value={form.testimonialRole} onChange={(val) => updateField("testimonialRole", val)} /></div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-og-surface rounded-xl p-5 border border-og-border">
            <label className="block text-[12px] text-og-text-secondary mb-2 font-semibold">Cover Image URL</label>
            <input type="text" value={form.image} onChange={(e) => updateField("image", e.target.value)} placeholder="https://..." className="w-full h-9 px-3 rounded-lg bg-og-surface-hover border border-og-border text-[12px] text-og-text outline-none font-normal" />
            {form.image && <img src={form.image} alt="Preview" className="mt-3 w-full aspect-[16/10] object-cover rounded-lg" />}
          </div>

          <div className="bg-og-surface rounded-xl p-5 border border-og-border">
            <label className="block text-[12px] text-og-text-secondary mb-2 font-semibold">Tech Stack</label>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {form.techStack.map((t) => (
                <span key={t} className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-[#2563EB]/10 text-[#2563EB] dark:bg-[#2563EB]/20 dark:text-[#60A5FA] text-[11px] font-medium">{t}<button onClick={() => setForm((p) => ({ ...p, techStack: p.techStack.filter((x) => x !== t) }))} className="hover:text-og-destructive cursor-pointer"><X size={10} /></button></span>
              ))}
            </div>
            <div className="flex gap-1">
              <input type="text" value={techInput} onChange={(e) => setTechInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTech())} placeholder="Add tech..." className="flex-1 h-8 px-3 rounded-lg bg-og-surface-hover border border-og-border text-[11px] outline-none font-normal" />
              <button onClick={addTech} className="px-2 h-8 rounded-lg bg-og-surface-hover border border-og-border text-og-text-secondary hover:text-og-accent cursor-pointer"><Plus size={14} /></button>
            </div>
          </div>

          <div className="bg-og-surface rounded-xl p-5 border border-og-border space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={form.featured} onChange={(e) => updateField("featured", e.target.checked)} className="w-4 h-4 rounded accent-og-accent" />
              <span className="text-[13px] text-og-text font-medium">Featured Project</span>
            </label>
          </div>

          <div className="bg-og-surface rounded-xl p-5 border border-og-border space-y-3">
            <div className="flex items-center gap-2 mb-1"><SearchIcon size={13} className="text-og-text-secondary" /><span className="text-[12px] text-og-text-secondary font-semibold">SEO Settings</span></div>
            <InputField label="SEO Title" value={form.seoTitle} onChange={(val) => updateField("seoTitle", val)} />
            <div><label className="block text-[11px] text-og-text-secondary mb-1 font-medium">SEO Description</label><textarea value={form.seoDescription} onChange={(e) => updateField("seoDescription", e.target.value)} rows={2} className="w-full px-3 py-2 rounded-lg bg-og-surface-hover border border-og-border text-[11px] outline-none resize-none font-normal" /></div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

function InputField({ label, value, onChange, placeholder }: InputFieldProps) {
  return (
    <div>
      <label className="block text-[11px] text-og-text-secondary mb-1 font-medium">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-9 px-3 rounded-lg bg-og-surface-hover border border-og-border text-[13px] text-og-text outline-none focus:border-og-accent/30 font-normal"
      />
    </div>
  );
}
