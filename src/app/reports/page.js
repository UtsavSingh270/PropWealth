import Link from "next/link";
import { ArrowUpRight, Download, FileText, TrendingUp } from "lucide-react";
import PageHero from "../../components/PageHero";
import s from "../../components/HomeLanding.module.css";

export const metadata = { title: "Downloadable Resources", description: "Market analysis, property investment guides and downloadable resources from PropWealth." };
const reports = [
  ["Australian Property Market Snapshot", "A practical overview of the market signals investors should be watching.", "Market analysis"],
  ["Property Investor’s Acquisition Checklist", "A clear checklist for strategy, research, due diligence and negotiation.", "Investor guide"],
  ["Suburb Research Worksheet", "Organise the demand, supply, rental and growth signals behind a location.", "Research tool"]
];
export default function Reports() { return <div className={s.home}><PageHero eyebrow="Downloadable resources" title="Useful research for your next property decision.">Stay informed with practical market analysis, checklists and guides from the PropWealth team.</PageHero><section className={s.section}><div className={s.wrap}><div className={s.grid3}>{reports.map(([title,description,category], index) => <article className={s.service} key={title}><div className={s.cardTop}><span>0{index+1}</span><Download size={25}/></div><small>{category}</small><h3>{title}</h3><p>{description}</p><Link className={s.primary} href="/contact">Request this resource <ArrowUpRight size={17}/></Link></article>)}</div></div></section><section className={s.softSection}><div className={s.wrap}><div className={s.nextPanel}><div><span className={s.kicker}>Research and guidance</span><h2>Want the market context<br/><em>behind the report?</em></h2><p>PropWealth Next brings expert consultation, suburb-specific intelligence and detailed investment reports together in one research-led experience.</p><Link className={s.primary} href="/propwealth-next">Explore PropWealth Next <ArrowUpRight size={18}/></Link></div><div className={s.research}><FileText size={30}/><h3>Insight made useful.</h3><p>Use organised research to support a more informed next step in real estate.</p><TrendingUp size={22}/></div></div></div></section></div>; }
