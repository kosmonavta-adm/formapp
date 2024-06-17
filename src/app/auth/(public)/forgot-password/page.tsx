import { Metadata } from 'next';
import Image from 'next/image';

import ForgotPassword from '@/components/auth/ForgotPassword';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export const metadata: Metadata = {
    title: 'Tymczasowy tytuł - resetowanie hasła',
    description: 'Tymczasowy opis',
    openGraph: {
        title: 'Tymczasowy tytuł - resetowanie hasła',
        description: 'Tymczasowy opis',
    },
};

export default function ForgotPasswordPage() {
    return (
        <main className="grid min-h-svh grid-cols-1 lg:grid-cols-2">
            <div className="relative hidden lg:flex">
                <div className="absolute inset-0 z-10 h-full w-full bg-white opacity-20"></div>
                <Image
                    src={'/bg.jpg'}
                    fill
                    className="object-cover"
                    alt=""
                />
            </div>
            <div className="flex flex-col items-center p-4">
                <LanguageSwitcher />
                <ForgotPassword />
            </div>
        </main>
    );
}
