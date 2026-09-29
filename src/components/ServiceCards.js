import Link from "next/link";
import { ArrowUpRight, Compass, Search, KeyRound, ShieldCheck, Handshake } from "lucide-react";
import { services } from "../data/services";
import s from "./HomeLanding.module.css";
const icons = { Compass, Search, KeyRound, ShieldCheck, Handshake };
export default function ServiceCards() {
  return <div className={s.serviceGrid}>{services.map((service,i) => {
    const Icon = icons[service.icon];
    return <article className={s.service} key={service.slug}>
      <div className={s.cardTop}><Icon size={28}/><span>0{i+1}</span></div>
      <h3><Link href={"/services/"+service.slug}>{service.title}</Link></h3>
      <p>{service.description}</p>
      <Link className={s.textLink} href={"/services/"+service.slug}>Explore service <ArrowUpRight size={18}/></Link>
    </article>;
  })}</div>;
}
