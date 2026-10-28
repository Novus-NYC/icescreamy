import type { MetadataRoute } from 'next';
import { site } from '@/data/site';

export default function sitemap(): MetadataRoute.Sitemap {
  return ['', '/flavors', '/story', '/events'].map((p) => ({ url: `${site.url}${p}`, changeFrequency: 'monthly', priority: p ? 0.7 : 1 }));
}
