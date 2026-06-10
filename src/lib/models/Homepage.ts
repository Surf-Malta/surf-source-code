import mongoose from "mongoose";

const StatSchema = new mongoose.Schema({
  label: { type: String, trim: true },
  value: { type: String, trim: true },
}, { _id: false });

const TestimonialSchema = new mongoose.Schema({
  quote: { type: String, trim: true },
  name: { type: String, trim: true },
  role: { type: String, trim: true },
}, { _id: false });

const FeatureHighlightSchema = new mongoose.Schema({
  title: { type: String, trim: true },
  description: { type: String, trim: true },
}, { _id: false });

const HomepageSchema = new mongoose.Schema(
  {
    heroTitle: {
      type: String,
      default: "Technology that works for you.",
      trim: true,
    },
    heroSubtitle: {
      type: String,
      default: "Custom software, AI automation, and digital solutions — built in Malta, built to scale.",
      trim: true,
    },
    ctaText: {
      type: String,
      default: "Book a Free Consultation",
      trim: true,
    },
    aboutText: {
      type: String,
      trim: true,
    },
    stats: {
      type: [StatSchema],
      default: [],
    },
    testimonials: {
      type: [TestimonialSchema],
      default: [],
    },
    featureHighlights: {
      type: [FeatureHighlightSchema],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.models.Homepage || mongoose.model("Homepage", HomepageSchema);
