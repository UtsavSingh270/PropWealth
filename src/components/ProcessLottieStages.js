"use client";
import { useEffect,useState } from "react";
import { ArrowUpRight,Check,Handshake } from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const stages=[
  {number:"01",title:"Strategise",kicker:"We strategise",animation:"/Strategise.lottie",description:"We begin with your goals, borrowing position, risk preferences and portfolio ambitions, then turn them into a focused investment brief."},
  {number:"02",title:"Locate",kicker:"We locate",animation:"/Discover.lottie",description:"We assess Australian markets and suburbs through employment, infrastructure, affordability, supply and long-term demand signals."},
  {number:"03",title:"Shortlist",kicker:"We shortlist",animation:"/Research.lottie",description:"Potential properties are compared against your brief, then narrowed through property-level research and layered due diligence."},
  {number:"04",title:"Negotiate",kicker:"We negotiate",animation:"/Negotiation.lottie",description:"We shape the offer, manage the negotiation and coordinate the right specialists so the decision remains commercial—not emotional."},
  {number:"05",title:"Settlement",kicker:"We guide settlement",animation:"/Settlement.lottie",description:"We guide you through finance, legal milestones and final coordination so the property reaches settlement clearly and confidently."},
  {number:"06",title:"Review",kicker:"We review",animation:"/Review.lottie",description:"We review the outcome, reassess your position and prepare a clear direction for the next portfolio decision."}
];

export default function ProcessLottieStages(){
  const [active,setActive]=useState(0);
  useEffect(()=>{const timer=setInterval(()=>setActive(value=>(value+1)%stages.length),6000);return()=>clearInterval(timer)},[]);
  const stage=stages[active];
  return <section className="section process-lottie-section"><div className="shell">
    <div className="section-head process-page-heading"><div><span className="eyebrow">How we work</span><h2>From strategy to settlement.</h2></div><p>Choose a stage or let the journey advance automatically.</p></div>
    <div className="process-lottie-experience" style={{"--active-process":active}}>
      <div className="process-lottie-rail" role="tablist" aria-label="PropWealth process stages">{stages.map((item,index)=><button key={item.title} type="button" role="tab" aria-selected={active===index} className={`${active===index?"active":""} ${index<active?"complete":""}`} onClick={()=>setActive(index)}><i>{index<active?<Check/>:item.number}</i><span>{item.title}</span></button>)}</div>
      <div className="process-lottie-panel" key={stage.title}>
        <div className={`process-lottie-visual ${active===3||active===4?"brand-toned-lottie":""}`}>{stage.animation?<DotLottieReact src={stage.animation} autoplay loop renderConfig={{autoResize:true}}/>:<div className="missing-process-animation"><Handshake/><strong>{stage.missingLabel} animation required</strong><span>Download a suitable file and add it to the public folder as <code>{stage.missingFile}</code>.</span><a href={stage.source} target="_blank" rel="noreferrer">Browse {stage.missingLabel.toLowerCase()} animations <ArrowUpRight/></a></div>}</div>
        <div className="process-lottie-copy"><span>{stage.number} · {stage.kicker}</span><h3>{stage.title}</h3><p>{stage.description}</p>{!stage.animation&&<a className="process-source-link" href={stage.recommended} target="_blank" rel="noreferrer">View recommended examples <ArrowUpRight/></a>}</div>
      </div>
    </div>
  </div></section>;
}
