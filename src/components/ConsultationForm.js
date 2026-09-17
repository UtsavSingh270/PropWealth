"use client";
import { useState } from "react";
import { Check } from "lucide-react";

const initial={name:"",email:"",phone:"",budget:"",message:"",website:""};

export default function ConsultationForm({property=null}){
  const [form,setForm]=useState(initial);
  const [state,setState]=useState({sending:false,message:""});
  const set=(key,value)=>setForm(current=>({...current,[key]:value}));
  const updatePhone=value=>set("phone",value.replace(/\D/g,"").slice(0,9));
  const submit=async event=>{
    event.preventDefault();
    setState({sending:false,message:""});
    if(!/^[2-9]\d{8}$/.test(form.phone))return setState({sending:false,message:"Please enter a valid 9-digit Australian phone number."});
    setState({sending:true,message:""});
    const response=await fetch("/api/leads",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...form,phone:`+61${form.phone}`,consent:true,action:property?"booking":"strategy",propertySlug:property?.slug||"general-consultation",propertyTitle:property?.title||"General contact enquiry"})});
    const data=await response.json();
    setState({sending:false,message:response.ok?"Thanks—your message is with our team.":data.error});
  };
  if(state.message.startsWith("Thanks"))return <div className="success-message"><span><Check/></span><h2>Message received</h2><p>{state.message}</p></div>;
  return <form className="form qualification-form contact-simple-form" onSubmit={submit}>
    <label>Full Name *<input required autoComplete="name" value={form.name} onChange={event=>set("name",event.target.value)}/></label>
    <label>Email address *<input type="email" required autoComplete="email" value={form.email} onChange={event=>set("email",event.target.value)}/></label>
    <label>Your Budget *<select required value={form.budget} onChange={event=>set("budget",event.target.value)}><option value="">Select your budget</option><option>Under $600k</option><option>$600k–$800k</option><option>$800k–$1m</option><option>$1m+</option></select></label>
    <label className="phone-field-label">Enter your phone number *<span className="au-phone-field"><span className="au-phone-prefix" aria-label="Australia country code"><span aria-hidden="true">🇦🇺</span><strong>+61</strong></span><input required type="tel" inputMode="numeric" autoComplete="tel-national" pattern="[2-9][0-9]{8}" maxLength="9" placeholder="4XX XXX XXX" value={form.phone} onChange={event=>updatePhone(event.target.value)}/></span><small>Enter 9 digits without the leading 0</small></label>
    <label className="full">Write your message below *<textarea required value={form.message} onChange={event=>set("message",event.target.value)} placeholder="How can we help?"/></label>
    <input className="honeypot" tabIndex="-1" autoComplete="off" value={form.website} onChange={event=>set("website",event.target.value)}/>
    {state.message&&<p className="form-error full">{state.message}</p>}
    <p className="lead-privacy full">By submitting, you agree that PropWealth may securely store these details and contact you about your enquiry.</p>
    <button className="button full" disabled={state.sending}>{state.sending?"Sending…":"Send my message"}</button>
  </form>;
}
