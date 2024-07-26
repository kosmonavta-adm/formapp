import { useMutation, useQueryClient } from '@tanstack/react-query';

import { scheduleKeys } from '@/components/schedule/queries/_scheduleQueriesUtils';

type DeleteScheduleData = { id: number };

export const useDeleteScheduleMutation = () => {
    const queryClient = useQueryClient();

    const mutationFn = async ({ id }: DeleteScheduleData) => {
        const response = await fetch(`/api/schedules/${id}`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });

        const { status, error } = await response.json();

        if (status !== 200) {
            throw new Error(error);
        }
    };

    return useMutation({
        mutationFn,
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: scheduleKeys.all });
        },
    });
};
