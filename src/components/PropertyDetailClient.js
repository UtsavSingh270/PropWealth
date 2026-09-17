"use client";
import { useState } from "react";
import Image from "next/image";
import { Bath,BedDouble,Car,ChevronLeft,ChevronRight,MapPin,Maximize,TrendingUp } from "lucide-react";

export default function PropertyDetailClient({property}){const [slide,setSlide]=useState(0);const images=(property.media||[]).filter(item=>item.type==="image").map(item=>item.url);const gallery=images.length?images:(property.images||[property.image]).filter(Boolean);
    return <>
    <div className="detail-gallery">
        <Image src={gallery[slide]} alt={`${property.title} view ${slide+1}`} fill priority sizes="100vw"/>
        <button className="slider-arrow previous" onClick={()=>setSlide((slide-1+gallery.length)%gallery.length)} aria-label="Previous image"><ChevronLeft/></button>
        <button className="slider-arrow next" onClick={()=>setSlide((slide+1)%gallery.length)} aria-label="Next image"><ChevronRight/></button>
        <div className="detail-thumbs">
            {gallery.map((image,index)=>
              <button key={image} className={slide===index?"active":""} onClick={()=>setSlide(index)} aria-label={`View image ${index+1}`}>
                <Image src={image} alt="" fill sizes="100px"/>
              </button>
            )}
        </div>
    </div>
    <div className="detail-summary">
        <div>
            <small className="pink">{property.category} · {property.growth}</small>
            <h1>{property.title}</h1>
            <p className="property-place"><MapPin/>{property.suburb}, {property.state}</p>
        </div>
        <div className="detail-price">${property.price.toLocaleString("en-AU")}</div>
        <div className="modal-meta">
            <span><BedDouble/>{property.beds}<small>Bedrooms</small></span>
            <span><Bath/>{property.baths}<small>Bathrooms</small></span>
            <span><Car/>{property.cars}<small>Cars</small></span>
            <span><Maximize/>{property.area}m²<small>Size</small></span>
        </div>
        <p>{property.description}</p>
        <div className="yield-line"><TrendingUp/>
          <span><strong>{property.yield}%</strong> indicative rental yield</span>
        </div>
        <div className="property-actions">
            <a className="button" href="#property-enquiry">Book a consultation</a>
        </div>
    </div>
    </>}
