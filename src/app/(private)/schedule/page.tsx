import { Metadata } from 'next';

import Schedule from '@/components/schedule/Schedule';

export const metadata: Metadata = {
    title: 'Tymczasowy tytuł - panel administrator',
    openGraph: {
        title: 'Tymczasowy tytuł - panel administrator',
    },
};

export default async function DashboardPage() {
    return <Schedule />;
}
