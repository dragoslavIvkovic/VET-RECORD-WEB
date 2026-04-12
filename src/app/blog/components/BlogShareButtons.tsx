'use client';

import { useState } from 'react';
import { usePostHog } from 'posthog-js/react';

interface BlogShareButtonsProps {
    url: string;
    title: string;
    image?: string;
}

export default function BlogShareButtons({ url, title }: BlogShareButtonsProps) {
    const posthog = usePostHog();
    const [copied, setCopied] = useState(false);

    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);

    const shareLinks = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
        linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
        whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle} ${encodedUrl}`,
        reddit: `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
        threads: `https://www.threads.net/intent/post?text=${encodedTitle}%20${encodedUrl}`,
        instagram: `https://www.instagram.com/vetrecordapp/`,
        substack: `https://substack.com/`,
    };

    const handleShare = (platform: string, link: string) => {
        posthog.capture('blog_shared', { platform, url, title });
        window.open(link, '_blank', 'noopener,noreferrer,width=600,height=500');
    };

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            posthog.capture('blog_shared', { platform: 'copy_link', url, title });
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    return (
        <div className='flex flex-col items-center gap-4 border-t border-b border-[#0C4C55]/10 py-6 sm:flex-row sm:justify-between'>
            <div className='text-sm font-bold tracking-widest text-[#0C4C55] uppercase'>
                Share this article
            </div>
            
            <div className='flex items-center flex-wrap gap-3'>
                {/* Facebook */}
                <button
                    onClick={() => handleShare('facebook', shareLinks.facebook)}
                    aria-label='Share on Facebook'
                    className='group flex h-10 w-10 items-center justify-center rounded-full bg-blue-50/50 text-blue-600 transition-all hover:bg-blue-600 hover:text-white'
                >
                    <svg className='h-5 w-5 transition-transform group-hover:scale-110' fill='currentColor' viewBox='0 0 24 24'>
                        <path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z'/>
                    </svg>
                </button>

                {/* Twitter / X */}
                <button
                    onClick={() => handleShare('twitter', shareLinks.twitter)}
                    aria-label='Share on X (Twitter)'
                    className='group flex h-10 w-10 items-center justify-center rounded-full bg-gray-50/50 text-gray-900 transition-all hover:bg-gray-900 hover:text-white'
                >
                    <svg className='h-4 w-4 transition-transform group-hover:scale-110' fill='currentColor' viewBox='0 0 24 24'>
                        <path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z'/>
                    </svg>
                </button>

                {/* LinkedIn */}
                <button
                    onClick={() => handleShare('linkedin', shareLinks.linkedin)}
                    aria-label='Share on LinkedIn'
                    className='group flex h-10 w-10 items-center justify-center rounded-full bg-blue-50/50 text-blue-700 transition-all hover:bg-blue-700 hover:text-white'
                >
                    <svg className='h-4 w-4 transition-transform group-hover:scale-110' fill='currentColor' viewBox='0 0 24 24'>
                        <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'/>
                    </svg>
                </button>

                {/* WhatsApp */}
                <button
                    onClick={() => handleShare('whatsapp', shareLinks.whatsapp)}
                    aria-label='Share on WhatsApp'
                    className='group flex h-10 w-10 items-center justify-center rounded-full bg-green-50/50 text-green-600 transition-all hover:bg-green-600 hover:text-white'
                >
                    <svg className='h-5 w-5 transition-transform group-hover:scale-110' fill='currentColor' viewBox='0 0 24 24'>
                        <path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.027 6.988 2.895a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z'/>
                    </svg>
                </button>

                {/* Reddit */}
                <button
                    onClick={() => handleShare('reddit', shareLinks.reddit)}
                    aria-label='Share on Reddit'
                    className='group flex h-10 w-10 items-center justify-center rounded-full bg-orange-50/50 text-[#FF4500] transition-all hover:bg-[#FF4500] hover:text-white'
                >
                    <svg className='h-5 w-5 transition-transform group-hover:scale-110' fill='currentColor' viewBox='0 0 24 24'>
                        <path d='M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.057 1.597.04.21.065.427.065.647 0 2.834-3.387 5.131-7.564 5.131-4.177 0-7.564-2.297-7.564-5.131 0-.202.019-.4.053-.597-.68-.242-1.166-.889-1.166-1.648 0-.968.784-1.754 1.754-1.754.492 0 .93.203 1.24.529 1.15-.811 2.72-1.353 4.453-1.458l.711-3.354 2.195.467c.01-.004.02-.007.03-.01.077-.04.162-.06.251-.06.216 0 .393.177.393.393 0 .216-.177.393-.393.393a.393.393 0 0 1-.393-.393c0-.044.009-.086.024-.124l-1.636-.348-.616 2.91 1.01.037c-.01.01-.017.021-.027.031-.115-.083-.243-.16-.381-.231a4.341 4.341 0 0 0-.58-.25 13.932 13.932 0 0 0-1.897-.393 15.114 15.114 0 0 0-1.99-.07c-3.15 0-5.714 1.579-5.714 3.518 0 .151.016.3.048.445.034.145.084.286.148.423.479 1.025 2.13 1.838 4.295 2.217.151.026.305.048.462.066.381.045.776.068 1.18.068 1.493 0 2.868-.316 3.903-.865.25.137.518.257.799.356 1.488.52 3.167.52 4.655 0 .28-.099.548-.22.798-.356 1.035.549 2.41.865 3.903.865.404 0 .799-.023 1.18-.068.157-.018.311-.04.462-.066 2.165-.379 3.816-1.192 4.295-2.217.064-.137.114-.278.148-.423.032-.145.048-.294.048-.445 0-1.939-2.564-3.518-5.714-3.518-.088 0-.176.002-.264.005-.11.23-.338.397-.611.397a.684.684 0 0 1-.684-.684.684.684 0 0 1 .684-.684c.22 0 .411.106.529.27.3.01.599.025.897.045.292.019.584.043.874.072 1.442.148 2.76.438 3.812.83.18-.12.378-.231.593-.33.407-.181.85-.326 1.32-.432a15.864 15.864 0 0 1 2.05-.285 17.514 17.514 0 0 1 2.14-.075c3.558 0 6.452 1.784 6.452 3.974 0 .17-.018.339-.054.502-.038.164-.095.324-.167.478-.541 1.158-2.405 2.071-4.85 2.503-.171.029-.345.054-.521.075-.43.051-.876.077-1.332.077-1.42 0-2.756-.245-3.834-.658-.337-.13-.655-.286-.95-.461a.682.682 0 0 1-.397.127.684.684 0 0 1-.684-.684c0-.206.091-.39.236-.514-.071-.05-.143-.102-.216-.155l-.01.011zm-4.305 7.846c-.035.035-.078.064-.124.086a.348.348 0 0 1-.308 0 .348.348 0 0 1-.124-.086.348.348 0 0 1-.086-.124.348.348 0 0 1 0-.308.348.348 0 0 1 .086-.124c.035-.035.078-.064.124-.086.046-.022.096-.034.146-.035.1-.001.196.038.267.108.035.035.064.078.086.124.022.046.034.096.035.146a.35.35 0 0 1-.182.327l-.011.002z'/></svg>
                </button>

                {/* Threads */}
                <button
                    onClick={() => handleShare('threads', shareLinks.threads)}
                    aria-label='Share on Threads'
                    className='group flex h-10 w-10 items-center justify-center rounded-full bg-gray-50/50 text-black transition-all hover:bg-black hover:text-white'
                >
                    <svg className='h-5 w-5 transition-transform group-hover:scale-110' fill='currentColor' viewBox='0 0 24 24'>
                        <path d="M12.003 21c-5.066 0-9.18-4.112-9.18-9.18 0-4.664 3.512-8.528 8.086-9.108l.3-.038a8.34 8.34 0 0 0-.206 1.838v.834H11.003V4.512a7.35 7.35 0 0 0-6.18 7.308 7.35 7.35 0 0 0 7.35 7.35c.446 0 .886-.041 1.314-.122l.3-.056v.834c0 .324.02.646.058.962l-.248.012c-.198.008-.398.012-.6.012h.005zm6.18-4.112a9.18 9.18 0 0 0-5.18-8.312l-.3-.122v.834l.3.122a8.34 8.34 0 0 1 4.706 7.55c0 1.258-.276 2.45-.772 3.518l-.134.296h.9l.134-.296c.548-1.206.852-2.538.852-3.93v0zm-4.706-9.146a9.18 9.18 0 0 0-11.474 9.18 9.18 0 0 0 9.18 9.18c.244 0 .486-.01.724-.03l.3-.024v-.834l-.3.024a8.34 8.34 0 0 1-.65.026 8.34 8.34 0 0 1-8.34-8.34 8.34 8.34 0 0 1 8.34-8.34c.486 0 .964.041 1.432.122l.3-.056v-.834l-.3.056c-.468-.08-.946-.122-1.432-.122h-.005zm0-.834c-5.066 0-9.18 4.112-9.18 9.18 0 5.066 4.112 9.18 9.18 9.18.244 0 .486-.01.724-.03l.3-.024v.834l-.3.024a9.18 9.18 0 0 1-.724.03l-.3.024V21h.3c5.066 0 9.18-4.112 9.18-9.18 0-4.664-3.512-8.528-8.086-9.108l-.3-.038a9.18 9.18 0 0 0-.206 1.838v.834h-1.001V4.512a8.18 8.18 0 0 0-6.87 8.12 8.18 8.18 0 0 0 8.18 8.18c.49 0 .972-.041 1.442-.122l.3-.056v.834c0 .324.02.646.058.962l-.248.012c-.198.008-.398.012-.6.012h.005zm7.308 0a9.18 9.18 0 0 1-5.18 8.312l-.3.122v.834l.3-.122a10.18 10.18 0 0 0-5.74-9.214l-.3-.122v-.834l.3.122a9.18 9.18 0 0 1 4.706 7.55c0 1.258-.276 2.45-.772 3.518l-.134.296h.9l.134-.296c.548-1.206.852-2.538.852-3.93v0z"/>
                    </svg>
                </button>

                {/* Instagram */}
                <button
                    onClick={() => handleShare('instagram', shareLinks.instagram)}
                    aria-label='Follow us on Instagram'
                    className='group flex h-10 w-10 items-center justify-center rounded-full bg-red-50/50 text-[#E4405F] transition-all hover:bg-[#E4405F] hover:text-white'
                >
                    <svg className='h-5 w-5 transition-transform group-hover:scale-110' fill='currentColor' viewBox='0 0 24 24'>
                        <path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z'/>
                    </svg>
                </button>

                {/* Substack */}
                <button
                    onClick={() => handleShare('substack', shareLinks.substack)}
                    aria-label='Follow us on Substack'
                    className='group flex h-10 w-10 items-center justify-center rounded-full bg-orange-50/50 text-[#FF6719] transition-all hover:bg-[#FF6719] hover:text-white'
                >
                    <svg className='h-5 w-5 transition-transform group-hover:scale-110' fill='currentColor' viewBox='0 0 24 24'>
                        <path d="M22.539 8.242H1.46V5.406h21.079v2.836zm0 4.381H1.46V9.782h21.079v2.841zm0 4.381H1.46V14.16h21.079v2.844zm-21.079 4.381h21.079V21.4H1.46v2.842z"/>
                    </svg>
                </button>

                <div className='h-6 w-px bg-gray-300' />

                {/* Copy Link */}
                <button
                    onClick={handleCopyLink}
                    aria-label='Copy article link'
                    className='group relative flex h-10 w-[120px] items-center justify-center gap-2 rounded-full border border-gray-200 bg-white text-sm font-semibold text-gray-700 transition-all hover:border-[#0C4C55] hover:text-[#0C4C55]'
                >
                    {copied ? (
                        <>
                            <svg className='h-4 w-4 text-green-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2.5} d='M5 13l4 4L19 7' />
                            </svg>
                            <span className='animate-in fade-in zoom-in duration-300'>Copied!</span>
                        </>
                    ) : (
                        <>
                            <svg className='h-4 w-4 transition-transform group-hover:scale-110' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1' />
                            </svg>
                            <span>Copy Link</span>
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
