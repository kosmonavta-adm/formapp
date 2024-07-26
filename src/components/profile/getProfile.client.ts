import { useQuery } from '@tanstack/react-query';

import { profileKeys } from '@/components/profile/_profileUtils';

export const useGetProfileQuery = () => {
    const queryKey = profileKeys.single;

    const queryFn = async () => {
        const response = await fetch('/api/profile', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();
        if (data.status !== 200) {
            throw new Error(data.error.message);
        }

        return data;
    };

    return useQuery({ queryKey, queryFn });
};
