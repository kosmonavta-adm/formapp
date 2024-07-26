import { NextRequest, NextResponse } from 'next/server';

import { createClient } from '@/auth/server';
export const updateCustomerFormMutation = async (request: NextRequest) => {
    const supabase = createClient();

    const data = await request.json();
    const { customerFormData, subdomain } = data;
    const { error } = await supabase.from('customer_form').update(customerFormData).eq('subdomain', subdomain);
    if (error) {
        return NextResponse.json({ status: 500, error });
    } else {
        return NextResponse.json({ status: 200, error: null });
    }
};
