import { Metadata } from 'next';

import Dashboard from '@/components/dashboard/Dashboard';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export const metadata: Metadata = {
    title: 'Tymczasowy tytuł - panel administrator',
    openGraph: {
        title: 'Tymczasowy tytuł - panel administrator',
    },
};

export default async function DashboardPage() {
    return (
        <>
            <LanguageSwitcher className="absolute right-4 top-20 sm:right-10" />
            <Dashboard />
        </>
    );
}
