import { notFound } from "next/navigation";
import JsonLd from "../../../components/JsonLd";
import PageHero from "../../../components/PageHero";
import PropertyExplorer from "../../../components/PropertyExplorer";
import { getProperties,getProperty } from "../../../lib/properties";

export const dynamic="force-dynamic";
export async function generateMetadata({params}){const {slug}=await params;
const property=await getProperty(slug);

if(!property)return{title:"Property not found"};
return{title:`${property.title} | Investment Property`,description:property.description,alternates:{canonical:`/properties/${property.slug}`},openGraph:{title:property.title,description:property.description,images:[property.image]}}}
export default async function PropertyPopupRoute({params}){
    const {slug}=await params;
    const property=await getProperty(slug);if(!property)notFound();
    const properties=await getProperties();
    const jsonLd={"@context":"https://schema.org","@type":"RealEstateListing",name:property.title,description:property.description,url:`${process.env.FRONTEND_URL||"https://propwealth.com.au"}/properties/${property.slug}`,image:property.images,address:{"@type":"PostalAddress",addressLocality:property.suburb,addressRegion:property.state,addressCountry:"AU"},offers:{"@type":"Offer",price:property.price,priceCurrency:"AUD",availability:property.status==="Sold Out"?"https://schema.org/SoldOut":"https://schema.org/InStock"}};
    
    return <>
    <JsonLd id={`property-jsonld-${property.slug}`} data={jsonLd}/>
    <PageHero eyebrow="Property opportunities" title="Research-backed properties across Australia.">Explore a curated demonstration portfolio across locations, property types and investment profiles.</PageHero>
    <section className="section">
        <div className="shell">
            <PropertyExplorer properties={properties} initialOpenSlug={slug}/>
        </div>
    </section>
    </>}
