'use client';

export default function VideoSection() {
    return (
        <section className='bg-white py-20'>
            <div className='container mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8'>
                {/* Section Header */}
                <div className='mb-12 text-center'>
                    <span className='rounded-full bg-[#0C4C55] px-4 py-1 text-sm text-white'>Watch Demo</span>
                    <h2 className='mt-4 text-4xl font-bold'>
                        See How <span className='text-[#FF5733]'>Vet Record</span> Works
                    </h2>
                </div>

                {/* Video Container */}
                <div className='mx-auto max-w-4xl'>
                    <div className='relative overflow-hidden rounded-2xl pt-[56.25%]'>
                        <iframe
                            className='absolute inset-0 h-full w-full'
                            src='https://www.youtube.com/embed/25mGPVeiH-w'
                            title='Vet Record App Demo'
                            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                            allowFullScreen
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
