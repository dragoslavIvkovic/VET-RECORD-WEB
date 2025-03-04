'use client';

import { FeatureSection } from './components/FeatureSection';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import KeyFeatureSection from './components/KeyFeatureSection';
import ReviewSection from './components/ReviewSection';
import VideoSection from './components/VideoSection';
import { useTheme } from './providers/ThemeProvider';

export default function Home() {
    const theme = useTheme();

    return (
        <main className='flex min-h-screen flex-col'>
            {/* Hero Section sa gradijentom */}
            <div
                style={{
                    background: `linear-gradient(to bottom, ${theme.colors.primary}, ${theme.colors.primaryHover})`
                }}>
                <HeroSection />
            </div>

            {/* Key Features sa svetlom pozadinom */}
            <div style={{ backgroundColor: theme.colors.background }}>
                <KeyFeatureSection />
            </div>

            {/* Feature Section sa kontrastnom pozadinom */}
            <div style={{ backgroundColor: theme.colors.white }}>
                <FeatureSection />
            </div>

            {/* Video Section sa kontrastnom pozadinom */}
            <div style={{ backgroundColor: theme.colors.background }}>
                <VideoSection />
            </div>

            {/* Review Section sa blagim gradijentom */}
            <div
                style={{
                    background: `linear-gradient(135deg, ${theme.colors.background}, ${theme.colors.white})`
                }}>
                <ReviewSection />
            </div>

            {/* Footer sa primary bojom */}
            <div style={{ backgroundColor: theme.colors.primary }}>
                <Footer />
            </div>

            {/* Dodatni prostor za scroll */}
            <div
                className='flex-1'
                style={{
                    backgroundColor: theme.colors.background,
                    backgroundImage: `linear-gradient(120deg, ${theme.colors.overlay.light}, transparent)`
                }}
            />
        </main>
    );
}
