/**
 * Navigation Configuration
 * 
 * ⚡ TEMPLATE: Update these links and labels to match your site structure
 */

export type NavItem = {
    label: string;
    href: string;
    isAnchor?: boolean;  // If true, scrolls to section instead of navigation
    anchorId?: string;   // ID of the element to scroll to
};

export const NAV_ITEMS: NavItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Reviews', href: '#reviews', isAnchor: true, anchorId: 'reviews' },
    { label: 'Contact', href: '/contact' },
    { label: 'About us', href: '/about' },
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Delete Data', href: '/delete-data' },
];

export const FOOTER_NAV_ITEMS: NavItem[] = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Privacy', href: '/privacy-policy' },
    { label: 'Contact', href: '/contact' },
];
