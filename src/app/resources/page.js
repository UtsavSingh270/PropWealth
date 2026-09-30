import Link from "next/link";import { ArrowRight,ArrowUpRight,BookOpen,Calculator,Download,Lightbulb,MapPin,Presentation } from "lucide-react";import PageHero from "../../components/PageHero";import { resourceLinks } from "../../data/resources";
const icons=[BookOpen,Presentation,Download,Calculator];
export const metadata={title:"Resources"};
export default function Resources(){
    return <>
    <PageHero eyebrow="Investor resources"
    title="Knowledge for every stage of your property journey.">All content is published and managed directly by PropWealth—without sending you to another website.
    </PageHero>
    <section className="section">
        <div className="shell resource-grid">{resourceLinks.map(([title,description,href],index)=>{const Icon=icons[index];return <article className="resource-card" key={title}>
                <div className="card-icon">
                    <Icon/>
                </div>
                <div>
                    <h2>{title}</h2>
                    <p>{description}</p>
                </div>
                <Link href={href}>Explore <ArrowUpRight/></Link>
            </article>})}
        </div>
    </section>
    <section className="section soft"><div className="shell"><div className="section-head"><div><span className="eyebrow">Make the research useful</span><h2>Information is only helpful when it leads somewhere.</h2></div><p>Use these resources to prepare for a conversation, understand a market, or decide what research you need next.</p></div><div className="grid three"><article className="card"><Lightbulb/><h3>Start with your question</h3><p>Explore the resource that matches the decision you are trying to make today.</p></article><article className="card"><MapPin/><h3>Add local context</h3><p>Use PropWealth Next to see the market information behind the suburb you are considering.</p></article><article className="card"><BookOpen/><h3>Talk it through</h3><p>Bring your questions to a free call with the team and turn research into a practical next step.</p></article></div></div></section>
    </>}
