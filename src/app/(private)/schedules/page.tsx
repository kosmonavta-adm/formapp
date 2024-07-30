import { Metadata } from 'next';

import Schedules from '@/components/schedule/Schedules';

export const metadata: Metadata = {
    title: 'Tymczasowy tytuł - panel administrator',
    openGraph: {
        title: 'Tymczasowy tytuł - panel administrator',
    },
};

export default async function FormPage() {
    return (
        <>
            <Schedules />
        </>
    );
}
