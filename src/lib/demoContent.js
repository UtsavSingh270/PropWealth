import Author from "../models/Author";
import Blog from "../models/Blog";
import ResourceEntry from "../models/ResourceEntry";
import PageView from "../models/PageView";
import AuditLog from "../models/AuditLog";

const image = (id) => `https://images.unsplash.com/${id}?w=1400&auto=format&fit=crop`;

export async function ensureDemoContent() {
  const author = await Author.findOneAndUpdate(
    { slug: "amelia-hart" },
    { $setOnInsert: { name: "Amelia Hart", slug: "amelia-hart", title: "Senior Property Strategist", bio: "Amelia translates Australian property research into practical portfolio decisions.", avatar: image("photo-1494790108377-be9c29b29330"), email: "amelia@example.com", active: true } },
    { upsert: true, returnDocument: "after" },
  );
  const common = { author: author._id, status: "published", visible: true, publishedAt: new Date() };
  const blogs = [
    { title: "The 2026 Australian Property Investor Checklist", slug: "2026-property-investor-checklist", excerpt: "A practical framework for assessing finance, location, property quality and portfolio fit.", content: "<h2>Start with the strategy</h2><p>A strong acquisition begins with a clear role for the property inside the wider portfolio.</p><h2>Review the fundamentals</h2><p>Consider supply, employment, affordability, infrastructure and long-term owner-occupier appeal.</p>", coverImage: image("photo-1560518883-ce09059eeffa"), category: "Investment strategy", tags: ["strategy", "due diligence"], faqs: [{ question: "How often should I review my portfolio?", answer: "At least annually and before every acquisition." }], readTime: "4 min read", views: 1284, likes: 96, featured: true, seoTitle: "Australian Property Investor Checklist 2026", seoDescription: "A practical 2026 checklist for Australian property investors." },
    { title: "What Rental Yield Really Tells You", slug: "understanding-rental-yield", excerpt: "Yield is useful, but only when viewed alongside costs, growth prospects and risk.", content: "<h2>Yield is one part of the picture</h2><p>Gross yield does not account for vacancies, maintenance, management and finance costs.</p>", coverImage: image("photo-1582407947304-fd86f028f716"), category: "Property fundamentals", tags: ["yield", "cash flow"], readTime: "3 min read", views: 842, likes: 61, seoTitle: "Rental Yield Explained for Property Investors", seoDescription: "Understand gross rental yield, costs and portfolio context." },
  ];
  for (const item of blogs) await Blog.updateOne({ slug: item.slug }, { $setOnInsert: { ...common, ...item } }, { upsert: true });

  const entries = [
    { type: "news", title: "Australian Housing Supply: The Signals Investors Are Watching", slug: "australian-housing-supply-signals", excerpt: "Approvals, completions and migration are reshaping the supply conversation.", content: "<h2>The supply pipeline matters</h2><p>Compare headline demand with actual dwelling completions and local vacancy conditions.</p>", coverImage: image("photo-1449844908441-8829872d2607"), category: "Market update", tags: ["supply", "market"], seoTitle: "Australian Housing Supply Signals 2026", seoDescription: "Key Australian housing supply indicators for property investors." },
    { type: "video", title: "How We Assess a High-Growth Suburb", slug: "assessing-high-growth-suburbs", excerpt: "A visual walkthrough of the checks used in suburb research.", content: "<h2>Research beyond a single metric</h2><p>This framework covers demand, supply, affordability and economic depth.</p>", coverImage: image("photo-1564013799919-ab600027ffc6"), category: "Research", duration: "12 min", transcript: "We begin by defining the role of the location in an investor portfolio.", seoTitle: "How to Assess a High-Growth Suburb", seoDescription: "Watch the PropWealth suburb assessment framework." },
    { type: "webinar", title: "Building a Resilient Property Portfolio", slug: "building-resilient-property-portfolio", excerpt: "A strategy session on acquisition sequencing, cash flow and diversification.", content: "<h2>Session overview</h2><p>Learn how each acquisition can preserve options for portfolio growth.</p>", coverImage: image("photo-1556761175-b413da4baf72"), category: "Portfolio strategy", duration: "60 min", eventDate: new Date(Date.now() + 14 * 86400000), speakers: ["Amelia Hart", "PropWealth Research Team"], registrationUrl: "/contact", location: "Online", seoTitle: "Property Portfolio Strategy Webinar", seoDescription: "Join our webinar on resilient Australian property portfolios." },
    { type: "podcast", title: "Interest Rates, Borrowing Capacity and the Next Purchase", slug: "rates-borrowing-capacity-next-purchase", excerpt: "A grounded conversation about portfolio decisions as lending conditions change.", content: "<h2>Episode notes</h2><p>We discuss buffers, serviceability and why strategy should not depend on one forecast.</p>", coverImage: image("photo-1478737270239-2f02b77fc618"), category: "Finance", duration: "34 min", guestName: "Daniel Price", guestBio: "Mortgage and lending specialist.", transcript: "Welcome to the PropWealth podcast.", seoTitle: "Interest Rates and Property Borrowing Capacity", seoDescription: "A property investment podcast about rates and borrowing capacity." },
  ];
  await ResourceEntry.deleteMany({ type: "calculator" });
  for (const item of entries) await ResourceEntry.updateOne({ type: item.type, slug: item.slug }, { $setOnInsert: { ...common, ...item } }, { upsert: true });

  if (await PageView.estimatedDocumentCount() === 0) {
    await PageView.insertMany(Array.from({ length: 48 }, (_, i) => ({ path: ["/", "/properties", "/blog", "/news", "/videos", "/webinars", "/podcasts", "/calculator"][i % 8], title: "PropWealth", visitorId: `demo-visitor-${i % 17}`, sessionId: `demo-session-${i % 24}`, device: ["desktop", "mobile", "tablet"][i % 3], browser: ["Chrome", "Safari", "Edge", "Firefox"][i % 4], operatingSystem: ["Windows", "macOS", "iOS"][i % 3], referrer: i % 5 === 0 ? "https://www.google.com/" : "", createdAt: new Date(Date.now() - (i % 28) * 86400000) })));
  }
  if (await AuditLog.estimatedDocumentCount() === 0) {
    await AuditLog.insertMany([
      { username: "system@propwealth.com.au", section: "blogs", action: "create", itemName: blogs[0].title, changes: { seed: true } },
      { username: "system@propwealth.com.au", section: "resources", action: "create", itemName: entries[0].title, changes: { seed: true } },
    ]);
  }
}
