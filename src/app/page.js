import Image from "next/image";
import Link from "next/link";
import { ArrowRight,BarChart3,CheckCircle2,Gavel,KeyRound } from "lucide-react";
import { getProperties } from "../lib/properties";
import PropertyExplorer from "../components/PropertyExplorer";
import HomeHero from "../components/HomeHero";
import HomeProcessTimeline from "../components/HomeProcessTimeline";
import AnimatedTestimonials from "../components/AnimatedTestimonials";

const services=[
  [BarChart3,"Investment property planning","A considered investment strategy shaped around your financial position, goals and longer-term portfolio plans."],
  [KeyRound,"Buyer’s agent","Research, property sourcing, due diligence and negotiation with an experienced advocate representing you."],
  [Gavel,"Auction bidding","A defined bidding strategy and professional representation designed to remove emotion from auction day."]
];
const reviews=[
  {name:"Rahul M.R",designation:"Property investor · Google review",src:"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=900&auto=format&fit=crop",quote:"I have had a great experience purchasing an investment property through PropWealth. Ankit and Julius were approachable, easy to deal with and managed to secure a good outcome on the purchase."},
  {name:"Guru Hadadi",designation:"Portfolio investor · Google review",src:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&auto=format&fit=crop",quote:"Julius is a skilled professional with strong experience across different aspects of the Australian real estate market. He has helped me purchase investment properties that are genuinely valuable assets."},
  {name:"Dev Chopra",designation:"First-time investor · Google review",src:"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=900&auto=format&fit=crop",quote:"If you’re new to the Australian market and unsure where to start, PropWealth is a reliable choice. Julius guided us through every step, and his research and market knowledge set him apart."}
];

export const dynamic="force-dynamic";
export default async function Home(){
  const properties=await getProperties();
  const homeProperties=properties
    .filter(property=>property.featured&&property.visible!==false&&property.status!=="Sold Out")
    .slice(0,8);
  return <>
    <HomeHero/>

    <section className="section home-services-motion"><div className="shell"><div className="section-head"><div><span className="eyebrow">Our Services</span><h2>Professional guidance for the decisions that matter.</h2></div></div><div className="motion-service-grid">{services.map(([Icon,title,text],index)=><article key={title} style={{"--item":index}}><div><span>0{index+1}</span><Icon/></div><h3>{title}</h3><p>{text}</p><Link href="/services">Explore service <ArrowRight/></Link></article>)}</div></div></section>

    <HomeProcessTimeline/>

    <section className="section home-next-section">
      <div className="shell home-next-panel">
        <div>
          <span className="eyebrow">PropWealth NEXT</span>
          <h2>Research-based guidance for your next confident move.</h2>
          <p>PropWealth NEXT combines expert consultation, suburb-specific insights and detailed investment reports to help you make more informed property decisions.</p>
          <Link href="/propwealth-next" className="text-link">Explore PropWealth NEXT <ArrowRight/></Link>
        </div>
        <div className="home-next-console" aria-hidden="true">
          <i/><i/><i/><i/><i/>
          <span>
          <small>Research lens</small>
          <strong>Suburb-specific intelligence</strong>
          </span>
        </div>
      </div>
    </section>

    {homeProperties.length>0&&<section className="section soft home-prime-properties">
      <div className="shell">
        <div className="section-head">
          <div>
            <span className="eyebrow">Prime Properties</span>
            <h2>Opportunities viewed through a strategy lens.</h2>
          </div>
        </div>
        <PropertyExplorer properties={homeProperties} compact slider={homeProperties.length>4}/>
          <div className="properties-footer-action">
            <Link href="/properties" className="button secondary">View all properties <ArrowRight/></Link>
          </div>
      </div>
    </section>}

    <section className="section home-difference">
      <div className="shell difference-grid">
        <div className="difference-image">
          <Image src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&auto=format&fit=crop" alt="Property advisors reviewing an investment plan" fill sizes="(max-width:900px) 100vw,46vw"/>
        </div>
        <div className="difference-copy">
          <span className="eyebrow">What makes us different?</span>
          <h2>Better decisions begin with better questions.</h2>
          <p>We look beyond glossy finishes and headline yields. The wider market, the property itself and its place in your strategy all matter.</p>
          <ul>{["Tailored portfolio solutions","PropWealth NEXT research","Market relationships","Research and due diligence","Ongoing portfolio support"].map(item=><li key={item}><CheckCircle2/>{item}</li>)}</ul>
          <Link href="/about/who-we-are" className="text-link">Discover PropWealth <ArrowRight/></Link>
        </div>
      </div>
    </section>

    <section className="section soft home-testimonials-motion">
      <div className="shell">
        <div className="section-head">
          <div>
            <span className="eyebrow">Our Clients Say It Best</span>
            <h2>Confidence built through the experience.</h2>
          </div>
          <p>Selected genuine client feedback published through the PropWealth Google review feed.</p>
        </div>
        <AnimatedTestimonials testimonials={reviews} interval={4000}/>
      </div>
    </section>
  </>
}
