export type Event = {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  address: string;
  description: string;
  body: string;
  capacity: number;
  tags: string[];
};

export const events: Event[] = [
  {
    id: "spring-foraging-walk",
    title: "Spring Foraging Walk",
    date: "2026-04-12",
    time: "9:00 AM",
    location: "Prospect Park",
    address: "Prospect Park, Brooklyn, NY 11225",
    description: "A guided walk through early spring growth — learn to identify edible plants, mosses, and fungi with the naked eye.",
    body: `We'll meet at the Picnic House and spend two hours moving through the south meadow and wooded paths, stopping to examine what's pushing through the soil and bark. No prior experience needed — just curiosity and comfortable shoes.\n\nWhat to bring: a small basket or cloth bag, a notebook if you like, and something to drink. We'll share a light communal snack at the end made from whatever we find.`,
    capacity: 18,
    tags: ["outdoors", "foraging", "seasonal"],
  },
  {
    id: "natural-dye-workshop",
    title: "Natural Dye Workshop",
    date: "2026-04-26",
    time: "2:00 PM",
    location: "The Loom House",
    address: "47 Nevins St, Brooklyn, NY 11217",
    description: "Dye fabric using plants, roots, and kitchen scraps. Walk away with a piece of cloth colored entirely by nature.",
    body: `We'll work with onion skins, avocado pits, black beans, and dried madder root to produce a range of warm and surprising colors. Each person will dye a small linen swatch and a tote bag to take home.\n\nAll materials provided. The space fits 12 people maximum, so registration is firm. Wear clothes you don't mind getting stained — natural dyes are gentler than synthetic, but still pigment.`,
    capacity: 12,
    tags: ["craft", "textile", "hands-on"],
  },
  {
    id: "seed-library-swap",
    title: "Seed Library & Swap",
    date: "2026-05-03",
    time: "11:00 AM",
    location: "Bushwick Community Garden",
    address: "83 Linden St, Brooklyn, NY 11221",
    description: "Bring seeds to share, leave with seeds to plant. A free community swap with short talks on seed saving.",
    body: `This is a low-key gathering built around exchange. Tables will be laid out by plant family — brassicas, nightshades, alliums, herbs, flowers. Bring anything you've saved or have extras of; take freely in return.\n\nTwo short 15-minute talks: one on basic seed-saving technique, one on open-pollinated versus hybrid varieties and why it matters. Stick as long or short as you like. Kids and dogs welcome.`,
    capacity: 60,
    tags: ["garden", "community", "free"],
  },
  {
    id: "fermentation-evening",
    title: "Fermentation Evening",
    date: "2026-05-15",
    time: "6:30 PM",
    location: "The Loom House",
    address: "47 Nevins St, Brooklyn, NY 11217",
    description: "An evening of fermented foods, drinks, and the microbial science behind them. Taste, learn, and take a starter home.",
    body: `We'll taste seven ferments side by side — two krauts, a kimchi, a jun, a tepache, a miso broth, and a wild-yeast soda — and talk through what's happening at each stage. The goal isn't recipes but understanding: what conditions encourage good fermentation, how to read a batch, when to intervene.\n\nEveryone leaves with a small sourdough starter and instructions. Snacks and drinks provided; dinner not included.`,
    capacity: 20,
    tags: ["food", "science", "evening"],
  },
  {
    id: "night-sky-reading",
    title: "Night Sky & Reading",
    date: "2026-06-07",
    time: "8:45 PM",
    location: "Fort Tilden Beach",
    address: "Fort Tilden, Rockaway, NY 11695",
    description: "Read aloud under an open sky. Bring a piece — prose, poetry, a letter, a field note — and share it with strangers.",
    body: `We'll take the A train out together (meeting at Howard Beach station at 7:45 PM) and walk to the beach as it gets dark. Blankets, a fire in the pit if permitted, and an open mic format — no pressure to read, no time limits, no theme.\n\nThis one has run three times before and it's always strange and good. Bring something to sit on, something warm, and something to read if you want. The return train leaves around midnight.`,
    capacity: 30,
    tags: ["reading", "outdoors", "evening"],
  },
];

export function getEvent(id: string): Event | undefined {
  return events.find((e) => e.id === id);
}
