import PageHero from "../../components/PageHero";
import ServiceCards from "../../components/ServiceCards";
import s from "../../components/HomeLanding.module.css";
export const metadata={title:"Our Services",description:"Five connected services across wealth creation strategy, research, acquisition, due diligence and negotiation."};
export default function Services() { return <div className={s.home}>
  <PageHero eyebrow="Strategy. Research. Acquisition." title="Five services. One considered property journey.">From a clear wealth creation strategy to a carefully executed purchase, explore the expertise behind your next move.</PageHero>
  <section className={s.section}><div className={s.wrap}><ServiceCards/></div></section>
  <section className={s.softSection}><div className={s.wrap}><div className={s.proof}><div><strong>$500M+</strong><span>Property value acquired</span></div><div><strong>800+</strong><span>Deals completed</span></div><p>A connected team across strategy, research and execution, with your longer-term property goals at the centre.</p></div></div></section>
</div> }
