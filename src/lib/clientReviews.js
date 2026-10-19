import { connectDB } from "./mongodb";
import ClientReview from "../models/ClientReview";
import { clientReviews } from "../data/clientReviews";
import GoogleReviewSummary from "../models/GoogleReviewSummary";

export async function getGoogleReviewSummary() {
  const fallback = { rating: 5, reviewCount: 232 };
  try {
    await connectDB();
    const summary = await GoogleReviewSummary.findOne().sort({ createdAt: 1 }).lean();
    return summary ? { rating: summary.rating, reviewCount: summary.reviewCount } : fallback;
  } catch (error) {
    console.warn("Google review summary unavailable:", error.message);
    return fallback;
  }
}

export async function getClientReviews(limit = 10) {
  try {
    await connectDB();
    await ClientReview.bulkWrite(clientReviews.map(review => ({
      updateOne: {
        filter: { name: review.name, comment: review.comment, source: "Google" },
        update: { $setOnInsert: review },
        upsert: true
      }
    })));
    return JSON.parse(JSON.stringify(await ClientReview.find({ visible:true }).sort({ order:1, postedAt:-1, createdAt:-1 }).limit(limit).lean()));
  } catch (error) {
    console.warn("Client reviews unavailable:", error.message);
    return [];
  }
}
