import Link from "next/link";
import { ArrowUpRight, Compass, Search, KeyRound, ShieldCheck, Handshake } from "lucide-react";
import { services } from "../data/services";
import s from "./components.module.css";
const icons = { Compass, Search, KeyRound, ShieldCheck, Handshake };
export default function ServiceCards() {
  return <div className={s.serviceGrid}>{services.map(service => {
    const Icon = icons[service.icon];
    const [firstLine, secondLine] = service.cardTitleLines || [service.title, ""];
    return <Link className={s.service} href={"/services/"+service.slug} key={service.slug}>
      <div className={s.serviceTitleRow}><h3><span>{firstLine}</span><span>{secondLine}</span></h3></div>
      <p>{service.description}</p>
      <span className={s.textLink}>Explore service <ArrowUpRight size={18}/></span><span className={s.cornerMotion} aria-hidden="true"><Icon/></span>
    </Link>;
  })}</div>;
}
