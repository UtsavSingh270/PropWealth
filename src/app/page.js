import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, BarChart3, BedDouble, Bath, Check, Compass, MapPin, ShieldCheck, Target } from "lucide-react";
import { getProperties } from "../lib/properties";
import { getResourceEntries } from "../lib/resourceEntries";
import { properties as examples } from "../data/properties";
import HomeHero from "../components/HomeHero";
import WebinarPopup from "../components/WebinarPopup";
import ServiceCards from "../components/ServiceCards";
import ClientReviews from "../components/ClientReviews";
import ResearchBanner from "../components/ResearchBanner";
import ProcessLottieStages from "../components/ProcessLottieStages";
import AnimatedMetrics from "../components/AnimatedMetrics";
import s from "../components/HomeLanding.module.css";

export const dynamic = "force-dynamic";
export const metadata = { title: "PropWealth | A clear plan. A smarter property journey.", description: "Start with your goals. PropWealth combines property strategy, suburb research and buyer’s agency support. Book your free call." };

const money = value => typeof value === "number" ? new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 0 }).format(value) : "Enquire for price";
const isExample = p => examples.some(example => example.slug === p.slug && example.description === p.description);
async function upcomingWebinars() {
  return getResourceEntries("webinar", { eventDate: { $gt: new Date() } });
}
function PropertyCard({ property: p, result = false }) {
  return <article className={s.property}>
    <Link href={"/properties/" + p.slug} className={s.propertyImage}><Image src={p.image || p.images?.[0] || "/CTA.jpg"} alt={p.title} fill sizes="(max-width: 700px) 100vw, (max-width: 1000px) 50vw, 33vw"/><span>{isExample(p) ? "Illustrative property" : result ? "Purchased" : p.status || "Opportunity"}</span><i><ArrowUpRight size={20}/></i></Link>
    <div className={s.propertyBody}><small><MapPin size={13}/>{p.suburb}, {p.state}</small><h3><Link href={"/properties/" + p.slug}>{p.title}</Link></h3><div className={s.propertyPrice}><strong>{money(p.price)}</strong><span>{p.category}</span></div><div className={s.propertyMeta}><span><BedDouble size={16}/>{p.beds} beds</span><span><Bath size={16}/>{p.baths} baths</span></div>{result && <div className={s.selection}><b>{isExample(p) ? "The investment lens" : "Why this property"}</b><p>{p.description}</p></div>}</div>
  </article>;
}
export default async function Home() {
  const [properties, webinars] = await Promise.all([getProperties(), upcomingWebinars()]);
  const latest = properties.filter(p => p.visible !== false && p.status !== "Sold Out").sort((a,b) => (Date.parse(b.createdAt) || 0) - (Date.parse(a.createdAt) || 0)).slice(0,3);
  const sold = properties.filter(p => p.visible !== false && p.status === "Sold Out").slice(0,3);
  const webinar = webinars.sort((a,b) => Date.parse(a.eventDate) - Date.parse(b.eventDate))[0];
  return <div className={s.home}>
    <HomeHero/>
    <section id="success" className={s.section}>
      <div className={s.wrap}>
        <div className={s.heading}><div><span className={s.kicker}>PropWealth results</span><h2>Real properties. <em>Clear results.</em></h2></div><Link className={s.textLink} href="/success-stories">See Our Success Stories <ArrowUpRight size={18}/></Link></div>
        <p className={s.sectionIntro}>Our experience helps investors move from a clear strategy to a confident property decision.</p>
        <AnimatedMetrics/>
        {sold.length > 0 && <><div className={s.grid3}>{sold.map(p => <PropertyCard key={p.slug} property={p} result/>)}</div>{sold.some(isExample) && <p className={s.note}>Illustrative properties from our opportunity library. These examples are not verified client outcomes.</p>}</>}
      </div>
    </section>
    <WebinarPopup webinar={webinar}/>
    <section className={s.section}><div className={s.wrap}>
      <div className={s.heading}><div><span className={s.kicker}>Our services / Strategy comes first</span><h2>Your property journey<br/>should start <em>with a plan.</em></h2></div><p>We don’t start by looking for a property. We start by understanding what you want to achieve.</p></div>
      <ServiceCards/>
    </div></section>
    <ProcessLottieStages/>
    <ResearchBanner/>
    <section className={s.softSection}><div className={s.wrap}><div className={s.heading}><div><span className={s.kicker}>Upcoming opportunities</span><h2>Your next move<br/><em>could start here.</em></h2></div><Link className={s.textLink} href="/success-stories">View all results <ArrowUpRight size={18}/></Link></div>
      {latest.length ? <><div className={s.grid3}>{latest.map(p => <PropertyCard key={p.slug} property={p}/>)}</div>{latest.some(isExample) && <p className={s.note}>Illustrative listings. Speak with our team to confirm current availability, pricing and suitability.</p>}</> : <div className={s.empty}><h3>The right opportunity starts with your brief.</h3><p>Tell us what you’re looking for and we’ll help you explore your next move.</p><Link className={s.primary} href="/contact">Discuss your property goals <ArrowRight size={18}/></Link></div>}
    </div></section>
    <section className={s.section}><div className={s.wrap + " " + s.difference}>
      <div><span className={s.kicker}>What makes us different</span><h2>A property is a purchase.<br/><em>A strategy is a direction.</em></h2><p>Price, bedrooms and location are the starting point. We connect the property to the market behind it and the future you’re working towards.</p><Link href="/about/who-we-are" className={s.textLink}>Get to know PropWealth <ArrowUpRight size={18}/></Link></div>
      <div className={s.differenceList}>{[[Target,"Your goals set the brief","Your starting point, priorities and future plans shape the search."],[BarChart3,"Research with context","Demand, supply, rental performance and comparable opportunities inform the decision."],[ShieldCheck,"Support through the details","Property assessment, negotiation and due diligence help you move forward with clarity."],[Compass,"A view beyond settlement","Each purchase should have a place in your longer-term property journey."]].map(([Icon,title,text]) => <article key={title}><Icon size={23}/><div><h3>{title}</h3><p>{text}</p></div></article>)}</div>
    </div></section>
    <ClientReviews/>
    <section className={s.section}><div className={s.wrap}><div className={s.finalCta}><div><span className={s.kicker}>Your next chapter starts with a conversation</span><h2>Big goals?<br/>Let’s make <em>a clear plan.</em></h2><p>Tell us where you are today and where you want to go. We’ll help you understand the next step.</p><Link href="/contact" className={s.primary}>Book Your Free Call <ArrowRight size={18}/></Link><small><Check size={15}/>No obligation. Just a useful first conversation.</small></div><div className={s.ctaImage}><Image src="/CTA.jpg" alt="Start a conversation with the PropWealth team" fill sizes="(max-width: 700px) 100vw, 40vw"/></div></div></div></section>
  </div>;
}
