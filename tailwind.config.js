/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}'
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: 'var(--color-primary)',
                    hover: 'var(--color-primary-hover)'
                },
                secondary: {
                    DEFAULT: 'var(--color-secondary)',
                    hover: 'var(--color-secondary-hover)'
                },
                accent: {
                    cyan: 'var(--color-accent-cyan)'
                },
                surface: {
                    DEFAULT: 'var(--color-surface)',
                    white: 'var(--color-surface-white)',
                    light: 'var(--color-surface-light)'
                },
                text: {
                    primary: 'var(--color-text-primary)',
                    secondary: 'var(--color-text-secondary)'
                }
            },
            fontFamily: {
                sans: ['var(--font-sans)'],
                bebas: ['var(--font-display)']
            },
            transitionTimingFunction: {
                DEFAULT: 'var(--transition-normal)',
                fast: 'var(--transition-fast)',
                slow: 'var(--transition-slow)'
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
            }
        }
    },
    plugins: []
}; 