'use client';

import { FeatureSection } from './components/FeatureSection';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import KeyFeatureSection from './components/KeyFeatureSection';
import ReviewSection from './components/ReviewSection';
import VideoSection from './components/VideoSection';

export default function Home() {
    return (
        <main className='flex min-h-screen flex-col'>
            {/* Hero Section */}
            <div className='from-primary to-primary/90 bg-gradient-to-b'>
                <HeroSection />
            </div>

            {/* Key Features */}
            <div className='bg-surface'>
                <KeyFeatureSection />
            </div>

            {/* Feature Section */}
            <div className='bg-surface-white'>
                <FeatureSection />
            </div>

            {/* Video Section */}
            <div className='bg-surface'>
                <VideoSection />
            </div>

            {/* Review Section */}
            <div className='from-surface to-surface-white bg-gradient-to-br'>
                <ReviewSection />
            </div>

            {/* Footer */}
            <div className='bg-primary'>
                <Footer />
            </div>

            {/* Additional scroll space */}
            <div className='bg-surface from-surface-light/50 flex-1 bg-gradient-to-br to-transparent' />
        </main>
    );
}
