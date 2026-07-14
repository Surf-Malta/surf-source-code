import { BlogContent } from "@/components/blog/BlogContent";
import { blogPosts as staticBlogPosts } from "@/lib/data/blogPosts";
import { fetchPublishedBlogs } from "@/lib/data/publicData";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Blog | Sourcecode",
  description: "Insights on software engineering, AI, technology, and building better digital products. Articles by the Sourcecode team.",
};

export default async function BlogPage() {
  let posts = staticBlogPosts;
  try {
    const dbPosts = await fetchPublishedBlogs();
    if (dbPosts && dbPosts.length > 0) {
      posts = dbPosts;
    }
  } catch (err) {
    console.error("Error loading blogs:", err);
  }

  return <BlogContent initialPosts={posts} />;
}
