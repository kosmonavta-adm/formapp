import { QueryClient } from '@tanstack/react-query';
import { NextRequest, NextResponse } from 'next/server';

import { createClient } from '@/auth/server';

export const queryUpcomingAppointments = async (subdomain: string) => {
    const supabase = createClient();

    const { error, data } = await supabase
        .from('response')
        .select(
            `
                date,
                email,
                fullName:full_name
            `
        )
        .eq('subdomain', subdomain);

    if (error) throw new Error(error.message);

    return data;
};

export const getUpcomingAppointments = async (
    _: NextRequest,
    { params: { subdomain } }: { params: { subdomain: string } }
) => {
    try {
        const data = await queryUpcomingAppointments(subdomain);
        return NextResponse.json({ data, status: 200, error: null });
    } catch (error) {
        return NextResponse.json({ status: 500, error });
    }
};

export const prefetchUpcomingAppointments = async (subdomain: string) => {
    const queryClient = new QueryClient();
    const queryKey = ['appointments'];

    await queryClient.prefetchQuery({
        queryKey,
        queryFn: () => queryUpcomingAppointments(subdomain),
    });

    return queryClient;
};
