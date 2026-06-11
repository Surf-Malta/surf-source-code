import { BlogContent } from "@/components/blog/BlogContent";
import { blogPosts as staticBlogPosts } from "@/lib/data/blogPosts";
import dbConnect from "@/lib/mongodb";
import Blog from "@/lib/models/Blog";

export const metadata = {
  title: "Blog | Sourcecode",
  description: "Insights on software engineering, AI, technology, and building better digital products. Articles by the Sourcecode team.",
};

export default async function BlogPage() {
  let posts = staticBlogPosts;
  try {
    await dbConnect();
    const dbPosts = await Blog.find({ status: "published" }).sort({ date: -1 }).lean();
    if (dbPosts && dbPosts.length > 0) {
      posts = dbPosts.map((doc: any) => ({
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
    }
  } catch (err) {
    console.error("MongoDB fetch failed for blogs, using static fallback:", err);
  }

  return <BlogContent initialPosts={posts} />;
}
