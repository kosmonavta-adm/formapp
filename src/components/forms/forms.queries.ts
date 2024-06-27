import { QueryClient, useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { createClient } from '@/auth/client';

export const formsKeys = {
    all: ['forms_all'],
};

const allFormsSchema = z.array(
    z.object({
        id: z.number(),
        name: z.string(),
        isActive: z.boolean(),
        schema: z.string(),
        blueprint: z.string(),
    })
);

export const queryAllForms = async () => {
    const supabase = createClient();

    const { data, error } = await supabase.from('form').select(`
             id,
             name,
             isActive:is_active,
             schema,
             blueprint
         `);

    if (error) throw new Error(error.message);

    return data;
};

export const getAllFormsPrefetch = async () => {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: formsKeys.all,
        queryFn: queryAllForms,
    });

    return queryClient;
};

export const useGetAllForms = () => {
    const supabase = createClient();

    const queryKey = formsKeys.all;

    const queryFn = async () => {
        const user = await supabase.auth.getSession();
        const user_id = user.data.session?.user.id;
        if (user_id === undefined) throw new Error('user_id is undefined');

        const response = await fetch('/api/forms', {
            method: 'GET',
            headers: {
                bearer: user_id,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });

        const { status, error, data } = await response.json();

        if (status !== 200) {
            throw new Error(error.message);
        }

        const parsedData = allFormsSchema.parse(data);

        return parsedData;
    };

    return useQuery({ queryKey, queryFn });
};
