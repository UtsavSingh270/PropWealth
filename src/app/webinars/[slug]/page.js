import SessionDetail from "../../../components/SessionDetail";
import { getSessionBySlug } from "../../../lib/resourceEntries";
export const dynamic="force-dynamic";
export async function generateMetadata({params}){const item=await getSessionBySlug((await params).slug);return item?{title:item.seoTitle||`${item.title} | PropWealth`,description:item.seoDescription||item.excerpt}:{title:"Session not found | PropWealth"}}
export default async function Page({params}){return <SessionDetail slug={(await params).slug}/>}
