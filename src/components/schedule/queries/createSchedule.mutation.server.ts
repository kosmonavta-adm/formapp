import { NextRequest, NextResponse } from 'next/server';

import { createClient } from '@/auth/server';
export const createScheduleMutation = async (request: NextRequest) => {
    const supabase = createClient();

    const data = await request.json();

    const { error } = await supabase.from('schedule').insert(data);

    if (error) {
        return NextResponse.json({ status: 500, error });
    } else {
        return NextResponse.json({ status: 200, error: null });
    }
};
