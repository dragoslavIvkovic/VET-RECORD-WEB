import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json({
        has_ghost_url: !!process.env.GHOST_URL,
        has_ghost_key: !!process.env.GHOST_CONTENT_API_KEY,
        ghost_url_value: process.env.GHOST_URL ? `${process.env.GHOST_URL.substring(0, 10)}...` : null,
        node_env: process.env.NODE_ENV,
        vercel_env: process.env.VERCEL_ENV || 'not set',
    });
}
