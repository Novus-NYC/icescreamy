import { flavors } from '@/data/site';

// One marble state per chapter of the home page scroll. The driver blends between them.
export type ChapterState = {
  base: string;
  rib: string;
  fleck: string;
  twist: number;  // churn toward the centre
  ribbon: number; // ribbon width
  r: number;      // scoop radius, fraction of the short side
  seed: number;
  desk: [number, number]; // scoop centre on wide screens (x, y from bottom)
  phone: [number, number];
};

const heritage = (slug: string) => flavors.find((f) => f.slug === slug)!.swirl;
const [cl, rc, rb] = [heritage('caribbean-liberation'), heritage('raspberry-coconut'), heritage('red-black-and-bliss')];

export const chapters: ChapterState[] = [
  // hero: vanilla cream folded with gold, the pint's own colors
  { base: '#F3E6CB', rib: '#C8913C', fleck: '#7C5020', twist: 0.5, ribbon: 0.2, r: 0.47, seed: 0.0, desk: [0.73, 0.5], phone: [0.62, 0.7] },
  // roots: hibiscus and sun
  { base: '#C42840', rib: '#F2B23C', fleck: '#4A0C18', twist: 0.9, ribbon: 0.3, r: 0.42, seed: 3.1, desk: [0.72, 0.52], phone: [0.5, 0.7] },
  // brooklyn: cream churned hard with emerald, the skyline draws below
  { base: '#EFE4CB', rib: '#0F4A33', fleck: '#D6B062', twist: 2.6, ribbon: 0.24, r: 0.34, seed: 6.4, desk: [0.72, 0.58], phone: [0.5, 0.74] },
  // the Bold Heritage Collection, one recipe each
  { base: cl[0], rib: cl[1], fleck: cl[2], twist: 1.1, ribbon: 0.26, r: 0.43, seed: 9.2, desk: [0.71, 0.5], phone: [0.5, 0.7] },
  { base: rc[0], rib: rc[1], fleck: rc[2], twist: 1.4, ribbon: 0.3, r: 0.43, seed: 12.7, desk: [0.71, 0.5], phone: [0.5, 0.7] },
  { base: rb[0], rib: rb[1], fleck: rb[2], twist: 1.2, ribbon: 0.34, r: 0.43, seed: 15.3, desk: [0.71, 0.5], phone: [0.5, 0.7] },
  // finale: the scoop settles into the pint's gold, cream ribbon
  { base: '#D9AE5C', rib: '#F6EEDC', fleck: '#6E4A16', twist: 0.4, ribbon: 0.16, r: 0.3, seed: 18.0, desk: [0.72, 0.5], phone: [0.5, 0.72] },
];

// A hand-drawn single line after the gold skyline printed on the pint:
// low rooftops, the Chrysler crown, the Empire State mast, a water tower and a bridge.
export const SKYLINE =
  'M0 214 H70 V176 H96 V188 H128 V150 H160 V196 H190 V170 H214 V148 L226 140 L238 148 V198 H262 ' +
  'V120 H276 V96 L288 70 L300 96 V120 H314 V200 H344 V160 H372 V186 H400 V136 H420 V110 H428 V84 H434 V40 L437 12 L440 40 V84 H446 V110 H454 V136 H474 V194 ' +
  'H502 V152 H530 V178 H556 V128 L566 120 L576 128 V190 H604 ' +
  'V140 H612 V120 L620 100 L628 120 V140 H636 V96 L648 74 L654 50 L657 30 L660 50 L666 74 L678 96 V198 H706 ' +
  'V168 H730 V150 H736 V138 Q746 130 756 138 V150 H762 V168 V200 H790 V146 H822 V182 H848 ' +
  'V214 H860 V150 L872 150 L872 214 Q930 160 988 214 V150 H1000 V214 H1040 V184 H1072 V198 H1110 V170 H1140 V214 H1200';
