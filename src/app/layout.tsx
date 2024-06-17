import './globals.css';

import type { Metadata } from 'next';
import { Maven_Pro } from 'next/font/google';
import { cookies } from 'next/headers';

import { Toaster } from '@/components/ui/Toast/Toaster';
import LocaleProvider from '@/providers/LocaleProvider';

const mavenPro = Maven_Pro({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const locale = (cookies().get('NEXT_LOCALE')?.value ?? 'pl') as 'pl' | 'en';
    return (
        <html lang="pl">
            <body className={mavenPro.className}>
                <LocaleProvider locale={locale}>{children}</LocaleProvider>
                <Toaster />
            </body>
        </html>
    );
}
