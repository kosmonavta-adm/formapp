'use client';

import CustomerForm from '@/components/customerForm/CustomerForm';
import { useGetCustomerFormQuery } from '@/components/customerForm/queries/getCustomerForm.client';
import Spinner from '@/components/ui/Loader';

export default function Page({ params: { subdomain } }: { params: { subdomain: string } }) {
    const decodedSubdomain = decodeURIComponent(subdomain).split('.').at(0);
    const customerForm = useGetCustomerFormQuery(decodedSubdomain ?? '');

    if (customerForm.data === undefined) return <Spinner />;

    const [{ formData }] = customerForm.data;
    return (
        <main className="m-auto flex min-h-svh w-1/4 flex-col justify-center gap-8">
            <CustomerForm data={formData} />
        </main>
    );
}
