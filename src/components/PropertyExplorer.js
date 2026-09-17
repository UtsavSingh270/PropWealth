"use client";
import { useEffect,useMemo,useRef,useState } from "react";
import Image from "next/image";
import { Bath,BedDouble,Car,Check,ChevronLeft,ChevronRight,MapPin,Maximize,Search,SlidersHorizontal,TrendingUp,X } from "lucide-react";

const initialFilters={search:"",state:"All",category:"All",status:"All",price:"All",beds:"All",size:"All",sort:"featured"};

export default function PropertyExplorer({properties,compact=false,initialOpenSlug=null,slider=false}){
  const [filters,setFilters]=useState(initialFilters); const [filtersOpen,setFiltersOpen]=useState(false); const [searchFocused,setSearchFocused]=useState(false); const [details,setDetails]=useState(()=>properties.find(p=>p.slug===initialOpenSlug)||null); const [slide,setSlide]=useState(0);const originPath=useRef(initialOpenSlug?"/properties":null);
  const propertyTrack=useRef(null);
  const [lead,setLead]=useState(null); const [form,setForm]=useState({name:"",email:"",phone:"",website:""}); const [sending,setSending]=useState(false); const [result,setResult]=useState("");
  useEffect(()=>{const handleBack=()=>{if(!window.location.pathname.startsWith("/properties/"))setDetails(null)};window.addEventListener("popstate",handleBack);return()=>window.removeEventListener("popstate",handleBack)},[]);
  const options=(key)=>["All",...new Set(properties.map(p=>p[key]))];
  const update=(key,value)=>setFilters(current=>({...current,[key]:value}));
  const list=useMemo(()=>properties.filter(p=>{
    const q=filters.search.toLowerCase(); const priceOk=filters.price==="All"||(filters.price==="under650"&&p.price<650000)||(filters.price==="650to750"&&p.price>=650000&&p.price<=750000)||(filters.price==="over750"&&p.price>750000);
    const sizeOk=filters.size==="All"||(filters.size==="compact"&&p.area<150)||(filters.size==="medium"&&p.area>=150&&p.area<350)||(filters.size==="large"&&p.area>=350);
    return (!q||`${p.title} ${p.suburb} ${p.state}`.toLowerCase().includes(q))&&(filters.state==="All"||p.state===filters.state)&&(filters.category==="All"||p.category===filters.category)&&(filters.status==="All"||p.status===filters.status)&&priceOk&&(filters.beds==="All"||p.beds===Number(filters.beds))&&sizeOk;
  }).sort((a,b)=>filters.sort==="priceLow"?a.price-b.price:filters.sort==="priceHigh"?b.price-a.price:filters.sort==="yield"?b.yield-a.yield:0),[properties,filters]);
  const detailMedia=details?(details.media?.length?details.media.filter(item=>item.type==="image"):(details.images||[details.image]).filter(Boolean).map(url=>({url,type:"image"}))):[];
  const openDetails=(p)=>{originPath.current=window.location.pathname;window.history.pushState(null,"",`/properties/${p.slug}`);setDetails(p);setSlide(0)};
  const closeDetails=()=>{window.history.replaceState(null,"",originPath.current||"/properties");originPath.current=null;setDetails(null)};
  const openLead=(property,action)=>{setLead({property,action});setResult("");if(details)closeDetails()};
  const closeLead=()=>{setLead(null);setResult("")};
  const movePropertySlider=direction=>propertyTrack.current?.scrollBy({left:direction*propertyTrack.current.clientWidth*.82,behavior:"smooth"});
  const updatePhone=value=>setForm(current=>({...current,phone:value.replace(/\D/g,"").slice(0,9)}));
  const submit=async(e)=>{e.preventDefault();setResult("");if(!/^[2-9]\d{8}$/.test(form.phone)){setResult("Please enter a valid 9-digit Australian phone number.");return}setSending(true);const australianPhone=`+61${form.phone}`;try{const response=await fetch("/api/leads",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...form,phone:australianPhone,consent:true,action:lead.action,propertySlug:lead.property.slug,propertyTitle:lead.property.title})});const data=await response.json();if(!response.ok)throw new Error(data.error);localStorage.setItem("propwealth-contact",JSON.stringify({name:form.name,email:form.email,phone:australianPhone}));setResult("Your booking request has been received. We’ll contact you shortly.")}catch(error){setResult(error.message)}finally{setSending(false)}};
  return <>
    {!compact&&<>
    <div className="property-toolbar">
      <label className="search-field">
        <Search size={18}/>
          <input value={filters.search} 
                 onFocus={()=>setSearchFocused(true)} 
                 onBlur={()=>setSearchFocused(false)} 
                 onChange={e=>update("search",e.target.value)} 
                 placeholder="Search suburb, state or property"/>
                 {!searchFocused&&!filters.search&&<span className="search-result-count">{list.length} properties</span>}
        </label>
        <button type="button" className="mobile-filter-button" onClick={()=>setFiltersOpen(true)} aria-label="Open property filters">
          <SlidersHorizontal/>
          <span>Filters</span>
        </button>
    </div>
    {filtersOpen&&<button type="button" className="mobile-filter-backdrop" onClick={()=>setFiltersOpen(false)} aria-label="Close property filters"/>}
    <div className={`advanced-filters ${filtersOpen?"mobile-open":""}`}>
      <div className="mobile-filter-head">
        <strong>Filter properties</strong>
        <button type="button" onClick={()=>setFiltersOpen(false)} aria-label="Close filters"><X/>
        </button>
      </div>
      <label><span>Location</span><select value={filters.state} onChange={e=>update("state",e.target.value)}>{options("state").map(x=><option key={x}>{x}</option>)}</select></label>
      <label><span>Property type</span><select value={filters.category} onChange={e=>update("category",e.target.value)}>{options("category").map(x=><option key={x}>{x}</option>)}</select></label>
      <label><span>Availability</span><select value={filters.status} onChange={e=>update("status",e.target.value)}>{options("status").map(x=><option key={x}>{x}</option>)}</select></label>
      <label><span>Price</span><select value={filters.price} onChange={e=>update("price",e.target.value)}><option value="All">Any price</option><option value="under650">Under $650k</option><option value="650to750">$650k–$750k</option><option value="over750">Over $750k</option></select></label>
      <label><span>Bedrooms</span><select value={filters.beds} onChange={e=>update("beds",e.target.value)}><option value="All">Any bedrooms</option>{[2,3,4,5].map(x=><option value={x} key={x}>{x} BHK</option>)}</select></label>
      <label><span>Land / floor size</span><select value={filters.size} onChange={e=>update("size",e.target.value)}><option value="All">Any size</option><option value="compact">Under 150m²</option><option value="medium">150–349m²</option><option value="large">350m²+</option></select></label>
      <label><span>Sort by</span><select value={filters.sort} onChange={e=>update("sort",e.target.value)}><option value="featured">Featured</option><option value="priceLow">Price: low to high</option><option value="priceHigh">Price: high to low</option><option value="yield">Highest yield</option></select></label>
      <button className="clear-filters" onClick={()=>setFilters(initialFilters)}>Clear all</button>
      <button type="button" className="button mobile-filter-apply" onClick={()=>setFiltersOpen(false)}>Show {list.length} properties</button>
    </div></>}

    {slider&&list.length>4&&
      <div className="property-slider-controls" aria-label="Property slider controls">
        <button type="button" onClick={()=>movePropertySlider(-1)} aria-label="Previous properties"><ChevronLeft/></button>
        <button type="button" onClick={()=>movePropertySlider(1)} aria-label="Next properties"><ChevronRight/></button>
      </div>}
    {list.length?
      <div ref={propertyTrack} className={`property-grid ${compact?"compact-property-grid":"properties-list-grid"} ${slider&&list.length>4?"property-slider":""}`}>{list.map((p,index)=><article className="property-card interactive-card reveal-card" role="button" tabIndex="0" aria-label={`View ${p.title}`} onClick={()=>openDetails(p)} onKeyDown={e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();openDetails(p)}}} style={{"--delay":`${Math.min(index,8)*55}ms`}} key={p.slug}>
        <div className="property-image">
          <Image src={p.image||(p.media||[]).find(item=>item.type==="image")?.url} alt={p.title} fill sizes="(max-width:620px) 100vw,(max-width:1100px) 50vw,(max-width:1199px) 33vw,25vw"/>
          <span className="property-category-chip">{p.category} · {p.growth}</span>
          <span className="view-hint">View details</span>
        </div>
        <div className="property-body">
          <div className="property-meta property-card-specs">
            <span><BedDouble/>{p.beds}</span>
            <span><Bath/>{p.baths}</span>
            <span><Car/>{p.cars}</span>
            <span><Maximize/>{p.area}m²</span>
          </div>
          <h3 className="property-title">{p.title}</h3>
          <div className="property-place">
            <MapPin size={15}/>{p.suburb}, {p.state}
          </div>
          <div className="property-card-footer" onClick={e=>e.stopPropagation()} onKeyDown={e=>e.stopPropagation()}>
            <div className="property-price">${p.price.toLocaleString("en-AU")}</div>
            <button className="button" disabled={p.status==="Sold Out"} onClick={()=>openLead(p,"booking")}>{p.status==="Sold Out"?"Sold out":"Connect"}</button>
          </div>
        </div>
    </article>)}
    </div>:<div className="empty-state">
      <Search/>
      <h3>No matching properties</h3>
      <p>Try widening the location, price or size filters.</p>
      <button className="button secondary" onClick={()=>setFilters(initialFilters)}>Reset filters</button>
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
          <small className="pink">{details.category} · {details.growth}</small>
          <h2>{details.title}</h2>
          <div className="property-place">
            <MapPin size={16}/>{details.suburb}, {details.state}
          </div>
          <div className="property-price">${details.price.toLocaleString("en-AU")}</div>
          <div className="modal-meta">
            <span>
              <BedDouble/>{details.beds}<small>Bedrooms</small>
            </span>
            <span>
              <Bath/>{details.baths}<small>Bathrooms</small>
            </span>
            <span>
              <Car/>{details.cars}<small>Car spaces</small>
            </span>
            <span>
              <Maximize/>{details.area}m²
              <small>Property size</small>
            </span>
          </div>
          <p>{details.description}</p>
          <div className="yield-line">
            <TrendingUp/>
            <span>
              <strong>{details.yield}%</strong> indicative rental yield
            </span>
          </div>
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
