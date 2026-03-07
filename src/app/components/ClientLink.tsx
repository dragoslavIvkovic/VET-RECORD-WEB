'use client';

import { AnchorHTMLAttributes } from 'react';

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
    gtagEvent: string;
}

export default function ClientLink({ gtagEvent, children, onClick, ...props }: Props) {
    return (
        <a
            {...props}
            onClick={(e) => {
                if (onClick) onClick(e);
                if (typeof window !== 'undefined') {
                    (window as any).gtag?.('event', gtagEvent, {
                        page_path: window.location.pathname
                    });
                }
            }}>
            {children}
        </a>
    );
}
