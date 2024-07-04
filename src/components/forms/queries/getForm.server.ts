import { NextRequest, NextResponse } from 'next/server';

import { createClient } from '@/auth/server';

export const getFormQuery = async (_: NextRequest, { params }: { params: { id: string } }) => {
    const supabase = createClient();

    const { error, data } = await supabase
        .from('form')
        .select(
            `
                id,
                isPublished:is_published,
                name,
                schema,
                blueprint
            `
        )
        .eq('id', params.id)
        .maybeSingle();

    if (error) {
        return NextResponse.json({ status: 500, error });
    }

    return NextResponse.json({ data, status: 200, error: null });
};
