"use client";
import Link from "next/link";
import { ArrowLeft,Home } from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function NotFoundExperience(){
  return <section className="not-found-page" aria-labelledby="not-found-title">
    <div className="not-found-glow" aria-hidden="true"/>
    <div className="not-found-content">
      <div className="not-found-animation" aria-hidden="true"><DotLottieReact src="/404.lottie" autoplay loop renderConfig={{autoResize:true}}/></div>
      <div className="not-found-copy">
        <span className="eyebrow">Page not found</span>
        <h1 id="not-found-title">This property path doesn’t exist.</h1>
        <p>The page may have moved, the link may be outdated, or the address may have been entered incorrectly.</p>
        <div className="not-found-actions"><Link className="button" href="/"><Home/>Return home</Link><Link className="button secondary" href="/properties"><ArrowLeft/>Explore properties</Link></div>
      </div>
    </div>
  </section>;
}
