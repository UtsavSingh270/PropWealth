export const navigationGroups = {
  about: {
    label: "About Us",
    href: "/about",
    links: [
      ["Who We Are", "/about/who-we-are"],
      ["Who We Guide", "/about/who-we-guide"],
      ["Rentvestors", "/about/who-we-guide/rentvestors"],
      ["Portfolio Investors", "/about/who-we-guide/portfolio-investors"],
      ["Large Portfolio Investors", "/about/who-we-guide/large-portfolio-investors"],
    ],
  },
  services: {
    label: "Services",
    href: "/services",
    links: [
      ["Wealth Creation Strategy", "/services/wealth-creation-strategy"],
      ["Strategic Property Research", "/services/strategic-property-research"],
      ["Strategic Property Acquisition", "/services/strategic-property-acquisition"],
      ["Property Analysis & Due Diligence", "/services/property-analysis-due-diligence"],
      ["Negotiation & Acquisition Execution", "/services/negotiation-acquisition-execution"],
    ],
  },
  resources: {
    label: "Resources",
    href: "/resources",
    links: [
      ["Blogs & Insights", "/blog"],
      ["Webinars & Podcasts", "/webinars"],
      ["Downloadable Resources", "/reports"],
      ["Negative Gearing & CGT Calculator", "/calculator"],
    ],
  },
};

export const footerNavigation = {
  explore: [
    ["Services", "/services"],
    ["Success Stories", "/success-stories"],
    ["About Us", "/about"],
    ["Resources", "/resources"],
    ["PropWealth NEXT", "/propwealth-next"],
    ["Contact", "/contact"],
  ],
  resources: navigationGroups.resources.links,
};
