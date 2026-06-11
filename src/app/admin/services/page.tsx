"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, X, Check, Wrench, Code2, Bot, Globe, BarChart3, Workflow, Zap, Shield, Database, Loader2 } from "lucide-react";
import { getServices, saveService, deleteService } from "@/lib/data/adminApi";

const iconMap: Record<string, React.ElementType> = { Code2, Bot, Globe, BarChart3, Workflow, Zap, Shield, Database, Wrench };
const iconNames = Object.keys(iconMap);

export default function ServicesManagerPage() {
  const [services, setServices] = useState<any[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState({ title: "", description: "", icon: "Code2", detailContent: "", cta: "Learn More", pricing: "" });
  const [showNew, setShowNew] = useState(false);
  const [loading, setLoading] = useState(true);

  const reload = () => {
    getServices()
      .then((items) => { setServices(items.sort((a: any, b: any) => a.order - b.order)); setLoading(false); })
      .catch((err) => { console.error("Load services error:", err); setLoading(false); });
  };
  useEffect(() => { reload(); }, []);

  const startEdit = (svc: any) => { setEditing(svc.id); setForm({ title: svc.title, description: svc.description, icon: svc.icon, detailContent: svc.detailContent, cta: svc.cta, pricing: svc.pricing }); };

  const handleSave = () => {
    if (!form.title.trim()) return;
    const p = editing ? saveService({ ...form, id: editing }) : saveService(form);
    p.then(reload);
    setEditing(null); setShowNew(false);
    setForm({ title: "", description: "", icon: "Code2", detailContent: "", cta: "Learn More", pricing: "" });
  };

  const handleDelete = (id: string) => { if (confirm("Delete this service?")) { deleteService(id).then(reload).catch(err => console.error("Delete service error:", err)); } };

  const FormFields = () => (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div><label className="block text-[11px] text-og-text-secondary mb-1 font-medium">Title</label><input type="text" value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} placeholder="Service title" className="w-full h-9 px-3 rounded-lg bg-og-surface-hover border border-og-border text-[13px] text-og-text outline-none font-normal" /></div>
        <div><label className="block text-[11px] text-og-text-secondary mb-1 font-medium">Icon</label><select value={form.icon} onChange={(e) => setForm((p) => ({ ...p, icon: e.target.value }))} className="w-full h-9 px-3 rounded-lg bg-og-surface-hover border border-og-border text-[13px] text-og-text outline-none font-normal">{iconNames.map((n) => <option key={n}>{n}</option>)}</select></div>
      </div>
      <div><label className="block text-[11px] text-og-text-secondary mb-1 font-medium">Description</label><textarea value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} rows={2} className="w-full px-3 py-2 rounded-lg bg-og-surface-hover border border-og-border text-[13px] text-og-text outline-none resize-y font-normal" /></div>
      <div><label className="block text-[11px] text-og-text-secondary mb-1 font-medium">Detailed Content</label><textarea value={form.detailContent} onChange={(e) => setForm((p) => ({ ...p, detailContent: e.target.value }))} rows={3} className="w-full px-3 py-2 rounded-lg bg-og-surface-hover border border-og-border text-[13px] text-og-text outline-none resize-y font-normal" /></div>
      <div className="grid grid-cols-2 gap-3">
        <div><label className="block text-[11px] text-og-text-secondary mb-1 font-medium">CTA Button Text</label><input type="text" value={form.cta} onChange={(e) => setForm((p) => ({ ...p, cta: e.target.value }))} className="w-full h-9 px-3 rounded-lg bg-og-surface-hover border border-og-border text-[13px] text-og-text outline-none font-normal" /></div>
        <div><label className="block text-[11px] text-og-text-secondary mb-1 font-medium">Pricing</label><input type="text" value={form.pricing} onChange={(e) => setForm((p) => ({ ...p, pricing: e.target.value }))} placeholder="From EUR X,000" className="w-full h-9 px-3 rounded-lg bg-og-surface-hover border border-og-border text-[13px] text-og-text outline-none font-normal" /></div>
      </div>
      <div className="flex justify-end gap-2 pt-1">
        <button onClick={() => { setEditing(null); setShowNew(false); }} className="px-3 py-2 text-[12px] text-og-text-secondary cursor-pointer font-medium">Cancel</button>
        <button onClick={handleSave} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-og-accent text-white text-[12px] cursor-pointer font-semibold"><Check size={14} /> {editing ? "Save" : "Create"}</button>
      </div>
    </div>
  );

  return (
    <div className="max-w-[800px] mx-auto">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div><h1 className="text-[24px] text-og-text tracking-[-0.02em] font-bold">Services</h1><p className="text-[14px] text-og-text-secondary font-normal">Manage your service offerings.</p></div>
        <button onClick={() => { setShowNew(true); setEditing(null); setForm({ title: "", description: "", icon: "Code2", detailContent: "", cta: "Learn More", pricing: "" }); }} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-og-accent hover:bg-og-accent-hover text-white text-[13px] transition-colors font-semibold cursor-pointer"><Plus size={15} /> Add Service</button>
      </motion.div>

      <AnimatePresence>
        {showNew && !editing && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden mb-4">
            <div className="bg-og-surface rounded-xl p-5 border border-og-accent/30"><div className="text-[13px] text-og-text mb-3 font-semibold">New Service</div><FormFields /></div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-3">
        {loading ? (
          <div className="bg-og-surface rounded-xl p-12 border border-og-border text-center"><Loader2 size={24} className="animate-spin text-og-accent mx-auto" /></div>
        ) : services.length === 0 ? (
          <div className="bg-og-surface rounded-xl p-12 border border-og-border text-center"><Wrench size={36} className="text-og-text-secondary/20 mx-auto mb-3" /><div className="text-[14px] text-og-text-secondary font-medium">No services yet</div></div>
        ) : (
          services.map((svc) => {
            const Icon = iconMap[svc.icon] || Wrench;
            return (
              <motion.div key={svc.id || svc._id} layout className="bg-og-surface rounded-xl border border-og-border overflow-hidden">
                {editing === svc.id ? (<div className="p-5"><FormFields /></div>) : (
                  <div className="flex items-start gap-4 p-5">
                    <div className="w-10 h-10 rounded-lg bg-og-accent/10 flex items-center justify-center shrink-0"><Icon size={18} className="text-og-accent" /></div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[15px] text-og-text font-semibold">{svc.title}</span>
                        {svc.pricing && <span className="px-2 py-0.5 rounded-md bg-og-surface-hover text-[11px] text-og-text-secondary font-medium">{svc.pricing}</span>}
                      </div>
                      <p className="text-[13px] text-og-text-secondary mb-2 font-normal">{svc.description}</p>
                      <span className="text-[12px] text-og-accent font-medium">CTA: {svc.cta}</span>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button onClick={() => startEdit(svc)} className="p-1.5 rounded-lg hover:bg-og-surface-hover text-og-text-secondary transition-colors cursor-pointer"><Pencil size={14} /></button>
                      <button onClick={() => handleDelete(svc.id)} className="p-1.5 rounded-lg hover:bg-og-destructive/5 text-og-text-secondary hover:text-og-destructive transition-colors cursor-pointer"><Trash2 size={14} /></button>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
}
