import { useQuery } from '@tanstack/react-query';

import { profileKeys, profileSchema } from '@/components/profile/_profileUtils';

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

        const { status, error, data } = await response.json();

        if (status !== 200) {
            throw new Error(error.message);
        }

        const parsedData = profileSchema.parse(data);

        return parsedData;
    };

    return useQuery({ queryKey, queryFn });
};
