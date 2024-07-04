import { NextResponse } from 'next/server';

import { createClient } from '@/auth/server';

export const getProfileQuery = async () => {
    const supabase = createClient();

    const { error, data } = await supabase.from('profile').select('*').limit(1).single();

    if (error) {
        return NextResponse.json({ status: 500, error });
    } else {
        return NextResponse.json({ data, status: 200, error: null });
    }
};
