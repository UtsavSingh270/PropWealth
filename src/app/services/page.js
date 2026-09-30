import PageHero from "../../components/PageHero";
import ServiceCards from "../../components/ServiceCards";
import Link from "next/link";
import { ArrowRight, BarChart3, Handshake, Target } from "lucide-react";
import s from "../../components/components.module.css";
export const metadata={title:"Our Services",description:"Five connected services across wealth creation strategy, research, acquisition, due diligence and negotiation."};
export default function Services() { return <div className={s.home}>
  <PageHero eyebrow="Strategy. Research. Acquisition." title="Five services. One considered property journey.">From a clear wealth creation strategy to a carefully executed purchase, explore the expertise behind your next move.</PageHero>
  <section className={s.section}><div className={s.wrap}><ServiceCards/></div></section>
  <section className={s.softSection}>
    <div className={s.wrap}>
      <div className={s.proof}>
        <div>
          <strong>$500M+</strong>
          <span>Property value acquired</span>
        </div>
        <div>
          <strong>800+</strong>
          <span>Total Deals Completed</span>
        </div>
        <div>
          <strong>31%</strong>
          <span>Equity Growth (in 12 Months)</span>
        </div>
      </div>
    </div>
  </section>
  <section className={s.section}><div className={s.wrap}><div className={s.heading}><div><span className={s.kicker}>One connected team</span><h2>Clear advice at every <em>important decision.</em></h2><p>Each service can stand alone, but they work best together. Your strategy guides the research, the research shapes the shortlist, and the acquisition work keeps the final decision aligned with your plan.</p></div></div><div className={s.grid3}>{[[Target,"Start with a clear brief","We learn where you are today, what you want to achieve and the role this purchase should play."],[BarChart3,"Use research with context","We look beyond the listing to the market movement, demand, supply and rental performance behind it."],[Handshake,"Move forward with support","From assessment and due diligence to negotiation and settlement, our team helps you make the next step with clarity."]].map(([Icon,title,text])=><article className={s.review} key={title}><Icon size={25}/><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>
</div> }
