"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FileText,
  Briefcase,
  HelpCircle,
  Wrench,
  Plus,
  TrendingUp,
  Clock,
  ArrowRight,
  Eye,
  CheckCircle2,
  FileEdit,
  Loader2,
} from "lucide-react";

function StatCard({
  label,
  value,
  icon: Icon,
  color,
  sub,
  delay,
}: {
  label: string;
  value: number;
  icon: React.ElementType;
  color: string;
  sub?: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="bg-og-surface rounded-xl p-5 border border-og-border"
    >
      <div className="flex items-start justify-between mb-3">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: color + "15" }}
        >
          <Icon size={18} style={{ color }} />
        </div>
        <TrendingUp size={14} className="text-og-success" />
      </div>
      <div className="text-[28px] text-og-text tracking-[-0.02em] font-bold">
        {value}
      </div>
      <div className="text-[13px] text-og-text-secondary font-semibold">
        {label}
      </div>
      {sub && (
        <div className="text-[11px] text-og-text-secondary/60 mt-1 font-normal">
          {sub}
        </div>
      )}
    </motion.div>
  );
}

function QuickAction({
  label,
  href,
  icon: Icon,
  delay,
}: {
  label: string;
  href: string;
  icon: React.ElementType;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
    >
      <Link
        href={href}
        className="flex items-center gap-3 px-4 py-3 rounded-xl bg-og-surface border border-og-border hover:border-og-accent/30 hover:shadow-sm transition-all no-underline group"
      >
        <div className="w-8 h-8 rounded-lg bg-og-accent/10 flex items-center justify-center">
          <Icon size={15} className="text-og-accent" />
        </div>
        <span className="text-[13px] text-og-text flex-1 font-semibold">
          {label}
        </span>
        <ArrowRight
          size={14}
          className="text-og-text-secondary/40 group-hover:text-og-accent transition-colors"
        />
      </Link>
    </motion.div>
  );
}

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

export default function DashboardPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [portfolio, setPortfolio] = useState<any[]>([]);
  const [faqs, setFaqs] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [activity, setActivity] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated fetching of admin statistics
    setTimeout(() => {
      setBlogs([
        { title: "AI in Malta", status: "published" },
        { title: "Next.js vs React", status: "draft" }
      ]);
      setPortfolio([
        { title: "Hotel Booking", status: "published" },
        { title: "E-learning Platform", status: "published" }
      ]);
      setFaqs([
        { question: "What is Sourcecode?", active: true }
      ]);
      setServices([
        { title: "Custom Software" }
      ]);
      setActivity([
        { id: "act-1", action: "Logged In", entity: "Auth", entityTitle: "James Borg", timestamp: new Date().toISOString() },
        { id: "act-2", action: "Created", entity: "Blog", entityTitle: "AI in Malta", timestamp: new Date(Date.now() - 3600000).toISOString() }
      ]);
      setLoading(false);
    }, 400);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 size={28} className="animate-spin text-og-accent" />
      </div>
    );
  }

  const publishedBlogs = blogs.filter((b) => b.status === "published").length;
  const draftBlogs = blogs.filter((b) => b.status === "draft").length;
  const publishedPortfolio = portfolio.filter((p) => p.status === "published").length;
  const draftPortfolio = portfolio.filter((p) => p.status === "draft").length;

  return (
    <div className="max-w-[1200px] mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-[24px] text-og-text tracking-[-0.02em] font-bold">
          Dashboard
        </h1>
        <p className="text-[14px] text-og-text-secondary font-normal">
          Overview of your website content and activity.
        </p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          label="Blog Posts"
          value={blogs.length}
          icon={FileText}
          color="#0099AA"
          sub={`${publishedBlogs} published, ${draftBlogs} drafts`}
          delay={0.05}
        />
        <StatCard
          label="Portfolio Projects"
          value={portfolio.length}
          icon={Briefcase}
          color="#6D28D9"
          sub={`${publishedPortfolio} published, ${draftPortfolio} drafts`}
          delay={0.1}
        />
        <StatCard
          label="FAQs"
          value={faqs.length}
          icon={HelpCircle}
          color="#059669"
          sub={`${faqs.filter((f) => f.active).length} active`}
          delay={0.15}
        />
        <StatCard
          label="Services"
          value={services.length}
          icon={Wrench}
          color="#D97706"
          delay={0.2}
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Quick actions */}
        <div className="lg:col-span-1">
          <div className="text-[13px] text-og-text-secondary mb-3 font-semibold">
            Quick Actions
          </div>
          <div className="space-y-2">
            <QuickAction label="New Blog Post" href="/admin/blog/new" icon={Plus} delay={0.1} />
            <QuickAction label="New Portfolio Item" href="/admin/portfolio/new" icon={Plus} delay={0.15} />
            <QuickAction label="Manage FAQs" href="/admin/faq" icon={HelpCircle} delay={0.2} />
            <QuickAction label="Edit Homepage" href="/admin/homepage" icon={FileEdit} delay={0.25} />
          </div>

          {/* Published vs Draft */}
          <div className="mt-6 bg-og-surface rounded-xl p-5 border border-og-border">
            <div className="text-[13px] text-og-text mb-4 font-semibold">
              Content Status
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-og-success" />
                  <span className="text-[13px] text-og-text font-semibold">Published</span>
                </div>
                <span className="text-[13px] text-og-text font-bold">
                  {publishedBlogs + publishedPortfolio}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Eye size={14} className="text-og-warning" />
                  <span className="text-[13px] text-og-text font-semibold">Drafts</span>
                </div>
                <span className="text-[13px] text-og-text font-bold">
                  {draftBlogs + draftPortfolio}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Log */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <div className="text-[13px] text-og-text-secondary font-semibold">
              Recent Activity
            </div>
            <Link
              href="/admin/activity"
              className="text-[12px] text-og-accent no-underline hover:underline font-semibold"
            >
              View all
            </Link>
          </div>
          <div className="bg-og-surface rounded-xl border border-og-border overflow-hidden">
            {activity.length === 0 ? (
              <div className="p-8 text-center text-[14px] text-og-text-secondary font-normal">
                No activity yet. Start creating content!
              </div>
            ) : (
              <div className="divide-y divide-og-border">
                {activity.slice(0, 10).map((entry: any) => (
                  <div key={entry.id} className="flex items-center gap-3 px-5 py-3">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] shrink-0 font-bold ${
                        entry.action === "Created"
                          ? "bg-og-success/10 text-og-success"
                          : entry.action === "Deleted"
                          ? "bg-og-destructive/10 text-og-destructive"
                          : entry.action === "Logged In"
                          ? "bg-og-accent/10 text-og-accent"
                          : "bg-og-surface-hover text-og-text-secondary"
                      }`}
                    >
                      {entry.action.charAt(0)}
                    </div>
                    <div className="flex-grow min-w-0">
                      <div className="text-[13px] text-og-text truncate font-semibold">
                        {entry.action}{" "}
                        <span className="text-og-text-secondary font-normal">
                          {entry.entity}
                        </span>{" "}
                        &middot; {entry.entityTitle}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-og-text-secondary/60 shrink-0 font-normal">
                      <Clock size={11} />
                      {timeAgo(entry.timestamp)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
