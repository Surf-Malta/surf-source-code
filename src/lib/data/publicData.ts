/**
 * Public Data Fetchers
 * Server-side fetchers for public pages with MongoDB fallback
 */

import dbConnect from "@/lib/mongodb";
import Blog from "@/lib/models/Blog";
import Portfolio from "@/lib/models/Portfolio";
import FAQ from "@/lib/models/FAQ";
import Service from "@/lib/models/Service";
import Homepage from "@/lib/models/Homepage";

/**
 * Fetch published blog posts from MongoDB
 */
export async function fetchPublishedBlogs(): Promise<any[]> {
  try {
    await dbConnect();
    const posts = await Blog.find({ status: "published" })
      .sort({ date: -1 })
      .lean();
    return posts.map((doc: any) => ({
      title: doc.title,
      slug: doc.slug,
      excerpt: doc.excerpt || "",
      category: doc.category || "General",
      image: doc.image || "",
      author: doc.author || "Admin",
      authorRole: doc.authorRole || "",
      date: doc.date || "",
      readTime: doc.readTime || "",
      content: doc.content || [],
    }));
  } catch (err) {
    console.error("Error fetching published blogs:", err);
    return [];
  }
}

/**
 * Fetch single blog post by slug
 */
export async function fetchBlogBySlug(slug: string): Promise<any | null> {
  try {
    await dbConnect();
    const post = await Blog.findOne({ slug, status: "published" }).lean();
    if (!post) return null;
    return {
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || "",
      category: post.category || "General",
      image: post.image || "",
      author: post.author || "Admin",
      authorRole: post.authorRole || "",
      date: post.date || "",
      readTime: post.readTime || "",
      content: post.content || [],
      seoTitle: post.seoTitle || "",
      seoDescription: post.seoDescription || "",
    };
  } catch (err) {
    console.error("Error fetching blog by slug:", err);
    return null;
  }
}

/**
 * Fetch published portfolio items
 */
export async function fetchPublishedPortfolio(): Promise<any[]> {
  try {
    await dbConnect();
    const items = await Portfolio.find({ status: "published" })
      .sort({ order: 1 })
      .lean();
    return items.map((doc: any) => ({
      title: doc.title,
      slug: doc.slug,
      client: doc.client || "",
      category: doc.category || "",
      industry: doc.industry || "",
      tagline: doc.tagline || "",
      image: doc.image || "",
      stat: doc.stat || "",
      statLabel: doc.statLabel || "",
      duration: doc.duration || "",
      techStack: doc.techStack || [],
      challenge: doc.challenge || "",
      solution: doc.solution || "",
      results: doc.results || [],
      testimonial: doc.testimonial || undefined,
      featured: doc.featured || false,
      order: doc.order || 0,
    }));
  } catch (err) {
    console.error("Error fetching published portfolio:", err);
    return [];
  }
}

/**
 * Fetch single portfolio item by slug
 */
export async function fetchPortfolioBySlug(slug: string): Promise<any | null> {
  try {
    await dbConnect();
    const item = await Portfolio.findOne({ slug, status: "published" }).lean();
    if (!item) return null;
    return {
      id: item._id.toString(),
      title: item.title,
      slug: item.slug,
      client: item.client || "",
      category: item.category || "",
      industry: item.industry || "",
      tagline: item.tagline || "",
      image: item.image || "",
      stat: item.stat || "",
      statLabel: item.statLabel || "",
      duration: item.duration || "",
      techStack: item.techStack || [],
      challenge: item.challenge || "",
      solution: item.solution || "",
      results: item.results || [],
      testimonial: item.testimonial || undefined,
      featured: item.featured || false,
      problem: item.problem || "",
      images: item.images || [],
      seoTitle: item.seoTitle || "",
      seoDescription: item.seoDescription || "",
    };
  } catch (err) {
    console.error("Error fetching portfolio by slug:", err);
    return null;
  }
}

/**
 * Fetch active FAQs
 */
export async function fetchActiveFAQs(): Promise<any[]> {
  try {
    await dbConnect();
    const faqs = await FAQ.find({ active: true })
      .sort({ order: 1 })
      .lean();
    return faqs.map((doc: any) => ({
      question: doc.question,
      answer: doc.answer,
      category: doc.category || "General",
    }));
  } catch (err) {
    console.error("Error fetching active FAQs:", err);
    return [];
  }
}

/**
 * Fetch services
 */
export async function fetchServices(): Promise<any[]> {
  try {
    await dbConnect();
    const services = await Service.find({})
      .sort({ order: 1 })
      .lean();
    return services.map((doc: any) => ({
      id: doc._id.toString(),
      title: doc.title,
      description: doc.description || "",
      icon: doc.icon || "Code2",
      detailContent: doc.detailContent || "",
      cta: doc.cta || "Learn More",
      pricing: doc.pricing || "",
      order: doc.order || 0,
    }));
  } catch (err) {
    console.error("Error fetching services:", err);
    return [];
  }
}

/**
 * Fetch homepage data
 */
export async function fetchHomepageData(): Promise<any> {
  try {
    await dbConnect();
    let homepage = await Homepage.findOne({}).lean();
    if (!homepage) {
      homepage = await Homepage.create({});
    }
    return {
      heroTitle: homepage?.heroTitle || "Technology that works for you.",
      heroSubtitle: homepage?.heroSubtitle || "Custom software, AI automation, and digital solutions — built in Malta, built to scale.",
      ctaText: homepage?.ctaText || "Book a Free Consultation",
      aboutText: homepage?.aboutText || "",
      stats: homepage?.stats || [],
      testimonials: homepage?.testimonials || [],
      featureHighlights: homepage?.featureHighlights || [],
    };
  } catch (err) {
    console.error("Error fetching homepage data:", err);
    return {
      heroTitle: "Technology that works for you.",
      heroSubtitle: "Custom software, AI automation, and digital solutions — built in Malta, built to scale.",
      ctaText: "Book a Free Consultation",
      aboutText: "",
      stats: [],
      testimonials: [],
      featureHighlights: [],
    };
  }
}
