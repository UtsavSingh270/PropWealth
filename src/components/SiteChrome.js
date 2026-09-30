"use client";

import { usePathname } from "next/navigation";
import ConsentAnalytics from "./ConsentAnalytics";
import CookieConsent from "./CookieConsent";
import Footer from "./Footer";
import JsonLd from "./JsonLd";
import Navbar from "./Navbar";
import PageAnalytics from "./PageAnalytics";
import SiteCta from "./SiteCta";
import WelcomeLeadPopup from "./WelcomeLeadPopup";
const organisation={"@context":"https://schema.org","@type":["Organization","RealEstateAgent"],name:"PropWealth",url:"https://propwealth.com.au",email:"info@propwealth.com.au",telephone:"+61 409 016 393",address:[{"@type":"PostalAddress",streetAddress:"215/33 Lexington Drive",addressLocality:"Bella Vista",addressRegion:"NSW",postalCode:"2153",addressCountry:"AU"},{"@type":"PostalAddress",streetAddress:"Level 6, 30/231 North Quay",addressLocality:"Brisbane City",addressRegion:"QLD",postalCode:"4000",addressCountry:"AU"}]};
export default function SiteChrome({ children }) {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) return <main className="admin-main">{children}</main>;

  return <>
    <JsonLd id="propwealth-organisation" data={organisation}/>
    <Navbar/>
    <main>{children}</main>
    {pathname !== "/contact" && pathname !== "/" && <SiteCta/>}
    <Footer/>
    {pathname !== "/" && <WelcomeLeadPopup/>}
    <PageAnalytics/>
    <ConsentAnalytics/>
    <CookieConsent/>
  </>;
}
