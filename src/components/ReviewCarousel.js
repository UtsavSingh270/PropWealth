"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Quote, Star } from "lucide-react";
import s from "./components.module.css";

const initials = name => name.split(" ").map(part => part[0]).join("").slice(0,2);
const date = value => value ? new Intl.RelativeTimeFormat("en", { numeric:"auto" }).format(Math.round((new Date(value) - Date.now()) / 86400000), "day") : "Google review";
export default function ReviewCarousel({ reviews }) {
  const [start, setStart] = useState(0);
  const shown = useMemo(() => reviews.length <= 3 ? reviews : [...reviews, ...reviews].slice(start, start + 3), [reviews, start]);
  useEffect(() => { if(reviews.length < 4) return; const timer=setInterval(() => setStart(current => (current + 1) % reviews.length), 6000); return () => clearInterval(timer); }, [reviews.length]);
  return <><div className={s.reviewRail}>{shown.map(review => <figure className={s.googleReview} key={`${review._id}-${review.name}`}><div className={s.reviewTop}><span>{Array.from({ length:review.rating || 5 }, (_, index) => <Star key={index} size={13} fill="currentColor"/>)}</span><Quote size={20}/></div><blockquote>{review.comment}</blockquote><footer>{review.photo ? <Image className={s.reviewAvatar} src={review.photo} alt="" width={38} height={38}/> : <span className={s.reviewAvatar}>{initials(review.name)}</span>}<div><strong>{review.name}</strong><small>{date(review.postedAt)} · {review.source || "Google"}</small></div></footer></figure>)}</div>{reviews.length > 3 && <div className={s.reviewProgress}>{Array.from({length:Math.ceil(reviews.length / 3)},(_,index)=><span key={index} className={index===Math.floor(start/3)?s.activeReview:""}/>)}</div>}</>;
}
