import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '../components/Footer';
import { APP_LINKS } from '../config/links';
import AppDownloadButtons from '../components/AppDownloadButtons';


// ── Metadata ────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
    title: 'FAQ – Pet Health Records & Vet Record App',
    description:
        'Find answers to common questions about sharing pet health records, tracking vaccines and medications, puppy growth, cloud security, and managing multiple pets with Vet Record.',
    alternates: { canonical: '/faq' },
    openGraph: {
        title: 'FAQ | Vet Record – Pet Health Organizer',
        description:
            'Answers to the most common questions about pet health records, vaccine tracking, medication reminders, and cloud storage with Vet Record.',
        url: 'https://www.vetrecord.app/faq',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'FAQ | Vet Record – Pet Health Organizer',
        description:
            'Answers to the most common questions about pet health records, vaccine tracking, and cloud storage with Vet Record.',
    },
    keywords: [
        'pet health records faq',
        'share dog vaccination records',
        'track pet vaccines app',
        'lost pet vaccination booklet',
        'puppy weight tracking',
        'pet medical records cloud',
        'vet record faq',
        'dog health app questions',
    ],
};

// ── Data ────────────────────────────────────────────────────────────────────

const categories = [
    {
        title: 'Sharing Data & Access',
        icon: '🔗',
        items: [
            {
                question:
                    "How can I share my dog's health records with a boarding facility or pet sitter?",
                answer:
                    "You can share your dog's complete health and vaccination records directly through the Vet Record app using a secure link or by granting access to their profile. This ensures boarding facilities, pet sitters, or doggy daycares always have up-to-date medical information in case of an emergency.",
            },
            {
                question:
                    'Can multiple family members use the app for the same pet?',
                answer:
                    'Yes, multiple family members can sync and access the same pet\'s profile simultaneously. By logging into the same account or sharing profile access, everyone in the household can track feeding times, medications, and upcoming vet appointments.',
            },
        ],
    },
    {
        title: 'Vaccines & Medications',
        icon: '💉',
        items: [
            {
                question: 'What vaccines and treatments can I track in the app?',
                answer:
                    'You can track all core and non-core vaccines, including Rabies, DHPP, and Bordetella, as well as regular treatments like deworming and tick/flea prevention. The app allows you to log administration dates and set automated reminders for future booster shots.',
            },
            {
                question:
                    "How do I set automatic reminders for my pet's next vet appointment?",
                answer:
                    "You can easily set automated reminders by entering the date of your pet's last treatment and selecting the desired frequency for the next dose. Vet Record will send a push notification to your phone before the next vaccine, deworming, or vet visit is due.",
            },
            {
                question:
                    "What should I do if I lose my pet's paper vaccination booklet?",
                answer:
                    "If you lose the physical booklet, you can rely on the digital backup stored in Vet Record to prove your pet's vaccination status. You should also contact your vet to get a physical replacement, but keeping a digital copy prevents you from ever losing the data permanently.",
            },
        ],
    },
    {
        title: 'Weight & General Health',
        icon: '⚖️',
        items: [
            {
                question: "Can I track my puppy's weight and growth over time?",
                answer:
                    "Yes, you can track your puppy's weight and growth by logging their measurements into the app on a weekly or monthly basis. Vet Record visualizes this data, helping you and your vet monitor healthy development and adjust portion sizes accordingly.",
            },
            {
                question: 'Where can I save X-rays, lab results, and vet notes?',
                answer:
                    "You can upload and securely store X-rays, lab results, and vet notes directly in your pet's digital folder within the app. This keeps all essential medical documents in one centralized location for quick access during vet visits.",
            },
        ],
    },
    {
        title: 'Security & Account Management',
        icon: '🔒',
        items: [
            {
                question:
                    "Are my pet's medical records secure and stored in the cloud?",
                answer:
                    "Yes, all of your pet's medical records are securely encrypted and continuously backed up in the cloud. This means your data is protected and instantly syncs across all your authorized devices.",
            },
            {
                question:
                    'Can I manage health records for multiple pets at the same time?',
                answer:
                    'Yes, you can create and manage separate profiles for multiple pets, including dogs, cats, and birds, all within a single app. Each pet will have its own dedicated timeline, reminders, and medical history.',
            },
            {
                question:
                    "What happens to my pet's data if I lose or change my phone?",
                answer:
                    "If you get a new phone or lose your current one, your pet's data remains completely safe because it is tied to your cloud account, not the physical device. Simply download the app on your new device, log in, and all your records will instantly sync.",
            },
            {
                question: 'Is the app available on both iOS and Android?',
                answer:
                    'Yes, Vet Record is fully cross-platform and available for download on both iOS (Apple App Store) and Android (Google Play Store) devices.',
            },
        ],
    },
];

// ── JSON-LD ─────────────────────────────────────────────────────────────────

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: categories.flatMap((cat) =>
        cat.items.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer,
            },
        }))
    ),
};

// ── Page ────────────────────────────────────────────────────────────────────

export default function FaqPage() {
    return (
        <>
            <script
                type='application/ld+json'
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div className='min-h-screen flex flex-col bg-[#F3F5FF] text-[#0C4C55]'>

                {/* Hero */}
                <section className='w-full bg-linear-to-b from-[#0C4C55] to-[#0a3d44] py-16'>
                    <div className='container mx-auto px-4 text-center'>
                        <span className='mb-4 inline-block rounded-full bg-white/20 px-4 py-1 text-sm text-white'>
                            FAQ
                        </span>
                        <h1 className='mb-4 text-4xl font-bold text-white md:text-5xl'>
                            Frequently Asked Questions
                        </h1>
                        <p className='mx-auto max-w-2xl text-lg text-gray-300'>
                            Everything you need to know about managing your pet&apos;s health records with Vet Record.
                        </p>
                    </div>
                </section>

                {/* FAQ Content */}
                <main className='flex-1 container mx-auto px-4 max-w-3xl py-16'>

                    {categories.map((cat) => (
                        <section key={cat.title} className='mb-12'>

                            {/* Category heading */}
                            <h2 className='mb-5 flex items-center gap-2 text-xl font-bold text-[#0C4C55]'>
                                <span aria-hidden='true'>{cat.icon}</span>
                                {cat.title}
                            </h2>

                            {/* Q&A items rendered as native <details> — no JS needed, fully crawlable */}
                            <div className='space-y-3'>
                                {cat.items.map((item, i) => (
                                    <details
                                        key={i}
                                        className='group rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden open:shadow-md transition-shadow duration-200'
                                        itemScope
                                        itemType='https://schema.org/Question'
                                    >
                                        <summary
                                            className='flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 hover:bg-gray-50/80 transition-colors'
                                            itemProp='name'
                                        >
                                            <span className='font-semibold leading-snug text-[#0C4C55]'>
                                                {item.question}
                                            </span>
                                            {/* +/× icon */}
                                            <span
                                                aria-hidden='true'
                                                className='shrink-0 flex items-center justify-center w-8 h-8 rounded-full border-2 border-[#0C4C55]/20 text-[#0C4C55] transition-all duration-300 group-open:rotate-45 group-open:bg-[#0C4C55] group-open:text-white group-open:border-[#0C4C55]'
                                            >
                                                <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2.5} d='M12 5v14M5 12h14' />
                                                </svg>
                                            </span>
                                        </summary>

                                        <div
                                            itemScope
                                            itemType='https://schema.org/Answer'
                                            itemProp='acceptedAnswer'
                                        >
                                            <p
                                                className='px-6 pb-6 text-gray-600 leading-relaxed'
                                                itemProp='text'
                                            >
                                                {item.answer}
                                            </p>
                                        </div>
                                    </details>
                                ))}
                            </div>
                        </section>
                    ))}

                    {/* CTA Banner */}
                    <div className='mt-4 bg-linear-to-br from-[#0C4C55] to-[#08353B] rounded-3xl p-8 text-center text-white shadow-xl relative overflow-hidden'>
                        <div className='absolute -top-24 -right-24 w-48 h-48 bg-cyan-400/20 rounded-full blur-3xl' aria-hidden='true' />
                        <div className='relative z-10'>
                            <h2 className='text-2xl font-bold mb-3'>Still have questions?</h2>
                            <p className='text-gray-200 mb-6 max-w-md mx-auto'>
                                Reach out — we&apos;re happy to help you get the most out of Vet Record.
                            </p>
                            <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
                                <Link
                                    href='/contact'
                                    className='inline-block rounded-full bg-white px-8 py-3 font-semibold text-[#0C4C55] transition-colors hover:bg-gray-100'
                                >
                                    Contact Us
                                </Link>
                                <AppDownloadButtons source='faq_page' />
                            </div>
                        </div>
                    </div>
                </main>

                <Footer />
            </div>
        </>
    );
}
