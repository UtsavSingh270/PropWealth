"use client";
import { useEffect,useRef } from "react";
import Image from "next/image";
import { BarChart3,HeartHandshake,SearchCheck,ShieldCheck } from "lucide-react";
import styles from "./AboutExperience.module.css";

const base="https://propwealth.com.au/wp-content/uploads/";
const journey=[
  ["A Vision to Empower You","It all began with a simple yet powerful vision: to guide individuals in making smarter investment decisions and provide unparalleled support on their wealth-building journey.","1-scaled.jpg"],
  ["The Founders: United by a Common Dream","PropWealth was founded by Parag Dixit, Julius Dabre and Mudit Khandelwal—three seasoned industry experts who came together to turn their passion for financial growth into a shared vision.","2-scaled.jpg"],
  ["The Moment of Clarity","After in-depth market research, the team discovered that a large percentage of Australians were struggling to reach their investment goals. That was the turning point—the realisation that a new approach was needed.","3-scaled.jpg"],
  ["Vision to Wealth","PropWealth was born out of this insight to provide the guidance, tools and resources people need to confidently navigate their investment journey and make informed choices that lead to lasting wealth.","4-scaled.jpg"],
  ["Transforming You into a Smart Millionaire Investor","We are on a mission to help you build wealth and achieve financial freedom through clearer strategy, stronger research and considered property decisions.","5-scaled.jpg"],
];
const values=[
  [HeartHandshake,"Client-centric","Your dreams, needs and long-term goals sit at the centre of every recommendation."],
  [ShieldCheck,"Trust","Transparent advice and accountable communication form the foundation of every relationship."],
  [SearchCheck,"Commitment","We are committed to providing a high level of service, delivered responsibly and ethically."],
  [BarChart3,"Research & data analytics","Research and analytics drive our search for opportunities that fit your strategy."],
];
const founders=[
  ["Julius Dabre","Co-Founder","Julius-1-1536x1920.png"],
  ["Parag Dixit","Director, Strategy & Finance","Parag-sir-1-1536x1920.png"],
  ["Mudit Khandelwal","Director, Product & Customer Experience","Mudit-sir-1-1536x1920.png"],
];
const members=[
  ["Abhinav Gupta","Buyer Agent","Abhinav combines more than 14 years of corporate IT experience with firsthand property investment knowledge and licensed real estate expertise. His practical insight helps clients navigate property decisions with clarity.","DSC6886-1920x1920.png"],
  ["Ankit Sharma","Buyer Agent","With two decades of experience working with clients as an IT engineer, Ankit brings a considered, people-first approach to real estate and helps investors strengthen their portfolios.","DSC6865-1-1920x1920.png"],
  ["Sharad Joshi","Buyer Agent","Sharad combines two decades in data and analytics with 15 years of property investment experience, using tested research and advanced systems to uncover high-growth opportunities.","DSC6873-1920x1920.png"],
  ["Pranav Dixit","Data Analyst","Pranav applies actuarial, mathematical and statistical analysis to uncover opportunities, evaluate portfolio performance and connect property strategy with measurable outcomes.","DSC6791.jpg"],
];

export default function AboutExperience(){
  const root=useRef(null);
  const journeyRef=useRef(null);
  useEffect(()=>{const elements=root.current?.querySelectorAll("[data-reveal]")||[];const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("is-visible");observer.unobserve(entry.target)}}),{threshold:.16,rootMargin:"0px 0px -40px"});elements.forEach(element=>observer.observe(element));return()=>observer.disconnect()},[]);
  useEffect(()=>{const timeline=journeyRef.current;if(!timeline)return;let frame=0;const update=()=>{frame=0;const markers=[...timeline.querySelectorAll(".journey-scroll-marker")],items=[...timeline.querySelectorAll(".journey-scroll-item")];if(!markers.length)return;const timelineRect=timeline.getBoundingClientRect(),firstRect=markers[0].getBoundingClientRect(),lastRect=markers.at(-1).getBoundingClientRect();const start=firstRect.top+firstRect.height/2-timelineRect.top,end=lastRect.top+lastRect.height/2-timelineRect.top,focus=window.innerHeight*.64,progress=Math.max(0,Math.min(1,(focus-(timelineRect.top+start))/Math.max(end-start,1)));timeline.style.setProperty("--journey-start",`${start}px`);timeline.style.setProperty("--journey-end",`${timelineRect.height-end}px`);timeline.style.setProperty("--journey-progress",progress);markers.forEach((marker,index)=>{const rect=marker.getBoundingClientRect(),reached=rect.top+rect.height/2<=focus;marker.classList.toggle("active",reached);if(reached||rect.top<window.innerHeight*.84)items[index].classList.add("is-visible")})};const requestUpdate=()=>{if(!frame)frame=requestAnimationFrame(update)};update();window.addEventListener("scroll",requestUpdate,{passive:true});window.addEventListener("resize",requestUpdate);return()=>{if(frame)cancelAnimationFrame(frame);window.removeEventListener("scroll",requestUpdate);window.removeEventListener("resize",requestUpdate)}},[]);
  return <div ref={root} className={`${styles.root} about-experience`}>
    <section className="about-main-hero"><div className="shell"><div className="about-hero-copy" data-reveal><span className="eyebrow">Who we are</span><h1>This is <span className="pink">PropWealth.</span></h1><p>Imagine a world where you could confidently handle every investment decision—from the small, time-saving choices to the decisions that create long-term income and wealth.</p></div><div className="about-team-banner" data-reveal><Image src={`${base}Artboard-1-copy-a.png`} alt="The PropWealth team" fill priority sizes="(max-width: 620px) calc(100vw - 24px), (max-width: 1200px) calc(100vw - 40px), 1180px"/></div><div className="about-stats" data-reveal><article><strong>$310M+</strong><span>Property value purchased</span></article><article><strong>532+</strong><span>Deals completed</span></article><article><strong>37%</strong><span>Equity growth in 12 months</span></article></div></div></section>

    <section className="section about-journey-section"><div className="shell"><header className="about-section-heading" data-reveal><span className="eyebrow">How it started</span><h2>Our Journey</h2><p>Driven by vision, empowered by expertise and committed to guiding investors toward lasting success and financial freedom.</p></header><div ref={journeyRef} className="journey-scroll" aria-label="PropWealth journey"><div className="journey-scroll-line" aria-hidden="true"><i/></div>{journey.map(([title,text,image],index)=><article className={`journey-scroll-item ${index%2===0?"card-right":"card-left"}`} key={title}><div className="journey-scroll-card"><div className="journey-scroll-image"><Image src={`${base}${image}`} alt="" fill sizes="(max-width: 599px) 100vw, 42vw"/></div><div className="journey-scroll-copy"><small>Chapter {index+1}</small><h3>{title}</h3><p>{text}</p></div></div><div className="journey-scroll-marker" aria-label={`Chapter ${index+1}`}><span>{String(index+1).padStart(2,"0")}</span></div></article>)}</div></div></section>

    <section className="section soft about-values"><div className="shell"><header className="about-section-heading" data-reveal><span className="eyebrow">What guides us</span><h2>Our vision, lived through every decision.</h2></header><div className="about-values-grid">{values.map(([Icon,title,text],index)=><article data-reveal style={{"--reveal-delay":`${index*80}ms`}} key={title}><i><Icon/></i><span>0{index+1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

    <section className="section about-people"><div className="shell"><header className="about-section-heading" data-reveal><span className="eyebrow">Leadership</span><h2>Founders & Co-Founders</h2><p>Three industry specialists united by one ambition: to make property investment clearer, more strategic and more personal.</p></header><div className="founders-grid">{founders.map(([name,role,image],index)=><article className="person-card founder-card" data-reveal style={{"--reveal-delay":`${index*100}ms`}} key={name}><div className="person-image"><Image src={`${base}${image}`} alt={name} fill sizes="(max-width: 599px) 100vw, 33vw"/></div><div><h3>{name}</h3><p>{role}</p></div></article>)}</div></div></section>

    <section className="section soft about-team"><div className="shell"><header className="about-section-heading" data-reveal><span className="eyebrow">The people behind the research</span><h2>Our Team</h2><p>A multidisciplinary team united by vision, strengthened by data and driven by client outcomes.</p></header><div className="team-members-grid">{members.map(([name,role,text,image],index)=><article className="person-card team-member-card" tabIndex="0" data-reveal style={{"--reveal-delay":`${index*90}ms`}} key={name}><div className="person-image"><Image src={`${base}${image}`} alt={name} fill sizes="(max-width: 599px) 100vw, (max-width: 1023px) 25vw, 25vw"/></div><div className="team-member-content"><span>{role}</span><h3>{name}</h3><p>{text}</p></div></article>)}</div></div></section>
  </div>
}
