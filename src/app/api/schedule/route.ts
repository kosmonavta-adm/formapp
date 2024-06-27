import { NextRequest, NextResponse } from 'next/server';

import { createClient } from '@/auth/server';

export async function POST(request: NextRequest) {
    const supabase = createClient();

    const userBack = await supabase.auth.getUser();
    const userIdFront = request.headers.get('bearer');
    if (userBack.data.user?.id === undefined) return NextResponse.json({ status: 401, error: null });

    if (userBack.data.user.id === userIdFront) {
        const data = await request.json();

        const { error } = await supabase.from('schedule').insert({ data });

        if (error) {
            return NextResponse.json({ status: 500, error });
        } else {
            return NextResponse.json({ status: 200, error: null });
        }
    }

    return NextResponse.json({ status: 401, error: null });
}

export async function UPDATE(request: NextRequest) {
    const supabase = createClient();

    const userBack = await supabase.auth.getUser();
    const userIdFront = request.headers.get('bearer');
    if (userBack.data.user?.id === undefined) return NextResponse.json({ status: 401, error: null });

    if (userBack.data.user.id === userIdFront) {
        const data = await request.json();

        const { error } = await supabase.from('schedule').update({ data });

        if (error) {
            return NextResponse.json({ status: 500, error });
        } else {
            return NextResponse.json({ status: 200, error: null });
        }
    }

    return NextResponse.json({ status: 401, error: null });
}
