import { isAdmin } from "../../../../../lib/adminAuth";
import { connectDB } from "../../../../../lib/mongodb";
import { logAudit } from "../../../../../lib/audit";
import GoogleReviewSummary from "../../../../../models/GoogleReviewSummary";

const denied = () => Response.json({ error: "Forbidden" }, { status: 403 });
const defaults = { rating: 5, reviewCount: 232 };
const clean = body => ({ rating: Math.min(5, Math.max(0, Number(body?.rating) || defaults.rating)), reviewCount: Math.max(0, Math.round(Number(body?.reviewCount) || defaults.reviewCount)) });
export async function GET() { if (!await isAdmin()) return denied(); await connectDB(); const item = await GoogleReviewSummary.findOne().sort({ createdAt: 1 }).lean(); return Response.json(item || defaults); }
export async function PATCH(request) { if (!await isAdmin()) return denied(); await connectDB(); const item = await GoogleReviewSummary.findOneAndUpdate({}, { $set: clean(await request.json()) }, { new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true }); await logAudit("reviews", "update-summary", item); return Response.json(item); }
