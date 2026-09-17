import "./globals.css";
import "./redesign.css";
import { ThemeProvider } from "../components/ThemeProvider";
import { Plus_Jakarta_Sans } from "next/font/google";
import SiteChrome from "../components/SiteChrome";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata = { metadataBase:new URL(process.env.FRONTEND_URL||"https://propwealth.com.au"),title:{ default:"PropWealth | Trust. Invest. Grow.", template:"%s | PropWealth" },description:"Strategic property investment guidance and researched opportunities across Australia.",openGraph:{siteName:"PropWealth",type:"website",locale:"en_AU"},twitter:{card:"summary_large_image"} };
export default function RootLayout({children}) { return <html lang="en" suppressHydrationWarning className={jakarta.variable}><body><ThemeProvider><SiteChrome>{children}</SiteChrome></ThemeProvider></body></html>; }
