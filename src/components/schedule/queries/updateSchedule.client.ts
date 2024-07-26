import { useMutation, useQueryClient } from '@tanstack/react-query';

import { scheduleKeys } from '@/components/schedule/queries/_scheduleQueriesUtils';
import { TablesUpdate } from '@/utils/dbTypes';

type UpdateScheduleData = TablesUpdate<'schedule'>;

export const useUpdateScheduleMutation = () => {
    const queryClient = useQueryClient();

    const mutationFn = async ({ id, ...rest }: UpdateScheduleData) => {
        const response = await fetch(`/api/schedules/${id}`, {
            method: 'PATCH',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(rest),
        });

        const { status, error, data } = await response.json();

        if (status !== 200) {
            throw new Error(error);
        }

        return data;
    };

    return useMutation({
        mutationFn,
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: scheduleKeys.all });
        },
    });
};
