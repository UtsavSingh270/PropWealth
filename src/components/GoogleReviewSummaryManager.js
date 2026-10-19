"use client";

import { useEffect, useState } from "react";
import { Save } from "lucide-react";

export default function GoogleReviewSummaryManager() {
  const [summary, setSummary] = useState({ rating: 5, reviewCount: 232 });
  const [saving, setSaving] = useState(false);
  useEffect(() => { fetch("/api/admin/reviews/summary").then(response => response.json()).then(setSummary).catch(() => {}); }, []);
  const save = async event => { event.preventDefault(); setSaving(true); try { const response = await fetch("/api/admin/reviews/summary", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(summary) }); if (!response.ok) throw new Error("Unable to save summary"); setSummary(await response.json()); } catch (error) { alert(error.message); } finally { setSaving(false); } };
  return <form className="review-summary-editor" onSubmit={save}>
    <div className="review-summary-copy"><span className="eyebrow">Google summary</span><h2>Homepage rating</h2><p>Update the trust details displayed in the homepage review card.</p></div>
    <div className="review-summary-fields">
      <label><span>Average rating</span><div className="review-rating-input"><input aria-label="Average Google rating" type="number" min="0" max="5" step="0.1" value={summary.rating} onChange={event => setSummary({ ...summary, rating: event.target.value })}/><b>/ 5</b></div><small>Enter the exact rating shown on Google.</small></label>
      <label><span>Google review count</span><input aria-label="Google review count" type="number" min="0" value={summary.reviewCount} onChange={event => setSummary({ ...summary, reviewCount: event.target.value })}/><small>Total published reviews.</small></label>
    </div>
    <button className="button review-summary-save" disabled={saving}><Save/> {saving ? "Saving…" : "Save summary"}</button>
  </form>;
}
