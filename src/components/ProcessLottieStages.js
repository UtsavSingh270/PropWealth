"use client";
import { useEffect,useState } from "react";
import { ArrowUpRight,Check,Handshake } from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const stages=[
  {number:"01",title:"Understand Your Position",kicker:"Step 1 · Understand your position",animation:"/Discover.lottie",description:"We start by understanding where you are today, what you want to achieve and what role the next property needs to play."},
  {number:"02",title:"Build the Strategy",kicker:"Step 2 · Build the strategy",animation:"/Strategise.lottie",description:"We create a clear direction based on your goals, financial position, risk preferences and longer-term property plans."},
  {number:"03",title:"Research the Market",kicker:"Step 3 · Research the market",animation:"/Research.lottie",description:"We use market research and PropWealth Next data to identify suitable markets, suburbs and opportunities supported by evidence."},
  {number:"04",title:"Find the Right Property",kicker:"Step 4 · Find the right property",animation:"/Discover.lottie",description:"Our team researches and assesses properties that fit the strategy, including the location, demand, supply, rental potential and value."},
  {number:"05",title:"Secure the Property",kicker:"Step 5 · Secure the property",animation:"/Negotiation.lottie",description:"We assist with negotiation, due diligence and the buying process so you can move forward with clarity and confidence."},
  {number:"06",title:"Plan What Comes Next",kicker:"Step 6 · Plan what comes next",animation:"/Settlement.lottie",description:"The journey does not necessarily end after one purchase. We look at how the property fits into your client’s longer-term plans."}
];

export default function ProcessLottieStages(){
  const [active,setActive]=useState(0);
  useEffect(()=>{const timer=setInterval(()=>setActive(value=>(value+1)%stages.length),6000);return()=>clearInterval(timer)},[]);
  const stage=stages[active];
  return <section className="section process-lottie-section"><div className="shell">
    <div className="section-head process-page-heading"><div><span className="eyebrow">Our process</span><h2>How your property journey works.</h2></div><p>Six simple stages, from understanding your goals to planning what comes next.</p></div>
    <div className="process-lottie-experience" style={{"--active-process":active}}>
      <div className="process-lottie-rail" role="tablist" aria-label="PropWealth process stages">{stages.map((item,index)=><button key={item.title} type="button" role="tab" aria-selected={active===index} className={`${active===index?"active":""} ${index<active?"complete":""}`} onClick={()=>setActive(index)}><i>{index<active?<Check/>:item.number}</i><span>{item.title}</span></button>)}</div>
      <div className="process-lottie-panel" key={stage.title}>
        <div className={`process-lottie-visual ${active===3||active===4?"brand-toned-lottie":""}`}>{stage.animation?<DotLottieReact src={stage.animation} autoplay loop renderConfig={{autoResize:true}}/>:<div className="missing-process-animation"><Handshake/><strong>{stage.missingLabel} animation required</strong><span>Download a suitable file and add it to the public folder as <code>{stage.missingFile}</code>.</span><a href={stage.source} target="_blank" rel="noreferrer">Browse {stage.missingLabel.toLowerCase()} animations <ArrowUpRight/></a></div>}</div>
        <div className="process-lottie-copy"><span>{stage.number} · {stage.kicker}</span><h3>{stage.title}</h3><p>{stage.description}</p>{!stage.animation&&<a className="process-source-link" href={stage.recommended} target="_blank" rel="noreferrer">View recommended examples <ArrowUpRight/></a>}</div>
      </div>
    </div>
  </div></section>;
}
