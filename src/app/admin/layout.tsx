"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  HelpCircle,
  Wrench,
  Home,
  Image,
  Activity,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Globe,
  Loader2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AdminUser {
  email: string;
  role: string;
  name: string;
}

const navItems = [
  { path: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { path: "/admin/portfolio", label: "Portfolio", icon: Briefcase },
  { path: "/admin/blog", label: "Blog", icon: FileText },
  { path: "/admin/faq", label: "FAQ", icon: HelpCircle },
  { path: "/admin/services", label: "Services", icon: Wrench },
  { path: "/admin/homepage", label: "Homepage", icon: Home },
  { path: "/admin/media", label: "Media", icon: Image },
  { path: "/admin/activity", label: "Activity", icon: Activity },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem("admin_token");
    if (!token && pathname !== "/admin/login") {
      router.push("/admin/login");
    } else {
      // Mock validation success (or call API if integrated)
      setUser({ email: "admin@surftechnology.mt", role: "super_admin", name: "James Borg" });
      setLoading(false);
    }
  }, [pathname, router]);

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    router.push("/admin/login");
  };

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-og-bg">
        <Loader2 size={28} className="animate-spin text-og-accent" />
      </div>
    );
  }

  const crumbs = pathname
    .replace("/admin", "")
    .split("/")
    .filter(Boolean);

  const isActive = (path: string) => {
    if (path === "/admin") return pathname === "/admin";
    return pathname.startsWith(path);
  };

  return (
    <div className="flex h-screen bg-og-bg overflow-hidden">
      {/* Mobile overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar — always dark */}
      <aside
        className={`fixed lg:static z-50 top-0 left-0 h-full w-[260px] bg-[#13131F] border-r border-og-border flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="px-6 py-5 flex items-center justify-between border-b border-white/8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-og-accent/15 border border-og-accent/25 flex items-center justify-center">
              <span className="text-og-accent text-[12px] font-mono font-bold">&lt;/&gt;</span>
            </div>
            <div>
              <div className="text-white text-[14px] font-mono font-bold">
                source<span className="text-og-accent">code</span>
              </div>
              <div className="text-white/40 text-[11px] font-normal">
                Admin Panel
              </div>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white/50 hover:text-white cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-3 overflow-y-auto">
          <div className="text-[10px] text-white/30 uppercase tracking-widest px-3 mb-2 font-semibold">
            Content
          </div>
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] mb-0.5 transition-all duration-200 ${
                isActive(item.path)
                  ? "bg-og-accent/15 text-og-accent"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
              style={{ fontWeight: 500 }}
            >
              <item.icon size={17} />
              {item.label}
            </Link>
          ))}
          <div className="h-px bg-white/8 my-4" />
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] text-white/60 hover:text-white hover:bg-white/5 transition-all duration-200 no-underline"
            style={{ fontWeight: 500 }}
          >
            <Globe size={17} />
            View Website
          </Link>
        </nav>

        {/* User */}
        {user && (
          <div className="px-4 py-4 border-t border-white/8">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-og-accent/15 flex items-center justify-center">
                <span className="text-og-accent text-[12px] font-bold">
                  {user.name.charAt(0)}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white text-[13px] truncate font-medium">
                  {user.name}
                </div>
                <div className="text-white/40 text-[11px] truncate font-normal">
                  {user.role === "super_admin" ? "Super Admin" : "Editor"}
                </div>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-[12px] text-white/40 hover:text-white hover:bg-white/5 transition-all w-full cursor-pointer font-medium"
            >
              <LogOut size={14} />
              Sign out
            </button>
          </div>
        )}
      </aside>

      {/* Main */}
      <div className="flex-grow flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="h-14 bg-og-surface border-b border-og-border flex items-center px-4 lg:px-6 gap-4 shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-og-text/60 hover:text-og-text cursor-pointer"
          >
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-1.5 text-[12px] text-og-text-secondary font-normal">
            <span>Admin</span>
            {crumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <ChevronRight size={12} className="text-og-text-secondary/40" />
                <span className={i === crumbs.length - 1 ? "text-og-text" : ""} style={i === crumbs.length - 1 ? { fontWeight: 500 } : {}}>
                  {crumb.charAt(0).toUpperCase() + crumb.slice(1).replace(/-/g, " ")}
                </span>
              </span>
            ))}
          </div>
        </header>

        {/* Content */}
        <main className="flex-grow overflow-y-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
