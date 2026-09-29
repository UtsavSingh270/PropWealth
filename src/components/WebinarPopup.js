"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, X } from "lucide-react";
import s from "./HomeLanding.module.css";

export default function WebinarPopup({ webinar }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setOpen(true), 4500);
    return () => clearTimeout(timer);
  }, []);
  if (!open) return null;
  const date = webinar?.eventDate ? new Intl.DateTimeFormat("en-AU", { dateStyle: "medium", timeStyle: "short", timeZone: "Australia/Sydney" }).format(new Date(webinar.eventDate)) : "New sessions added regularly";
  return <div className={s.webinarBackdrop} role="presentation" onMouseDown={() => setOpen(false)}>
    <section className={s.webinarModal} role="dialog" aria-modal="true" aria-labelledby="webinar-popup-title" onMouseDown={event => event.stopPropagation()}>
      <button className={s.webinarClose} onClick={() => setOpen(false)} aria-label="Close webinar invitation"><X size={18}/></button>
      <div className={s.webinarModalImage}>{webinar?.coverImage ? <Image src={webinar.coverImage} alt="" fill sizes="(max-width: 700px) 100vw, 360px"/> : <div className={s.webinarArt}><span>PROPWEALTH / LEARN</span><strong>Make your next move clearer.</strong></div>}</div>
      <div className={s.webinarModalCopy}><span className={s.kicker}><CalendarDays size={15}/>Upcoming webinar</span><h2 id="webinar-popup-title">{webinar?.title || "Property strategy, made practical."}</h2><p>{webinar?.excerpt || "Join the PropWealth team for a focused session on research, strategy and the next step in your property journey."}</p><small>{date}{webinar?.duration ? ` · ${webinar.duration}` : ""}</small><Link className={s.primary} href={webinar ? `/webinars/${webinar.slug}` : "/webinars"} onClick={() => setOpen(false)}>View & register <ArrowRight size={17}/></Link></div>
    </section>
  </div>;
}
