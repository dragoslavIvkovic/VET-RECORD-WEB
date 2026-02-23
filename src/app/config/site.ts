/**
 * Site Configuration
 * 
 * ⚡ TEMPLATE: Update these values to customize your project
 * This file contains all SEO, branding, and site-wide settings
 */

export const SITE_CONFIG = {
    // ===== BASIC INFO =====
    name: 'Vet Record',
    tagline: 'Ultimate Health Organizer for Dogs & Cats',
    description: "Simplify your pet parenting journey with Vet Record. Track vaccines, set medication reminders, and log medical history effortlessly. Cloud sync for families.",
    
    // ===== URLs =====
    url: 'https://vetrecord.app',
    ogImage: '/images/slider/slide-01.webp',
    logo: '/logo.svg',
    
    // ===== LANGUAGE =====
    locale: 'en_US',
    language: 'en',
    
    // ===== ANALYTICS =====
    googleAnalyticsId: 'G-9PGSFLM2FM',
    
    // ===== STRUCTURED DATA =====
    structuredData: {
        type: 'WebApplication',
        applicationCategory: 'HealthApplication',
        operatingSystem: 'Android, iOS',
        price: '0',
        priceCurrency: 'USD',
        ratingValue: '4.5',
        reviewCount: '1399',
    },
    
    // ===== COMPANY INFO =====
    company: {
        name: 'VetRecord',
        // Add more company details as needed
        // email: 'support@vetrecord.app',
        // phone: '+1-XXX-XXX-XXXX',
    },
    
    // ===== COPYRIGHT =====
    copyright: {
        text: 'All rights reserved.',
        startYear: 2024, // Optional: for displaying "2024-2026"
    }
} as const;

/**
 * SEO Meta Tags Generator
 * Use this to generate consistent metadata across pages
 */
export function generateSEOMeta(options?: {
    title?: string;
    description?: string;
    path?: string;
    image?: string;
}) {
    const title = options?.title 
        ? `${options.title} | ${SITE_CONFIG.name}`
        : `${SITE_CONFIG.name} - ${SITE_CONFIG.tagline}`;
    
    const description = options?.description || SITE_CONFIG.description;
    const url = options?.path 
        ? `${SITE_CONFIG.url}${options.path}`
        : SITE_CONFIG.url;
    const image = options?.image 
        ? `${SITE_CONFIG.url}${options.image}`
        : `${SITE_CONFIG.url}${SITE_CONFIG.ogImage}`;
    
    return {
        title,
        description,
        metadataBase: new URL(SITE_CONFIG.url),
        openGraph: {
            title,
            description,
            url,
            siteName: SITE_CONFIG.name,
            images: [{ url: image, width: 800, height: 600 }],
            locale: SITE_CONFIG.locale,
            type: 'website' as const,
        },
        twitter: {
            card: 'summary_large_image' as const,
            title,
            description,
            images: [image],
        },
        alternates: {
            canonical: url,
        },
        robots: {
            index: true,
            follow: true,
            googleBot: { index: true, follow: true },
        },
    };
}
