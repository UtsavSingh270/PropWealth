import Link from "next/link";
import { ArrowRight, ArrowUpRight, CalendarDays } from "lucide-react";
import PageHero from "../../components/PageHero";
import PropertyExplorer from "../../components/PropertyExplorer";
import SuccessStoriesReels from "../../components/SuccessStoriesReels";
import ClientReviews from "../../components/ClientReviews";
import ResearchBanner from "../../components/ResearchBanner";
import { getProperties } from "../../lib/properties";
import s from "../../components/components.module.css";

export const metadata = { title: "Client Results", description: "Success stories, market opportunities, research and client reviews from PropWealth." };
export const dynamic = "force-dynamic";
const money = value => typeof value === "number" && value > 0 ? new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 0 }).format(value) : "Add verified figure";
export default async function SuccessStories() {
  const properties = await getProperties();
  const latest = properties.filter(p => p.visible !== false && p.status !== "Sold Out").slice(0, 5);
  const previous = properties.filter(p => p.visible !== false && (p.status === "Sold Out" || p.currentValue || p.profit)).slice(0, 3);
  return <div className={s.home}><PageHero eyebrow="Results / Client stories" title="Real properties. Real strategies. Real experiences.">See the work behind the purchase: client stories, opportunities we have assessed, and the research that helps make better property decisions.</PageHero>
    <section className={s.section}><div className={s.wrap}><div className={`${s.heading} fullHeading`}><div><span className={s.kicker}>Success stories</span><h2>Hear how investors <em>started their next chapter.</em></h2></div><p>Short client videos can be uploaded from the dashboard and shared here, giving every story a longer life beyond social media.</p></div><SuccessStoriesReels/></div></section>
    <section className={s.softSection}><div className={s.wrap}><div className={`${s.heading} fullHeading`}><div><span className={s.kicker}>What you missed</span><h2>Previous purchases. <em>What happened next.</em></h2></div><p>See the property, the original purchase context and the movement that followed. Verified figures can be added by the team through the property dashboard.</p></div>{previous.length ? <PropertyExplorer properties={previous} outcome compact/> : <div className={s.empty}><h3>Previous purchase outcomes are being prepared.</h3><p>Add verified purchase price, current value and outcome data in the dashboard to publish this section.</p><Link href="/contact" className={s.primary}>Discuss an investment brief <ArrowRight size={17}/></Link></div>}
    {/* <p className={s.note}><CalendarDays size={14}/> Outcome figures are only shown when verified data is entered. Property examples without confirmed results are clearly labelled.</p> */}
    </div></section>
    <section className={s.section}><div className={s.wrap}><div className={`${s.heading} fullHeading`}><div><span className={s.kicker}>Latest opportunities</span><h2>Properties selected <em>through a strategy lens.</em></h2></div>
    {/* <Link href="/contact" className={s.textLink}>Tell us your brief <ArrowUpRight size={18}/></Link> */}
    </div><PropertyExplorer properties={latest}/></div></section>
    <ResearchBanner/><ClientReviews/>
  </div>;
}
