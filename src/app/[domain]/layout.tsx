import { notFound } from 'next/navigation';
import { ReactNode } from 'react';

import { createClient } from '@/auth/server';

export default async function SiteLayout({ params, children }: { params: { domain: string }; children: ReactNode }) {
    const domain = decodeURIComponent(params.domain);

    const supabase = createClient();

    const { error } = await supabase.from('domain').select('domain').eq('domain', domain).single();

    if (error) {
        notFound();
    }

    return <>{children}</>;
}
