"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Plus,
  Search,
  MoreHorizontal,
  Pencil,
  Copy,
  Trash2,
  Eye,
  FileText,
  CheckCircle2,
  Clock,
  Loader2,
} from "lucide-react";
import {
  getBlogs,
  deleteBlog,
  duplicateBlog,
  saveBlog,
} from "@/lib/data/adminApi";

export default function BlogManagerPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "published" | "draft">("all");
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const reload = () => {
    getBlogs()
      .then((data) => { setBlogs(data); setLoading(false); })
      .catch((err) => { console.error("Load blogs error:", err); setLoading(false); });
  };
  useEffect(() => { reload(); }, []);

  const filtered = blogs.filter((b) => {
    const title = b.title || "";
    const matchesSearch = title.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || b.status === filter;
    return matchesSearch && matchesFilter;
  });

  const handleDelete = (id: string) => {
    if (confirm("Delete this blog post?")) {
      deleteBlog(id).then(reload);
    }
  };

  const handleDuplicate = (id: string) => {
    duplicateBlog(id).then(reload);
    setMenuOpen(null);
  };

  const handleToggleStatus = (post: any) => {
    saveBlog({ ...post, status: post.status === "published" ? "draft" : "published" }).then(reload);
    setMenuOpen(null);
  };

  return (
    <div className="max-w-[1200px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6"
      >
        <div>
          <h1 className="text-[24px] text-og-text tracking-[-0.02em] font-bold">
            Blog Posts
          </h1>
          <p className="text-[14px] text-og-text-secondary font-normal">
            Manage articles and insights.
          </p>
        </div>
        <Link
          href="/admin/blog/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-og-accent hover:bg-og-accent-hover text-white text-[13px] no-underline transition-colors font-semibold"
        >
          <Plus size={15} /> New Post
        </Link>
      </motion.div>

      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-og-text-secondary/50" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search posts..."
            className="w-full h-10 pl-10 pr-4 rounded-lg bg-og-surface border border-og-border text-[13px] text-og-text placeholder:text-og-text-secondary/50 outline-none focus:border-og-accent/30 font-normal"
          />
        </div>
        <div className="flex gap-1 bg-og-surface rounded-lg border border-og-border p-1">
          {(["all", "published", "draft"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-md text-[12px] transition-all cursor-pointer font-medium ${
                filter === f ? "bg-og-text text-og-bg" : "text-og-text-secondary hover:text-og-text"
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-og-surface rounded-xl border border-og-border">
        {loading ? (
          <div className="p-12 text-center">
            <Loader2 size={24} className="animate-spin text-og-accent mx-auto" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center">
            <FileText size={36} className="text-og-text-secondary/20 mx-auto mb-3" />
            <div className="text-[14px] text-og-text-secondary font-medium">No posts found</div>
          </div>
        ) : (
          <div className="overflow-x-auto md:overflow-x-visible">
            <table className="w-full">
              <thead>
                <tr className="border-b border-og-border">
                  <th className="text-left px-5 py-3 text-[11px] text-og-text-secondary uppercase tracking-wider font-semibold">Title</th>
                  <th className="text-left px-5 py-3 text-[11px] text-og-text-secondary uppercase tracking-wider hidden md:table-cell font-semibold">Category</th>
                  <th className="text-left px-5 py-3 text-[11px] text-og-text-secondary uppercase tracking-wider hidden lg:table-cell font-semibold">Author</th>
                  <th className="text-left px-5 py-3 text-[11px] text-og-text-secondary uppercase tracking-wider font-semibold">Status</th>
                  <th className="text-right px-5 py-3 text-[11px] text-og-text-secondary uppercase tracking-wider font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-og-border">
                {filtered.map((post) => (
                  <tr key={post.id || post._id} className="hover:bg-og-surface-hover/50 transition-colors">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        {post.image && (
                          <img src={post.image} alt="" className="w-10 h-10 rounded-lg object-cover shrink-0 hidden sm:block" />
                        )}
                        <div className="min-w-0">
                          <div className="text-[13px] text-og-text truncate max-w-[300px] font-semibold">{post.title}</div>
                          <div className="text-[11px] text-og-text-secondary truncate font-normal">/{post.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3 hidden md:table-cell">
                      <span className="inline-block px-2 py-1 rounded-md bg-og-surface-hover text-[11px] text-og-text-secondary font-medium">{post.category}</span>
                    </td>
                    <td className="px-5 py-3 hidden lg:table-cell">
                      <span className="text-[13px] text-og-text-secondary font-normal">{post.author}</span>
                    </td>
                    <td className="px-5 py-3">
                      <button
                        onClick={() => handleToggleStatus(post)}
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] transition-colors cursor-pointer font-semibold ${
                          post.status === "published"
                            ? "bg-og-success/10 text-og-success"
                            : "bg-og-warning/10 text-og-warning"
                        }`}
                      >
                        {post.status === "published" ? <CheckCircle2 size={11} /> : <Clock size={11} />}
                        {post.status}
                      </button>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <div className="relative inline-block text-left">
                        <button
                          onClick={() => setMenuOpen(menuOpen === post.id ? null : post.id)}
                          className="p-1.5 rounded-lg hover:bg-og-surface-hover text-og-text-secondary transition-colors cursor-pointer"
                        >
                          <MoreHorizontal size={16} />
                        </button>
                        {menuOpen === post.id && (
                          <div className="absolute right-0 top-full mt-1 w-40 bg-og-surface rounded-lg border border-og-border shadow-lg z-20 py-1">
                            <button
                              onClick={() => { router.push(`/admin/blog/${post.id}`); setMenuOpen(null); }}
                              className="flex items-center gap-2 w-full px-3 py-2 text-[12px] text-og-text hover:bg-og-surface-hover text-left cursor-pointer font-medium"
                            >
                              <Pencil size={13} /> Edit
                            </button>
                            <a
                              href={`/blog/${post.slug}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => setMenuOpen(null)}
                              className="flex items-center gap-2 w-full px-3 py-2 text-[12px] text-og-text hover:bg-og-surface-hover text-left no-underline cursor-pointer font-medium"
                            >
                              <Eye size={13} /> Preview
                            </a>
                            <button
                              onClick={() => handleDuplicate(post.id)}
                              className="flex items-center gap-2 w-full px-3 py-2 text-[12px] text-og-text hover:bg-og-surface-hover text-left cursor-pointer font-medium"
                            >
                              <Copy size={13} /> Duplicate
                            </button>
                            <div className="h-px bg-og-border my-1" />
                            <button
                              onClick={() => { handleDelete(post.id); setMenuOpen(null); }}
                              className="flex items-center gap-2 w-full px-3 py-2 text-[12px] text-og-destructive hover:bg-og-destructive/5 text-left cursor-pointer font-medium"
                            >
                              <Trash2 size={13} /> Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
