"use client";

import { useEffect } from "react";

export default function JsonLd({ id, data }) {
  useEffect(() => {
    const script = document.createElement("script");
    script.id = id;
    script.type = "application/ld+json";
    script.text = JSON.stringify(data).replace(/</g, "\\u003c");
    document.head.appendChild(script);
    return () => script.remove();
  }, [id, data]);

  return null;
}
