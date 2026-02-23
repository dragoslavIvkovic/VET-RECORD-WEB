'use client';

import { MDXRemote, type MDXRemoteSerializeResult } from 'next-mdx-remote';

const components = {
    img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
        <span className='my-4 flex justify-center overflow-hidden rounded-lg'>
            <img
                {...props}
                alt={props.alt || ''}
                className='max-h-40 max-w-full object-contain sm:max-h-48 md:max-h-56 md:max-w-md'
                loading='lazy'
            />
        </span>
    ),
    h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h1 className='mb-6 mt-10 text-3xl font-bold text-[#0C4C55] first:mt-0' {...props} />
    ),
    h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h2 className='mb-4 mt-8 text-2xl font-bold text-[#0C4C55]' {...props} />
    ),
    h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h3 className='mb-3 mt-6 text-xl font-semibold text-gray-900' {...props} />
    ),
    p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
        <p className='mb-4 leading-relaxed text-gray-700' {...props} />
    ),
    ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
        <ul className='mb-6 list-disc space-y-2 pl-6 text-gray-700' {...props} />
    ),
    ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
        <ol className='mb-6 list-decimal space-y-2 pl-6 text-gray-700' {...props} />
    ),
    blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
        <blockquote
            className='my-6 border-l-4 border-[#0C4C55] bg-[#0C4C55]/5 py-2 pl-6 pr-4 italic text-gray-700'
            {...props}
        />
    ),
    a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
        <a
            {...props}
            className='font-medium text-[#0C4C55] underline hover:text-[#0a3d44]'
            target={props.href?.startsWith('http') ? '_blank' : undefined}
            rel={props.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
        />
    ),
    strong: (props: React.HTMLAttributes<HTMLElement>) => (
        <strong className='font-semibold text-gray-900' {...props} />
    )
};

type Props = {
    source: MDXRemoteSerializeResult;
};

export default function MDXContent({ source }: Props) {
    return <MDXRemote {...source} components={components} />;
}
