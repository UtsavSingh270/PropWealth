import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import Logo from "./Logo";

export default function Footer() {
  return <footer className="footer">
    <div className="shell footer-grid">
      <div className="footer-brand">
        <Logo/>
        <p>Research-led property guidance for Australians who want to invest with clarity and grow with confidence.</p>
      </div>
      <div className="footer-explore">
        <h3>Explore</h3>
        <Link href="/services">Our Services</Link>
        <Link href="/success-stories">Success Stories</Link>
        <Link href="/process">About Us</Link>
        {/* <Link href="/resources">Resources</Link> */}
        <Link href="/propwealth-next">PropWealth NEXT</Link>
        <Link href="/contact">Contact</Link>
      </div>
      <div className="footer-company">
        <h3>Resources</h3>
        <Link href="/about">Blogs & Insights</Link>
        <Link href="/webinars">Webinars & Podcasts</Link>
        <Link href="/resources">Downloadable Resources</Link>
        <Link href="/faq">Negative Gearing and CGT Impact Calculator</Link>
      </div>
      <div className="footer-contact">
        <h3>Get in touch</h3>
        <div className="footer-contact-row">
          <a href="tel:+61409016393"><Phone size={15}/> 0409 016 393</a>
          <a href="mailto:info@propwealth.com.au"><Mail size={15}/> info@propwealth.com.au</a>
          <p className="address"><MapPin size={15}/> 215/33 Lexington Dr, Bella Vista NSW 2153</p>
          <p className="address"><MapPin size={15}/> Level 6, 30/231 North Quay, Brisbane City QLD 4000</p>
        </div>
      </div>
    </div>
    <div className="shell footer-bottom">
      <span>© {new Date().getFullYear()} PropWealth. All rights reserved.</span>
      <div>
        <Link href="/privacy">Privacy</Link>
        <Link href="/terms">Terms</Link>
        <Link href="/disclaimer">Disclaimer</Link>
      </div>
    </div>
  </footer>
}
