import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Clock3, Mic2, PlayCircle, Video } from "lucide-react";
import PageHero from "./PageHero";
import { getResourceEntries } from "../lib/resourceEntries";

const formatDate = value => value ? new Date(value).toLocaleDateString("en-AU", { day:"numeric", month:"long", year:"numeric" }) : "On-demand session";
const hostsFor = item => item.hosts?.length ? item.hosts : [item.host || item.author].filter(Boolean);

function SessionCard({ item }) {
  const isWebinar = item.type === "webinar";
  const hosts = hostsFor(item);
  return <article className={`session-card ${isWebinar ? "is-webinar" : "is-podcast"}`}>
    <Link href={`/webinars/${item.slug}`} className="session-cover">{item.coverImage ? <Image src={item.coverImage} alt={item.title} fill sizes="(max-width:700px) 100vw, (max-width:1100px) 50vw, 33vw"/> : <div className="session-cover-fallback">{isWebinar ? <Video/> : <Mic2/>}</div>}<span>{isWebinar ? <Video size={17}/> : <PlayCircle size={18}/>} {isWebinar ? "Webinar replay" : "Podcast episode"}</span></Link>
    <div className="session-card-copy"><div className="session-meta"><time><CalendarDays size={14}/>{formatDate(item.eventDate || item.publishedAt)}</time>{item.duration && <time><Clock3 size={14}/>{item.duration}</time>}</div><h2><Link href={`/webinars/${item.slug}`}>{item.title}</Link></h2><p>{item.excerpt}</p>{hosts.length > 0 && <div className="session-card-host">{hosts.slice(0,3).map(person => person.avatar ? <Image key={person._id || person.slug || person.name} src={person.avatar} alt="" width={30} height={30}/> : <span key={person._id || person.slug || person.name}>{person.name?.slice(0,1)}</span>)}<small>Hosted by <strong>{hosts.map(person => person.name).join(", ")}</strong></small></div>}<Link className="session-card-link" href={`/webinars/${item.slug}`}>{isWebinar ? "Watch and explore" : "Listen and explore"} <span>↗</span></Link></div>
  </article>;
}

export default async function SessionListing() {
  const [webinars, podcasts] = await Promise.all([getResourceEntries("webinar"), getResourceEntries("podcast")]);
  return <><PageHero eyebrow="Webinars & podcasts" title="Property conversations for clearer decisions.">Watch practical webinars and listen to expert conversations on strategy, research and the property decisions ahead.</PageHero><section className="section session-listing"><div className="shell session-library"><div className="section-head session-listing-head"><div><span className="eyebrow">Watch & listen</span><h2>Learn in the format <em>that suits you.</em></h2></div><p>Every session includes a replay or recording, the people behind the conversation and a clear guide to the topics covered.</p></div><section className="session-group"><div className="session-group-head"><div><span className="chip">Watch</span><h2>Webinars</h2><p>Expert-led sessions to help you understand the market and your next move.</p></div></div>{webinars.length ? <div className="session-grid">{webinars.map(item => <SessionCard item={item} key={item._id || item.slug}/>)}</div> : <div className="empty-state"><h3>No webinars published yet</h3><p>New webinar replays will appear here once they are published from the dashboard.</p></div>}</section><section className="session-group session-podcast-group"><div className="session-group-head"><div><span className="chip">Listen</span><h2>Podcasts</h2><p>Practical property conversations you can return to when it suits you.</p></div><Mic2 aria-hidden="true"/></div>{podcasts.length ? <div className="session-grid">{podcasts.map(item => <SessionCard item={item} key={item._id || item.slug}/>)}</div> : <div className="empty-state"><h3>No podcast episodes published yet</h3><p>New podcast episodes will appear here once they are published from the dashboard.</p></div>}</section></div></section></>;
}
