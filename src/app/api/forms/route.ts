import { NextRequest, NextResponse } from 'next/server';

import { createClient } from '@/auth/server';
import { queryAllForms } from '@/components/forms/forms.queries';

export async function GET(request: NextRequest) {
    const supabase = createClient();

    const userBack = await supabase.auth.getUser();
    const userIdFront = request.headers.get('bearer');
    if (userBack.data.user?.id === undefined) return NextResponse.json({ status: 401, error: null });
    if (userBack.data.user.id === userIdFront) {
        try {
            const data = await queryAllForms();
            return NextResponse.json({ data, status: 200, error: null });
        } catch (error) {
            if (typeof error === 'object' && error !== null && 'message' in error) {
                return NextResponse.json({ status: 500, error: error.message });
            }
        }
    }

    return NextResponse.json({ status: 401, error: null });
}
