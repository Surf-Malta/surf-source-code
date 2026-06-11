"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, Search, Grid3X3, List, ExternalLink, Trash2, Plus, X, Loader2, Image as ImageIcon } from "lucide-react";
import { getMedia, addMedia, deleteMedia } from "@/lib/data/adminApi";

export default function MediaLibraryPage() {
  const [media, setMedia] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [copied, setCopied] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [addForm, setAddForm] = useState({ url: "", name: "" });

  const reload = () => {
    getMedia()
      .then((data) => { setMedia(data); setLoading(false); })
      .catch((err) => { console.error("Load media error:", err); setLoading(false); });
  };
  useEffect(() => { reload(); }, []);

  const filtered = media.filter((m) => {
    const name = m.name || "";
    return name.toLowerCase().includes(search.toLowerCase());
  });

  const copyUrl = (url: string, id: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopied(id);
      setTimeout(() => setCopied(null), 1500);
    }
  };

  const handleAdd = async () => {
    if (!addForm.url.trim()) return;
    await addMedia({ url: addForm.url, name: addForm.name || "untitled.jpg" });
    setAddForm({ url: "", name: "" });
    setShowAdd(false);
    reload();
  };

  const handleDelete = (id: string) => {
    if (confirm("Remove this media item?")) {
      deleteMedia(id).then(reload);
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-[24px] text-og-text tracking-[-0.02em] font-bold">Media Library</h1>
          <p className="text-[14px] text-og-text-secondary font-normal">{media.length} files. Click to copy URL.</p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-og-accent hover:bg-og-accent-hover text-white text-[13px] transition-colors font-semibold cursor-pointer"
        >
          <Plus size={15} /> Add Media URL
        </button>
      </motion.div>

      <AnimatePresence>
        {showAdd && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden mb-4">
            <div className="bg-og-surface rounded-xl p-5 border border-og-accent/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-og-text font-semibold">Add Media by URL</span>
                <button onClick={() => setShowAdd(false)} className="text-og-text-secondary hover:text-og-text cursor-pointer"><X size={16} /></button>
              </div>
              <input type="text" value={addForm.url} onChange={(e) => setAddForm((p) => ({ ...p, url: e.target.value }))} placeholder="Image URL (https://...)" className="w-full h-10 px-3 rounded-lg bg-og-surface-hover border border-og-border text-[13px] text-og-text outline-none focus:border-og-accent/30 font-normal" />
              <input type="text" value={addForm.name} onChange={(e) => setAddForm((p) => ({ ...p, name: e.target.value }))} placeholder="File name (e.g. hero-image.jpg)" className="w-full h-10 px-3 rounded-lg bg-og-surface-hover border border-og-border text-[13px] text-og-text outline-none focus:border-og-accent/30 font-normal" />
              <div className="flex justify-end">
                <button onClick={handleAdd} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-og-accent hover:bg-og-accent-hover text-white text-[12px] font-semibold cursor-pointer"><Check size={14} /> Add</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-og-text-secondary/50" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search media..." className="w-full h-10 pl-10 pr-4 rounded-lg bg-og-surface border border-og-border text-[13px] text-og-text placeholder:text-og-text-secondary/50 outline-none focus:border-og-accent/30 font-normal" />
        </div>
        <div className="flex gap-1 bg-og-surface rounded-lg border border-og-border p-1">
          <button onClick={() => setView("grid")} className={`p-2 rounded-md transition-all cursor-pointer ${view === "grid" ? "bg-og-text text-og-bg" : "text-og-text-secondary"}`}><Grid3X3 size={14} /></button>
          <button onClick={() => setView("list")} className={`p-2 rounded-md transition-all cursor-pointer ${view === "list" ? "bg-og-text text-og-bg" : "text-og-text-secondary"}`}><List size={14} /></button>
        </div>
      </div>

      {loading ? (
        <div className="bg-og-surface rounded-xl p-12 border border-og-border text-center">
          <Loader2 size={24} className="animate-spin text-og-accent mx-auto" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-og-surface rounded-xl p-12 border border-og-border text-center">
          <ImageIcon size={36} className="text-og-text-secondary/20 mx-auto mb-3" />
          <div className="text-[14px] text-og-text-secondary font-medium">No media found</div>
        </div>
      ) : view === "grid" ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((item) => (
            <motion.div key={item.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="group relative bg-og-surface rounded-xl border border-og-border overflow-hidden cursor-pointer hover:shadow-md transition-all" onClick={() => copyUrl(item.url, item.id)}>
              <div className="aspect-square"><img src={item.url} alt={item.name} className="w-full h-full object-cover" /></div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                  {copied === item.id ? (
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-og-success text-[12px] font-semibold"><Check size={14} /> Copied!</div>
                  ) : (
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-[#1C1915] text-[12px] font-medium"><Copy size={14} /> Copy URL</div>
                  )}
                </div>
              </div>
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={(e) => { e.stopPropagation(); handleDelete(item.id); }}
                  className="p-1.5 rounded-lg bg-white/90 text-og-text-secondary hover:text-og-destructive transition-colors cursor-pointer"
                >
                  <Trash2 size={12} />
                </button>
              </div>
              <div className="px-3 py-2">
                <div className="text-[12px] text-og-text truncate font-medium">{item.name}</div>
                <div className="text-[10px] text-og-text-secondary font-normal">{item.size}</div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="bg-og-surface rounded-xl border border-og-border overflow-hidden">
          <div className="divide-y divide-og-border">
            {filtered.map((item) => (
              <div key={item.id} className="flex items-center gap-4 px-5 py-3 hover:bg-og-surface-hover/50 transition-colors">
                <img src={item.url} alt={item.name} className="w-12 h-12 rounded-lg object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] text-og-text font-medium">{item.name}</div>
                  <div className="text-[11px] text-og-text-secondary font-normal">{item.size} &middot; {item.type}</div>
                </div>
                <button onClick={() => copyUrl(item.url, item.id)} className="p-2 rounded-lg hover:bg-og-surface-hover text-og-text-secondary transition-colors cursor-pointer">{copied === item.id ? <Check size={14} className="text-og-success" /> : <Copy size={14} />}</button>
                <a href={item.url} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg hover:bg-og-surface-hover text-og-text-secondary transition-colors"><ExternalLink size={14} /></a>
                <button onClick={() => handleDelete(item.id)} className="p-2 rounded-lg hover:bg-og-destructive/5 text-og-text-secondary hover:text-og-destructive transition-colors cursor-pointer"><Trash2 size={14} /></button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
