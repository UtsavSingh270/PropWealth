const gallery = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1400&auto=format&fit=crop",
];

const seed = [
  ["riverstone-family-home","Riverstone Family Home","Riverstone","NSW","House","Available",785000,4,2,2,375,4.3,"High growth"],
  ["southbank-river-apartment","Southbank River Apartment","Southbank","VIC","Apartment","In Demand",645000,2,2,1,86,5.1,"Strong rental"],
  ["coomera-new-townhouse","Coomera New Townhouse","Coomera","QLD","Townhouse","New",695000,3,2,2,142,4.8,"Infrastructure"],
  ["ellenbrook-house-land","Ellenbrook House & Land","Ellenbrook","WA","House & Land","Available",619000,4,2,2,420,5.0,"Emerging market"],
  ["newcastle-coastal-unit","Newcastle Coastal Unit","Newcastle","NSW","Unit","Sold Out",710000,2,1,1,78,4.6,"Lifestyle"],
  ["werribee-growth-corridor","Werribee Growth Corridor Home","Werribee","VIC","House","Available",665000,3,2,2,350,4.5,"Population"],
  ["ipswich-dual-income","Ipswich Dual Income Property","Ipswich","QLD","Dual income","New",829000,5,3,2,510,6.2,"High yield"],
  ["adelaide-city-fringe","Adelaide City Fringe Terrace","Bowden","SA","Townhouse","Available",735000,3,2,1,128,4.7,"Urban renewal"],
  ["perth-metro-villa","Perth Metro Investment Villa","Balga","WA","Villa","Sold Out",549000,3,2,2,196,5.4,"Affordable"],
  ["hobart-water-view","Hobart Water View Home","Howrah","TAS","House","Available",749000,4,2,2,620,4.4,"Scarcity"],
  ["canberra-executive-apartment","Canberra Executive Apartment","Belconnen","ACT","Apartment","New",595000,2,2,1,91,5.3,"Employment"],
  ["geelong-renovated-cottage","Geelong Renovated Cottage","Newtown","VIC","House","Sold Out",810000,3,2,1,310,4.1,"Established"],
];

export const properties = seed.map(([slug,title,suburb,state,category,status,price,beds,baths,cars,area,yieldRate,growth], index) => {
  const images = [gallery[index % gallery.length], gallery[(index + 2) % gallery.length], gallery[(index + 4) % gallery.length]];
  return { slug,title,suburb,state,category,status,price,beds,baths,cars,area,yield:yieldRate,growth,images,image:images[0],featured:index<4,description:`A carefully selected ${beds}-bedroom ${category.toLowerCase()} in ${suburb}, positioned for investors seeking ${growth.toLowerCase()} fundamentals. The opportunity has been assessed for local demand, liveability, rental appeal and long-term market depth.` };
});
