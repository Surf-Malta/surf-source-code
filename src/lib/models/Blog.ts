import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    excerpt: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      default: "General",
      trim: true,
    },
    image: {
      type: String,
      trim: true,
    },
    author: {
      type: String,
      default: "Admin",
      trim: true,
    },
    authorRole: {
      type: String,
      trim: true,
    },
    date: {
      type: String,
      trim: true,
    },
    readTime: {
      type: String,
      default: "5 min read",
      trim: true,
    },
    content: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
    tags: {
      type: [String],
      default: [],
    },
    seoTitle: {
      type: String,
      trim: true,
    },
    seoDescription: {
      type: String,
      trim: true,
    },
    metaKeywords: {
      type: String,
      trim: true,
    },
    scheduledAt: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Blog || mongoose.model("Blog", BlogSchema);
