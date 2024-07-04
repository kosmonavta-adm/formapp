import { NextResponse } from 'next/server';

import { createClient } from '@/auth/server';

export const queryAllForms = async () => {
    const supabase = createClient();

    const { data, error } = await supabase.from('form').select(`
             id,
             name,
             isPublished:is_published,
             schema,
             blueprint
         `);

    if (error) throw new Error(error.message);

    return data;
};

export const getAllFormsQuery = async () => {
    try {
        const data = await queryAllForms();
        return NextResponse.json({ data, status: 200, error: null });
    } catch (error) {
        if (typeof error === 'object' && error !== null && 'message' in error) {
            return NextResponse.json({ status: 500, error: error.message });
        }
    }

    return NextResponse.json({ status: 401, error: null });
};
