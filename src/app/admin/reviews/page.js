import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getAdminSession } from "../../../lib/adminAuth";
import ReviewManager from "../../../components/ReviewManager";

export const dynamic = "force-dynamic";
export default async function ReviewsAdminPage(){ const session=await getAdminSession(); if(!session) redirect("/admin/login"); return <main className="admin-review-page"><div className="shell"><Link className="admin-review-back" href="/admin"><ArrowLeft size={16}/> Back to dashboard</Link><ReviewManager/></div></main>; }
