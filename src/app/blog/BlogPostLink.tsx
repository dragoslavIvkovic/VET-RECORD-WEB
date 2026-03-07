'use client';

import Link from 'next/link';

import { usePostHog } from 'posthog-js/react';

interface BlogPostLinkProps {
    href: string;
    slug: string;
    title: string;
    className?: string;
    children: React.ReactNode;
}

export default function BlogPostLink({ href, slug, title, className, children }: BlogPostLinkProps) {
    const posthog = usePostHog();

    return (
        <Link
            href={href}
            className={className}
            onClick={() => posthog.capture('blog_post_clicked', { post_slug: slug, post_title: title })}>
            {children}
        </Link>
    );
}
