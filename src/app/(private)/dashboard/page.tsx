import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Tymczasowy tytuł - panel administrator',
    openGraph: {
        title: 'Tymczasowy tytuł - panel administrator',
    },
};

export default async function DashboardPage() {
    return <p>dashboard</p>;
}
