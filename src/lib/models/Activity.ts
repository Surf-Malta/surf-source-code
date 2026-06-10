import mongoose from "mongoose";

const ActivitySchema = new mongoose.Schema(
  {
    action: {
      type: String,
      required: true,
      trim: true,
    },
    entity: {
      type: String,
      required: true,
      trim: true,
    },
    entityId: {
      type: String,
      trim: true,
    },
    entityTitle: {
      type: String,
      trim: true,
    },
    user: {
      type: String,
      default: "Admin",
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Activity || mongoose.model("Activity", ActivitySchema);
