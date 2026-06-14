// Next.js Admin API Route Handler
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Blog from "@/lib/models/Blog";
import Portfolio from "@/lib/models/Portfolio";
import FAQ from "@/lib/models/FAQ";
import Service from "@/lib/models/Service";
import Homepage from "@/lib/models/Homepage";
import Activity from "@/lib/models/Activity";
import Media from "@/lib/models/Media";
import User from "@/lib/models/User";
import ProjectSubmission from "@/lib/models/ProjectSubmission";
import { validateToken } from "@/lib/adminAuth";

function formatDoc(doc: any) {
  if (!doc) return null;
  const obj = typeof doc.toObject === "function" ? doc.toObject() : doc;
  obj.id = obj._id ? obj._id.toString() : obj.id;
  delete obj._id;
  return obj;
}

export async function GET(request: Request, props: { params: Promise<{ route?: string[] }> }) {
  try {
    await dbConnect();
    const params = await props.params;
    const route = params.route || [];

    // Authenticate
    const token = request.headers.get("X-Admin-Token");
    const user = await validateToken(token);
    if (!user && (route.length === 0 || route[0] !== "login")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (route.length === 1) {
      const endpoint = route[0];
      if (endpoint === "me") {
        return NextResponse.json({ user });
      }
      if (endpoint === "blogs") {
        const blogs = await Blog.find({}).sort({ createdAt: -1 });
        return NextResponse.json({ data: blogs.map(formatDoc) });
      }
      if (endpoint === "portfolio") {
        const portfolio = await Portfolio.find({}).sort({ order: 1 });
        return NextResponse.json({ data: portfolio.map(formatDoc) });
      }
      if (endpoint === "faqs") {
        const faqs = await FAQ.find({}).sort({ order: 1 });
        return NextResponse.json({ data: faqs.map(formatDoc) });
      }
      if (endpoint === "services") {
        const services = await Service.find({}).sort({ order: 1 });
        return NextResponse.json({ data: services.map(formatDoc) });
      }
      if (endpoint === "homepage") {
        let homepage = await Homepage.findOne({});
        if (!homepage) {
          homepage = await Homepage.create({});
        }
        return NextResponse.json({ data: formatDoc(homepage) });
      }
      if (endpoint === "activity") {
        const activity = await Activity.find({}).sort({ createdAt: -1 }).limit(100);
        return NextResponse.json({ data: activity.map(formatDoc) });
      }
      if (endpoint === "media") {
        const media = await Media.find({}).sort({ createdAt: -1 });
        return NextResponse.json({ data: media.map(formatDoc) });
      }
      if (endpoint === "requests") {
        const requests = await ProjectSubmission.find({}).sort({ createdAt: -1 });
        return NextResponse.json({ data: requests.map(formatDoc) });
      }
    } else if (route.length === 2) {
      const endpoint = route[0];
      const id = route[1];

      if (endpoint === "blogs") {
        const blog = await Blog.findById(id);
        if (!blog) return NextResponse.json({ error: "Not found" }, { status: 404 });
        return NextResponse.json({ data: formatDoc(blog) });
      }
      if (endpoint === "portfolio") {
        const item = await Portfolio.findById(id);
        if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
        return NextResponse.json({ data: formatDoc(item) });
      }
      if (endpoint === "faqs") {
        const faq = await FAQ.findById(id);
        if (!faq) return NextResponse.json({ error: "Not found" }, { status: 404 });
        return NextResponse.json({ data: formatDoc(faq) });
      }
      if (endpoint === "services") {
        const service = await Service.findById(id);
        if (!service) return NextResponse.json({ error: "Not found" }, { status: 404 });
        return NextResponse.json({ data: formatDoc(service) });
      }
      if (endpoint === "media") {
        const media = await Media.findById(id);
        if (!media) return NextResponse.json({ error: "Not found" }, { status: 404 });
        return NextResponse.json({ data: formatDoc(media) });
      }
    }

    return NextResponse.json({ error: "Endpoint not found" }, { status: 404 });
  } catch (error: any) {
    console.error("API GET error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: Request, props: { params: Promise<{ route?: string[] }> }) {
  try {
    await dbConnect();
    const params = await props.params;
    const route = params.route || [];

    // Login is public
    if (route.length === 1 && route[0] === "login") {
      const { email, password } = await request.json();

      // Seed if User table empty
      const userCount = await User.countDocuments();
      if (userCount === 0) {
        await User.create([
          { email: "admin@surftechnology.mt", password: "admin123", role: "super_admin", name: "Source Code" },
          { email: "editor@surftechnology.mt", password: "editor123", role: "editor", name: "Sarah Borg" },
          { email: "admin@sourcecode.dev", password: "admin123", role: "super_admin", name: "Source Code" },
          { email: "editor@sourcecode.dev", password: "editor123", role: "editor", name: "Sarah Borg" }
        ]);
      }

      const dbUser = await User.findOne({ email, password });
      if (!dbUser) {
        return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
      }

      const token = `mock-session-token-${dbUser.email}-${Date.now()}`;
      await Activity.create({
        action: "Logged In",
        entity: "Auth",
        entityTitle: dbUser.name,
        user: dbUser.name,
      });

      return NextResponse.json({
        user: { email: dbUser.email, role: dbUser.role, name: dbUser.name },
        token,
      });
    }

    // Authenticate all other endpoints
    const token = request.headers.get("X-Admin-Token");
    const user = await validateToken(token);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json().catch(() => ({}));

    if (route.length === 1) {
      const endpoint = route[0];
      if (endpoint === "logout") {
        return NextResponse.json({ success: true });
      }
      if (endpoint === "blogs") {
        const blog = await Blog.create(body);
        await Activity.create({
          action: "Created",
          entity: "Blog",
          entityId: blog._id.toString(),
          entityTitle: blog.title,
          user: user.name,
        });
        return NextResponse.json({ data: formatDoc(blog) });
      }
      if (endpoint === "portfolio") {
        const maxOrder = await Portfolio.findOne({}).sort({ order: -1 }).select("order").lean();
        const nextOrder = maxOrder ? (maxOrder.order || 0) + 1 : 0;
        const item = await Portfolio.create({ ...body, order: nextOrder });
        await Activity.create({
          action: "Created",
          entity: "Portfolio",
          entityId: item._id.toString(),
          entityTitle: item.title,
          user: user.name,
        });
        return NextResponse.json({ data: formatDoc(item) });
      }
      if (endpoint === "faqs") {
        const maxOrder = await FAQ.findOne({}).sort({ order: -1 }).select("order").lean();
        const nextOrder = maxOrder ? (maxOrder.order || 0) + 1 : 0;
        const faq = await FAQ.create({ ...body, order: nextOrder });
        await Activity.create({
          action: "Created",
          entity: "FAQ",
          entityId: faq._id.toString(),
          entityTitle: faq.question,
          user: user.name,
        });
        return NextResponse.json({ data: formatDoc(faq) });
      }
      if (endpoint === "services") {
        const maxOrder = await Service.findOne({}).sort({ order: -1 }).select("order").lean();
        const nextOrder = maxOrder ? (maxOrder.order || 0) + 1 : 0;
        const service = await Service.create({ ...body, order: nextOrder });
        await Activity.create({
          action: "Created",
          entity: "Service",
          entityId: service._id.toString(),
          entityTitle: service.title,
          user: user.name,
        });
        return NextResponse.json({ data: formatDoc(service) });
      }
      if (endpoint === "media") {
        const mediaItem = await Media.create(body);
        await Activity.create({
          action: "Created",
          entity: "Media",
          entityId: mediaItem._id.toString(),
          entityTitle: mediaItem.name,
          user: user.name,
        });
        return NextResponse.json({ data: formatDoc(mediaItem) });
      }
      if (endpoint === "requests") {
        const submission = await ProjectSubmission.create(body);
        await Activity.create({
          action: "Created",
          entity: "ProjectSubmission",
          entityId: submission._id.toString(),
          entityTitle: submission.companyName || "New Request",
          user: "Public",
        });
        return NextResponse.json({ data: formatDoc(submission) });
      }
    } else if (route.length === 3) {
      const endpoint = route[0];
      const id = route[1];
      const action = route[2];

      if (action === "duplicate") {
        if (endpoint === "blogs") {
          const original = await Blog.findById(id);
          if (!original) return NextResponse.json({ error: "Blog not found" }, { status: 404 });
          const newSlug = `${original.slug}-copy-${Date.now()}`;
          const duplicated = await Blog.create({
            title: `Copy of ${original.title}`,
            slug: newSlug,
            excerpt: original.excerpt,
            category: original.category,
            image: original.image,
            author: original.author,
            authorRole: original.authorRole,
            date: original.date,
            readTime: original.readTime,
            content: original.content,
            status: "draft",
            tags: original.tags,
            seoTitle: original.seoTitle ? `Copy of ${original.seoTitle}` : "",
            seoDescription: original.seoDescription,
            metaKeywords: original.metaKeywords,
          });
          await Activity.create({
            action: "Duplicated",
            entity: "Blog",
            entityId: duplicated._id.toString(),
            entityTitle: duplicated.title,
            user: user.name,
          });
          return NextResponse.json({ data: formatDoc(duplicated) });
        }

        if (endpoint === "portfolio") {
          const original = await Portfolio.findById(id);
          if (!original) return NextResponse.json({ error: "Portfolio item not found" }, { status: 404 });
          const newSlug = `${original.slug}-copy-${Date.now()}`;
          const maxOrder = await Portfolio.findOne({}).sort({ order: -1 }).select("order").lean();
          const nextOrder = maxOrder ? (maxOrder.order || 0) + 1 : 0;
          const duplicated = await Portfolio.create({
            title: `Copy of ${original.title}`,
            slug: newSlug,
            client: original.client,
            category: original.category,
            industry: original.industry,
            tagline: original.tagline,
            image: original.image,
            stat: original.stat,
            statLabel: original.statLabel,
            duration: original.duration,
            techStack: original.techStack,
            challenge: original.challenge,
            solution: original.solution,
            results: original.results,
            testimonial: original.testimonial,
            status: "draft",
            featured: false,
            seoTitle: original.seoTitle ? `Copy of ${original.seoTitle}` : "",
            seoDescription: original.seoDescription,
            problem: original.problem,
            images: original.images,
            order: nextOrder,
          });
          await Activity.create({
            action: "Duplicated",
            entity: "Portfolio",
            entityId: duplicated._id.toString(),
            entityTitle: duplicated.title,
            user: user.name,
          });
          return NextResponse.json({ data: formatDoc(duplicated) });
        }
      }
    }

    return NextResponse.json({ error: "Endpoint not found" }, { status: 404 });
  } catch (error: any) {
    console.error("API POST error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(request: Request, props: { params: Promise<{ route?: string[] }> }) {
  try {
    await dbConnect();
    const params = await props.params;
    const route = params.route || [];

    // Authenticate
    const token = request.headers.get("X-Admin-Token");
    const user = await validateToken(token);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json().catch(() => ({}));

    if (route.length === 1) {
      const endpoint = route[0];
      if (endpoint === "homepage") {
        let homepage = await Homepage.findOne({});
        if (!homepage) {
          homepage = await Homepage.create(body);
        } else {
          homepage = await Homepage.findByIdAndUpdate(homepage._id, body, { new: true });
        }
        await Activity.create({
          action: "Updated",
          entity: "Homepage",
          entityTitle: "Homepage Settings",
          user: user.name,
        });
        return NextResponse.json({ success: true, data: formatDoc(homepage) });
      }

      if (endpoint === "portfolio-reorder") {
        const items = body.items || [];
        for (const item of items) {
          const targetId = item.id || item._id;
          if (targetId) {
            await Portfolio.findByIdAndUpdate(targetId, { order: item.order });
          }
        }
        await Activity.create({
          action: "Updated",
          entity: "Portfolio",
          entityTitle: "Portfolio Reorder",
          user: user.name,
        });
        return NextResponse.json({ success: true });
      }

      if (endpoint === "faqs-reorder") {
        const items = body.items || [];
        for (const item of items) {
          const targetId = item.id || item._id;
          if (targetId) {
            await FAQ.findByIdAndUpdate(targetId, { order: item.order });
          }
        }
        await Activity.create({
          action: "Updated",
          entity: "FAQ",
          entityTitle: "FAQs Reorder",
          user: user.name,
        });
        return NextResponse.json({ success: true });
      }

      if (endpoint === "services-reorder") {
        const items = body.items || [];
        for (const item of items) {
          const targetId = item.id || item._id;
          if (targetId) {
            await Service.findByIdAndUpdate(targetId, { order: item.order });
          }
        }
        await Activity.create({
          action: "Updated",
          entity: "Service",
          entityTitle: "Services Reorder",
          user: user.name,
        });
        return NextResponse.json({ success: true });
      }
    } else if (route.length === 2) {
      const endpoint = route[0];
      const id = route[1];

      if (endpoint === "blogs") {
        const updated = await Blog.findByIdAndUpdate(id, body, { new: true });
        if (!updated) return NextResponse.json({ error: "Blog not found" }, { status: 404 });
        await Activity.create({
          action: "Updated",
          entity: "Blog",
          entityId: updated._id.toString(),
          entityTitle: updated.title,
          user: user.name,
        });
        return NextResponse.json({ data: formatDoc(updated) });
      }

      if (endpoint === "portfolio") {
        const updated = await Portfolio.findByIdAndUpdate(id, body, { new: true });
        if (!updated) return NextResponse.json({ error: "Portfolio item not found" }, { status: 404 });
        await Activity.create({
          action: "Updated",
          entity: "Portfolio",
          entityId: updated._id.toString(),
          entityTitle: updated.title,
          user: user.name,
        });
        return NextResponse.json({ data: formatDoc(updated) });
      }

      if (endpoint === "faqs") {
        const updated = await FAQ.findByIdAndUpdate(id, body, { new: true });
        if (!updated) return NextResponse.json({ error: "FAQ not found" }, { status: 404 });
        await Activity.create({
          action: "Updated",
          entity: "FAQ",
          entityId: updated._id.toString(),
          entityTitle: updated.question,
          user: user.name,
        });
        return NextResponse.json({ data: formatDoc(updated) });
      }

      if (endpoint === "media") {
        const updated = await Media.findByIdAndUpdate(id, body, { new: true });
        if (!updated) return NextResponse.json({ error: "Media not found" }, { status: 404 });
        await Activity.create({
          action: "Updated",
          entity: "Media",
          entityId: updated._id.toString(),
          entityTitle: updated.name,
          user: user.name,
        });
        return NextResponse.json({ data: formatDoc(updated) });
      }

      if (endpoint === "services") {
        const updated = await Service.findByIdAndUpdate(id, body, { new: true });
        if (!updated) return NextResponse.json({ error: "Service not found" }, { status: 404 });
        await Activity.create({
          action: "Updated",
          entity: "Service",
          entityId: updated._id.toString(),
          entityTitle: updated.title,
          user: user.name,
        });
        return NextResponse.json({ data: formatDoc(updated) });
      }
    }

    return NextResponse.json({ error: "Endpoint not found" }, { status: 404 });
  } catch (error: any) {
    console.error("API PUT error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(request: Request, props: { params: Promise<{ route?: string[] }> }) {
  try {
    await dbConnect();
    const params = await props.params;
    const route = params.route || [];

    // Authenticate
    const token = request.headers.get("X-Admin-Token");
    const user = await validateToken(token);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (route.length === 2) {
      const endpoint = route[0];
      const id = route[1];

      if (endpoint === "blogs") {
        const deleted = await Blog.findByIdAndDelete(id);
        if (!deleted) return NextResponse.json({ error: "Blog not found" }, { status: 404 });
        await Activity.create({
          action: "Deleted",
          entity: "Blog",
          entityId: id,
          entityTitle: deleted.title,
          user: user.name,
        });
        return NextResponse.json({ success: true });
      }

      if (endpoint === "portfolio") {
        const deleted = await Portfolio.findByIdAndDelete(id);
        if (!deleted) return NextResponse.json({ error: "Portfolio item not found" }, { status: 404 });
        await Activity.create({
          action: "Deleted",
          entity: "Portfolio",
          entityId: id,
          entityTitle: deleted.title,
          user: user.name,
        });
        return NextResponse.json({ success: true });
      }

      if (endpoint === "faqs") {
        const deleted = await FAQ.findByIdAndDelete(id);
        if (!deleted) return NextResponse.json({ error: "FAQ not found" }, { status: 404 });
        await Activity.create({
          action: "Deleted",
          entity: "FAQ",
          entityId: id,
          entityTitle: deleted.question,
          user: user.name,
        });
        return NextResponse.json({ success: true });
      }

      if (endpoint === "services") {
        const deleted = await Service.findByIdAndDelete(id);
        if (!deleted) return NextResponse.json({ error: "Service not found" }, { status: 404 });
        await Activity.create({
          action: "Deleted",
          entity: "Service",
          entityId: id,
          entityTitle: deleted.title,
          user: user.name,
        });
        return NextResponse.json({ success: true });
      }

      if (endpoint === "media") {
        const deleted = await Media.findByIdAndDelete(id);
        if (!deleted) return NextResponse.json({ error: "Media item not found" }, { status: 404 });
        await Activity.create({
          action: "Deleted",
          entity: "Media",
          entityId: id,
          entityTitle: deleted.name,
          user: user.name,
        });
        return NextResponse.json({ success: true });
      }
      if (endpoint === "requests") {
        const deleted = await ProjectSubmission.findByIdAndDelete(id);
        if (!deleted) return NextResponse.json({ error: "Request not found" }, { status: 404 });
        await Activity.create({
          action: "Deleted",
          entity: "ProjectSubmission",
          entityId: id,
          entityTitle: deleted.companyName,
          user: user.name,
        });
        return NextResponse.json({ success: true });
      }
    }

    return NextResponse.json({ error: "Endpoint not found" }, { status: 404 });
  } catch (error: any) {
    console.error("API DELETE error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
