"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, Download, Activity, Loader2 } from "lucide-react";
import { getActivity } from "@/lib/data/adminApi";

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

const actionColors: Record<string, string> = {
  Created: "bg-og-success/10 text-og-success",
  Updated: "bg-[#2563EB]/10 text-[#2563EB] dark:bg-[#2563EB]/20 dark:text-[#60A5FA]",
  Deleted: "bg-og-destructive/10 text-og-destructive",
  "Logged In": "bg-og-accent/10 text-og-accent",
  Duplicated: "bg-og-warning/10 text-og-warning",
};

export default function ActivityLogPage() {
  const [activity, setActivity] = useState<any[]>([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getActivity()
      .then((data) => { setActivity(data); setLoading(false); })
      .catch((err) => { console.error("Load activity error:", err); setLoading(false); });
  }, []);

  const filtered = filter === "all" ? activity : activity.filter((e) => e.action === filter);

  const handleExport = () => {
    const csv = ["Timestamp,Action,Entity,Title,User", ...activity.map((e) => `"${e.timestamp || e.createdAt}","${e.action}","${e.entity}","${e.entityTitle}","${e.user}"`)].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "activity-log.csv"; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-[900px] mx-auto">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div><h1 className="text-[24px] text-og-text tracking-[-0.02em] font-bold">Activity Log</h1><p className="text-[14px] text-og-text-secondary font-normal">Track all content changes and admin actions.</p></div>
        <button onClick={handleExport} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-og-surface border border-og-border text-[13px] text-og-text-secondary hover:text-og-text transition-colors font-medium cursor-pointer"><Download size={15} /> Export CSV</button>
      </motion.div>

      <div className="flex gap-1 bg-og-surface rounded-lg border border-og-border p-1 mb-4 overflow-x-auto">
        {["all", "Created", "Updated", "Deleted", "Logged In"].map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 rounded-md text-[12px] whitespace-nowrap transition-all cursor-pointer font-medium ${filter === f ? "bg-og-text text-og-bg" : "text-og-text-secondary hover:text-og-text"}`}>{f === "all" ? "All" : f}</button>
        ))}
      </div>

      <div className="bg-og-surface rounded-xl border border-og-border overflow-hidden">
        {loading ? (
          <div className="p-12 text-center"><Loader2 size={24} className="animate-spin text-og-accent mx-auto" /></div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center"><Activity size={36} className="text-og-text-secondary/20 mx-auto mb-3" /><div className="text-[14px] text-og-text-secondary font-medium">No activity recorded yet</div></div>
        ) : (
          <div className="divide-y divide-og-border">
            {filtered.map((entry) => (
              <div key={entry.id || entry._id} className="flex items-center gap-4 px-5 py-3.5">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[12px] shrink-0 ${actionColors[entry.action] || "bg-og-surface-hover text-og-text-secondary"} font-bold`}>{entry.action ? entry.action.charAt(0) : "A"}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] text-og-text font-medium">
                    <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] mr-1.5 ${actionColors[entry.action] || "bg-og-surface-hover text-og-text-secondary"} font-semibold`}>{entry.action}</span>
                    {entry.entity} &middot; <span className="text-og-text-secondary font-normal">{entry.entityTitle}</span>
                  </div>
                  <div className="text-[11px] text-og-text-secondary/60 mt-0.5 font-normal">by {entry.user}</div>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-og-text-secondary/60 shrink-0 font-normal"><Clock size={11} />{timeAgo(entry.timestamp || entry.createdAt)}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
