import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, BarChart3, CalendarDays, MapPin, TrendingUp } from "lucide-react";
import PageHero from "../../components/PageHero";
import PropertyExplorer from "../../components/PropertyExplorer";
import SuccessStoriesReels from "../../components/SuccessStoriesReels";
import ClientReviews from "../../components/ClientReviews";
import ResearchBanner from "../../components/ResearchBanner";
import { getProperties } from "../../lib/properties";
import s from "../../components/HomeLanding.module.css";

export const metadata = { title: "Client Results", description: "Success stories, market opportunities, research and client reviews from PropWealth." };
export const dynamic = "force-dynamic";
const money = value => typeof value === "number" && value > 0 ? new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 0 }).format(value) : "Add verified figure";
export default async function SuccessStories() {
  const properties = await getProperties();
  const latest = properties.filter(p => p.visible !== false && p.status !== "Sold Out").slice(0, 5);
  const previous = properties.filter(p => p.visible !== false && (p.status === "Sold Out" || p.currentValue || p.profit)).slice(0, 3);
  return <div className={s.home}><PageHero eyebrow="Results / Client stories" title="Real properties. Real strategies. Real experiences.">See the work behind the purchase: client stories, opportunities we have assessed, and the research that helps make better property decisions.</PageHero>
    <section className={s.section}><div className={s.wrap}><div className={s.heading}><div><span className={s.kicker}>Success stories</span><h2>Hear how investors<br/><em>started their next chapter.</em></h2></div><p>Short client videos can be uploaded from the dashboard and shared here, giving every story a longer life beyond social media.</p></div><SuccessStoriesReels/></div></section>
    <section className={s.softSection}><div className={s.wrap}><div className={s.heading}><div><span className={s.kicker}>What you missed</span><h2>Previous purchases.<br/><em>What happened next.</em></h2></div><p>See the property, the original purchase context and the movement that followed. Verified figures can be added by the team through the property dashboard.</p></div>{previous.length ? <div className={s.grid3}>{previous.map(p => { const purchase = p.purchasePrice || p.price; const value = p.currentValue; const gain = typeof p.profit === "number" ? p.profit : value ? value - purchase : null; const gainRate = gain !== null && purchase ? Math.round(gain / purchase * 100) : null; return <article className={s.outcomeCard} key={p.slug}><div className={s.outcomeImage}><Image src={p.image || p.images?.[0] || "/CTA.jpg"} alt={p.title} fill sizes="(max-width: 700px) 100vw, 33vw"/><span>Previous purchase</span></div><div className={s.outcomeBody}><small><MapPin size={13}/>{p.suburb}, {p.state} · {p.category}</small><h3>{p.title}</h3><div className={s.outcomeStats}><div><span>Purchase price</span><strong>{money(purchase)}</strong></div><div><span>Current value</span><strong>{money(value)}</strong></div><div><span>Value movement</span><strong>{gainRate !== null ? `${gainRate}%` : "Pending"}</strong></div></div><p>{p.description}</p><div className={s.outcomeMeta}><span><TrendingUp size={15}/>{p.yield ? `${p.yield}% indicative yield` : "Yield data pending"}</span><span><BarChart3 size={15}/>{p.equityGrowth ? `${p.equityGrowth}% equity growth` : "Equity data pending"}</span></div></div></article>})}</div> : <div className={s.empty}><h3>Previous purchase outcomes are being prepared.</h3><p>Add verified purchase price, current value and outcome data in the dashboard to publish this section.</p><Link href="/contact" className={s.primary}>Discuss an investment brief <ArrowRight size={17}/></Link></div>}<p className={s.note}><CalendarDays size={14}/> Outcome figures are only shown when verified data is entered. Property examples without confirmed results are clearly labelled.</p></div></section>
    <section className={s.section}><div className={s.wrap}><div className={s.heading}><div><span className={s.kicker}>Latest opportunities</span><h2>Properties selected<br/><em>through a strategy lens.</em></h2></div><Link href="/contact" className={s.textLink}>Tell us your brief <ArrowUpRight size={18}/></Link></div><PropertyExplorer properties={latest}/></div></section>
    <ResearchBanner/><ClientReviews/>
    <section className={s.section}><div className={s.wrap}><div className={s.finalCta}><div><span className={s.kicker}>Your next move</span><h2>Ready to see<br/><em>what fits your plan?</em></h2><p>Start with a useful conversation about your position, goals and next step.</p><Link href="/contact" className={s.primary}>Book Your Free Call <ArrowRight size={18}/></Link></div><div className={s.ctaImage}><Image src="/CTA.jpg" alt="PropWealth property strategy consultation" fill sizes="(max-width: 700px) 100vw, 40vw"/></div></div></div></section>
  </div>;
}
