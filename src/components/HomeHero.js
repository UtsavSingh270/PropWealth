"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";

const audiences = [
  ["01", "Rentvestors", "Get into the market early with expert help and kick things off with a deposit starting at $25,000.", "/about/who-we-guide/rentvestors"],
  ["02", "Portfolio Investors", "You’ve started your investment journey—now grow it smartly.", "/about/who-we-guide/portfolio-investors"],
  ["03", "Large Portfolio Investors", "Maximise every asset and keep your long-term portfolio moving.", "/about/who-we-guide/large-portfolio-investors"]
];
const stats = [
  ["$310M", "Value of properties acquired"], 
  ["532+", "Total deals completed"], 
  ["37%", "Equity growth in 12 months"]
];

export default function HomeHero() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const frameRef = useRef(0);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const update = () => {
      frameRef.current = 0;
      const section = sectionRef.current;
      if (!section) return;
      
      const rect = section.getBoundingClientRect();
      const range = Math.max(section.offsetHeight - window.innerHeight, 1);
      const progress = Math.min(1, Math.max(0, -rect.top / range));
      const reveal = Math.min(1, Math.max(0, (progress - .08) / .3));
      
      section.style.setProperty("--hero-progress", reveal.toFixed(4));
      section.style.setProperty("--hero-scroll-progress", progress.toFixed(4));
      section.style.setProperty("--hero-blur", `${(reveal * 1.6).toFixed(2)}px`);
      section.dataset.revealed = reveal > .05 ? "true" : "false";
      document.documentElement.dataset.heroRevealed = progress > .2 ? "true" : "false";
    };
    
    const requestUpdate = () => {
      if (!frameRef.current) frameRef.current = requestAnimationFrame(update);
    };
    
    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    
    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      delete document.documentElement.dataset.heroRevealed;
    };
  }, []);

  const toggleVideo = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
    video.play().catch(() => {});
  };

  return (
    <section ref={sectionRef} className="cinematic-hero" style={{ "--hero-progress": 0 }}>
      <div className="cinematic-stage">
        <video 
          ref={videoRef} 
          className="cinematic-video cinematic-video-fix" 
          src="/Propwealth_Hero_SHOTS_with-sound.mp4" 
          autoPlay 
          muted 
          loop 
          playsInline 
          preload="auto" 
          aria-label="PropWealth property and advisory highlights" 
        />
        
        {/* Dark cinematic overlay - opacity is controlled by JS scroll progress */}
        <div className="cinematic-overlay-fix"></div>
        
        <div className="cinematic-intro" aria-hidden="true">
          <span><Play /> Scroll to explore</span>
        </div>
        
        <div className="cinematic-content cinematic-content-fix">
          <div className="shell cinematic-shell-fix">
            
            {/* Top Content */}
            <div className="hero-center-text">
              <h1>Welcome to <span>PropWealth</span></h1>
              <p>Your Shortcut to Millionaire Status</p>
              <div className="actions">
                <Link href="/contact" className="button">Make Your Move</Link>
                <button type="button" className="button hero-watch-btn" onClick={toggleVideo}>
                  <Play />{muted ? "Watch Video" : "Mute Video"}
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="hero-stats-fix">
              {stats.map(([value, label]) => (
                <div key={label}>
                  <strong>{value}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>

            {/* Pathways */}
            <div className="hero-paths-fix">
              {audiences.map(([number, title, text, href]) => (
                <Link href={href} key={title} className="hero-path-card">
                  <div className="path-head">
                    <span>{number}</span>
                    <i><ArrowRight /></i>
                  </div>
                  <h2>{title}</h2>
                  <p>{text}</p>
                </Link>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}