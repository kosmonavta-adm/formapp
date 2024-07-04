import { useMutation, useQueryClient } from '@tanstack/react-query';

import { formKeys } from '@/components/forms/_formUtils';
import { TablesUpdate } from '@/utils/dbTypes';

type UpdateFormData = TablesUpdate<'form'>;

export const useUpdateFormMutation = () => {
    const queryClient = useQueryClient();

    const mutationFn = async (updateData: UpdateFormData) => {
        const response = await fetch(`/api/forms/${updateData.id}`, {
            method: 'PATCH',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateData),
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
            queryClient.invalidateQueries({ queryKey: formKeys.all });
        },
    });
};
