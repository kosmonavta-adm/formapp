import { useQuery } from '@tanstack/react-query';

import { formSchema } from '@/components/forms/_formUtils';
import { scheduleKeys } from '@/components/schedule/queries/_scheduleQueriesUtils';

export const useGetFormQuery = (id: string | undefined) => {
    const queryKey = scheduleKeys.single();

    const queryFn = async () => {
        const response = await fetch(`/api/forms/${id}`, {
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

        const parsedData = formSchema.parse(data ?? null);

        return parsedData;
    };

    return useQuery({ queryKey, queryFn });
};
