export interface CollectionMeta {
  name: string;
  title: string;
  badge: string;
  subtitle: string;
  bannerImage: string;
}

export const COLLECTIONS_DATA: Record<string, CollectionMeta> = {
  'spring-atelier-2026': {
    name: 'Spring Atelier 2026',
    title: 'Spring Atelier 2026',
    badge: 'CURATED RUNWAY SERIES',
    subtitle: 'Sculptural drapery, organic French flax linen, and fluid silhouettes designed for unhurried living.',
    bannerImage: '/images/hero/spring-campaign.jpg',
  },
  'core-essentials': {
    name: 'Core Essentials',
    title: 'Core Essentials',
    badge: 'PERMANENT ATELIER EDITION',
    subtitle: 'Enduring wardrobe foundations cut from GOTS-certified organic cotton poplin, European linen, and pure virgin wool.',
    bannerImage: '/images/editorial/less-but-better.jpg',
  },
  'atelier-tailoring': {
    name: 'Atelier Tailoring',
    title: 'Atelier Tailoring',
    badge: 'SARTORIAL CUT & DRAPE',
    subtitle: 'Double-pleated trousers, architectural blazers, and virgin wool overcoats drafted with meticulous proportions.',
    bannerImage: '/images/categories/men.jpg',
  },
};
