import { NextResponse } from 'next/server';

import { queryAllSubdomains } from '@/components/auth/getAllSubdomains';

export async function GET() {
    try {
        const data = await queryAllSubdomains();
        return NextResponse.json({ data, status: 200, error: null });
    } catch (error) {
        if (typeof error === 'object' && error !== null && 'message' in error) {
            return NextResponse.json({ status: 500, error: error.message });
        }
    }

    return NextResponse.json({ status: 401, error: null });
}
