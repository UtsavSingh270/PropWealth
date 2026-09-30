import Image from "next/image";
import { notFound } from "next/navigation";
import AuthorPosts from "../../../../components/AuthorPosts";
import { getAuthor,getPublishedBlogs } from "../../../../lib/blogs";

export const dynamic="force-dynamic";

export default async function AuthorPage({ params }) {
  const { slug } = await params;
  const author = await getAuthor(slug);
  if (!author) notFound();

  const posts = await getPublishedBlogs({ author: author._id });
  const biography = (author.bio || "").split(/\r?\n\s*\r?\n|\r?\n/).map(item => item.trim()).filter(Boolean);

  return <>
    <section className="author-hero">
      <div className="shell author-profile">
        <div className="author-avatar">{author.avatar ? <Image src={author.avatar} alt={author.name} fill sizes="150px"/> : <span>{author.name.split(" ").map(name => name[0]).join("").slice(0,2)}</span>}</div>
        <div className="author-profile-copy"><span className="eyebrow">PropWealth author</span><h1>{author.name}</h1>{author.title && <strong>{author.title}</strong>}<div className="author-bio author-bio-intro">{biography.slice(0,1).map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div></div>
        {biography.length > 1 && <div className="author-bio author-bio-follow-up">{biography.slice(1).map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>}
      </div>
    </section>
    <section className="section author-articles"><div className="shell"><div className="author-articles-heading"><div><span className="eyebrow">Featured articles</span><h2>Insights from {author.name.split(" ")[0]}.</h2></div><p>{posts.length ? `${posts.length} practical property articles to explore.` : "New articles are being prepared."}</p></div>{posts.length ? <AuthorPosts posts={posts}/> : <div className="empty-state"><h3>No articles published yet</h3><p>New insights from {author.name} will appear here.</p></div>}</div></section>
  </>;
}
