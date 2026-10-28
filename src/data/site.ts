// Every business fact for the site lives here. Source: scraped Wix home page (raw messy data/index.html)
// and the brand's own promo poster. No client notes were supplied. Items marked `confirm` need the owner's sign-off.

export type Flavor = {
  slug: string;
  name: string;
  /** From the brand's poster. Empty when the source gives no description. */
  description: string;
  collection: 'bold-heritage' | 'pint';
  /** Self-hosted pint photo, when the source has one. */
  image?: { src: string; width: number; height: number };
  /** Marble recipe used by the scroll scene and the CSS stills: base, ribbon, fleck. */
  swirl: [string, string, string];
};

export const site = {
  name: 'IceScreamy',
  legalName: 'Icescreamy LLC',
  url: 'https://www.icescreamy.com',
  tagline: 'Caribbean-inspired ice cream',
  description:
    'Premium artisanal ice cream with Caribbean inspiration, made in Brooklyn. Bold flavors, island roots, Brooklyn energy.',
  location: { city: 'Brooklyn', region: 'NY', country: 'US', serviceArea: 'the New York tri-state area' },
  hours: { label: 'Open daily', open: '10\u00a0AM', close: '10\u00a0PM', schema: 'Mo-Su 10:00-22:00' },
  email: 'hello@icescreamy.com',
  phone: { display: '347-849-7924', href: 'tel:+13478497924' },
  instagram: { handle: '@icescreamy_', url: 'https://www.instagram.com/icescreamy_' },
  // confirm: online ordering still runs on the old Wix store. Point this at the live ordering system before launch.
  orderUrl: 'https://www.icescreamy.com/order-online',
  // confirm: founder name appears only on the brand's National Ice Cream Day poster.
  founder: { name: 'Portia Greer Wallace', title: 'Founder & CEO' },
  collectionName: 'The Bold Heritage Collection',
  lines: {
    hero: 'Bold flavors. Island roots. Brooklyn energy.',
    slogan: 'Caribbean roots. Brooklyn bold.',
    story: 'Every scoop tells a story.',
    about:
      'IceScreamy creates bold, artisanal ice cream inspired by the rich cultures of the African diaspora. Crafted in Brooklyn with premium ingredients, our flavors tell stories of heritage and innovation.',
    origins:
      'At IceScreamy, we bring the rich flavors of the African diaspora to the shores of Brooklyn. Our ice cream is a celebration of heritage and innovation, inspired by the vibrant cultures that shape our community.',
  },
} as const;

const img = (slug: string, width: number, height: number) => ({ src: `/media/${slug}.webp`, width, height });

export const flavors: Flavor[] = [
  {
    slug: 'caribbean-liberation',
    name: 'Caribbean Liberation',
    description: 'Creamy caramel ice cream with a vibrant guava ribbon and warm Caribbean spices.',
    collection: 'bold-heritage',
    swirl: ['#D9A35E', '#E8667A', '#7A3E1D'],
  },
  {
    slug: 'raspberry-coconut',
    name: 'Raspberry Coconut',
    description: 'Coconut ice cream with a raspberry swirl and toasted coconut.',
    collection: 'bold-heritage',
    image: img('raspberry-coconut', 478, 868),
    swirl: ['#F4EEE4', '#B8214A', '#C99A62'],
  },
  {
    slug: 'red-black-and-bliss',
    name: 'Red, Black & Bliss',
    description: 'Strawberry hibiscus ice cream with a black currant swirl.',
    collection: 'bold-heritage',
    swirl: ['#E47E90', '#2A0F22', '#B3123A'],
  },
  {
    slug: 'grapenut',
    name: 'Grapenut',
    description: '',
    collection: 'pint',
    image: img('grapenut', 532, 894),
    swirl: ['#F1E6CF', '#6B4426', '#A9774A'],
  },
  {
    slug: 'black-forest-bliss',
    name: 'Black Forest Bliss',
    description: '',
    collection: 'pint',
    image: img('black-forest-bliss', 494, 872),
    swirl: ['#5A3122', '#8E0F22', '#2B150D'],
  },
  {
    slug: 'rose-pistachio-cheesecake',
    name: 'Rose & Pistachio Cheesecake',
    description: '',
    collection: 'pint',
    image: img('rose-pistachio-cheesecake', 493, 873),
    swirl: ['#F1DCD6', '#C9354B', '#93A83A'],
  },
  {
    slug: 'pumpkin-cream-dream',
    name: 'Pumpkin Cream Dream',
    description: '',
    collection: 'pint',
    image: img('pumpkin-cream-dream', 497, 871),
    swirl: ['#E2A96A', '#F3D7A8', '#B9692A'],
  },
];

export const nav = [
  { href: '/flavors', label: 'Flavors' },
  { href: '/story', label: 'Our story' },
  { href: '/events', label: 'Events & partners' },
] as const;
