import Link from "next/link";
import { ArrowRight, ArrowUpRight, BarChart3, Compass, ShieldCheck, Target } from "lucide-react";
import { getProperties } from "../lib/properties";
import { getResourceEntries } from "../lib/resourceEntries";
import { properties as examples } from "../data/properties";
import PropertyExplorer from "../components/PropertyExplorer";
import HomeHero from "../components/HomeHero";
import WebinarPopup from "../components/WebinarPopup";
import ServiceCards from "../components/ServiceCards";
import ResearchBanner from "../components/ResearchBanner";
import ProcessLottieStages from "../components/ProcessLottieStages";
import AnimatedMetrics from "../components/AnimatedMetrics";
import ClientReviews from "../components/ClientReviews";
import SiteCta from "../components/SiteCta";
import s from "../components/components.module.css";


export const dynamic = "force-dynamic";
export const metadata = { title: "PropWealth | A clear plan. A smarter property journey.", description: "Start with your goals. PropWealth combines property strategy, suburb research and buyer’s agency support. Book your free call." };

const isExample = p => examples.some(example => example.slug === p.slug && example.description === p.description);
async function upcomingWebinars() {
  return getResourceEntries("webinar", { eventDate: { $gt: new Date() } });
}
export default async function Home() {
  const [properties, webinars] = await Promise.all([getProperties(), upcomingWebinars()]);
  const featured = properties.filter(p => p.visible !== false && p.status !== "Sold Out" && p.featured).slice(0,4);
  const sold = properties.filter(p => p.visible !== false && p.status === "Sold Out").slice(0,3);
  const webinar = webinars.sort((a,b) => Date.parse(a.eventDate) - Date.parse(b.eventDate))[0];
  return <div className={s.home}>
    <HomeHero/>
    <section className={s.proofSection} aria-label="PropWealth results at a glance"><div className={s.wrap}><AnimatedMetrics/></div></section>
    <section id="success" className={s.section}>
      <div className={s.wrap}>
        <div className={s.heading}><div><span className={s.kicker}>PropWealth results</span><h2>Real properties. <em>Clear results.</em></h2><p>Our experience helps investors move from a clear strategy to a confident property decision.</p></div><Link className={s.textLink} href="/success-stories">See Our Success Stories <ArrowUpRight size={18}/></Link></div>
        {sold.length > 0 && <PropertyExplorer properties={sold} outcome compact/>}
      </div>
    </section>
    <WebinarPopup webinar={webinar}/>
    <section className={s.section}><div className={s.wrap}>
      <div className={s.heading}><div><span className={s.kicker}>Our services / Strategy comes first</span><h2>Your Property Journey Should Start <em>With Perfect Strategy</em></h2></div><p>We don’t start by looking for a property. We start by understanding what you want to achieve.</p></div>
      <ServiceCards/>
    </div></section>
    <ProcessLottieStages/>
    <ResearchBanner/>
    <section className={s.softSection}><div className={s.wrap}><div className={s.heading}><div><span className={s.kicker}>Upcoming opportunities</span><h2>Your next move <em>could start here.</em></h2></div><Link className={s.textLink} href="/success-stories">View All Upcoming Opportunities<ArrowUpRight size={18}/></Link></div>
      {featured.length ? <><PropertyExplorer properties={featured} compact/>{featured.some(isExample) && <p className={s.note}>Illustrative listings. Speak with our team to confirm current availability, pricing and suitability.</p>}</> : <div className={s.empty}><h3>The right opportunity starts with your brief.</h3><p>Tell us what you’re looking for and we’ll help you explore your next move.</p><Link className={s.primary} href="/contact">Discuss your property goals <ArrowRight size={18}/></Link></div>}
    </div></section>
    <section className={s.section}><div className={s.wrap}>
      <div className={s.differenceFrame}>
        <div className={s.differenceLead}><span className={s.kicker}>What makes us different</span><h2>Every Purchase has a <em>Purpose in Your Plan.</em></h2><p>We bring strategy, property research and acquisition support together, so the next property has a clear job to do in your wider journey.</p><Link href="/about/who-we-are" className={s.textLink}>How we work <ArrowUpRight size={18}/></Link></div>
        <div className={s.differencePillars}>{[
          [Target,"Start with your position","We clarify your income, equity, timing and goals before any property search begins.","A plan for the role of your next purchase."],
          [BarChart3,"Use PropWealth Next","Suburb intelligence, market movement and comparable research add useful context to every decision.","Data made practical for your brief."],
          [ShieldCheck,"Assess the full opportunity","We check the property, location and buying conditions against the strategy before you commit.","Research that goes beyond the listing."],
          [Compass,"Keep the longer view","We consider how this purchase can support your equity, portfolio and next move over time.","A decision designed to create options."],
        ].map(([Icon,title,text,note], index) => <article key={title}><span>0{index + 1}</span><Icon size={22}/><div><h3>{title}</h3><p>{text}</p><small>{note}</small></div></article>)}</div>
      </div>
    </div></section>
    <ClientReviews/>

    <SiteCta/>
  </div>;
}
