import Link from "next/link";import { ArrowUpRight,BookOpen,Calculator,Download,Presentation } from "lucide-react";import PageHero from "../../components/PageHero";import { resourceLinks } from "../../data/resources";
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
    </section></>}
