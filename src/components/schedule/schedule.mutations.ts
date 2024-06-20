import { useMutation, useQueryClient } from '@tanstack/react-query';

import { TablesInsert } from '@/utils/dbTypes';

type CreateScheduleData = TablesInsert<'schedule'>;

export const useCreateScheduleMutation = () => {
    const queryClient = useQueryClient();

    const mutationFn = async ({ user_id, data }: CreateScheduleData) => {
        if (user_id === undefined) throw new Error('user_id is undefined');

        const response = await fetch('/api/schedule', {
            method: 'POST',
            headers: {
                bearer: user_id,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const { status, error } = await response.json();

        if (status !== 200) {
            throw new Error(error);
        }

        return data;
    };

    return useMutation({
        mutationFn,
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['all'] });
        },
    });
};
