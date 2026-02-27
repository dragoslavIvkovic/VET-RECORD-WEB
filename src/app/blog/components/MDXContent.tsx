'use client';

import React from 'react';
import Image from 'next/image';
import { MDXRemote, type MDXRemoteSerializeResult } from 'next-mdx-remote';

function BlogImage({ src, alt }: { src?: string; alt?: string }) {
    if (!src) return null;
    return (
        <figure className='my-8'>
            <span className='flex justify-center rounded-2xl bg-gradient-to-b from-[#d6eef1] to-[#bde1e6] p-6'>
                <Image
                    src={src}
                    alt={alt || ''}
                    width={0}
                    height={0}
                    sizes='(max-width: 768px) 90vw, 600px'
                    className='h-auto max-h-[320px] w-auto max-w-full object-contain drop-shadow-xl'
                    loading='lazy'
                />
            </span>
            {alt && (
                <figcaption className='mt-2 text-center text-sm text-gray-400'>
                    {alt}
                </figcaption>
            )}
        </figure>
    );
}

const components = {
    img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
        <BlogImage src={props.src} alt={props.alt} />
    ),
    h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h1
            className='mb-5 mt-12 text-3xl font-bold tracking-tight text-gray-900 first:mt-0'
            {...props}
        />
    ),
    h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h2
            className='mb-4 mt-10 text-2xl font-bold tracking-tight text-gray-900 first:mt-0'
            {...props}
        />
    ),
    h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h3
            className='mb-3 mt-8 text-xl font-semibold text-gray-900 first:mt-0'
            {...props}
        />
    ),
    h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h4
            className='mb-2 mt-6 text-lg font-semibold text-gray-900 first:mt-0'
            {...props}
        />
    ),
    p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => {
        // MDX wraps standalone images in <p>. Detect this and avoid invalid
        // block-in-inline nesting (<figure> inside <p>).
        const arr = React.Children.toArray(children);
        if (
            arr.length === 1 &&
            React.isValidElement(arr[0]) &&
            (arr[0] as React.ReactElement<{ src?: string }>).props?.src !== undefined
        ) {
            return <>{children}</>;
        }
        return <p className='mb-5 text-base leading-8 text-gray-700' {...props}>{children}</p>;
    },
    ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
        <ul className='mb-6 space-y-2 pl-0 text-gray-700' {...props} />
    ),
    ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
        <ol className='mb-6 space-y-2 pl-0 text-gray-700 [counter-reset:list]' {...props} />
    ),
    li: (props: React.LiHTMLAttributes<HTMLLIElement>) => (
        <li
            className='flex gap-3 text-base leading-7 text-gray-700 before:mt-2 before:h-1.5 before:w-1.5 before:shrink-0 before:rounded-full before:bg-[#0C4C55]'
            {...props}
        />
    ),
    blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
        <blockquote
            className='my-8 rounded-r-xl border-l-4 border-[#0C4C55] bg-[#0C4C55]/5 px-6 py-4 text-gray-700'
            {...props}
        />
    ),
    a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
        <a
            {...props}
            className='font-medium text-[#0C4C55] underline decoration-[#0C4C55]/30 underline-offset-2 transition-colors hover:text-[#0a3d44] hover:decoration-[#0C4C55]'
            target={props.href?.startsWith('http') ? '_blank' : undefined}
            rel={props.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
        />
    ),
    strong: (props: React.HTMLAttributes<HTMLElement>) => (
        <strong className='font-semibold text-gray-900' {...props} />
    ),
    em: (props: React.HTMLAttributes<HTMLElement>) => (
        <em className='italic text-gray-700' {...props} />
    ),
    hr: () => (
        <hr className='my-10 border-gray-200' />
    ),
    code: (props: React.HTMLAttributes<HTMLElement>) => (
        <code
            className='rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm text-[#0C4C55]'
            {...props}
        />
    ),
    pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
        <pre
            className='my-6 overflow-x-auto rounded-xl bg-gray-900 p-5 font-mono text-sm text-gray-100 shadow-md'
            {...props}
        />
    ),
    table: (props: React.HTMLAttributes<HTMLTableElement>) => (
        <div className='my-6 overflow-x-auto rounded-xl ring-1 ring-gray-200'>
            <table className='w-full text-sm text-left' {...props} />
        </div>
    ),
    thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
        <thead className='bg-[#0C4C55]/5 text-xs font-semibold uppercase tracking-wider text-[#0C4C55]' {...props} />
    ),
    th: (props: React.ThHTMLAttributes<HTMLTableCellElement>) => (
        <th className='px-4 py-3' {...props} />
    ),
    td: (props: React.TdHTMLAttributes<HTMLTableCellElement>) => (
        <td className='border-t border-gray-100 px-4 py-3 text-gray-700' {...props} />
    ),
    tr: (props: React.HTMLAttributes<HTMLTableRowElement>) => (
        <tr className='hover:bg-gray-50' {...props} />
    ),
};

type Props = {
    source: MDXRemoteSerializeResult;
};

export default function MDXContent({ source }: Props) {
    return <MDXRemote {...source} components={components} />;
}
