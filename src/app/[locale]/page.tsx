'use client';

import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import KeyFeatureSection from '../components/KeyFeatureSection';
import ReviewSection from '../components/ReviewSection';
import VideoSection from '../components/VideoSection';

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col">
            <div className="bg-linear-to-b from-[#0C4C55] to-[#0a3d44]">
                <HeroSection />
            </div>

            <div className="bg-[#F3F5FF]">
                <KeyFeatureSection />
            </div>

            <div className="bg-white">
                <VideoSection />
            </div>

            <div className="bg-linear-to-br from-[#F3F5FF] to-white">
                <ReviewSection />
            </div>

            <div className="bg-[#0C4C55]">
                <Footer />
            </div>

            <div className="flex-1 bg-[#F3F5FF]" />
        </main>
    );
}
