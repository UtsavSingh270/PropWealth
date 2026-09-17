import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function SiteCta(){
  return <section className="site-cta-section" aria-label="Start a conversation">
    <div className="shell site-cta-card">
      <div className="site-cta-copy"><span className="eyebrow">Your next move</span><h2>Build a portfolio with purpose.</h2><p>Turn your goals into a clear, research-led property strategy with a team that listens first.</p><Link className="button" href="/contact">Start a conversation <ArrowUpRight size={18}/></Link></div>
      <div className="site-cta-image"><Image src="/CTA.jpg" alt="Property advisors discussing an investment strategy" fill sizes="(max-width: 760px) 100vw, 48vw"/></div>
    </div>
  </section>
}
