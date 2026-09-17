import crypto from "crypto";
import { cookies } from "next/headers";

const COOKIE="propwealth_admin";
const secret=()=>process.env.JWT_SECRET||process.env.ADMIN_SESSION_SECRET||"development-only-change-me";
const encode=(value)=>Buffer.from(value).toString("base64url");
const sign=(value)=>crypto.createHmac("sha256",secret()).update(value).digest("base64url");
export function createAdminToken(session={role:"superadmin",permissions:["*"]}){const payload=encode(JSON.stringify({...session,exp:Date.now()+1000*60*60*8}));return `${payload}.${sign(payload)}`}
export function verifyAdminToken(token=""){const [payload,signature]=token.split(".");if(!payload||!signature)return null;const expected=sign(payload);if(signature.length!==expected.length||!crypto.timingSafeEqual(Buffer.from(signature),Buffer.from(expected)))return null;try{const data=JSON.parse(Buffer.from(payload,"base64url").toString());return data.exp>Date.now()?data:null}catch{return null}}
export async function getAdminSession(){return verifyAdminToken((await cookies()).get(COOKIE)?.value)}
export async function isAdmin(permission){const session=await getAdminSession();if(!session)return false;if(!permission)return true;return session.role==="superadmin"||session.permissions?.includes("*")||session.permissions?.includes(permission)}
export function hashPassword(password){const salt=crypto.randomBytes(16).toString("hex");return `${salt}:${crypto.scryptSync(password,salt,64).toString("hex")}`}
export function verifyPassword(password,stored=""){try{const [salt,key]=stored.split(":");return crypto.timingSafeEqual(Buffer.from(key,"hex"),crypto.scryptSync(password,salt,64))}catch{return false}}
export const adminCookie={name:COOKIE,options:{httpOnly:true,sameSite:"strict",secure:process.env.NODE_ENV==="production",path:"/",maxAge:60*60*8}};
