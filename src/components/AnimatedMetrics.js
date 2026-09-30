"use client";
import { useEffect, useRef, useState } from "react";
import s from "./components.module.css";

const metrics = [[500, "$", "M+", "Value of Properties Acquired"], [800, "", "+", "Total Deals Completed"], [31, "", "%", "Equity Growth (in 12 Months)"]];

export default function AnimatedMetrics() {
  const ref = useRef(null);
  const [started, setStarted] = useState(false);
  const [values, setValues] = useState(metrics.map(() => 0));
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect(); } }, { threshold: 0.35 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!started) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) { const frame = requestAnimationFrame(() => setValues(metrics.map(([value]) => value))); return () => cancelAnimationFrame(frame); }
    const start = performance.now();
    let frame;
    const tick = now => {
      const progress = Math.min(1, (now - start) / 1500);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValues(metrics.map(([value]) => Math.round(value * eased)));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [started]);
  return <div className={s.proof} ref={ref}>{metrics.map(([target, prefix, suffix, label], index) => <div className={s.metricBox} key={label}><strong>{prefix}{values[index]}{suffix}</strong><span>{label}</span></div>)}</div>;
}
