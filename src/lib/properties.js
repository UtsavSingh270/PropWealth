import { connectDB } from "./mongodb";
import Property from "../models/Property";
import { properties as fallbackProperties } from "../data/properties";

export async function getProperties() {
  try {
    await connectDB();
    await Property.bulkWrite(fallbackProperties.map((property) => ({
      updateOne: { filter: { slug: property.slug }, update: { $setOnInsert: property }, upsert: true }
    })));
    const stored=await Property.find({}).sort({ createdAt: 1 }).lean();
    return JSON.parse(JSON.stringify(stored.filter(item=>item.visible!==false).map(item=>({...fallbackProperties.find(seed=>seed.slug===item.slug),...item}))));
  } catch (error) {
    console.warn("Using local property seed data:", error.message);
    return fallbackProperties;
  }
}

export async function getProperty(slug){const items=await getProperties();return items.find(item=>item.slug===slug)||null}
