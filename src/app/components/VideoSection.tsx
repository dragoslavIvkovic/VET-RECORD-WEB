'use client';

export default function VideoSection() {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <span className="bg-[#0C4C55] text-white px-4 py-1 rounded-full text-sm">Watch Demo</span>
                    <h2 className="text-4xl font-bold mt-4">
                        See How <span className="text-[#FF5733]">Vet Record</span> Works
                    </h2>
                </div>

                {/* Video Container */}
                <div className="max-w-4xl mx-auto">
                    <div className="relative pt-[56.25%] rounded-2xl overflow-hidden">
                        <iframe
                            className="absolute inset-0 w-full h-full"
                            src="https://www.youtube.com/embed/25mGPVeiH-w"
                            title="Vet Record App Demo"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                </div>
            </div>
        </section>
    );
} 