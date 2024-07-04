import { useMutation, useQueryClient } from '@tanstack/react-query';

import { scheduleKeys } from '@/components/schedule/queries/_scheduleQueriesUtils';
import { TablesInsert } from '@/utils/dbTypes';

type CreateScheduleData = TablesInsert<'schedule'>;

export const useCreateScheduleMutation = () => {
    const queryClient = useQueryClient();

    const mutationFn = async ({ user_id, ...rest }: CreateScheduleData) => {
        const response = await fetch('/api/schedules', {
            method: 'POST',
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
