'use client';

import { createContext, useContext, ReactNode } from 'react';
import { theme, Theme } from '../constants/theme';

const ThemeContext = createContext<Theme>(theme);

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

export function ThemeProvider({ children }: { children: ReactNode }) {
    return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
} 