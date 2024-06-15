import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { createClient } from '@/auth/server';
import Dashboard from '@/components/Dashboard';
import { url } from '@/utils/utils';

export const metadata: Metadata = {
    title: 'Tymczasowy tytuł - panel administrator',
    openGraph: {
        title: 'Tymczasowy tytuł - panel administrator',
    },
};

export default async function DashboardPage() {
    const supabase = createClient();

    const { data, error } = await supabase.auth.getUser();

    if (error || !data?.user) {
        redirect(url.login);
    }

    return (
        <div>
            <p>{data.user.email}</p> <p>{data.user.last_sign_in_at}</p>
            <Dashboard />
        </div>
    );
}
