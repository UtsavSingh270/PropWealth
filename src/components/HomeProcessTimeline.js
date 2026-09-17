"use client";

import { useEffect,useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { BarChart3,Check,FileCheck2,Handshake,MapPinned,Search,Target } from "lucide-react";

const steps=[
  {title:"Strategise",kicker:"We strategise",text:"We turn your goals, borrowing position and portfolio ambitions into a clear acquisition strategy.",note:"Goals · Budget · Risk",Icon:Target,animation:"/Strategise.lottie"},
  {title:"Locate",kicker:"We locate",text:"We identify markets and suburbs supported by employment, infrastructure, affordability and demand.",note:"Markets · Suburbs · Growth",Icon:MapPinned,animation:"/Discover.lottie"},
  {title:"Shortlist",kicker:"We shortlist",text:"We compare suitable properties against your brief and complete layered property-level research.",note:"Research · Evidence · Due diligence",Icon:Search,animation:"/Research.lottie"},
  {title:"Negotiate",kicker:"We negotiate",text:"We shape the offer and negotiate commercially so emotion never determines the purchase decision.",note:"Offer · Terms · Negotiation",Icon:Handshake,animation:"/Negotiation.lottie"},
  {title:"Settlement",kicker:"We guide settlement",text:"We coordinate the final finance, legal and settlement milestones so ownership transfers smoothly.",note:"Finance · Legal · Settlement",Icon:FileCheck2,animation:"/Settlement.lottie"},
  {title:"Review",kicker:"We review",text:"We review the result, reassess your position and prepare a clear direction for your next portfolio move.",note:"Performance · Equity · Next move",Icon:BarChart3,animation:"/Review.lottie"}
];

function JourneyScene({stage}){
  const animation=steps[stage].animation;
  if(animation)return <div className={`journey-lottie ${stage===3||stage===4?"brand-toned-lottie":""}`}><span className="journey-lottie-orbit"/><span className="journey-lottie-grid"/><DotLottieReact className="journey-lottie-player" key={animation} src={animation} autoplay loop renderConfig={{autoResize:true}}/></div>;
  return <svg className="journey-illustration" viewBox="0 0 640 390" role="img" aria-label={`${steps[stage].title} investment journey illustration`}>
    <defs>
      <linearGradient id="journeyPink" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#ff8eaa"/><stop offset="1" stopColor="#f42f70"/></linearGradient>
      <linearGradient id="journeyDark" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#172033"/><stop offset="1" stopColor="#090e18"/></linearGradient>
      <filter id="journeyShadow"><feDropShadow dx="0" dy="15" stdDeviation="14" floodColor="#59283b" floodOpacity=".16"/></filter>
    </defs>
    <path className="journey-ground" d="M75 318C141 278 212 298 275 314c74 18 136-35 226-13 48 12 70 37 51 55H99c-40 0-53-20-24-38Z"/>
    <circle className="journey-sun" cx="510" cy="82" r="42"/>
    <path className="journey-cloud cloud-one" d="M72 92c5-25 43-29 54-7 16-16 48-4 47 20H72c-14 0-14-13 0-13Z"/>
    <path className="journey-cloud cloud-two" d="M435 135c4-19 34-23 43-6 12-12 37-3 36 16h-79c-11 0-11-10 0-10Z"/>
    <g className="journey-house" filter="url(#journeyShadow)">
      <path d="M207 192 320 103l113 89v128H207Z" fill="#fff"/>
      <path d="m181 198 139-111 139 111-18 22-121-96-121 96Z" fill="url(#journeyPink)"/>
      <rect x="236" y="207" width="48" height="45" rx="5" fill="#ffd7e2"/><path d="M260 207v45M236 230h48" stroke="#fff" strokeWidth="5"/>
      <rect x="346" y="201" width="54" height="119" rx="7" fill="url(#journeyDark)"/><circle cx="387" cy="262" r="4" fill="#ff8eaa"/>
      <path d="M198 320h245" stroke="#141c2b" strokeWidth="8" strokeLinecap="round"/>
    </g>
    {stage===0&&<g className="scene-action discover-scene"><circle cx="151" cy="218" r="65" fill="#fff" stroke="#ff8eaa" strokeWidth="5" strokeDasharray="9 9"/><circle cx="151" cy="218" r="42" fill="#fff1f5"/><path d="m151 183 12 29 29 12-29 12-12 29-12-29-29-12 29-12Z" fill="url(#journeyPink)"/><path d="M151 218 175 194" stroke="#101827" strokeWidth="7" strokeLinecap="round"/></g>}
    {stage===1&&<g className="scene-action strategy-scene"><path d="M100 285c40-100 67-30 111-99 34-53 74-57 109-40" fill="none" stroke="#f42f70" strokeWidth="6" strokeLinecap="round" strokeDasharray="11 12"/><circle cx="101" cy="285" r="11" fill="#172033"/><circle cx="320" cy="146" r="13" fill="#f42f70"/><path d="m311 146 7 7 15-18" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round"/></g>}
    {stage===2&&<g className="scene-action research-scene"><rect x="79" y="176" width="132" height="114" rx="18" fill="#fff" stroke="#ffd0dc" strokeWidth="3"/><path d="M105 254v-31M132 254v-53M159 254v-75M186 254v-44" stroke="url(#journeyPink)" strokeWidth="14" strokeLinecap="round"/><path d="M105 198c31 15 48-34 81-26" fill="none" stroke="#172033" strokeWidth="4" strokeLinecap="round"/></g>}
    {stage===3&&<g className="scene-action acquire-scene"><circle cx="141" cy="222" r="58" fill="#fff" stroke="#ffd0dc" strokeWidth="3"/><circle cx="133" cy="211" r="20" fill="none" stroke="#f42f70" strokeWidth="10"/><path d="M149 226 194 271m-15-15 15-15m-29 1 14-14" fill="none" stroke="#f42f70" strokeWidth="10" strokeLinecap="round"/></g>}
    {stage===4&&<g className="scene-action review-scene"><path d="M80 292h128" stroke="#172033" strokeWidth="5" strokeLinecap="round"/><rect x="93" y="242" width="22" height="50" rx="5" fill="#ffb2c5"/><rect x="127" y="214" width="22" height="78" rx="5" fill="#ff7598"/><rect x="161" y="177" width="22" height="115" rx="5" fill="#f42f70"/><path d="m89 211 41-30 32 9 38-47" fill="none" stroke="#172033" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/><path d="m187 144 15-3-3 15" fill="none" stroke="#172033" strokeWidth="5" strokeLinecap="round"/></g>}
    <g className="journey-leaves"><path d="M461 319c-2-54 21-91 51-118M488 274c-21-13-29-33-25-57M493 260c25-10 39-26 42-47M478 298c-22-6-36-20-40-39M498 246c-4-22 3-41 22-55" fill="none" stroke="#172033" strokeWidth="6" strokeLinecap="round"/><ellipse cx="461" cy="219" rx="12" ry="24" fill="#ff8eaa" transform="rotate(-26 461 219)"/><ellipse cx="533" cy="215" rx="12" ry="24" fill="#ff6b8b" transform="rotate(32 533 215)"/><ellipse cx="439" cy="260" rx="12" ry="24" fill="#ffb0c1" transform="rotate(-43 439 260)"/><ellipse cx="520" cy="190" rx="12" ry="24" fill="#f42f70" transform="rotate(25 520 190)"/></g>
    <g className="journey-sparkles" fill="#f42f70"><path d="m548 157 5 12 12 5-12 5-5 12-5-12-12-5 12-5Z"/><path d="m85 147 3 8 8 3-8 3-3 8-3-8-8-3 8-3Z"/></g>
  </svg>
}

export default function HomeProcessTimeline(){
  const [active,setActive]=useState(0),[paused,setPaused]=useState(false);const step=steps[active],Icon=step.Icon;
  useEffect(()=>{if(paused)return;const timer=setInterval(()=>setActive(value=>(value+1)%steps.length),4300);return()=>clearInterval(timer)},[paused]);
  return <section className="section soft home-process-motion"><div className="shell">
    <div className="section-head journey-heading"><div><span className="eyebrow">Our Process</span><h2>One clear route. Six confident moves.</h2></div></div>
    <div className="journey" style={{"--journey-step":active}} onMouseEnter={()=>setPaused(true)} onMouseLeave={()=>setPaused(false)}>
      <div className="journey-route" role="tablist" aria-label="Property investment process">
        <span className="journey-route-base"/><span className="journey-route-progress"/><span className="journey-runner"><Icon/></span>
        {steps.map((item,index)=><button key={item.title} type="button" role="tab" aria-selected={active===index} className={`${index===active?"active":""} ${index<active?"complete":""}`} onClick={()=>setActive(index)}><i>{index<active?<Check/>:index+1}</i><span>{item.title}</span></button>)}
      </div>
      <div className="journey-stage" key={step.title}>
        <div className="journey-scene"><JourneyScene stage={active}/></div>
        <div className="journey-copy"><span><Icon/>{step.kicker}</span><h3>{step.title}</h3><p>{step.text}</p><small>{step.note}</small></div>
      </div>
    </div>
  </div></section>
}
