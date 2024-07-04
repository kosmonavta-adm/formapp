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
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * Feel free to modify this pattern to include more paths.
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};
