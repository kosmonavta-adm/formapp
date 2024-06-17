import { Metadata } from 'next';
import Image from 'next/image';
import { redirect } from 'next/navigation';

import { createClient } from '@/auth/server';
import RegisterForm from '@/components/auth/RegisterForm';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { url } from '@/utils/utils';

export const metadata: Metadata = {
    title: 'Tymczasowy tytuł - rejestracja',
    description: 'Tymczasowy opis',
    openGraph: {
        title: 'Tymczasowy tytuł - rejestracja',
        description: 'Tymczasowy opis',
    },
};

export default async function RegisterPage() {
    const supabase = createClient();

    const { data } = await supabase.auth.getUser();

    if (data?.user) {
        redirect(url.dashboard);
    }

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
                <RegisterForm />
            </div>
        </main>
    );
}
