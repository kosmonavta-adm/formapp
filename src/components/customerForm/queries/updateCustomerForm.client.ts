import { useMutation, useQueryClient } from '@tanstack/react-query';

import { scheduleKeys } from '@/components/schedule/queries/_scheduleQueriesUtils';
import { TablesUpdate } from '@/utils/dbTypes';

type UpdateCustomerFormData = TablesUpdate<'customer_form'>;

export const useUpdateCustomerFormMutation = () => {
    const queryClient = useQueryClient();

    const mutationFn = async ({
        customerFormData,
        subdomain,
    }: {
        customerFormData: UpdateCustomerFormData;
        subdomain: string | undefined | null;
    }) => {
        const response = await fetch(`/api/customer-form`, {
            method: 'PATCH',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ customerFormData, subdomain }),
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
