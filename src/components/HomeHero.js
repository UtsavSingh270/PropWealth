"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, BarChart3, CheckCircle2, MapPinned, Target } from "lucide-react";
import s from "./components.module.css";

export default function HomeHero() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const sessionKey = "propwealth-home-intro-seen";
    let animationFrame;
    let timer;
    const reveal = () => {
      animationFrame = window.requestAnimationFrame(() => setReady(true));
    };
    try {
      if (window.sessionStorage.getItem(sessionKey)) {
        reveal();
      } else {
        window.sessionStorage.setItem(sessionKey, "true");
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        timer = window.setTimeout(reveal, reducedMotion ? 0 : 1750);
      }
    } catch {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      timer = window.setTimeout(reveal, reducedMotion ? 0 : 1750);
    }
    return () => {
      if (timer) window.clearTimeout(timer);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return <section className={`${s.hero} ${s.heroLanding} ${ready ? s.heroReady : ""}`} aria-label="Property investing with PropWealth">
    <div className={s.heroIntro} aria-hidden="true">
      <div className={s.heroIntroMark}><i /><i /></div>
      <span className={s.heroIntroBrand}>PROPWEALTH</span>
      <strong>Make your next move<br />make more sense.</strong>
      <div className={s.heroIntroSteps}><span>STRATEGY</span><i /><span>RESEARCH</span><i /><span>PROPERTY</span></div>
    </div>
    <div className={s.heroAura} aria-hidden="true"><i /><i /><i /></div>
    <div className={`${s.wrap} ${s.heroContent}`}>
      <div className={s.heroCopy}>
        <span className={s.kicker}>PROPWEALTH BUYERS AGENCY</span>
        <h1>Build the next chapter<br />of your <em>property story.</em></h1>
        <p>Start with a clear strategy, use deeper suburb research and choose a property that has a defined place in your long-term plan.</p>
        <div className={s.heroActions}>
          <Link href="/contact" className={s.primary}>Book Your Free Call <ArrowRight size={18} /></Link>
          <Link href="/propwealth-next" className={s.heroSecondary}>Explore PropWealth Next <ArrowUpRight size={17} /></Link>
        </div>
        <div className={s.heroTrust}><span><CheckCircle2 size={16} /> Strategy-led advice</span><span><CheckCircle2 size={16} /> Research before recommendations</span></div>
      </div>

      <div className={s.heroVisual} aria-label="PropWealth Next research preview">
        <div className={s.heroDashboard}>
          <div className={s.heroDashboardTop}><span>PROPWEALTH <b>NEXT</b></span><span className={s.heroStatus}><i /> LIVE RESEARCH</span></div>
          <div className={s.heroDashboardBody}>
            <div className={s.heroDashboardTitle}><span><MapPinned size={16} /> LOCATION INTELLIGENCE</span><strong>Understand the market<br />behind the address.</strong></div>
            <div className={s.heroChart}>
              <div className={s.heroChartLabel}><span>Market context</span><b>Clearer view</b></div>
              <svg viewBox="0 0 340 122" role="img" aria-label="Rising market analysis trend">
                <path className={s.heroChartGrid} d="M0 99H340M0 61H340M0 23H340" />
                <path className={s.heroChartArea} d="M0 102 C25 96 37 79 63 83 S91 91 114 72 S141 51 164 63 S194 79 218 48 S258 23 278 36 S311 24 340 8 V122 H0Z" />
                <path className={s.heroChartLine} d="M0 102 C25 96 37 79 63 83 S91 91 114 72 S141 51 164 63 S194 79 218 48 S258 23 278 36 S311 24 340 8" />
                <circle className={s.heroChartPoint} cx="278" cy="36" r="5" />
              </svg>
              <div className={s.heroChartTags}><span>House trends</span><span>Rent trends</span><span>Demand</span></div>
            </div>
          </div>
          <div className={s.heroDashboardBottom}><div><small>FROM STRATEGY TO PROPERTY</small><strong>Every next move needs a reason.</strong></div><BarChart3 size={21} /></div>
        </div>
        {/* <div className={s.heroFloatingGoal}><span>
          <Target size={15} /></span>
        <div><small>YOUR BRIEF</small>
        <strong>Build long-term equity</strong>
        </div>
        <CheckCircle2 size={17} />
        </div> */}
        <div className={s.heroFloatingProof}><span>01</span><div><strong>Research first</strong><small>PropWealth Next adds market context.</small></div></div>
      </div>
    </div>
  </section>;
}
