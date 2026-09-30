import { isAdmin } from "../../../../lib/adminAuth";
import { connectDB } from "../../../../lib/mongodb";
import { logAudit } from "../../../../lib/audit";
import ClientReview from "../../../../models/ClientReview";

const denied = () => Response.json({ error:"Forbidden" }, { status:403 });
const clean = body => { const { _id, createdAt, updatedAt, __v, ...safe } = body; safe.name=String(safe.name||"").trim(); safe.comment=String(safe.comment||"").trim(); safe.photo=String(safe.photo||"").trim(); safe.source=String(safe.source||"Google").trim(); safe.rating=Math.min(5,Math.max(1,Number(safe.rating)||5)); safe.order=Number(safe.order)||0; safe.postedAt=safe.postedAt||new Date(); return safe; };
export async function GET(){ if(!await isAdmin()) return denied(); await connectDB(); return Response.json(await ClientReview.find({}).sort({order:1,postedAt:-1,createdAt:-1}).lean()); }
export async function POST(request){ if(!await isAdmin()) return denied(); await connectDB(); const item=await ClientReview.create(clean(await request.json())); await logAudit("reviews","create",item); return Response.json(item,{status:201}); }
export async function PATCH(request){ if(!await isAdmin()) return denied(); await connectDB(); const {id,...body}=await request.json(); const item=await ClientReview.findByIdAndUpdate(id,clean(body),{new:true,runValidators:true}); await logAudit("reviews","update",item); return Response.json(item); }
export async function DELETE(request){ if(!await isAdmin()) return denied(); await connectDB(); const {id}=await request.json(); const item=await ClientReview.findByIdAndDelete(id); await logAudit("reviews","delete",item); return Response.json({ok:true}); }
