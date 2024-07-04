import { type NextRequest, NextResponse } from 'next/server';

import { updateSession } from '@/auth/middleware';

const updateLocale = (acceptedLocales: string | null, response: NextResponse<unknown>) => {
    if (acceptedLocales === null) {
        response.cookies.set('NEXT_LOCALE', 'pl');
        return response;
    }

    const localesList = acceptedLocales.split(';');
    const isPreferedPl = localesList[0].includes('pl');

    if (isPreferedPl) {
        response.cookies.set('NEXT_LOCALE', 'pl');
    } else {
        response.cookies.set('NEXT_LOCALE', 'en');
    }

    return response;
};

export async function middleware(request: NextRequest) {
    const host = request.headers.get('host');

    const url = request.nextUrl;
    if (host === process.env.NEXT_PUBLIC_ROOT_DOMAIN) {
        const response = await updateSession(request);
        return response.cookies.has('NEXT_LOCALE')
            ? response
            : updateLocale(request.headers.get('accept-language'), response);
    } else {
        const searchParams = request.nextUrl.searchParams.toString();
        const path = `${url.pathname}${searchParams.length > 0 ? `?${searchParams}` : ''}`;
        return NextResponse.rewrite(new URL(`/${host}${path}`, request.url));
    }
}
export const config = {
    matcher: [
        /*
         * Match all paths except for:
         * 1. /api routes
         * 2. /_next (Next.js internals)
         * 3. /_static (inside /public)
         * 4. all root files inside /public (e.g. /favicon.ico)
         */
        '/((?!api/|_next/|_static/|_vercel|[w-]+.w+|favicon.svg).*)/',
    ],
};
