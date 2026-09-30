"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import Logo from "./Logo";
import s from "./components.module.css";
import { navigationGroups } from "../config/navigation";
export default function Navbar() {
  const path = usePathname();
  return <Navigation key={path} path={path}/>;
}
function Navigation({path}) {
  const [open,setOpen] = useState(false);
  const [expanded,setExpanded] = useState("");
  const [scrolled,setScrolled] = useState(false);
  const header = useRef(null), toggle = useRef(null);
  const close = () => { setOpen(false); setExpanded(""); };
  useEffect(() => {
    const updateScroll = () => setScrolled(window.scrollY > 18);
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    return () => window.removeEventListener("scroll", updateScroll);
  },[]);
  useEffect(() => {
    const dismiss = event => {
      if (!header.current?.contains(event.target)) { setOpen(false); setExpanded(""); }
    };
    const keyboard = event => {
      if(event.key === "Escape") {
        const trigger = header.current?.querySelector('[aria-expanded="true"]');
        setOpen(false); setExpanded("");
        (open ? toggle.current : trigger)?.focus();
      }
    };
    const resize = () => { if(window.innerWidth > 1100) setOpen(false); };
    document.addEventListener("pointerdown",dismiss);
    document.addEventListener("keydown",keyboard);
    window.addEventListener("resize",resize);
    return () => { document.removeEventListener("pointerdown",dismiss); document.removeEventListener("keydown",keyboard); window.removeEventListener("resize",resize); };
  },[open]);
  useEffect(() => {
    if(!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  },[open]);
  const group = key => { const item = navigationGroups[key]; const active = [item.href, ...item.links.map(([,url]) => url)].some(url => path===url || path.startsWith(url+"/")); return <div className={`${s.group} ${active ? s.active : ""} ${expanded===key ? s.submenuOpen : ""}`}>
    <Link href={item.href} onClick={close} aria-current={path===item.href ? "page" : undefined}>{item.label}</Link>
    <button type="button" className={s.submenuToggle} aria-expanded={expanded===key} aria-controls={"nav-"+key} aria-label={`Show ${item.label} submenu`} onClick={() => setExpanded(expanded===key ? "" : key)}><ChevronDown size={14}/></button>
    <div id={"nav-"+key} className={s.dropdown}>{item.links.map(([label,url]) => <Link key={url} href={url} onClick={close} aria-current={path===url ? "page" : undefined}>{label}<ArrowUpRight size={14}/></Link>)}</div>
  </div>;
  };
  return <header ref={header} className={`${s.header} ${path === "/" ? s.homeHeader : ""} ${scrolled ? s.scrolled : ""}`} onBlur={event => { if(!event.currentTarget.contains(event.relatedTarget)) close(); }}>
    <nav className={s.inner} aria-label="Main navigation">
      <Link href="/" className={s.brand} aria-label="PropWealth home" onClick={close}><Logo compact/></Link>
      <div id="main-navigation" className={s.links + (open ? " "+s.open : "")}>
        {group("services")}
        <Link href="/success-stories" onClick={close} aria-current={path.startsWith("/success-stories") ? "page" : undefined}>Success Stories</Link>
        {group("about")}{group("resources")}
        <Link href="/contact" onClick={close} aria-current={path==="/contact" ? "page" : undefined}>Contact</Link>
        <div className={s.mobileActions}><Link href="/propwealth-next" onClick={close}>PropWealth Next <ArrowUpRight size={15}/></Link><Link className={s.cta} href="/contact" onClick={close}>Book Your Free Call </Link></div>
      </div>
      <div className={s.actions}><Link className={s.next} href="/propwealth-next">PropWealth Next <ArrowUpRight size={14}/></Link><Link className={s.cta} href="/contact">Book Your Free Call </Link><button ref={toggle} className={s.toggle} type="button" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="main-navigation" onClick={() => { setOpen(!open); setExpanded(""); }}>{open ? <X/> : <Menu/>}</button></div>
    </nav>
  </header>;
}
