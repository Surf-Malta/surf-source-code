"use client";

import { getFAQs, saveFAQ, deleteFAQ, reorderFAQs } from "@/lib/data/adminApi";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, GripVertical, Pencil, Trash2, X, Check, ToggleLeft, ToggleRight, HelpCircle, Loader2 } from "lucide-react";

const faqCategories = ["General", "Getting Started", "Technical", "AI & Automation", "Pricing"];

export default function FAQManagerPage() {
  const [faqs, setFaqs] = useState<any[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ question: "", answer: "", category: "General" });
  const [showNew, setShowNew] = useState(false);
  const [newForm, setNewForm] = useState({ question: "", answer: "", category: "General" });
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const reload = () => {
    getFAQs()
      .then((items) => { setFaqs(items.sort((a: any, b: any) => a.order - b.order)); setLoading(false); })
      .catch((err) => { console.error("Load FAQs error:", err); setLoading(false); });
  };
  useEffect(() => { reload(); }, []);

  const handleToggle = (faq: any) => { saveFAQ({ ...faq, active: !faq.active }).then(reload); };
  const handleDelete = (id: string) => { if (confirm("Delete this FAQ?")) { deleteFAQ(id).then(reload); } };
  const handleEdit = (faq: any) => { setEditing(faq.id); setEditForm({ question: faq.question, answer: faq.answer, category: faq.category }); };
  const handleSaveEdit = () => { if (!editing) return; const faq = faqs.find((f) => f.id === editing); if (faq) { saveFAQ({ ...faq, ...editForm }).then(reload); } setEditing(null); };
  const handleCreate = () => { if (!newForm.question.trim()) return; saveFAQ(newForm).then(reload); setNewForm({ question: "", answer: "", category: "General" }); setShowNew(false); };
  const handleDragStart = (index: number) => setDragIndex(index);
  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (dragIndex === null || dragIndex === index) return;
    const n = [...faqs];
    const [m] = n.splice(dragIndex, 1);
    n.splice(index, 0, m);
    // Update local order numbers
    const reordered = n.map((item, idx) => ({ ...item, order: idx }));
    reorderFAQs(reordered);
    setFaqs(reordered);
    setDragIndex(index);
  };

  const active = faqs.filter((f) => f.active).length;

  return (
    <div className="max-w-[800px] mx-auto">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-[24px] text-og-text tracking-[-0.02em] font-bold">FAQ Manager</h1>
          <p className="text-[14px] text-og-text-secondary font-normal">{faqs.length} questions &middot; {active} active. Drag to reorder.</p>
        </div>
        <button onClick={() => setShowNew(true)} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-og-accent hover:bg-og-accent-hover text-white text-[13px] transition-colors font-semibold cursor-pointer"><Plus size={15} /> Add FAQ</button>
      </motion.div>

      <AnimatePresence>
        {showNew && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden mb-4">
            <div className="bg-og-surface rounded-xl p-5 border border-og-accent/30 space-y-3">
              <div className="flex items-center justify-between"><span className="text-[13px] text-og-text font-semibold">New FAQ</span><button onClick={() => setShowNew(false)} className="text-og-text-secondary hover:text-og-text cursor-pointer"><X size={16} /></button></div>
              <input type="text" value={newForm.question} onChange={(e) => setNewForm((p) => ({ ...p, question: e.target.value }))} placeholder="Question..." className="w-full h-10 px-3 rounded-lg bg-og-surface-hover border border-og-border text-[14px] text-og-text outline-none focus:border-og-accent/30 font-medium" />
              <textarea value={newForm.answer} onChange={(e) => setNewForm((p) => ({ ...p, answer: e.target.value }))} placeholder="Answer..." rows={3} className="w-full px-3 py-2 rounded-lg bg-og-surface-hover border border-og-border text-[13px] text-og-text outline-none resize-y font-normal" />
              <div className="flex items-center gap-3">
                <select value={newForm.category} onChange={(e) => setNewForm((p) => ({ ...p, category: e.target.value }))} className="h-9 px-3 rounded-lg bg-og-surface-hover border border-og-border text-[12px] text-og-text outline-none font-normal">{faqCategories.map((c) => <option key={c}>{c}</option>)}</select>
                <div className="flex-1" />
                <button onClick={handleCreate} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-og-accent hover:bg-og-accent-hover text-white text-[12px] cursor-pointer font-semibold"><Check size={14} /> Create</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-2">
        {loading ? (
          <div className="bg-og-surface rounded-xl p-12 border border-og-border text-center"><Loader2 size={24} className="animate-spin text-og-accent mx-auto" /></div>
        ) : faqs.length === 0 ? (
          <div className="bg-og-surface rounded-xl p-12 border border-og-border text-center"><HelpCircle size={36} className="text-og-text-secondary/20 mx-auto mb-3" /><div className="text-[14px] text-og-text-secondary font-medium">No FAQs yet</div></div>
        ) : (
          faqs.map((faq, index) => (
            <motion.div key={faq.id || faq._id} layout draggable onDragStart={() => handleDragStart(index)} onDragOver={(e) => handleDragOver(e, index)} onDragEnd={() => setDragIndex(null)} className={`bg-og-surface rounded-xl border border-og-border overflow-hidden transition-all ${dragIndex === index ? "opacity-50" : ""} ${!faq.active ? "opacity-60" : ""}`}>
              {editing === faq.id ? (
                <div className="p-5 space-y-3">
                  <input type="text" value={editForm.question} onChange={(e) => setEditForm((p) => ({ ...p, question: e.target.value }))} className="w-full h-10 px-3 rounded-lg bg-og-surface-hover border border-og-border text-[14px] text-og-text outline-none font-medium" />
                  <textarea value={editForm.answer} onChange={(e) => setEditForm((p) => ({ ...p, answer: e.target.value }))} rows={3} className="w-full px-3 py-2 rounded-lg bg-og-surface-hover border border-og-border text-[13px] outline-none resize-y font-normal" />
                  <div className="flex items-center gap-3">
                    <select value={editForm.category} onChange={(e) => setEditForm((p) => ({ ...p, category: e.target.value }))} className="h-9 px-3 rounded-lg bg-og-surface-hover border border-og-border text-[12px] outline-none font-normal">{faqCategories.map((c) => <option key={c}>{c}</option>)}</select>
                    <div className="flex-1" />
                    <button onClick={() => setEditing(null)} className="px-3 py-2 text-[12px] text-og-text-secondary cursor-pointer font-medium">Cancel</button>
                    <button onClick={handleSaveEdit} className="px-4 py-2 rounded-lg bg-og-accent text-white text-[12px] cursor-pointer font-semibold">Save</button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-3 p-4">
                  <GripVertical size={16} className="text-og-text-secondary/30 cursor-grab mt-0.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-[14px] text-og-text mb-1 font-semibold">{faq.question}</div>
                    <div className="text-[13px] text-og-text-secondary line-clamp-2 font-normal">{faq.answer}</div>
                    <span className="inline-block mt-2 px-2 py-0.5 rounded-md bg-og-surface-hover text-[10px] text-og-text-secondary font-medium">{faq.category}</span>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button onClick={() => handleToggle(faq)} className="p-1.5 rounded-lg hover:bg-og-surface-hover transition-colors cursor-pointer" title={faq.active ? "Deactivate" : "Activate"}>
                      {faq.active ? <ToggleRight size={18} className="text-og-accent" /> : <ToggleLeft size={18} className="text-og-text-secondary/40" />}
                    </button>
                    <button onClick={() => handleEdit(faq)} className="p-1.5 rounded-lg hover:bg-og-surface-hover text-og-text-secondary transition-colors cursor-pointer"><Pencil size={14} /></button>
                    <button onClick={() => handleDelete(faq.id)} className="p-1.5 rounded-lg hover:bg-og-destructive/5 text-og-text-secondary hover:text-og-destructive transition-colors cursor-pointer"><Trash2 size={14} /></button>
                  </div>
                </div>
              )}
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
