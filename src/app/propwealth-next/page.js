import Link from "next/link";
import { ArrowDown,ArrowRight,BarChart3,Check,FileSearch,MessagesSquare } from "lucide-react";

const features=[
  [MessagesSquare,"Expert consultation","Discuss where to invest and which suburbs may fit your goals with the PropWealth team."],
  [FileSearch,"Suburb-specific insights","Explore location information in the context of your property investment plans."],
  [BarChart3,"Detailed investment reports","Use organised research to support a more informed next step in real estate."]
];

export const metadata={title:"PropWealth Next",description:"Data-driven insights, suburb-specific reports and expert property investment consultation from PropWealth Next."};

export default function PropWealthNext(){return <>
  <section className="next-hero">
    <div className="shell next-hero-grid">
      <div>
        <span className="eyebrow">PropWealth Next</span>
        <h1>Data-driven clarity for your next property decision.</h1>
        <p>PropWealth Next gives you data-driven insights, reports, and expert consultation to help you make informed property investment decisions.</p>
        <div className="actions"><a className="button" href="#locations">Analyse suburbs and get reports <ArrowDown/></a><Link className="button secondary" href="/contact">Book an appointment</Link></div>
      </div>
      <div className="next-hero-console" aria-label="PropWealth Next research overview">
        <div className="console-head"><span/><span/><span/><small>PROPERTY RESEARCH / AU</small></div>
        <div className="console-map"><i/><i/><i/><i/><i/></div>
        <div className="console-data"><span><small>Research focus</small><strong>Location intelligence</strong></span><span><small>Designed for</small><strong>Confident decisions</strong></span></div>
      </div>
    </div>
  </section>

  <section className="section next-intro-section"><div className="shell next-intro-panel"><div className="next-intro-heading"><span className="eyebrow">What is PropWealth Next?</span><h2>Your gateway to <span>smarter property investing.</span></h2></div><div className="next-intro-content"><p>It combines expert consultation, suburb-specific insights, and detailed investment reports, all designed to help you take your next confident step in real estate.</p><p>Whether you’re buying your first property or adding to your portfolio, PropWealth Next offers the clarity and guidance to move forward with certainty.</p><ul><li><Check/>Expert consultation</li><li><Check/>Suburb-specific intelligence</li><li><Check/>Detailed investment reports</li></ul><Link href="/about/who-we-are" className="button secondary">Learn more about PropWealth <ArrowRight/></Link></div></div></section>

  <section className="section soft"><div className="shell"><div className="section-head"><div><span className="eyebrow">Research and guidance</span><h2>Insight made useful.</h2></div><p>Professional context around the locations and reports you are considering.</p></div><div className="next-feature-grid">{features.map(([Icon,title,text])=><article key={title}><Icon/><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></div></section>

  <section className="section next-locations-section" id="locations"><div className="shell"><div className="section-head"><div><span className="eyebrow">Location explorer</span><h2>Analyse suburbs and explore reports.</h2></div><p>Use the embedded PropWealth Next location experience below.</p></div><div className="locations-embed"><div className="embed-toolbar"><span><i/> PropWealth Next Locations</span><a href="https://propwealth.com.au/propwealth-next-locations/" target="_blank" rel="noreferrer">Open in a new tab <ArrowRight/></a></div><iframe src="https://propwealth.com.au/propwealth-next-locations/" width="100%" height="920" loading="lazy" title="PropWealth Next suburb locations and reports"/></div></div></section>

  </>}
