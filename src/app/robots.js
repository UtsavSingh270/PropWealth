export default function robots(){const base=process.env.FRONTEND_URL||"https://propwealth.com.au";return{rules:[{userAgent:"*",allow:"/",disallow:["/admin/","/api/"]}],sitemap:`${base}/sitemap.xml`}}
