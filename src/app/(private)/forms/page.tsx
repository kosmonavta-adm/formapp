import { Metadata } from 'next';

import Forms from '@/components/forms/Forms';

export const metadata: Metadata = {
    title: 'Tymczasowy tytuł - panel administrator',
    openGraph: {
        title: 'Tymczasowy tytuł - panel administrator',
    },
};

export default async function FormPage() {
    return <Forms />;
}
