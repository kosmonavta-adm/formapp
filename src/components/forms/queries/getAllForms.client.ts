'use client';
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { formKeys, formSchema } from '@/components/forms/_formUtils';

export const useGetAllForms = () => {
    const queryKey = formKeys.all;

    const queryFn = async () => {
        const response = await fetch('/api/forms', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });

        const { status, error, data } = await response.json();

        if (status !== 200) {
            throw new Error(error.message);
        }

        const parsedData = z.array(formSchema).parse(data);

        return parsedData;
    };

    return useQuery({ queryKey, queryFn });
};
