'use client';

import CustomerCalendar from '@/components/customerForm/CustomerCalendar';
import { useGetCustomerFormQuery } from '@/components/customerForm/queries/getCustomerForm.client';
import Spinner from '@/components/ui/Loader';

export default function Page({ params: { subdomain } }: { params: { subdomain: string } }) {
    const decodedSubdomain = decodeURIComponent(subdomain).split('.').at(0);
    const customerForm = useGetCustomerFormQuery(decodedSubdomain ?? '');

    if (customerForm.data === undefined) return <Spinner />;

    const [data] = customerForm.data;

    if (data.scheduleData === null) return <p>Harmonogram nie został jeszcze dodany</p>;
    if (decodedSubdomain === undefined) return;

    return (
        <main className="m-auto flex min-h-svh w-[40vw] flex-col justify-center gap-8">
            <CustomerCalendar
                subdomain={decodedSubdomain}
                data={data}
            />
        </main>
    );
}
