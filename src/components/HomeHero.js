"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Pause, Play } from "lucide-react";
import s from "./components.module.css";

export default function HomeHero() {
  const video = useRef(null);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      if (media.matches) video.current?.pause();
      else video.current?.play().catch(() => {});
    };
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  const toggle = () => {
    if (video.current.paused) video.current.play().catch(() => {});
    else video.current.pause();
  };
  return <section className={s.hero} aria-label="Property investing with PropWealth">
    <video ref={video} className={s.heroVideo} src="/Propwealth_Hero_SHOTS_with-sound.mp4" poster="/CTA.jpg" muted loop playsInline preload="metadata" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} aria-hidden="true" />
    <div className={s.heroShade}/>
    {/* <button className={s.videoControl} onClick={toggle} aria-label={playing ? "Pause background video" : "Play background video"}>{playing ? <Pause size={16}/> : <Play size={16}/>}</button> */}
    <div className={s.wrap + " " + s.heroContent}>
      <span className={s.kicker}>Your goals. Our strategy. Your next chapter.</span>
      <h1>Don’t just buy property.<br/>Build your <em>next chapter.</em></h1>
      <div className={s.heroBottom}><p>We’re an Australian buyer’s agency turning your property goals into a clear plan — with market research, the right property and guidance at every step.</p><div><Link href="/contact" className={s.primary}>Book Your Free Call <ArrowRight size={18}/></Link><small>A real conversation. No obligation.</small></div></div>
      {/* <div className={s.heroFoot}><span>Strategy → Research → Property → Beyond</span><a href="#success">Discover the PropWealth approach ↓</a></div> */}
    </div>
  </section>;
}
