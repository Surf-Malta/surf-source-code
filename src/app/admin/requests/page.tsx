"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Mail, Eye, Trash2, Calendar, Loader2, X, ExternalLink, MessageSquare, Building2, TrendingUp, Globe } from "lucide-react";
import { getRequests, deleteRequest } from "@/lib/data/adminApi";

function timeAgo(ts: string): string {
  const diff = Date.now() - new Date(ts).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

export default function RequestsManagerPage() {
  const [requests, setRequests] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const reload = () => {
    getRequests()
      .then((data) => {
        setRequests(data);
        if (data.length > 0 && !selectedId) {
          setSelectedId(data[0].id || data[0]._id);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Load requests error:", err);
        setLoading(false);
      });
  };

  useEffect(() => { reload(); }, []);

  const handleDelete = (id: string) => {
    if (confirm("Archive/Delete this project request?")) {
      deleteRequest(id).then(() => {
        if (selectedId === id) {
          setSelectedId(null);
        }
        reload();
      });
    }
  };

  const filtered = requests.filter((r) => {
    const term = search.toLowerCase();
    const name = r.companyName || "";
    const email = r.email || "";
    const msg = r.message || "";
    const svc = r.service || "";
    return name.toLowerCase().includes(term) ||
           email.toLowerCase().includes(term) ||
           msg.toLowerCase().includes(term) ||
           svc.toLowerCase().includes(term);
  });

  const selected = requests.find((r) => (r.id || r._id) === selectedId);

  return (
    <div className="max-w-[1200px] mx-auto h-[calc(100vh-120px)] flex flex-col">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 shrink-0">
        <h1 className="text-[24px] text-og-text tracking-[-0.02em] font-bold">Project Requests</h1>
        <p className="text-[14px] text-og-text-secondary font-normal">Manage client consultation requests and onboarding leads.</p>
      </motion.div>

      {/* Main Container */}
      <div className="flex-1 flex gap-6 min-h-0">
        {/* Left Side: Inbox List */}
        <div className="w-full lg:w-[400px] flex flex-col gap-3 min-h-0 shrink-0">
          <div className="relative shrink-0">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-og-text-secondary/50" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search leads..."
              className="w-full h-10 pl-10 pr-4 rounded-lg bg-og-surface border border-og-border text-[13px] text-og-text placeholder:text-og-text-secondary/50 outline-none focus:border-og-accent/30 font-normal"
            />
          </div>

          <div className="flex-1 bg-og-surface rounded-xl border border-og-border overflow-y-auto divide-y divide-og-border">
            {loading ? (
              <div className="p-12 text-center"><Loader2 size={24} className="animate-spin text-og-accent mx-auto" /></div>
            ) : filtered.length === 0 ? (
              <div className="p-12 text-center">
                <Mail size={36} className="text-og-text-secondary/20 mx-auto mb-3" />
                <div className="text-[14px] text-og-text-secondary font-medium">No inquiries found</div>
              </div>
            ) : (
              filtered.map((item) => {
                const itemId = item.id || item._id;
                return (
                  <div
                    key={itemId}
                    onClick={() => setSelectedId(itemId)}
                    className={`p-4 cursor-pointer transition-colors relative flex flex-col gap-1.5 hover:bg-og-surface-hover/30 ${
                      selectedId === itemId ? "bg-og-accent/5 hover:bg-og-accent/5" : ""
                    }`}
                  >
                    {selectedId === itemId && <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-og-accent" />}
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-[13px] text-og-text truncate font-bold">{item.companyName}</span>
                      <span className="text-[10px] text-og-text-secondary/60 font-normal shrink-0 flex items-center gap-1">
                        <Calendar size={10} />
                        {timeAgo(item.createdAt)}
                      </span>
                    </div>
                    <div className="text-[12px] text-og-accent truncate font-semibold">{item.service}</div>
                    <div className="text-[11px] text-og-text-secondary truncate font-normal">{item.message || "No description provided."}</div>
                    {item.budget && (
                      <span className="self-start mt-1 px-1.5 py-0.5 rounded bg-og-surface-hover text-[10px] text-og-text-secondary font-medium">
                        {item.budget}
                      </span>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Side: Details View */}
        <div className="hidden lg:flex flex-col flex-1 min-h-0">
          <AnimatePresence mode="wait">
            {selected ? (
              <motion.div
                key={selected.id || selected._id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex-1 bg-og-surface rounded-xl border border-og-border p-6 flex flex-col min-h-0"
              >
                {/* Detail Header */}
                <div className="flex items-start justify-between border-b border-og-border pb-5 shrink-0">
                  <div>
                    <h2 className="text-[18px] text-og-text tracking-[-0.01em] font-bold">{selected.companyName}</h2>
                    <a href={`mailto:${selected.email}`} className="text-[13px] text-og-accent hover:underline flex items-center gap-1.5 mt-1 no-underline font-medium">
                      <Mail size={13} />
                      {selected.email}
                    </a>
                  </div>
                  <button
                    onClick={() => handleDelete(selected.id || selected._id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-og-destructive/20 text-[12px] text-og-destructive hover:bg-og-destructive/5 cursor-pointer font-medium"
                  >
                    <Trash2 size={13} />
                    Archive Inquiry
                  </button>
                </div>

                {/* Detail Grid */}
                <div className="flex-1 overflow-y-auto py-5 space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex gap-3">
                      <div className="w-9 h-9 rounded-lg bg-og-accent/10 flex items-center justify-center shrink-0"><Building2 size={16} className="text-og-accent" /></div>
                      <div>
                        <div className="text-[10px] text-og-text-secondary uppercase tracking-wider font-semibold">Industry</div>
                        <div className="text-[13px] text-og-text font-bold mt-0.5">{selected.industry}</div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-9 h-9 rounded-lg bg-og-accent/10 flex items-center justify-center shrink-0"><TrendingUp size={16} className="text-og-accent" /></div>
                      <div>
                        <div className="text-[10px] text-og-text-secondary uppercase tracking-wider font-semibold">Budget Limit</div>
                        <div className="text-[13px] text-og-text font-bold mt-0.5">{selected.budget || "Not specified"}</div>
                      </div>
                    </div>
                  </div>

                  {selected.website && (
                    <div className="flex gap-3">
                      <div className="w-9 h-9 rounded-lg bg-og-accent/10 flex items-center justify-center shrink-0"><Globe size={16} className="text-og-accent" /></div>
                      <div className="min-w-0">
                        <div className="text-[10px] text-og-text-secondary uppercase tracking-wider font-semibold">Website</div>
                        <a
                          href={selected.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[13px] text-og-accent hover:underline flex items-center gap-1 mt-0.5 no-underline truncate font-semibold"
                        >
                          {selected.website}
                          <ExternalLink size={11} />
                        </a>
                      </div>
                    </div>
                  )}

                  <div className="h-px bg-og-border" />

                  <div>
                    <div className="text-[10px] text-og-text-secondary uppercase tracking-wider font-semibold mb-2">Requested Service</div>
                    <span className="inline-block px-3 py-1 rounded-full bg-og-accent/15 text-og-accent text-[12px] font-bold">
                      {selected.service}
                    </span>
                  </div>

                  {selected.message && (
                    <div>
                      <div className="text-[10px] text-og-text-secondary uppercase tracking-wider font-semibold mb-2">Message Detail</div>
                      <div className="bg-og-surface-hover rounded-xl p-4 border border-og-border text-[13px] text-og-text leading-relaxed font-normal whitespace-pre-wrap">
                        {selected.message}
                      </div>
                    </div>
                  )}
                </div>

                <div className="border-t border-og-border pt-4 text-[11px] text-og-text-secondary/40 shrink-0 flex items-center gap-1 font-normal">
                  <Calendar size={11} />
                  Received on {new Date(selected.createdAt).toLocaleString()}
                </div>
              </motion.div>
            ) : (
              <div className="flex-1 bg-og-surface rounded-xl border border-og-border flex items-center justify-center text-center p-6 text-og-text-secondary">
                <div>
                  <MessageSquare size={48} className="mx-auto text-og-text-secondary/15 mb-3" />
                  <div className="text-[14px] font-semibold">Select an inquiry to view details</div>
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
