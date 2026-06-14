"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Plus, Search, MoreHorizontal, Pencil, Copy, Trash2, Eye, Briefcase, CheckCircle2, Clock, Star, GripVertical, Loader2 } from "lucide-react";
import { getPortfolio, deletePortfolioItem, duplicatePortfolioItem, savePortfolioItem, reorderPortfolio } from "@/lib/data/adminApi";

export default function PortfolioManagerPage() {
  const [items, setItems] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "published" | "draft">("all");
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const reload = () => {
    getPortfolio()
      .then((data) => { setItems(data.sort((a: any, b: any) => a.order - b.order)); setLoading(false); })
      .catch((err) => { console.error("Load portfolio error:", err); setLoading(false); });
  };
  useEffect(() => { reload(); }, []);

  const filtered = items.filter((item) => {
    const title = item.title || "";
    const matchesSearch = title.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || item.status === filter;
    return matchesSearch && matchesFilter;
  });

  const handleDelete = (id: string) => { if (confirm("Delete this portfolio item?")) { deletePortfolioItem(id).then(reload); } };
  const handleDuplicate = (id: string) => { duplicatePortfolioItem(id).then(reload); setMenuOpen(null); };
  const handleToggleStatus = (item: any) => { savePortfolioItem({ ...item, status: item.status === "published" ? "draft" : "published" }).then(reload); setMenuOpen(null); };
  const handleToggleFeatured = (item: any) => { savePortfolioItem({ ...item, featured: !item.featured }).then(reload); setMenuOpen(null); };
  const handleDragStart = (index: number) => setDragIndex(index);
  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (dragIndex === null || dragIndex === index) return;
    const n = [...filtered];
    const [m] = n.splice(dragIndex, 1);
    n.splice(index, 0, m);
    // Update local order numbers
    const reordered = n.map((item, idx) => ({ ...item, order: idx }));
    reorderPortfolio(reordered);
    setItems(reordered);
    setDragIndex(index);
  };

  return (
    <div className="max-w-[1200px] mx-auto">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-[24px] text-og-text tracking-[-0.02em] font-bold">Portfolio</h1>
          <p className="text-[14px] text-og-text-secondary font-normal">Manage case studies and projects.</p>
        </div>
        <Link href="/admin/portfolio/new" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-og-accent hover:bg-og-accent-hover text-white text-[13px] no-underline transition-colors font-semibold"><Plus size={15} /> New Project</Link>
      </motion.div>

      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-og-text-secondary/50" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search projects..." className="w-full h-10 pl-10 pr-4 rounded-lg bg-og-surface border border-og-border text-[13px] text-og-text placeholder:text-og-text-secondary/50 outline-none focus:border-og-accent/30 font-normal" />
        </div>
        <div className="flex gap-1 bg-og-surface rounded-lg border border-og-border p-1">
          {(["all", "published", "draft"] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 rounded-md text-[12px] transition-all cursor-pointer font-medium ${filter === f ? "bg-og-text text-og-bg" : "text-og-text-secondary hover:text-og-text"}`}>{f.charAt(0).toUpperCase() + f.slice(1)}</button>
          ))}
        </div>
      </div>

      <div className="bg-og-surface rounded-xl border border-og-border">
        {loading ? (
          <div className="p-12 text-center"><Loader2 size={24} className="animate-spin text-og-accent mx-auto" /></div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center"><Briefcase size={36} className="text-og-text-secondary/20 mx-auto mb-3" /><div className="text-[14px] text-og-text-secondary font-medium">No projects found</div></div>
        ) : (
          <div className="divide-y divide-og-border">
            {filtered.map((item, index) => (
              <div key={item.id || item._id} draggable onDragStart={() => handleDragStart(index)} onDragOver={(e) => handleDragOver(e, index)} onDragEnd={() => setDragIndex(null)} className={`flex items-center gap-4 px-5 py-4 hover:bg-og-surface-hover/50 transition-colors ${dragIndex === index ? "opacity-50" : ""}`}>
                <GripVertical size={16} className="text-og-text-secondary/30 cursor-grab shrink-0" />
                {item.image && <img src={item.image} alt="" className="w-14 h-10 rounded-lg object-cover shrink-0 hidden sm:block" />}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] text-og-text truncate font-semibold">{item.title}</span>
                    {item.featured && <Star size={12} className="text-og-accent shrink-0 fill-current" />}
                  </div>
                  <div className="text-[12px] text-og-text-secondary font-normal">{item.client} &middot; {item.industry}</div>
                </div>
                <span className={`hidden md:inline-block px-2 py-1 rounded-md text-[11px] font-semibold ${item.status === "published" ? "bg-og-success/10 text-og-success" : "bg-og-warning/10 text-og-warning"}`}>{item.status}</span>
                <div className="relative">
                  <button onClick={() => setMenuOpen(menuOpen === item.id ? null : item.id)} className="p-1.5 rounded-lg hover:bg-og-surface-hover text-og-text-secondary transition-colors cursor-pointer"><MoreHorizontal size={16} /></button>
                  {menuOpen === item.id && (
                    <div className="absolute right-0 top-full mt-1 w-44 bg-og-surface rounded-lg border border-og-border shadow-lg z-20 py-1">
                      <button onClick={() => { router.push(`/admin/portfolio/${item.id}`); setMenuOpen(null); }} className="flex items-center gap-2 w-full px-3 py-2 text-[12px] text-og-text hover:bg-og-surface-hover text-left cursor-pointer font-medium"><Pencil size={13} /> Edit</button>
                      <a href={`/portfolio/${item.slug}`} target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(null)} className="flex items-center gap-2 w-full px-3 py-2 text-[12px] text-og-text hover:bg-og-surface-hover text-left no-underline cursor-pointer font-medium"><Eye size={13} /> Preview</a>
                      <button onClick={() => handleToggleStatus(item)} className="flex items-center gap-2 w-full px-3 py-2 text-[12px] text-og-text hover:bg-og-surface-hover text-left cursor-pointer font-medium">{item.status === "published" ? <Clock size={13} /> : <CheckCircle2 size={13} />}{item.status === "published" ? "Unpublish" : "Publish"}</button>
                      <button onClick={() => handleToggleFeatured(item)} className="flex items-center gap-2 w-full px-3 py-2 text-[12px] text-og-text hover:bg-og-surface-hover text-left cursor-pointer font-medium"><Star size={13} /> {item.featured ? "Unfeature" : "Feature"}</button>
                      <button onClick={() => handleDuplicate(item.id)} className="flex items-center gap-2 w-full px-3 py-2 text-[12px] text-og-text hover:bg-og-surface-hover text-left cursor-pointer font-medium"><Copy size={13} /> Duplicate</button>
                      <div className="h-px bg-og-border my-1" />
                      <button onClick={() => { handleDelete(item.id); setMenuOpen(null); }} className="flex items-center gap-2 w-full px-3 py-2 text-[12px] text-og-destructive hover:bg-og-destructive/5 text-left cursor-pointer font-medium"><Trash2 size={13} /> Delete</button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
