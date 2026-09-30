"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { rememberContact } from "../lib/contactMemory";

export default function SiteCta(){
  const [email,setEmail]=useState("");
  const [status,setStatus]=useState("");
  const [sending,setSending]=useState(false);
  const submit=async event=>{event.preventDefault();setStatus("");setSending(true);try{const response=await fetch("/api/leads",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email,action:"newsletter",consent:true})});const data=await response.json();if(!response.ok)throw new Error(data.error);rememberContact({email});setStatus("You’re subscribed. Watch your inbox for the next update.");setEmail("")}catch(error){setStatus(error.message||"We could not add your email. Please try again.")}finally{setSending(false)}};
  return <section className="site-cta-section" aria-label="Start a conversation">
    <div className="shell site-cta-card">
      <div className="site-cta-copy"><span className="eyebrow">PropWealth newsletter</span><h2>Better property decisions<br/><em>start with better insight.</em></h2><p>Receive practical property insight, market context and new opportunities from the PropWealth team.</p><form className="newsletter-form" onSubmit={submit}><label className="sr-only" htmlFor="newsletter-email">Email address</label><input id="newsletter-email" type="email" required autoComplete="email" value={email} onChange={event=>setEmail(event.target.value)} placeholder="Enter your email address"/><button className="button" disabled={sending}>{sending?"Joining…":"Register"} <ArrowRight size={17}/></button></form><small className="newsletter-consent">By clicking Register, you acknowledge that you have read and accepted our <a href="https://propwealth.com.au/privacy-policy/">Privacy Policy</a>.</small>{status&&<small className="newsletter-status" role="status">{status}</small>}
      </div>
      <div className="site-cta-image"><Image src="/CTA.jpg" alt="Property advisors discussing an investment strategy" fill sizes="(max-width: 760px) 100vw, 48vw"/></div>
    </div>
  </section>
}
