"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronRight, Menu, X } from "lucide-react";
import Logo from "./Logo";

const resources = [
  ["Blogs", "Property investment guides and articles.", "/blog"],
  ["News & Insights", "Current property-market perspectives.", "/news"],
  ["Videos", "Research and guidance in visual form.", "/videos"],
  ["Webinars", "Live and recorded learning sessions.", "/webinars"],
  ["Podcasts", "Conversations with property specialists.", "/podcasts"],
  ["Calculator", "Explore negative gearing and CGT impacts.", "/calculator"]
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState("");
  const [nestedOpen, setNestedOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const path = usePathname();
  
  const close = () => {
    setOpen(false);
    setExpanded("");
    setNestedOpen(false);
  };
  
  const toggle = (name) => setExpanded((value) => (value === name ? "" : name));

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 18);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header className={`site-header futuristic-header ${path === "/" ? "home-header" : ""} ${path !== "/" && scrolled ? "scrolled" : ""}`}>
      <nav className="nav shell" aria-label="Main navigation">
        <Link className="brand-link" href="/" aria-label="PropWealth home" onClick={close}>
          <Logo compact />
        </Link>
        
        <div className={`nav-links ${open ? "open" : ""}`}>
          <Link href="/services" onClick={close} className={path === "/services" ? "active" : ""}>Services</Link>
          <Link href="/properties" onClick={close} className={path.startsWith("/properties") ? "active" : ""}>Properties</Link>

          <div className={`nav-dropdown ${path.startsWith("/about") || path === "/process" ? "active" : ""} ${expanded === "about" ? "expanded" : ""}`}>
            <button type="button" onClick={() => toggle("about")} aria-expanded={expanded === "about"}>About Us <ChevronDown /></button>
            <div className="nav-dropdown-panel future-about-menu">
              <Link href="/process" onClick={close}><strong>Our Process</strong><span>A disciplined journey from strategy to settlement.</span></Link>
              <Link href="/about/who-we-are" onClick={close}><strong>Who We Are</strong><span>Our purpose, people and research-led approach.</span></Link>
              <div className={`future-guide-group ${nestedOpen ? "nested-open" : ""}`} onMouseEnter={() => setNestedOpen(true)} onMouseLeave={() => setNestedOpen(false)}>
                <button type="button" className="nested-menu-trigger" onClick={() => setNestedOpen((value) => !value)} aria-expanded={nestedOpen}>
                  <span><strong>Who We Guide</strong><small>Choose the pathway that reflects your position.</small></span>
                  <ChevronRight aria-hidden="true" />
                </button>
                <div className="guide-submenu">
                  <Link className="guide-overview" href="/about/who-we-guide" onClick={close}>View overview</Link>
                  <Link href="/about/who-we-guide/rentvestors" onClick={close}>Rentvestors</Link>
                  <Link href="/about/who-we-guide/portfolio-investors" onClick={close}>Portfolio investors</Link>
                  <Link href="/about/who-we-guide/large-portfolio-investors" onClick={close}>Large portfolio investors</Link>
                </div>
              </div>
            </div>
          </div>

          <div className={`nav-dropdown resource-dropdown ${["/resources", "/blog", "/news", "/videos", "/webinars", "/podcasts", "/calculator"].some((route) => path === route || path.startsWith(`${route}/`)) ? "active" : ""} ${expanded === "resources" ? "expanded" : ""}`}>
            <button type="button" onClick={() => toggle("resources")} aria-expanded={expanded === "resources"}>Resources <ChevronDown /></button>
            <div className="nav-dropdown-panel resource-menu">
              <Link className="dropdown-overview" href="/resources" onClick={close}><strong>Resource library</strong><span>Explore every learning format.</span></Link>
              {resources.map(([title, description, href]) => (
                <Link key={href} href={href} onClick={close}><strong>{title}</strong><span>{description}</span></Link>
              ))}
            </div>
          </div>

          <Link href="/contact" onClick={close} className={path === "/contact" ? "active" : ""}>Contact</Link>
          
          {/* Action Buttons (Visible on Mobile inside menu, and Desktop on the right) */}
          {/* <div className="nav-conversion-actions mobile-nav-actions">
            <Link href="/propwealth-next" onClick={close} className="button nav-next">PropWealth Next</Link>
            <Link href="/contact" onClick={close} className="button nav-cta">Book Appointment</Link>
          </div> */}
        </div>

        <div className="nav-actions">
          {/* Desktop Action Buttons (Right Corner) */}
          <div className="nav-conversion-actions desktop-nav-actions">
            <Link href="/propwealth-next" onClick={close} className="button nav-next">PropWealth Next</Link>
            <Link href="/contact" onClick={close} className="button nav-cta">Book Appointment</Link>
          </div>
          
          <button className="icon-button menu-button" onClick={() => setOpen((value) => !value)} aria-label="Toggle menu" aria-expanded={open}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </nav>
    </header>
  );
}