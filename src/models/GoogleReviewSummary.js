import mongoose from "mongoose";

const GoogleReviewSummarySchema = new mongoose.Schema({
  rating: { type: Number, min: 0, max: 5, default: 5 },
  reviewCount: { type: Number, min: 0, default: 232 },
}, { timestamps: true });

export default mongoose.models.GoogleReviewSummary || mongoose.model("GoogleReviewSummary", GoogleReviewSummarySchema);
