'use server';

import { NextRequest, NextResponse } from 'next/server';

import { createClient } from '@/auth/server';

export const getScheduleQuery = async (_: NextRequest, { params: { id } }: { params: { id: string } }) => {
    const supabase = createClient();

    const { data, error } = await supabase
        .from('schedule')
        .select(
            `
            id,
            data,
            startDate:start_date,
            endDate:end_date,
            isPublished:is_published
        `
        )
        .eq('id', id)
        .single();

    if (error) throw new Error(error.message);

    if (error) {
        return NextResponse.json({ status: 500, error });
    } else {
        return NextResponse.json({ data, status: 200, error: null });
    }
};
