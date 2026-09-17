import PageHero from "../../components/PageHero"; 
import PropertyExplorer from "../../components/PropertyExplorer"; 
import SuccessStoriesReels from "../../components/SuccessStoriesReels"; 
import { getProperties } from "../../lib/properties";

export const metadata={title:"Investment Properties"}; 
export const dynamic="force-dynamic";

export default async function Properties(){
    const data=await getProperties();
    return <>
    <PageHero eyebrow="Property opportunities" 
              title="Research-backed properties across Australia.">Explore a curated demonstration portfolio across locations, property types and investment profiles. Speak with our team before making any financial decision.
    </PageHero>
    
    <section className="section">
        <div className="shell">
            <PropertyExplorer properties={data}/>
        </div>
    </section>

    {/* New Success Stories Section */}
    <section className="section soft" id="success-stories">
        <div className="shell">
            <div className="section-head">
                <div className="eyebrow">Success Stories</div>
                <h2>Real Investors, Real Results</h2>
                <p>See how our clients are building their wealth through property investment. Swipe or drag to explore their journeys.</p>
            </div>
            <SuccessStoriesReels />
        </div>
    </section>
    </>
}