import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';

import { customerFormKeys } from '@/components/customerForm/_customerFormUtils';
import { prefetchCustomerForm } from '@/components/customerForm/queries/getCustomerForm.server';

export default async function SiteLayout({
    params: { subdomain },
    children,
}: {
    params: { subdomain: string };
    children: ReactNode;
}) {
    const decodedSubdomain = decodeURIComponent(subdomain).split('.').at(0);

    if (decodedSubdomain === undefined) notFound();

    const queryClient = await prefetchCustomerForm(decodedSubdomain);

    const data = queryClient.getQueryData(customerFormKeys.single(decodedSubdomain));

    if (Array.isArray(data) && data.length === 0) notFound();

    return <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>;
}
