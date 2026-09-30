"use client";

import { useMemo, useState } from "react";
import { Clock3, Play } from "lucide-react";

function secondsFromTimestamp(timestamp = "") {
  const parts = String(timestamp).trim().split(":").map(Number);
  if (parts.some(Number.isNaN)) return 0;
  return parts.reduce((total, part) => total * 60 + part, 0);
}

function youtubeId(url = "") {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtu.be")) return parsed.pathname.slice(1);
    return parsed.searchParams.get("v") || parsed.pathname.split("/").filter(Boolean).pop();
  } catch { return ""; }
}

export default function SessionPlayer({ title, youtubeUrl, videoUrl, audioUrl, timestamps = [] }) {
  const [activeTimestamp, setActiveTimestamp] = useState(0);
  const videoId = useMemo(() => youtubeId(youtubeUrl || videoUrl), [youtubeUrl, videoUrl]);
  const start = secondsFromTimestamp(timestamps[activeTimestamp]?.time);
  const chooseTimestamp = index => setActiveTimestamp(index);

  return <section className="session-player" aria-label={`${title} player`}>
    <div className="session-video">
      {videoId ? <iframe key={`${videoId}-${start}`} src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&autoplay=${activeTimestamp ? 1 : 0}&start=${start}`} title={title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen/> : videoUrl ? <video src={videoUrl} controls playsInline preload="metadata"/> : audioUrl ? <div className="session-audio"><Play/><p>Listen to this episode</p><audio src={audioUrl} controls preload="metadata"/></div> : <div className="session-unavailable"><Play/><p>The session recording will be available soon.</p></div>}
    </div>
    <aside className="session-timestamps">
      <div><span className="eyebrow">Session guide</span><h2>Jump to a topic</h2></div>
      <div className="session-timestamp-list">
        {timestamps.length ? timestamps.map((timestamp, index) => <button className={activeTimestamp === index ? "active" : ""} key={`${timestamp.time}-${index}`} type="button" onClick={() => chooseTimestamp(index)}><time><Clock3 size={14}/>{timestamp.time}</time><span>{timestamp.label}</span><Play size={14}/></button>) : <p>Chapter timestamps will be added with this session.</p>}
      </div>
    </aside>
  </section>;
}
