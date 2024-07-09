import { NextRequest, NextResponse } from 'next/server';

import { createClient } from '@/auth/server';

export const deleteFormMutation = async (_: NextRequest, { params }: { params: { id: string } }) => {
    const supabase = createClient();

    const { error } = await supabase.from('form').delete().eq('id', params.id);

    if (error) {
        return NextResponse.json({ status: 500, error });
    } else {
        return NextResponse.json({ status: 200, error: null });
    }
};
