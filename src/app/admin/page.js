import { redirect } from "next/navigation";
import AdminDashboard from "../../components/AdminDashboard";
import { getAdminSession } from "../../lib/adminAuth";
import { connectDB } from "../../lib/mongodb";
import Property from "../../models/Property";
import Lead from "../../models/Lead";
import Blog from "../../models/Blog";
import Author from "../../models/Author";
import AdminUser from "../../models/AdminUser";
import PageView from "../../models/PageView";
import ResourceEntry from "../../models/ResourceEntry";

export const dynamic="force-dynamic";
export default async function Admin(){
  const session=await getAdminSession();
  if(!session)redirect("/admin/login");
  await connectDB();
  /* A dynamic admin report intentionally uses the request time. */ // eslint-disable-next-line react-hooks/purity
  const since=new Date(Date.now()-30*86400000);
  const [properties,leads,blogs,resources,authors,admins,views,visitors,topPages,daily]=await Promise.all([
    Property.find({}).sort({updatedAt:-1}).lean(),
    Lead.find({}).sort({createdAt:-1}).lean(),
    Blog.find({}).populate("author").sort({updatedAt:-1}).lean(),
    ResourceEntry.find({}).populate("author").sort({updatedAt:-1}).lean(),
    Author.find({}).sort({name:1}).lean(),
    session.role==="superadmin"?AdminUser.find({}).select("-passwordHash").sort({createdAt:-1}).lean():[],
    PageView.countDocuments({createdAt:{$gte:since}}),
    PageView.distinct("sessionId",{createdAt:{$gte:since}}),
    PageView.aggregate([{$match:{createdAt:{$gte:since}}},{$group:{_id:"$path",views:{$sum:1}}},{$sort:{views:-1}},{$limit:10}]),
    PageView.aggregate([{$match:{createdAt:{$gte:since}}},{$group:{_id:{$dateToString:{format:"%Y-%m-%d",date:"$createdAt"}},views:{$sum:1}}},{$sort:{_id:1}}])
  ]);
  const serial=value=>JSON.parse(JSON.stringify(value));
  return <AdminDashboard session={session} initialProperties={serial(properties)} initialLeads={serial(leads)} initialBlogs={serial(blogs)} initialResources={serial(resources)} initialAuthors={serial(authors)} initialAdmins={serial(admins)} initialAnalytics={{views,visitors:visitors.filter(Boolean).length,topPages:serial(topPages),daily:serial(daily),leads:leads.filter(item=>new Date(item.createdAt)>=since).length}}/>
}
