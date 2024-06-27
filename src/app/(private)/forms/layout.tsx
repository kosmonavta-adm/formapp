import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { ReactNode } from 'react';

import { getAllFormsPrefetch } from '@/components/forms/forms.queries';

export default async function SiteLayout({ children }: { children: ReactNode }) {
    const queryClient = await getAllFormsPrefetch();

    return <HydrationBoundary state={dehydrate(queryClient)}>{children} </HydrationBoundary>;
}
