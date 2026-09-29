import Link from "next/link";
import { ArrowUpRight, FileText, MapPin, MessageCircle, Search } from "lucide-react";
import s from "./HomeLanding.module.css";
export default function ResearchBanner() {
  return <section className={s.section}><div className={s.wrap}><div className={s.nextPanel}>
    <div><span className={s.kicker}>Meet PropWealth <b>NEXT</b></span><h2>The research behind<br/><em>better property decisions.</em></h2><p>We don’t only look at properties. We look at the data behind the market. Bring your next decision into focus with suburb intelligence, market comparisons and guidance that fits your goals.</p>
      <ul className={s.features}>{[[MessageCircle,"Expert consultation"],[MapPin,"Suburb-specific intelligence"],[FileText,"Detailed investment reports"]].map(([Icon,label]) => <li key={label}><Icon size={18}/>{label}</li>)}</ul>
      <Link href="/propwealth-next" className={s.primary}>Explore PropWealth Next <ArrowUpRight size={18}/></Link>
    </div><div className={s.research}><div className={s.researchHeader}><span>PROPWEALTH <b>NEXT</b></span><Search size={17}/></div>
    <small>YOUR RESEARCH LENS</small>
    <h3>One location.<br/>The bigger picture.</h3><div className={s.researchTopics}>{["Suburb data & market trends","Growth & market movement","Supply & demand","Rental performance","Property & market comparisons"].map((x,i) => <div key={x}><span>0{i+1}</span>{x}<ArrowUpRight size={15}/></div>)}</div><p>Organised research, interpreted in the context of your next property decision.</p></div>
  </div></div></section>;
}
