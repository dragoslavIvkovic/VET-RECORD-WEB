export const theme = {
    colors: {
        primary: '#0C4C55',
        primaryHover: '#0a3d44',
        secondary: '#FF5733',
        accent: '#00BCD4', // cyan-300
        white: '#FFFFFF',
        black: '#000000',
        background: '#F3F5FF',
        backgroundDark: '#1a1a1a',
        text: {
            primary: '#FFFFFF',
            secondary: '#gray-300',
            dark: '#1a4747'
        },
        overlay: {
            light: 'white/10',
            medium: 'white/20',
            dark: 'white/90'
        }
    }
} as const;

export type Theme = typeof theme; 