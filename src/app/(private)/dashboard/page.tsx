import { Metadata } from 'next';

import Dashboard from '@/components/dashboard/Dashboard';

export const metadata: Metadata = {
    title: 'Tymczasowy tytuł - panel administrator',
    openGraph: {
        title: 'Tymczasowy tytuł - panel administrator',
    },
};

export default async function DashboardPage() {
    return <Dashboard />;
}
