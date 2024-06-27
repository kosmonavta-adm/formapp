import { QueryClient, useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { createClient } from '@/auth/client';

export const formsKeys = {
    all: ['subdomains_all'],
};

const allSubdomainsSchema = z.array(
    z.object({
        subdomain: z.string(),
    })
);

export const queryAllSubdomains = async () => {
    const supabase = createClient();

    const { data, error } = await supabase.from('customer_form').select(`
             subdomain
         `);

    if (error) throw new Error(error.message);

    return data;
};

export const getSubdomainsPrefetch = async () => {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: formsKeys.all,
        queryFn: queryAllSubdomains,
    });

    return queryClient;
};

export const useGetAllSubdomains = () => {
    const queryKey = formsKeys.all;

    const queryFn = async () => {
        const response = await fetch('/api/subdomain', {
            method: 'GET',
        });

        const { status, error, data } = await response.json();

        if (status !== 200) {
            throw new Error(error.message);
        }

        const parsedData = allSubdomainsSchema.parse(data);

        return parsedData;
    };

    return useQuery({ queryKey, queryFn });
};
