"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Save, Eye, Tag, Calendar, Search as SearchIcon, X, Plus } from "lucide-react";
import { getBlog, saveBlog, slugify } from "@/lib/data/adminApi";

const categoryOptions = ["AI & Automation", "Software Development", "Case Study", "Business Intelligence", "E-Commerce", "Strategy", "Web Development", "General"];

export default function BlogEditorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const isNew = id === "new";
  const router = useRouter();

  const [form, setForm] = useState({
    title: "", slug: "", excerpt: "", category: "General", image: "",
    author: "Source Code", authorRole: "CTO, Sourcecode",
    date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    readTime: "5 min read", content: [""], status: "draft" as "draft" | "published",
    tags: [] as string[], seoTitle: "", seoDescription: "", metaKeywords: "", scheduledAt: "",
  });
  const [tagInput, setTagInput] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!isNew && id) {
      getBlog(id).then(post => {
        if (post) setForm({
          title: post.title || "",
          slug: post.slug || "",
          excerpt: post.excerpt || "",
          category: post.category || "General",
          image: post.image || "",
          author: post.author || "Source Code",
          authorRole: post.authorRole || "CTO, Sourcecode",
          date: post.date || "",
          readTime: post.readTime || "5 min read",
          content: post.content && post.content.length > 0 ? post.content : [""],
          status: post.status || "draft",
          tags: post.tags || [],
          seoTitle: post.seoTitle || "",
          seoDescription: post.seoDescription || "",
          metaKeywords: post.metaKeywords || "",
          scheduledAt: post.scheduledAt || "",
        });
      });
    }
  }, [id, isNew]);

  const updateField = (field: string, value: unknown) => {
    setForm((prev) => {
      const updated = { ...prev, [field]: value };
      if (field === "title" && (isNew || prev.slug === slugify(prev.title))) updated.slug = slugify(value as string);
      if (field === "title" && !prev.seoTitle) updated.seoTitle = value as string;
      return updated;
    });
  };

  const addTag = () => { const tag = tagInput.trim(); if (tag && !form.tags.includes(tag)) setForm((p) => ({ ...p, tags: [...p.tags, tag] })); setTagInput(""); };
  const removeTag = (tag: string) => setForm((p) => ({ ...p, tags: p.tags.filter((t) => t !== tag) }));
  const addParagraph = () => setForm((p) => ({ ...p, content: [...p.content, ""] }));
  const updateParagraph = (i: number, v: string) => setForm((p) => { const c = [...p.content]; c[i] = v; return { ...p, content: c }; });
  const removeParagraph = (i: number) => { if (form.content.length <= 1) return; setForm((p) => ({ ...p, content: p.content.filter((_, j) => j !== i) })); };

  const handleSave = async (status?: "draft" | "published") => {
    const data: any = {
      ...form,
      id: isNew ? undefined : id,
      status: status || form.status,
      content: form.content.filter((p) => p.trim()),
    };
    if (!data.excerpt && data.content && data.content.length > 0) data.excerpt = data.content[0].substring(0, 160) + "...";
    await saveBlog(data);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    router.push("/admin/blog");
  };

  return (
    <div className="max-w-[900px] mx-auto">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button onClick={() => router.push("/admin/blog")} className="p-2 rounded-lg hover:bg-og-surface text-og-text-secondary transition-colors cursor-pointer"><ArrowLeft size={18} /></button>
          <h1 className="text-[20px] text-og-text tracking-[-0.02em] font-bold">{isNew ? "New Blog Post" : "Edit Post"}</h1>
        </div>
        <div className="flex items-center gap-2">
          {!isNew && <a href={`/blog/${form.slug}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-og-surface border border-og-border text-[12px] text-og-text-secondary hover:text-og-text no-underline transition-colors font-medium cursor-pointer"><Eye size={14} /> Preview</a>}
          <button onClick={() => handleSave("draft")} className="px-3 py-2 rounded-lg bg-og-surface border border-og-border text-[12px] text-og-text-secondary hover:text-og-text transition-colors font-medium cursor-pointer">Save Draft</button>
          <button onClick={() => handleSave("published")} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-og-accent hover:bg-og-accent-hover text-white text-[12px] transition-colors font-semibold cursor-pointer"><Save size={14} /> Publish</button>
        </div>
      </motion.div>

      {saved && <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-4 px-4 py-2.5 rounded-lg bg-og-accent/10 text-og-accent text-[13px] font-medium">Post saved successfully!</motion.div>}

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-og-surface rounded-xl p-5 border border-og-border">
            <label className="block text-[12px] text-og-text-secondary mb-2 font-semibold">Title</label>
            <input type="text" value={form.title} onChange={(e) => updateField("title", e.target.value)} placeholder="Enter post title..." className="w-full text-[18px] text-og-text bg-transparent border-none outline-none placeholder:text-og-text-secondary/30 font-semibold" />
            <div className="mt-2 text-[11px] text-og-text-secondary/60">Slug: <span className="text-og-accent">/blog/{form.slug || "..."}</span></div>
          </div>

          <div className="bg-og-surface rounded-xl p-5 border border-og-border">
            <label className="block text-[12px] text-og-text-secondary mb-2 font-semibold">Excerpt</label>
            <textarea value={form.excerpt} onChange={(e) => updateField("excerpt", e.target.value)} placeholder="Brief summary..." rows={2} className="w-full text-[14px] text-og-text bg-transparent border-none outline-none resize-none placeholder:text-og-text-secondary/30 font-normal" />
          </div>

          <div className="bg-og-surface rounded-xl p-5 border border-og-border">
            <label className="block text-[12px] text-og-text-secondary mb-3 font-semibold">Content Paragraphs</label>
            <div className="space-y-3">
              {form.content.map((para, i) => (
                <div key={i} className="relative group">
                  <textarea value={para} onChange={(e) => updateParagraph(i, e.target.value)} placeholder={`Paragraph ${i + 1}...`} rows={4} className="w-full text-[14px] text-og-text bg-og-surface-hover rounded-lg p-3 border-none outline-none resize-y placeholder:text-og-text-secondary/30 font-normal" />
                  {form.content.length > 1 && <button onClick={() => removeParagraph(i)} className="absolute top-2 right-2 p-1 rounded bg-og-surface/80 text-og-text-secondary hover:text-og-destructive opacity-0 group-hover:opacity-100 transition-all cursor-pointer"><X size={12} /></button>}
                </div>
              ))}
            </div>
            <button onClick={addParagraph} className="mt-3 flex items-center gap-1.5 text-[12px] text-og-accent hover:text-og-accent-hover transition-colors font-medium cursor-pointer"><Plus size={14} /> Add paragraph</button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-og-surface rounded-xl p-5 border border-og-border">
            <label className="block text-[12px] text-og-text-secondary mb-2 font-semibold">Featured Image URL</label>
            <input type="text" value={form.image} onChange={(e) => updateField("image", e.target.value)} placeholder="https://..." className="w-full h-9 px-3 rounded-lg bg-og-surface-hover border border-og-border text-[12px] text-og-text outline-none font-normal" />
            {form.image && <img src={form.image} alt="Preview" className="mt-3 w-full aspect-[16/10] object-cover rounded-lg" />}
          </div>

          <div className="bg-og-surface rounded-xl p-5 border border-og-border space-y-3">
            <div>
              <label className="block text-[12px] text-og-text-secondary mb-1.5 font-semibold">Category</label>
              <select value={form.category} onChange={(e) => updateField("category", e.target.value)} className="w-full h-9 px-3 rounded-lg bg-og-surface-hover border border-og-border text-[12px] text-og-text outline-none font-normal">{categoryOptions.map((c) => <option key={c}>{c}</option>)}</select>
            </div>
            <div>
              <label className="block text-[12px] text-og-text-secondary mb-1.5 font-semibold">Author</label>
              <input type="text" value={form.author} onChange={(e) => updateField("author", e.target.value)} className="w-full h-9 px-3 rounded-lg bg-og-surface-hover border border-og-border text-[12px] text-og-text outline-none font-normal" />
            </div>
            <div>
              <label className="block text-[12px] text-og-text-secondary mb-1.5 font-semibold">Read Time</label>
              <input type="text" value={form.readTime} onChange={(e) => updateField("readTime", e.target.value)} className="w-full h-9 px-3 rounded-lg bg-og-surface-hover border border-og-border text-[12px] text-og-text outline-none font-normal" />
            </div>
          </div>

          <div className="bg-og-surface rounded-xl p-5 border border-og-border">
            <label className="block text-[12px] text-og-text-secondary mb-2 font-semibold">Tags</label>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {form.tags.map((tag) => (
                <span key={tag} className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-og-accent/10 text-og-accent text-[11px] font-medium">
                  <Tag size={10} />{tag}<button onClick={() => removeTag(tag)} className="hover:text-og-destructive cursor-pointer"><X size={10} /></button>
                </span>
              ))}
            </div>
            <div className="flex gap-1">
              <input type="text" value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())} placeholder="Add tag..." className="flex-1 h-8 px-3 rounded-lg bg-og-surface-hover border border-og-border text-[11px] text-og-text outline-none font-normal" />
              <button onClick={addTag} className="px-2 h-8 rounded-lg bg-og-surface-hover border border-og-border text-og-text-secondary hover:text-og-accent transition-colors cursor-pointer"><Plus size={14} /></button>
            </div>
          </div>

          <div className="bg-og-surface rounded-xl p-5 border border-og-border space-y-3">
            <div className="flex items-center gap-2 mb-1"><SearchIcon size={13} className="text-og-text-secondary" /><span className="text-[12px] text-og-text-secondary font-semibold">SEO Settings</span></div>
            <div><label className="block text-[11px] text-og-text-secondary mb-1 font-medium">SEO Title</label><input type="text" value={form.seoTitle} onChange={(e) => updateField("seoTitle", e.target.value)} className="w-full h-8 px-3 rounded-lg bg-og-surface-hover border border-og-border text-[11px] text-og-text outline-none font-normal" /></div>
            <div><label className="block text-[11px] text-og-text-secondary mb-1 font-medium">SEO Description</label><textarea value={form.seoDescription} onChange={(e) => updateField("seoDescription", e.target.value)} rows={2} className="w-full px-3 py-2 rounded-lg bg-og-surface-hover border border-og-border text-[11px] text-og-text outline-none resize-none font-normal" /></div>
            <div><label className="block text-[11px] text-og-text-secondary mb-1 font-medium">Meta Keywords</label><input type="text" value={form.metaKeywords} onChange={(e) => updateField("metaKeywords", e.target.value)} placeholder="keyword1, keyword2" className="w-full h-8 px-3 rounded-lg bg-og-surface-hover border border-og-border text-[11px] text-og-text outline-none font-normal" /></div>
          </div>

          <div className="bg-og-surface rounded-xl p-5 border border-og-border">
            <div className="flex items-center gap-2 mb-2"><Calendar size={13} className="text-og-text-secondary" /><span className="text-[12px] text-og-text-secondary font-semibold">Schedule Publish</span></div>
            <input type="datetime-local" value={form.scheduledAt} onChange={(e) => updateField("scheduledAt", e.target.value)} className="w-full h-9 px-3 rounded-lg bg-og-surface-hover border border-og-border text-[12px] text-og-text outline-none font-normal" />
          </div>
        </div>
      </div>
    </div>
  );
}
