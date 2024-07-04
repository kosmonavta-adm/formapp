import { NextRequest, NextResponse } from 'next/server';

import { createClient } from '@/auth/server';
export const updateScheduleMutation = async (request: NextRequest, { params: { id } }: { params: { id: string } }) => {
    const supabase = createClient();

    const { data } = await request.json();

    const { error } = await supabase.from('schedule').update(data).eq('id', id);

    if (error) {
        return NextResponse.json({ status: 500, error });
    } else {
        return NextResponse.json({ status: 200, error: null });
    }
};
