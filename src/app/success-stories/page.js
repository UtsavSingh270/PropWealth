import Image from "next/image";
import { Bath,BedDouble,MapPin,TrendingUp } from "lucide-react";
import PageHero from "../../components/PageHero";
import { getProperties } from "../../lib/properties";

export const metadata={title:"Success Stories"};
export const dynamic="force-dynamic";

export default async function Stories(){
  const properties=await getProperties(); const sold=properties.filter(p=>p.status==="Sold Out");
  return <><PageHero eyebrow="Properties secured by us" title="Real purchases. Clear strategies. Stronger portfolios.">A selection of properties acquired for clients through research, due diligence and disciplined negotiation.</PageHero>
    <section className="section"><div className="shell"><div className="section-head"><div><span className="eyebrow">Recently secured</span><h2>Sold properties from across our network.</h2></div><p>These examples show the breadth of briefs we support. Figures are illustrative and do not guarantee future performance.</p></div><div className="property-grid">{sold.map((p,index)=><article className="property-card interactive-card reveal-card" style={{"--delay":`${index*70}ms`}} key={p.slug}><div className="property-image"><Image src={p.image} alt={p.title} fill sizes="(max-width:700px) 100vw,33vw"/><span className="tag status-sold-out">Sold by PropWealth</span></div><div className="property-body"><small className="pink">{p.category} · {p.growth}</small><h3>{p.title}</h3><div className="property-place"><MapPin size={15}/>{p.suburb}, {p.state}</div><div className="property-price">${p.price.toLocaleString("en-AU")}</div><div className="property-meta"><span><BedDouble/>{p.beds}</span><span><Bath/>{p.baths}</span><span><TrendingUp/>{p.yield}% indicative yield</span></div><p>{p.description}</p></div></article>)}</div></div></section>
    <section className="section soft"><div className="shell grid three">{[["First investment, clearer future","A focused brief transformed a national market into a confident first acquisition."],["Equity put back to work","A portfolio review helped turn available equity into a complementary second asset."],["Yield with fundamentals","The search balanced cash flow with employment, market depth and resale demand."]].map(([title,text])=><article className="card" key={title}><h3>{title}</h3><p>{text}</p></article>)}</div></section></>;
}
