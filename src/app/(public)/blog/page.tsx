import { BlogContent } from "@/components/blog/BlogContent";
import { blogPosts } from "@/lib/data/blogPosts";

export const metadata = {
  title: "Blog | Sourcecode",
  description: "Insights on software engineering, AI, technology, and building better digital products. Articles by the Sourcecode team.",
};

export default function BlogPage() {
  return <BlogContent initialPosts={blogPosts} />;
}
