/**
 * Admin API Client
 * Communicates with Next.js API Routes for persistent MongoDB CMS data.
 */

const BASE = "/api/admin";
const TOKEN_KEY = "admin_token";

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
}

/* ─── Fetch wrapper ─── */
async function apiFetch<T = any>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(token ? { "X-Admin-Token": token } : {}),
    ...(options.headers as Record<string, string> || {}),
  };

  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({ error: res.statusText }));
    console.error(`Admin API error ${res.status} on ${path}:`, body);
    throw new Error(body.error || `API error ${res.status}`);
  }

  return res.json();
}

/* ═══════════════════════════════════
   AUTH
   ═══════════════════════════════════ */

export interface AdminUser {
  email: string;
  role: "super_admin" | "editor";
  name: string;
}

export interface AdminBlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  image: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  content: string[];
  status: "draft" | "published";
  tags: string[];
  seoTitle: string;
  seoDescription: string;
  metaKeywords: string;
  createdAt: string;
  updatedAt: string;
  scheduledAt?: string;
}

export interface AdminCaseStudy {
  id: string;
  title: string;
  slug: string;
  client: string;
  category: string;
  industry: string;
  tagline: string;
  image: string;
  stat: string;
  statLabel: string;
  duration: string;
  techStack: string[];
  challenge: string;
  solution: string;
  results: string[];
  testimonial?: { quote: string; name: string; role: string };
  status: "draft" | "published";
  featured: boolean;
  seoTitle: string;
  seoDescription: string;
  problem: string;
  images: string[];
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface AdminFAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AdminService {
  id: string;
  title: string;
  description: string;
  icon: string;
  detailContent: string;
  cta: string;
  pricing: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface HomepageSection {
  heroTitle: string;
  heroSubtitle: string;
  ctaText: string;
  aboutText: string;
  stats: { label: string; value: string }[];
  testimonials: { quote: string; name: string; role: string }[];
  featureHighlights: { title: string; description: string }[];
}

export interface ActivityEntry {
  id: string;
  action: string;
  entity: string;
  entityId: string;
  entityTitle: string;
  user: string;
  timestamp: string;
}

export interface MediaItem {
  id: string;
  url: string;
  name: string;
  size: string;
  type: string;
  createdAt: string;
}

export async function login(email: string, password: string): Promise<AdminUser> {
  const { user, token } = await apiFetch<{ user: AdminUser; token: string }>("/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  setToken(token);
  return user;
}

export async function getAuthUser(): Promise<AdminUser | null> {
  const token = getToken();
  if (!token) return null;
  try {
    const { user } = await apiFetch<{ user: AdminUser | null }>("/me");
    if (!user) { clearToken(); return null; }
    return user;
  } catch {
    clearToken();
    return null;
  }
}

export async function logout(): Promise<void> {
  try {
    await apiFetch("/logout", { method: "POST" });
  } catch { /* ignore */ }
  clearToken();
}

/* ═══════════════════════════════════
   BLOG CRUD
   ═══════════════════════════════════ */

export async function getBlogs(): Promise<any[]> {
  const { data } = await apiFetch<{ data: any[] }>("/blogs");
  return data;
}

export async function getBlog(id: string): Promise<any | undefined> {
  try {
    const { data } = await apiFetch<{ data: any }>(`/blogs/${id}`);
    return data;
  } catch {
    return undefined;
  }
}

export async function saveBlog(post: any): Promise<any> {
  if (post.id || post._id) {
    const targetId = post.id || post._id;
    const { data } = await apiFetch<{ data: any }>(`/blogs/${targetId}`, {
      method: "PUT",
      body: JSON.stringify(post),
    });
    return data;
  }
  const { data } = await apiFetch<{ data: any }>("/blogs", {
    method: "POST",
    body: JSON.stringify(post),
  });
  return data;
}

export async function deleteBlog(id: string): Promise<void> {
  await apiFetch(`/blogs/${id}`, { method: "DELETE" });
}

export async function duplicateBlog(id: string): Promise<any> {
  const { data } = await apiFetch<{ data: any }>(`/blogs/${id}/duplicate`, { method: "POST" });
  return data;
}

/* ═══════════════════════════════════
   PORTFOLIO CRUD
   ═══════════════════════════════════ */

export async function getPortfolio(): Promise<any[]> {
  const { data } = await apiFetch<{ data: any[] }>("/portfolio");
  return data;
}

export async function getPortfolioItem(id: string): Promise<any | undefined> {
  try {
    const { data } = await apiFetch<{ data: any }>(`/portfolio/${id}`);
    return data;
  } catch {
    return undefined;
  }
}

export async function savePortfolioItem(item: any): Promise<any> {
  if (item.id || item._id) {
    const targetId = item.id || item._id;
    const { data } = await apiFetch<{ data: any }>(`/portfolio/${targetId}`, {
      method: "PUT",
      body: JSON.stringify(item),
    });
    return data;
  }
  const { data } = await apiFetch<{ data: any }>("/portfolio", {
    method: "POST",
    body: JSON.stringify(item),
  });
  return data;
}

export async function deletePortfolioItem(id: string): Promise<void> {
  await apiFetch(`/portfolio/${id}`, { method: "DELETE" });
}

export async function duplicatePortfolioItem(id: string): Promise<any> {
  const { data } = await apiFetch<{ data: any }>(`/portfolio/${id}/duplicate`, { method: "POST" });
  return data;
}

export async function reorderPortfolio(items: any[]): Promise<void> {
  await apiFetch("/portfolio-reorder", { method: "PUT", body: JSON.stringify({ items }) });
}

/* ═══════════════════════════════════
   FAQ CRUD
   ═══════════════════════════════════ */

export async function getFAQs(): Promise<any[]> {
  const { data } = await apiFetch<{ data: any[] }>("/faqs");
  return data;
}

export async function saveFAQ(faq: any): Promise<any> {
  if (faq.id || faq._id) {
    const targetId = faq.id || faq._id;
    const { data } = await apiFetch<{ data: any }>(`/faqs/${targetId}`, {
      method: "PUT",
      body: JSON.stringify(faq),
    });
    return data;
  }
  const { data } = await apiFetch<{ data: any }>("/faqs", {
    method: "POST",
    body: JSON.stringify(faq),
  });
  return data;
}

export async function deleteFAQ(id: string): Promise<void> {
  await apiFetch(`/faqs/${id}`, { method: "DELETE" });
}

export async function reorderFAQs(items: any[]): Promise<void> {
  await apiFetch("/faqs-reorder", { method: "PUT", body: JSON.stringify({ items }) });
}

/* ═══════════════════════════════════
   SERVICES CRUD
   ═══════════════════════════════════ */

export async function getServices(): Promise<any[]> {
  const { data } = await apiFetch<{ data: any[] }>("/services");
  return data;
}

export async function saveService(service: any): Promise<any> {
  if (service.id || service._id) {
    const targetId = service.id || service._id;
    const { data } = await apiFetch<{ data: any }>(`/services/${targetId}`, {
      method: "PUT",
      body: JSON.stringify(service),
    });
    return data;
  }
  const { data } = await apiFetch<{ data: any }>("/services", {
    method: "POST",
    body: JSON.stringify(service),
  });
  return data;
}

export async function deleteService(id: string): Promise<void> {
  await apiFetch(`/services/${id}`, { method: "DELETE" });
}

/* ═══════════════════════════════════
   HOMEPAGE
   ═══════════════════════════════════ */

export async function getHomepage(): Promise<any> {
  const { data } = await apiFetch<{ data: any }>("/homepage");
  return data;
}

export async function saveHomepage(data: any): Promise<void> {
  await apiFetch("/homepage", { method: "PUT", body: JSON.stringify(data) });
}

/* ═══════════════════════════════════
   ACTIVITY LOG
   ═══════════════════════════════════ */

export async function getActivity(): Promise<any[]> {
  const { data } = await apiFetch<{ data: any[] }>("/activity");
  return data;
}

/* ═══════════════════════════════════
   MEDIA LIBRARY
   ═══════════════════════════════════ */

export async function getMedia(): Promise<any[]> {
  const { data } = await apiFetch<{ data: any[] }>("/media");
  return data;
}

export async function addMedia(item: { url: string; name: string; size?: string; type?: string }): Promise<any> {
  const { data } = await apiFetch<{ data: any }>("/media", {
    method: "POST",
    body: JSON.stringify(item),
  });
  return data;
}

export async function deleteMedia(id: string): Promise<void> {
  await apiFetch(`/media/${id}`, { method: "DELETE" });
}

/* ═══════════════════════════════════
   PROJECT REQUESTS (ONBOARDING LEADS)
   ═══════════════════════════════════ */

export async function getRequests(): Promise<any[]> {
  const { data } = await apiFetch<{ data: any[] }>("/requests");
  return data;
}

export async function deleteRequest(id: string): Promise<void> {
  await apiFetch(`/requests/${id}`, { method: "DELETE" });
}

/* ═══════════════════════════════════
   UTILITY
   ═══════════════════════════════════ */

export function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
