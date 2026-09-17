import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "../../../components/JsonLd";
import { getBlog } from "../../../lib/blogs";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getBlog(slug);
  if (!post) return { title: "Article not found" };
  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    openGraph: { images: post.coverImage ? [post.coverImage] : [] },
  };
}

export default async function BlogPost({ params }) {
  const { slug } = await params;
  const post = await getBlog(slug);
  if (!post) notFound();
  const faqs = Array.isArray(post.faqs) ? post.faqs.slice(0, 5) : [];
  const faqSchema = faqs.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      }
    : null;

  return (
    <article className="blog-post">
      {faqSchema && <JsonLd id={`blog-faq-${post.slug}`} data={faqSchema} />}
      <header className="shell">
        <nav className="breadcrumbs">
          <Link href="/">Home</Link><span>/</span>
          <Link href="/resources">Resources</Link><span>/</span>
          <Link href="/blog">Blogs</Link><span>/</span>
          <span>{post.category}</span>
        </nav>
        <span className="chip">{post.category}</span>
        <h1>{post.title}</h1>
        <p>{post.excerpt}</p>
        <div className="post-byline">
          {post.author && (
            <Link href={`/blog/author/${post.author.slug}`}>
              {post.author.avatar && <Image src={post.author.avatar} alt="" width={44} height={44} />}
              <span><strong>{post.author.name}</strong><small>{post.author.title}</small></span>
            </Link>
          )}
          <time>{new Date(post.publishedAt || post.scheduledAt).toLocaleDateString("en-AU", { dateStyle: "long" })}</time>
        </div>
      </header>
      {post.coverImage && <div className="shell post-hero"><Image src={post.coverImage} alt={post.title} fill priority /></div>}
      <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content }} />
      {faqs.length > 0 && (
        <section className="post-faqs" aria-labelledby="blog-faq-title">
          <span className="eyebrow">Helpful answers</span>
          <h2 id="blog-faq-title">Frequently asked questions</h2>
          {faqs.map((faq, index) => (
            <details key={`${faq.question}-${index}`}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </section>
      )}
    </article>
  );
}
