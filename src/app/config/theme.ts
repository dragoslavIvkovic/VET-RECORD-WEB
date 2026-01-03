/**
 * Theme Configuration
 * 
 * ⚡ TEMPLATE: Update these colors and typography to match your brand
 * All colors are defined here for easy customization
 */

export const COLORS = {
    // ===== PRIMARY PALETTE =====
    primary: {
        main: '#0C4C55',       // Main brand color (dark teal)
        dark: '#0a3d44',       // Darker shade for gradients/hover
        light: '#1a6b77',      // Lighter shade
    },
    
    // ===== SECONDARY/ACCENT =====
    accent: {
        main: 'cyan-300',      // Tailwind class for hover states
        highlight: '#00d9ff',  // Bright accent
    },
    
    // ===== BACKGROUNDS =====
    background: {
        primary: '#F3F5FF',    // Main page background (light lavender)
        secondary: '#FFFFFF',   // White sections
        dark: '#0C4C55',       // Dark sections (footer, nav)
    },
    
    // ===== TEXT COLORS =====
    text: {
        primary: '#1a1a1a',     // Main text
        secondary: '#4a5568',   // Muted text
        light: '#FFFFFF',       // Text on dark backgrounds
        muted: '#9ca3af',       // Gray text (gray-400 equivalent)
    },
    
    // ===== BORDERS =====
    border: {
        light: 'rgba(255, 255, 255, 0.2)',  // white/20
        lighter: 'rgba(255, 255, 255, 0.1)', // white/10
    },
    
    // ===== STATUS COLORS =====
    status: {
        success: '#22c55e',
        warning: '#f59e0b',
        error: '#ef4444',
        info: '#3b82f6',
    }
} as const;

/**
 * Typography Configuration
 */
export const TYPOGRAPHY = {
    // Google Font name
    fontFamily: 'Poppins',
    
    // Font weights used
    fontWeights: ['400', '500', '600', '700'],
    
    // Font subsets
    subsets: ['latin'],
} as const;

/**
 * Tailwind CSS class mappings for easy reference
 * Use these in your components
 */
export const THEME_CLASSES = {
    // Backgrounds
    bgPrimary: 'bg-[#F3F5FF]',
    bgDark: 'bg-[#0C4C55]',
    bgDarkGradient: 'bg-linear-to-b from-[#0C4C55] to-[#0a3d44]',
    bgLightGradient: 'bg-linear-to-br from-[#F3F5FF] to-white',
    
    // Text
    textDark: 'text-[#1a1a1a]',
    textLight: 'text-white',
    textMuted: 'text-gray-300',
    
    // Hover states
    hoverAccent: 'hover:text-cyan-300',
    hoverBg: 'hover:bg-white/10',
    
    // Borders
    borderLight: 'border-white/20',
    borderLighter: 'border-white/10',
} as const;
