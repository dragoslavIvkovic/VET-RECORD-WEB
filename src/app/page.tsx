import dynamic from 'next/dynamic';
import HeroSection from './components/HeroSection';
import LazySectionWrapper from './components/LazySectionWrapper';

const KeyFeatureSection = dynamic(() => import('./components/KeyFeatureSection'), {
    loading: () => <div className='min-h-[600px] animate-pulse bg-[#F3F5FF]' />
});

const VideoSection = dynamic(() => import('./components/VideoSection'), {
    loading: () => <div className='min-h-[400px] animate-pulse bg-white' />
});

const ReviewSection = dynamic(() => import('./components/ReviewSection'), {
    loading: () => <div className='min-h-[500px] animate-pulse bg-[#F3F5FF]' />
});

const Footer = dynamic(() => import('./components/Footer'), {
    loading: () => <div className='min-h-[300px] animate-pulse bg-[#0C4C55]' />
});

export default function Home() {
    return (
        <main className='flex min-h-screen flex-col'>
            {/* Hero Section — static import, rendered immediately on the server */}
            <div className='bg-linear-to-b from-[#0C4C55] to-[#0a3d44]'>
                <HeroSection />
            </div>

            {/* Key Features — lazy loaded on scroll */}
            <LazySectionWrapper minHeight='600px' className='bg-[#F3F5FF]'>
                <KeyFeatureSection />
            </LazySectionWrapper>

            {/* Video Section — lazy loaded on scroll */}
            <LazySectionWrapper minHeight='400px' className='bg-white'>
                <VideoSection />
            </LazySectionWrapper>

            {/* Review Section — lazy loaded on scroll */}
            <div id='reviews'>
                <LazySectionWrapper minHeight='500px' className='bg-linear-to-br from-[#F3F5FF] to-white'>
                    <ReviewSection />
                </LazySectionWrapper>
            </div>

            {/* Footer — lazy loaded on scroll */}
            <LazySectionWrapper minHeight='300px' className='bg-[#0C4C55]'>
                <Footer />
            </LazySectionWrapper>

            <div className='flex-1 bg-[#F3F5FF]' />
        </main>
    );
}
