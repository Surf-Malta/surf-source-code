"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Save, Plus, X, Home, BarChart3, MessageSquare, Sparkles, Loader2 } from "lucide-react";
import { getHomepage, saveHomepage } from "@/lib/data/adminApi";

export default function HomepageEditorPage() {
  const [data, setData] = useState<any | null>(null);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<"hero" | "stats" | "testimonials" | "features">("hero");

  useEffect(() => {
    getHomepage()
      .then((res) => {
        // Ensure values are properly defaulted so mapping doesn't fail
        setData({
          heroTitle: res?.heroTitle || "Technology that works for you.",
          heroSubtitle: res?.heroSubtitle || "Custom software, AI automation, and digital solutions — built in Malta, built to scale.",
          ctaText: res?.ctaText || "Book a Free Consultation",
          aboutText: res?.aboutText || "",
          stats: res?.stats || [],
          testimonials: res?.testimonials || [],
          featureHighlights: res?.featureHighlights || [],
        });
      })
      .catch(err => console.error("Load homepage error:", err));
  }, []);

  const handleSave = async () => { if (!data) return; await saveHomepage(data); setSaved(true); setTimeout(() => setSaved(false), 2000); };

  if (!data) return <div className="flex items-center justify-center py-20"><Loader2 size={28} className="animate-spin text-og-accent" /></div>;

  const tabs = [
    { id: "hero" as const, label: "Hero & About", icon: Home },
    { id: "stats" as const, label: "Stats", icon: BarChart3 },
    { id: "testimonials" as const, label: "Testimonials", icon: MessageSquare },
    { id: "features" as const, label: "Features", icon: Sparkles },
  ];

  return (
    <div className="max-w-[800px] mx-auto">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-6">
        <div><h1 className="text-[24px] text-og-text tracking-[-0.02em] font-bold">Homepage Editor</h1><p className="text-[14px] text-og-text-secondary font-normal">Edit homepage sections in real time.</p></div>
        <button onClick={handleSave} className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-og-accent hover:bg-og-accent-hover text-white text-[13px] transition-colors font-semibold cursor-pointer"><Save size={15} /> Save Changes</button>
      </motion.div>

      {saved && <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-4 px-4 py-2.5 rounded-lg bg-og-accent/10 text-og-accent text-[13px] font-medium">Homepage saved successfully!</motion.div>}

      <div className="flex gap-1 bg-og-surface rounded-lg border border-og-border p-1 mb-6">
        {tabs.map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-[12px] transition-all flex-1 justify-center cursor-pointer font-medium ${activeTab === tab.id ? "bg-og-text text-og-bg" : "text-og-text-secondary hover:text-og-text"}`}><tab.icon size={13} /><span className="hidden sm:inline">{tab.label}</span></button>
        ))}
      </div>

      {activeTab === "hero" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <div className="bg-og-surface rounded-xl p-5 border border-og-border space-y-4">
            <div className="text-[13px] text-og-text font-semibold">Hero Section</div>
            <div><label className="block text-[11px] text-og-text-secondary mb-1 font-medium">Hero Title</label><input type="text" value={data.heroTitle} onChange={(e) => setData((d: any) => ({ ...d, heroTitle: e.target.value }))} className="w-full h-11 px-3 rounded-lg bg-og-surface-hover border border-og-border text-[16px] text-og-text outline-none font-semibold" /></div>
            <div><label className="block text-[11px] text-og-text-secondary mb-1 font-medium">Hero Subtitle</label><textarea value={data.heroSubtitle} onChange={(e) => setData((d: any) => ({ ...d, heroSubtitle: e.target.value }))} rows={2} className="w-full px-3 py-2 rounded-lg bg-og-surface-hover border border-og-border text-[14px] text-og-text outline-none resize-none font-normal" /></div>
            <div><label className="block text-[11px] text-og-text-secondary mb-1 font-medium">CTA Button Text</label><input type="text" value={data.ctaText} onChange={(e) => setData((d: any) => ({ ...d, ctaText: e.target.value }))} className="w-full h-9 px-3 rounded-lg bg-og-surface-hover border border-og-border text-[13px] text-og-text outline-none font-normal" /></div>
          </div>
          <div className="bg-og-surface rounded-xl p-5 border border-og-border">
            <div className="text-[13px] text-og-text mb-3 font-semibold">About Section</div>
            <textarea value={data.aboutText} onChange={(e) => setData((d: any) => ({ ...d, aboutText: e.target.value }))} rows={4} className="w-full px-3 py-2 rounded-lg bg-og-surface-hover border border-og-border text-[13px] text-og-text outline-none resize-y font-normal" />
          </div>
        </motion.div>
      )}

      {activeTab === "stats" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
          <div className="bg-og-surface rounded-xl p-5 border border-og-border">
            <div className="text-[13px] text-og-text mb-4 font-semibold">Stats Numbers</div>
            {data.stats.map((stat: any, i: number) => (
              <div key={i} className="flex items-center gap-3 mb-3">
                <input type="text" value={stat.value} onChange={(e) => { const s = [...data.stats]; s[i] = { ...s[i], value: e.target.value }; setData((d: any) => ({ ...d, stats: s })); }} className="w-24 h-9 px-3 rounded-lg bg-og-surface-hover border border-og-border text-[14px] text-og-text outline-none text-center font-bold" />
                <input type="text" value={stat.label} onChange={(e) => { const s = [...data.stats]; s[i] = { ...s[i], label: e.target.value }; setData((d: any) => ({ ...d, stats: s })); }} className="flex-1 h-9 px-3 rounded-lg bg-og-surface-hover border border-og-border text-[13px] text-og-text outline-none font-normal" />
                <button onClick={() => setData((d: any) => ({ ...d, stats: d.stats.filter((_: any, j: number) => j !== i) }))} className="p-1.5 text-og-text-secondary hover:text-og-destructive cursor-pointer"><X size={14} /></button>
              </div>
            ))}
            <button onClick={() => setData((d: any) => ({ ...d, stats: [...d.stats, { label: "", value: "" }] }))} className="flex items-center gap-1 text-[12px] text-og-accent font-medium cursor-pointer"><Plus size={14} /> Add stat</button>
          </div>
        </motion.div>
      )}

      {activeTab === "testimonials" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
          {data.testimonials.map((t: any, i: number) => (
            <div key={i} className="bg-og-surface rounded-xl p-5 border border-og-border">
              <div className="flex items-center justify-between mb-3"><span className="text-[13px] text-og-text font-semibold">Testimonial {i + 1}</span><button onClick={() => setData((d: any) => ({ ...d, testimonials: d.testimonials.filter((_: any, j: number) => j !== i) }))} className="text-og-text-secondary hover:text-og-destructive cursor-pointer"><X size={14} /></button></div>
              <textarea value={t.quote} onChange={(e) => { const ts = [...data.testimonials]; ts[i] = { ...ts[i], quote: e.target.value }; setData((d: any) => ({ ...d, testimonials: ts })); }} rows={2} placeholder="Quote..." className="w-full px-3 py-2 rounded-lg bg-og-surface-hover border border-og-border text-[13px] text-og-text outline-none resize-none mb-2 font-normal" />
              <div className="grid grid-cols-2 gap-3">
                <input type="text" value={t.name} onChange={(e) => { const ts = [...data.testimonials]; ts[i] = { ...ts[i], name: e.target.value }; setData((d: any) => ({ ...d, testimonials: ts })); }} placeholder="Name" className="h-9 px-3 rounded-lg bg-og-surface-hover border border-og-border text-[12px] text-og-text outline-none font-normal" />
                <input type="text" value={t.role} onChange={(e) => { const ts = [...data.testimonials]; ts[i] = { ...ts[i], role: e.target.value }; setData((d: any) => ({ ...d, testimonials: ts })); }} placeholder="Role" className="h-9 px-3 rounded-lg bg-og-surface-hover border border-og-border text-[12px] text-og-text outline-none font-normal" />
              </div>
            </div>
          ))}
          <button onClick={() => setData((d: any) => ({ ...d, testimonials: [...d.testimonials, { quote: "", name: "", role: "" }] }))} className="flex items-center gap-1.5 text-[12px] text-og-accent font-medium cursor-pointer"><Plus size={14} /> Add testimonial</button>
        </motion.div>
      )}

      {activeTab === "features" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
          {data.featureHighlights.map((f: any, i: number) => (
            <div key={i} className="bg-og-surface rounded-xl p-5 border border-og-border">
              <div className="flex items-center justify-between mb-3"><span className="text-[13px] text-og-text font-semibold">Feature {i + 1}</span><button onClick={() => setData((d: any) => ({ ...d, featureHighlights: d.featureHighlights.filter((_: any, j: number) => j !== i) }))} className="text-og-text-secondary hover:text-og-destructive cursor-pointer"><X size={14} /></button></div>
              <input type="text" value={f.title} onChange={(e) => { const fh = [...data.featureHighlights]; fh[i] = { ...fh[i], title: e.target.value }; setData((d: any) => ({ ...d, featureHighlights: fh })); }} placeholder="Title" className="w-full h-9 px-3 rounded-lg bg-og-surface-hover border border-og-border text-[13px] text-og-text outline-none mb-2 font-medium" />
              <textarea value={f.description} onChange={(e) => { const fh = [...data.featureHighlights]; fh[i] = { ...fh[i], description: e.target.value }; setData((d: any) => ({ ...d, featureHighlights: fh })); }} placeholder="Description" rows={2} className="w-full px-3 py-2 rounded-lg bg-og-surface-hover border border-og-border text-[13px] text-og-text outline-none resize-none font-normal" />
            </div>
          ))}
          <button onClick={() => setData((d: any) => ({ ...d, featureHighlights: [...d.featureHighlights, { title: "", description: "" }] }))} className="flex items-center gap-1.5 text-[12px] text-og-accent font-medium cursor-pointer"><Plus size={14} /> Add feature</button>
        </motion.div>
      )}
    </div>
  );
}
