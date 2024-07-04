import { QueryClient } from '@tanstack/react-query';
import { NextResponse } from 'next/server';

import { createClient } from '@/auth/server';
import { profileKeys } from '@/components/profile/_profileUtils';

export const getProfile = async () => {
    const { error, data } = await queryProfile();

    if (error) {
        return NextResponse.json({ status: 500, error });
    } else {
        return NextResponse.json({ data, status: 200, error: null });
    }
};

export const prefetchProfile = async () => {
    const queryClient = new QueryClient();
    const queryKey = profileKeys.single;

    await queryClient.prefetchQuery({
        queryKey,
        queryFn: queryProfile,
    });

    return queryClient;
};

const queryProfile = async () => {
    const supabase = createClient();

    const { error, data } = await supabase.from('profile').select('*').limit(1).single();

    return { error, data };
};
