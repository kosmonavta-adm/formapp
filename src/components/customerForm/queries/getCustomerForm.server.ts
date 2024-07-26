import { QueryClient } from '@tanstack/react-query';
import { NextRequest, NextResponse } from 'next/server';

import { createClient } from '@/auth/server';
import { customerFormKeys } from '@/components/customerForm/_customerFormUtils';

export const queryCustomerForm = async (subdomain: string) => {
    const supabase = createClient();

    const { error, data } = await supabase
        .from('customer_form')
        .select(
            `
                scheduleData:schedule_data,
                id,
                response (
                    date
                )

            `
        )
        .eq('subdomain', subdomain);

    if (error) throw new Error(error.message);

    return data;
};

export const getCustomerForm = async (_: NextRequest, { params: { subdomain } }: { params: { subdomain: string } }) => {
    try {
        const data = await queryCustomerForm(subdomain);
        return NextResponse.json({ data, status: 200, error: null });
    } catch (error) {
        return NextResponse.json({ status: 500, error });
    }
};

export const prefetchCustomerForm = async (subdomain: string) => {
    const queryClient = new QueryClient();
    const queryKey = customerFormKeys.single(subdomain);

    await queryClient.prefetchQuery({
        queryKey,
        queryFn: () => queryCustomerForm(subdomain),
    });

    return queryClient;
};
