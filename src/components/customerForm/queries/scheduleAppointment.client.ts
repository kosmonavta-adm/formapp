import { useMutation, useQueryClient } from '@tanstack/react-query';

import { scheduleKeys } from '@/components/schedule/queries/_scheduleQueriesUtils';
import { TablesUpdate } from '@/utils/dbTypes';

type ScheduleAppointmentData = TablesUpdate<'response'> & { subdomain: string };

export const useScheduleAppointmentMutation = () => {
    const queryClient = useQueryClient();

    const mutationFn = async ({ subdomain, date, email, customer_form_id }: ScheduleAppointmentData) => {
        const response = await fetch(`/api/customer-form`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ date, email, subdomain, customer_form_id }),
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
