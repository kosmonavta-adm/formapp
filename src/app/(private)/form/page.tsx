import { Metadata } from 'next';

import FormBuilder from '@/components/formBuilder/FormBuilder';

export const metadata: Metadata = {
    title: 'Tymczasowy tytuł - panel administrator',
    openGraph: {
        title: 'Tymczasowy tytuł - panel administrator',
    },
};

export default async function FormPage() {
    return <FormBuilder />;
}
