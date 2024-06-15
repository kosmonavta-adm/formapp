import { Metadata } from 'next';
import Image from 'next/image';
import { redirect } from 'next/navigation';

import { createClient } from '@/auth/server';
import UpdatePassword from '@/components/auth/UpdatePassword';
import { url } from '@/utils/utils';

export const metadata: Metadata = {
    title: 'Tymczasowy tytuł - zmień hasło',
    openGraph: {
        title: 'Tymczasowy tytuł - zmień hasło',
    },
};

export default async function PrivatePage() {
    const supabase = createClient();

    const { data, error } = await supabase.auth.getUser();

    if (error || !data?.user) {
        redirect(url.login);
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
            <UpdatePassword />
        </main>
    );
}
