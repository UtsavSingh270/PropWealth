import { connectDB } from "../../../lib/mongodb";
import Lead from "../../../models/Lead";
import { sendLeadEmails } from "../../../lib/email";

const attempts=global.leadAttempts||(global.leadAttempts=new Map());

export async function POST(request){
  try{
    const ip=request.headers.get("x-forwarded-for")?.split(",")[0]||"local";const now=Date.now();const recent=(attempts.get(ip)||[]).filter(time=>now-time<60000);if(recent.length>=5)return Response.json({error:"Too many requests. Please wait a minute and try again."},{status:429});attempts.set(ip,[...recent,now]);
    const body=await request.json();
    const {name,email,phone,message="",action,propertySlug,propertyTitle,consent,website,budget,timeframe,experience,goal,appointmentDate,source="website"}=body;
    if(website) return Response.json({ok:true});
    if(!name?.trim()||!email?.trim()||!phone?.trim()||!propertySlug||!propertyTitle||!consent||!["booking","strategy"].includes(action)) return Response.json({error:"Please complete all required fields."},{status:400});
    if(!/^\S+@\S+\.\S+$/.test(email)) return Response.json({error:"Please enter a valid email address."},{status:400});
    if(!/^\+61[2-9]\d{8}$/.test(phone.replace(/[\s()-]/g,""))) return Response.json({error:"Please enter a valid Australian phone number."},{status:400});
    await connectDB();
    if(source==="website-popup"){
      const normalizedEmail=email.trim().toLowerCase();const normalizedPhone=phone.replace(/\D/g,"");
      const duplicate=await Lead.exists({source:"website-popup",$or:[{email:normalizedEmail},{normalizedPhone}]});
      if(duplicate)return Response.json({error:"We already have your details. Our team will contact you, so there is no need to submit this form again."},{status:409});
    }
    const lead=await Lead.create({name,email,phone,normalizedPhone:phone.replace(/\D/g,""),message,action,propertySlug,propertyTitle,consent:true,budget,timeframe,experience,goal,appointmentDate,source});
    sendLeadEmails(lead.toObject()).catch(error=>console.error("Lead email failed",error));
    return Response.json({ok:true,id:lead._id},{status:201});
  }catch(error){console.error("Lead submission failed",error);return Response.json({error:"We could not save your enquiry. Please try again."},{status:500})}
}
