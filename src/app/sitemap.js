import { getProperties } from "../lib/properties";
import { getPublishedBlogs } from "../lib/blogs";
import { getResourceEntries } from "../lib/resourceEntries";

export default async function sitemap(){
  const base=process.env.FRONTEND_URL||"https://propwealth.com.au";
  const pages=["","about","about/who-we-are","about/who-we-guide","about/who-we-guide/rentvestors","about/who-we-guide/portfolio-investors","about/who-we-guide/large-portfolio-investors","about/founders","blog","calculator","contact","faq","news","podcasts","privacy","process","properties","propwealth-next","resources","services","success-stories","terms","videos","webinars","disclaimer"];
  const properties=await getProperties();
  const blogs=await getPublishedBlogs();
  const resourceGroups=[];
  for(const [type,path] of [["news","news"],["video","videos"],["webinar","webinars"],["podcast","podcasts"]]){
    resourceGroups.push(...(await getResourceEntries(type)).map(item=>({url:`${base}/${path}/${item.slug}`,lastModified:item.updatedAt?new Date(item.updatedAt):new Date(),changeFrequency:"monthly",priority:.7})))
  }
  return[
    ...pages.map(path=>({url:`${base}/${path}`,lastModified:new Date(),changeFrequency:["properties","blog","news","videos","webinars","podcasts"].includes(path)?"daily":"monthly",priority:path===""?1:.7})),
    ...properties.map(item=>({url:`${base}/properties/${item.slug}`,lastModified:item.updatedAt?new Date(item.updatedAt):new Date(),changeFrequency:"weekly",priority:.8})),
    ...blogs.map(item=>({url:`${base}/blog/${item.slug}`,lastModified:item.updatedAt?new Date(item.updatedAt):new Date(),changeFrequency:"monthly",priority:.7})),
    ...resourceGroups
  ]
}
