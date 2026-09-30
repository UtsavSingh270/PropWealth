"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const PAGE_SIZE = 6;

export default function AuthorPosts({ posts }) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const visiblePosts = posts.slice(0, visibleCount);

  return <>
    <div className="author-post-grid">
      {visiblePosts.map(post => <article className="blog-card author-post-card" key={post.slug}>
        {post.coverImage && <Link className="blog-cover" href={`/blog/${post.slug}`}><Image src={post.coverImage} alt={post.title} fill sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"/></Link>}
        <div><span className="chip">{post.category || "Property insight"}</span><h2><Link href={`/blog/${post.slug}`}>{post.title}</Link></h2><p>{post.excerpt}</p><Link className="author-post-link" href={`/blog/${post.slug}`}>Read article <ArrowRight size={15}/></Link></div>
      </article>)}
    </div>
    {visibleCount < posts.length && <div className="author-load-more"><button className="button secondary" type="button" onClick={() => setVisibleCount(count => count + PAGE_SIZE)}>Load more articles</button><small>Showing {visiblePosts.length} of {posts.length} articles</small></div>}
  </>;
}
