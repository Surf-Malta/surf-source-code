import mongoose from "mongoose";

const MediaSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    size: {
      type: String,
      default: "0 KB",
      trim: true,
    },
    type: {
      type: String,
      default: "image/jpeg",
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Media || mongoose.model("Media", MediaSchema);
