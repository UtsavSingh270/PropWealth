import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getClientReviews } from "../lib/clientReviews";
import ReviewCarousel from "./ReviewCarousel";
import s from "./components.module.css";
export default async function ClientReviews() {
  const reviews = await getClientReviews();
  const googleReviewsUrl = "https://www.google.com/maps/search/?api=1&query=PropWealth+Bella+Vista";
  return <section className={s.softSection} id="client-reviews"><div className={s.wrap}>
    <div className={s.heading}><div><span className={s.kicker}>Client reviews</span><h2>What our clients say<br/><em>about working with us.</em></h2></div><Link className={s.textLink} href={googleReviewsUrl} target="_blank" rel="noopener noreferrer">Find us on Google <ArrowUpRight size={18}/></Link></div>
    {reviews.length ? <ReviewCarousel reviews={reviews}/> : <p className={s.reviewStatus}>Published client reviews will appear here once they are added from the dashboard.</p>}
    <a className={s.googleReviewCta} href={googleReviewsUrl} target="_blank" rel="noopener noreferrer"><span className={s.googleReviewMark}>G</span><span><strong>Have you worked with PropWealth?</strong><small>Share your experience with us on Google.</small></span><ArrowUpRight size={21}/></a>
  </div></section>;
}
