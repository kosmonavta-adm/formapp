// import { notFound } from 'next/navigation';
import { ReactNode } from 'react';

// import { createClient } from '@/auth/server';
// import CustomerFormProvider from '@/components/customerForm/CustomerFormProvider';

export default async function SiteLayout({ params, children }: { params: { domain: string }; children: ReactNode }) {
    const decodedDomain = decodeURIComponent(params.domain);
    // const supabase = createClient();

    // const domain = await supabase
    //     .from('domain')
    //     .select(
    //         `
    //         domain,
    //         form ( *),
    //         schedule(*)
    //     `
    //     )
    //     .eq('domain', decodedDomain)
    //     .single();
    // if (domain.error) {
    //     notFound();
    // }

    // const form = await supabase.from('form').select('*');

    return (
        <>
            {decodedDomain}
            {children}
        </>
        // <>
        //     <CustomerFormProvider value={domain}>{children}</CustomerFormProvider>
        // </>
    );
}
