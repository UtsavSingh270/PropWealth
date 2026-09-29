import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { services } from "../../../data/services";
import PageHero from "../../../components/PageHero";
import HomeProcessTimeline from "../../../components/HomeProcessTimeline";
import s from "../../../components/HomeLanding.module.css";
export function generateStaticParams(){return services.map(({slug})=>({slug}))}
export async function generateMetadata({params}){const {slug}=await params;const service=services.find(s=>s.slug===slug);return {title:service?.title||"Service not found",description:service?.description}}
export default async function ServiceDetail({params}){
  const {slug}=await params;const service=services.find(s=>s.slug===slug);if(!service)notFound();
  return <div className={s.home}><PageHero eyebrow={service.title} title={service.hook}>{service.description}</PageHero>
    <section className={s.section}><div className={s.wrap+" "+s.difference}><div><span className={s.kicker}>What this means for you</span><h2>A clear purpose.<br/><em>A practical outcome.</em></h2><p>{service.outcome}</p><Link className={s.primary} href="/contact">Discuss your goals <ArrowRight size={18}/></Link></div><div><h3>How we can help</h3><ul className={s.features}>{service.points.map(point=><li key={point}><Check size={18}/>{point}</li>)}</ul></div></div></section>
    <HomeProcessTimeline/>
    <section className={s.section}><div className={s.wrap+" "+s.nextPanel}><div><span className={s.kicker}>See the approach in practice</span><h2>From a clear brief<br/><em>to a considered purchase.</em></h2><p>Explore client journeys, property examples and the research behind the decisions.</p></div><Link className={s.primary} href="/success-stories">Explore Success Stories <ArrowRight size={18}/></Link></div></section>
  </div>
}
