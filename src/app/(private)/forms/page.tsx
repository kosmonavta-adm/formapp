import { Metadata } from 'next';
import Link from 'next/link';

import FormsTable from '@/components/forms/FormsTable';
import Button from '@/components/ui/Button';
import { url } from '@/utils/utils';

export const metadata: Metadata = {
    title: 'Tymczasowy tytuł - panel administrator',
    openGraph: {
        title: 'Tymczasowy tytuł - panel administrator',
    },
};

export default async function FormPage() {
    return (
        <div>
            <Button asChild>
                <Link href={url.formBuilder}>Dodaj formularz</Link>
            </Button>
            <FormsTable />
        </div>
    );
}
