import type { MetadataRoute } from 'next';
import { locales } from '@/i18n/config';

const SITE_URL = 'https://www.vetrecord.app';

export default function sitemap(): MetadataRoute.Sitemap {
    const routes = ['', '/about', '/contact', '/privacy-policy', '/delete-data'];
    const now = new Date();

    const entries: MetadataRoute.Sitemap = [];

    for (const locale of locales) {
        for (const path of routes) {
            entries.push({
                url: `${SITE_URL}/${locale}${path}`,
                lastModified: now,
                changeFrequency: 'weekly',
                priority: path === '' ? 1 : 0.7,
            });
        }
    }

    return entries;
}
