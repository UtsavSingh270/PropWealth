"use client";
import { useRef,useState } from "react";
import Image from "next/image";
import { Bath,BedDouble,Car,Check,ChevronLeft,ChevronRight,MapPin,Maximize,Search,TrendingUp,X } from "lucide-react";

export default function PropertyExplorer({properties,compact=false,slider=false,outcome=false}){
  const [details,setDetails]=useState(null); const [slide,setSlide]=useState(0);
  const propertyTrack=useRef(null);
  const [lead,setLead]=useState(null); const [form,setForm]=useState({name:"",email:"",phone:"",website:""}); const [sending,setSending]=useState(false); const [result,setResult]=useState("");
  const list=properties;
  const detailMedia=details?(details.media?.length?details.media.filter(item=>item.type==="image"):(details.images||[details.image]).filter(Boolean).map(url=>({url,type:"image"}))):[];
  const openDetails=(p)=>{setDetails(p);setSlide(0)};
  const closeDetails=()=>setDetails(null);
  const openLead=(property,action)=>{setLead({property,action});setResult("");if(details)closeDetails()};
  const closeLead=()=>{setLead(null);setResult("")};
  const movePropertySlider=direction=>propertyTrack.current?.scrollBy({left:direction*propertyTrack.current.clientWidth*.82,behavior:"smooth"});
  const updatePhone=value=>setForm(current=>({...current,phone:value.replace(/\D/g,"").slice(0,9)}));
  const submit=async(e)=>{e.preventDefault();setResult("");if(!/^[2-9]\d{8}$/.test(form.phone)){setResult("Please enter a valid 9-digit Australian phone number.");return}setSending(true);const australianPhone=`+61${form.phone}`;try{const response=await fetch("/api/leads",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...form,phone:australianPhone,consent:true,action:lead.action,propertySlug:lead.property.slug,propertyTitle:lead.property.title})});const data=await response.json();if(!response.ok)throw new Error(data.error);localStorage.setItem("propwealth-contact",JSON.stringify({name:form.name,email:form.email,phone:australianPhone}));setResult("Your booking request has been received. We’ll contact you shortly.")}catch(error){setResult(error.message)}finally{setSending(false)}};
  return <>
    {slider&&list.length>4&&
      <div className="property-slider-controls" aria-label="Property slider controls">
        <button type="button" onClick={()=>movePropertySlider(-1)} aria-label="Previous properties"><ChevronLeft/></button>
        <button type="button" onClick={()=>movePropertySlider(1)} aria-label="Next properties"><ChevronRight/></button>
      </div>}
    {list.length?
      <div ref={propertyTrack} className={`property-grid ${compact?"compact-property-grid":"properties-list-grid"} ${outcome?"outcome-property-grid":""} ${slider&&list.length>4?"property-slider":""}`}>{list.map((p,index)=><article className="property-card interactive-card reveal-card" role="button" tabIndex="0" aria-label={`View ${p.title}`} onClick={()=>openDetails(p)} onKeyDown={e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();openDetails(p)}}} style={{"--delay":`${Math.min(index,8)*55}ms`}} key={p.slug}>
        <div className="property-image">
          <Image src={p.image||(p.media||[]).find(item=>item.type==="image")?.url} alt={p.title} fill sizes="(max-width:620px) 100vw,(max-width:1100px) 50vw,(max-width:1199px) 33vw,25vw"/>
          {/* <span className="property-category-chip">{outcome ? "Previous purchase" : `${p.category} · ${p.growth}`}</span> */}
          <span className="view-hint">View details</span>
        </div>
        <div className="property-body">
          {!outcome && <div className="property-meta property-card-specs">
            <span><BedDouble/>{p.beds}</span>
            <span><Bath/>{p.baths}</span>
            <span><Car/>{p.cars}</span>
            <span><Maximize/>{p.area}m²</span>
          </div>}
          <h3 className="property-title">{p.title}</h3>
          {!outcome && <div className="property-place">
            <MapPin size={15}/>{p.suburb}, {p.state}
          </div>}
          {outcome ? <>
            <div className="property-outcome-growth"><span><TrendingUp/><small>Equity Growth</small></span><strong>{p.equityGrowth ? `${p.equityGrowth}%` : "Add verified"}</strong></div>
            <div className="property-outcome-values"><div><small>Purchased price</small><strong>${(p.purchasePrice||p.price).toLocaleString("en-AU")}</strong></div><div><small>Current value</small><strong>{p.currentValue ? `$${p.currentValue.toLocaleString("en-AU")}` : "Add verified"}</strong></div><div><small>Value movement</small><strong>{typeof p.profit === "number" ? `$${p.profit.toLocaleString("en-AU")}` : "Pending"}</strong></div></div>
            {/* <span className="property-read-more">Read more <ArrowUpRight size={16}/></span> */}
          </> : <div className="property-card-footer" onClick={e=>e.stopPropagation()} onKeyDown={e=>e.stopPropagation()}>
            <div className="property-price">${p.price.toLocaleString("en-AU")}</div>
            <button className="button" disabled={p.status==="Sold Out"} onClick={()=>openLead(p,"booking")}>{p.status==="Sold Out"?"Sold out":"Connect"}</button>
          </div>}
        </div>
    </article>)}
    </div>:<div className="empty-state">
      <Search/>
      <h3>No matching properties</h3>
      <p>Try widening the location, price or size filters.</p>
    </div>}

    {details&&<div className="modal-backdrop" onMouseDown={closeDetails}>
      <section className="property-modal" role="dialog" aria-modal="true" aria-label={details.title} onMouseDown={e=>e.stopPropagation()}>
        <button className="modal-close" onClick={closeDetails}><X/></button>
        <div className="modal-gallery"><Image src={detailMedia[slide]?.url||details.image} alt={`${details.title} view ${slide+1}`} fill sizes="(max-width:900px) 100vw,55vw"/>
          <button className="slider-arrow previous" onClick={()=>setSlide((slide-1+detailMedia.length)%detailMedia.length)} aria-label="Previous media"><ChevronLeft/></button>
          <button className="slider-arrow next" onClick={()=>setSlide((slide+1)%detailMedia.length)} aria-label="Next media"><ChevronRight/></button>
          <div className="slider-dots">{detailMedia.map((item,i)=><button key={`${item.url}-${i}`} className={i===slide?"active":""} onClick={()=>setSlide(i)} aria-label={`${item.type} ${i+1}`}/>)}
          </div>
        </div>
        <div className="modal-details">
          <small className="pink">{details.status==="Sold Out" ? "Previous purchase" : `${details.category}`}</small>
          <h2>{details.title}</h2>
          <div className="property-place">
            <MapPin size={16}/>{details.suburb}, {details.state}
          </div>
          {details.status!=="Sold Out" && <div className="property-price">${details.price.toLocaleString("en-AU")}</div>}
          {details.status==="Sold Out" ? <div className="modal-outcome-meta"><div><small>Purchased Price</small><strong>${(details.purchasePrice||details.price).toLocaleString("en-AU")}</strong></div><div><small>Current Value</small><strong>{details.currentValue ? `$${details.currentValue.toLocaleString("en-AU")}` : "Add verified value"}</strong></div><div><small>Value Movement</small><strong>{typeof details.profit === "number" ? `$${details.profit.toLocaleString("en-AU")}` : "Pending"}</strong></div></div> : <div className="modal-meta">
            <span>
              <BedDouble/>{details.beds}<small>Bedrooms</small>
            </span>
            <span>
              <Bath/>{details.baths}<small>Bathrooms</small>
            </span>
            <span>
              <Car/>{details.cars}<small>Car Spaces</small>
            </span>
            <span>
              <Maximize/>{details.area}m²
              <small>Property Size</small>
            </span>
          </div>}
          {details.status!=="Sold Out" && <p>{details.description}</p>}
          {details.status === "Sold Out" ? <div className="equity-highlight"><span className="equity-highlight-icon"><TrendingUp/></span><span className="equity-highlight-copy"><small>Equity growth</small><strong>{details.equityGrowth ? `${details.equityGrowth}%` : "Add verified"}</strong></span><span className="equity-highlight-note">Since purchase</span></div> : <div className="yield-line"><TrendingUp/><span><strong>{details.yield}%</strong> indicative rental yield</span></div>}
          {details.status==="Sold Out" && <div className="modal-investment-lens"><strong>Why this property was selected</strong><p>{details.description}</p></div>}
          <div className="property-actions">
            <button className="button" disabled={details.status==="Sold Out"} onClick={()=>openLead(details,"booking")}>
              {details.status==="Sold Out"?"Sold out":"Book a consultation"}
            </button>
          </div>
        </div>
      </section>
    </div>}

    {lead&&
    <div className="modal-backdrop" onMouseDown={closeLead}>
      <section className="lead-modal" role="dialog" aria-modal="true" aria-label="Book property consultation" onMouseDown={e=>e.stopPropagation()}>
        <button className="modal-close" onClick={closeLead}><X/>
        </button>{result.startsWith("Your booking")?
        <div className="success-message">
          <span><Check/></span>
          <h2>Thank you</h2>
          <p>{result}</p>
          <button className="button" onClick={closeLead}>Done</button>
        </div>:<>
        <span className="eyebrow">Property consultation</span>
        <h2>Book a conversation</h2>
        <p>Interested in <strong>{lead.property.title}</strong>? Leave your details and our Australian property team will contact you.</p>
        <form className="lead-form" onSubmit={submit}>
          <label>Full name *<input required autoComplete="name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></label>
          <label>Email address *<input type="email" required autoComplete="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/></label>
          <label className="phone-field-label">Australian phone number *<span className="au-phone-field"><span className="au-phone-prefix" aria-label="Australia country code"><span aria-hidden="true">🇦🇺</span><strong>+61</strong></span><input required type="tel" inputMode="numeric" autoComplete="tel-national" pattern="[2-9][0-9]{8}" maxLength="9" placeholder="4XX XXX XXX" value={form.phone} onChange={e=>updatePhone(e.target.value)}/></span><small>Australian numbers only · enter 9 digits without the leading 0</small></label>
          <input className="honeypot" tabIndex="-1" autoComplete="off" value={form.website} onChange={e=>setForm({...form,website:e.target.value})}/>
          {result&&<p className="form-error">{result}</p>}
          <p className="lead-privacy">By submitting, you agree that PropWealth may securely store these details and contact you about this property.</p>
          <button className="button" disabled={sending}>{sending?"Submitting…":"Start the conversation"}</button>
        </form></>}
      </section>
    </div>}
  </>;
}
