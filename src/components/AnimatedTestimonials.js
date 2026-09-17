"use client";
import { useEffect,useState } from "react";
import Image from "next/image";
import { ArrowLeft,ArrowRight,Quote,Star } from "lucide-react";

export default function AnimatedTestimonials({testimonials,interval=4000}){
  const [active,setActive]=useState(0),[paused,setPaused]=useState(false);
  const move=direction=>setActive(value=>(value+direction+testimonials.length)%testimonials.length);
  useEffect(()=>{if(paused)return;const timer=setInterval(()=>setActive(value=>(value+1)%testimonials.length),interval);
    
  return()=>clearInterval(timer)},[paused,interval,testimonials.length]);
  return <div className="animated-testimonials" onMouseEnter={()=>setPaused(true)} onMouseLeave={()=>setPaused(false)}>
    <div className="testimonial-images" aria-live="polite">{testimonials.map((item,index)=>{const offset=(index-active+testimonials.length)%testimonials.length;
      return <figure className={index===active?"active":""} style={{"--stack":Math.min(offset,3),zIndex:index===active?10:testimonials.length-offset}} key={item.name}><Image src={item.src} alt={item.name} fill sizes="(max-width:700px) 92vw,42vw"/></figure>})}<span className="testimonial-image-accent" aria-hidden="true"/></div>
    <div className="testimonial-story" key={testimonials[active].name}><Quote className="testimonial-quote-icon"/>
    <div className="testimonial-stars" aria-label="Five star review">{Array.from({length:5},(_,index)=><Star key={index}/>)}</div><blockquote>{testimonials[active].quote}</blockquote>
    <div className="testimonial-person"><strong>{testimonials[active].name}</strong><span>{testimonials[active].designation}</span></div>
    <div className="testimonial-navigation"><button type="button" onClick={()=>move(-1)} aria-label="Previous testimonial"><ArrowLeft/></button><button type="button" onClick={()=>move(1)} aria-label="Next testimonial"><ArrowRight/></button><small>{String(active+1).padStart(2,"0")} / {String(testimonials.length).padStart(2,"0")}</small></div></div>
  </div>
}
