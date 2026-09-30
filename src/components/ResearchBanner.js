"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowUpRight, Building2, ChartNoAxesCombined, CircleDollarSign, FileText, House, MapPinned, MapPin, MessageCircle, Search } from "lucide-react";
import { australianSuburbs } from "../data/australianSuburbs";
import s from "./components.module.css";
export default function ResearchBanner() {
  const [suburb, setSuburb] = useState("");
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const router = useRouter();
  const submitSearch = event => {
    event.preventDefault();
    const query = suburb.trim();
    router.push(`/propwealth-next${query ? `?suburb=${encodeURIComponent(query)}` : ""}#locations`);
  };
  const query = suburb.trim().toLocaleLowerCase();
  const suggestions = query ? australianSuburbs.filter(name => name.toLocaleLowerCase().includes(query)).sort((a,b) => {
    const aStarts = a.toLocaleLowerCase().startsWith(query);
    const bStarts = b.toLocaleLowerCase().startsWith(query);
    return aStarts === bStarts ? a.localeCompare(b) : aStarts ? -1 : 1;
  }).slice(0, 6) : [];
  const chooseSuburb = name => { setSuburb(name); setSuggestionsOpen(false); router.push(`/propwealth-next?suburb=${encodeURIComponent(name)}#locations`); };
  return <section className={s.section}><div className={s.wrap}><div className={s.nextPanel}>
    <div><span className={s.kicker}>Meet PropWealth <b>NEXT</b></span><h2>The Research Behind<br/><em>Better Property Decisions</em></h2><p>PropWealth Next puts expert advice, suburb data and investment reports in one place. It helps you understand the market before choosing a property.</p>
      <ul className={s.features}>{[[MessageCircle,"Expert consultation","Talk through your goals with a property specialist."],[MapPin,"Suburb-specific intelligence","See the local factors shaping an investment decision."],[FileText,"Detailed investment reports","Turn organised research into a clear next step."]].map(([Icon,label,description], index) => <li key={label}><span className={s.featureIndex}>0{index + 1}</span><span className={s.featureIcon}><Icon size={18}/></span><span className={s.featureCopy}><strong>{label}</strong><small>{description}</small></span></li>)}</ul>
      <Link href="/propwealth-next" className={s.primary}>Explore PropWealth Next <ArrowUpRight size={18}/></Link>
    </div><div className={s.research}><div className={s.researchHeader}><span>PROPWEALTH <b>NEXT</b></span><div className={s.researchSearchWrap}><form className={s.researchSearch} onSubmit={submitSearch}><input value={suburb} onFocus={() => setSuggestionsOpen(true)} onChange={event => { setSuburb(event.target.value); setSuggestionsOpen(true); }} placeholder="Enter Your Subrub Name" aria-label="Enter your suburb name"/><button type="submit" aria-label="Search the location explorer"><Search size={17}/></button></form>{suggestionsOpen && suggestions.length > 0 && <ul className={s.suburbSuggestions}>{suggestions.map(name => <li key={name}><button type="button" onMouseDown={event => event.preventDefault()} onClick={() => chooseSuburb(name)}>{name}</button></li>)}</ul>}</div></div>
    {/* <small>What we check</small> */}
    <h3>Detailed Analysis On Each Subrub</h3>
    <small className={s.researchLabel}>What You&apos;ll Get</small>
    <div className={s.researchTopics}>{[[House,"House Trends"],[Building2,"Unit Trends"],[ChartNoAxesCombined,"Rent Trends"],[CircleDollarSign,"Price Segments"],[MapPinned,"Elevation"],[MapPin,"Profiles"]].map(([Icon,label]) => <div key={label}><Icon size={16}/><span>{label} Analysis</span><ArrowUpRight className={s.topicArrow} size={15}/></div>)}</div><p>See the information that sits behind a confident property decision.</p></div>
  </div></div></section>;
}
