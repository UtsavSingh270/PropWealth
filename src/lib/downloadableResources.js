import { connectDB } from "./mongodb";import DownloadableResource from "../models/DownloadableResource";
export async function getDownloadableResources(){try{await connectDB();return JSON.parse(JSON.stringify(await DownloadableResource.find({visible:true}).sort({order:1,createdAt:-1}).lean()))}catch(error){console.warn("Downloadable resources unavailable:",error.message);return[]}}
