import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About Us',
    description: 'Simplify your pet parenting journey with Vet Record. Track vaccines, set medication reminders, and log medical history effortlessly for dogs and cats. Organized medical records, smart vaccination tracker, cloud sync for families.',
    alternates: {
        canonical: '/about'
    },
    openGraph: {
        title: 'About Us | Vet Record – Pet Health Organizer for Dogs & Cats',
        description: 'Simplify your pet parenting journey. Track vaccines, medication reminders, and medical history. Organized records, vaccination tracker, cloud sync for families.',
        url: 'https://www.vetrecord.app/about',
        type: 'website'
    },
    twitter: {
        card: 'summary_large_image',
        title: 'About Us | Vet Record – Pet Health Organizer',
        description: 'Simplify your pet parenting journey. Track vaccines, medication reminders, and medical history for dogs and cats.'
    },
    keywords: [
        'pet health app',
        'pet parenting',
        'vaccination tracker',
        'medication reminders',
        'pet medical records',
        'cloud sync',
        'dogs and cats'
    ]
};

const features = [
    {
        emoji: '📋',
        title: 'Organized Medical Records',
        description: "Stop searching through piles of paper. Keep a digital vault of your pet's entire medical history in your pocket.",
        bullets: [
            'Store vet reports, lab results, and prescriptions.',
            'Log allergies, track weight changes, and monitor growth charts.'
        ]
    },
    {
        emoji: '💉',
        title: 'Smart Vaccination Tracker',
        description: "Never miss a booster shot again. Keep your pet's immunity up to date effortlessly.",
        bullets: [
            'Track core and non-core vaccines (Rabies, DHLPP, Bordetella).',
            'Receive automated alerts before vaccines expire.',
            'Maintain a lifetime digital immunization log for travel or boarding.'
        ]
    },
    {
        emoji: '💊',
        title: 'Medication & Treatment Reminders',
        description: 'Managing chronic conditions or post-surgery care? We help you never miss a dose.',
        bullets: [
            'Set recurring alarms for pills, flea/tick prevention, and heartworm meds.',
            'Track dosage history to prevent dangerous double-dosing.'
        ]
    },
    {
        emoji: '📅',
        title: 'Custom Care Alerts',
        description: "Beyond medical needs, easily organize your pet's daily routine.",
        bullets: [
            'Reminders for grooming, deworming, and routine vet checkups.',
            'Birthday and upcoming appointment notifications.',
            'Create custom alerts for feeding or walking schedules.'
        ]
    },
    {
        emoji: '☁️',
        title: 'Cloud Sync for Families',
        description: "Pet care is a team effort. Sync data seamlessly across all devices.",
        bullets: [
            'Family Sharing: Keep everyone in your "pack" on the same page.',
            'Secure Cloud Backup: Never lose your data, even if you change phones.'
        ]
    },
    {
        emoji: '👑',
        title: 'Unlock More with Premium',
        description: 'Upgrade to Premium and take your pet care to the next level:',
        bullets: [
            'Multi-Pet Support: Manage up to 10 dog or cat profiles in one app.',
            'Unlimited Health Records: Log endless medical details including allergies, blood type, and surgeries.',
            'Advanced Weight Tracking: Maintain extended weight history with up to 90 entries.',
            'PDF Export: Generate and share professional medical reports directly with your veterinarian.'
        ]
    }
];

const perfectFor = [
    'Puppy and Kitten Owners',
    'Senior Pets with Special Needs',
    'Multi-Pet Households',
    'Travelers & Pet Sitters'
];

export default function About() {
    return (
        <main className='flex min-h-screen flex-col items-center'>
            {/* Hero Section */}
            <section className='w-full py-16 bg-linear-to-b from-[#0C4C55] to-[#0a3d44]'>
                <div className='container mx-auto px-4 text-center'>
                    <span className='mb-4 inline-block rounded-full bg-white/20 px-4 py-1 text-sm'>About us</span>
                    <h1 className='mb-6 text-4xl font-bold text-white md:text-5xl'>
                        Simplify Your Pet Parenting Journey
                    </h1>
                    <p className='mx-auto mb-4 max-w-2xl text-lg text-gray-300'>
                        Vet Record is the ultimate health organizer designed for dogs and cats. Track vaccines, set medication reminders, and log medical history effortlessly.
                    </p>
                    <p className='mx-auto max-w-2xl text-lg text-gray-300'>
                        Join thousands of responsible pet owners who use Vet Record to keep their furry friends happy, healthy, and safe!
                    </p>
                </div>
            </section>

            {/* Why Pet Parents Love Vet Record */}
            <section className='w-full py-16 bg-[#F3F5FF]'>
                <div className='container mx-auto px-4'>
                    <h2 className='mb-12 text-center text-3xl font-bold text-[#0C4C55]'>
                        Why Pet Parents Love Vet Record
                    </h2>
                    <div className='space-y-10'>
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className='rounded-xl bg-white p-8 shadow-lg transition-transform hover:scale-[1.01]'>
                                <h3 className='mb-3 flex items-center gap-2 text-xl font-semibold text-[#0C4C55]'>
                                    <span>{feature.emoji}</span>
                                    {feature.title}
                                </h3>
                                <p className='mb-4 text-gray-600'>{feature.description}</p>
                                <ul className='list-inside list-disc space-y-1 text-gray-600'>
                                    {feature.bullets.map((bullet, i) => (
                                        <li key={i}>{bullet}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Perfect For Section */}
            <section className='w-full py-16 bg-white'>
                <div className='container mx-auto px-4'>
                    <h2 className='mb-8 text-center text-3xl font-bold text-[#0C4C55]'>
                        Perfect For
                    </h2>
                    <div className='flex flex-wrap justify-center gap-4'>
                        {perfectFor.map((item, index) => (
                            <span
                                key={index}
                                className='rounded-full bg-[#0C4C55]/10 px-6 py-3 font-medium text-[#0C4C55]'>
                                {item}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className='w-full py-16 bg-linear-to-t from-[#0C4C55] to-[#0a3d44]'>
                <div className='container mx-auto px-4 text-center'>
                    <h2 className='mb-6 text-3xl font-bold text-white'>Ready to Get Started?</h2>
                    <p className='mb-8 text-gray-300'>
                        Download Vet Record today and give your best friend the organized care they deserve!
                    </p>
                    <a
                        href='https://play.google.com/store/apps/details?id=vetrecord.app'
                        className='rounded-full bg-white px-8 py-3 font-semibold text-[#0C4C55] transition-colors hover:bg-gray-100'
                        target='_blank'
                        rel='noopener noreferrer'>
                        Download Now
                    </a>
                    <p className='mt-8 text-sm text-gray-400'>
                        <a
                            href='https://www.apple.com/legal/internet-services/itunes/dev/stdeula/'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='underline hover:text-white'>
                            Terms of Use
                        </a>
                    </p>
                </div>
            </section>
        </main>
    );
}
