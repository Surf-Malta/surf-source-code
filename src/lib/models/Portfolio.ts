import mongoose from "mongoose";

const TestimonialSchema = new mongoose.Schema({
  quote: { type: String, trim: true },
  name: { type: String, trim: true },
  role: { type: String, trim: true },
}, { _id: false });

const PortfolioSchema = new mongoose.Schema(
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
    client: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      trim: true,
    },
    industry: {
      type: String,
      trim: true,
    },
    tagline: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      trim: true,
    },
    stat: {
      type: String,
      trim: true,
    },
    statLabel: {
      type: String,
      trim: true,
    },
    duration: {
      type: String,
      trim: true,
    },
    techStack: {
      type: [String],
      default: [],
    },
    challenge: {
      type: String,
      trim: true,
    },
    solution: {
      type: String,
      trim: true,
    },
    results: {
      type: [String],
      default: [],
    },
    testimonial: {
      type: TestimonialSchema,
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
    featured: {
      type: Boolean,
      default: false,
    },
    seoTitle: {
      type: String,
      trim: true,
    },
    seoDescription: {
      type: String,
      trim: true,
    },
    problem: {
      type: String,
      trim: true,
    },
    images: {
      type: [String],
      default: [],
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Portfolio || mongoose.model("Portfolio", PortfolioSchema);
