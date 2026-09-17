import mongoose from "mongoose";
import dns from "node:dns";

const uri = process.env.MONGODB_URI;
const registry = globalThis.__propwealthMongooseRegistry || (globalThis.__propwealthMongooseRegistry = new WeakMap());
let cached = registry.get(mongoose);
if (!cached) { cached = { conn: null, promise: null }; registry.set(mongoose, cached); }

export async function connectDB() {
  if (!uri) throw new Error("MONGODB_URI is not configured");
  if (cached.conn?.connection?.readyState === 1) return cached.conn;
  if (cached.conn) cached.conn = null;
  const options = { bufferCommands: false, serverSelectionTimeoutMS: 8000 };
  if (!cached.promise) cached.promise = mongoose.connect(uri, options);
  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    cached.promise = null;
    if (uri.startsWith("mongodb+srv://") && error?.code === "ECONNREFUSED") {
      dns.setServers((process.env.MONGODB_DNS_SERVERS || "1.1.1.1,8.8.8.8").split(",").map(server => server.trim()).filter(Boolean));
      cached.promise = mongoose.connect(uri, options);
      try {
        cached.conn = await cached.promise;
        return cached.conn;
      } catch (retryError) {
        cached.promise = null;
        throw retryError;
      }
    }
    throw error;
  }
}
