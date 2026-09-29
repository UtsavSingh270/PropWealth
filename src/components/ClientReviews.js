import Link from "next/link";
import { ArrowUpRight, Quote } from "lucide-react";
import { clientReviews } from "../data/reviews";
import s from "./HomeLanding.module.css";
export default function ClientReviews() {
  return <section className={s.softSection} id="client-reviews"><div className={s.wrap}>
    <div className={s.heading}><div><span className={s.kicker}>Client reviews</span><h2>What our clients say<br/><em>about working with us.</em></h2></div><Link className={s.textLink} href="https://www.google.com/maps/search/?api=1&query=PropWealth+Bella+Vista" target="_blank" rel="noopener noreferrer">Find us on Google <ArrowUpRight size={18}/></Link></div>
    <div className={s.grid3}>{clientReviews.map(([name,quote]) => <figure className={s.review} key={name}><Quote size={27}/><blockquote>{quote}</blockquote><figcaption><span>{name.slice(0,1)}</span><div><strong>{name}</strong><small>Client testimonial</small></div></figcaption></figure>)}</div>
  </div></section>;
}
