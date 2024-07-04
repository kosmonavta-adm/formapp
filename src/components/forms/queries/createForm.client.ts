import { useMutation, useQueryClient } from '@tanstack/react-query';

import { formKeys } from '@/components/forms/_formUtils';
import { TablesInsert } from '@/utils/dbTypes';

type CreateFormData = TablesInsert<'form'>;

export const useCreateFormMutation = () => {
    const queryClient = useQueryClient();

    const mutationFn = async ({ user_id, schema, blueprint, name }: CreateFormData) => {
        const response = await fetch('/api/form', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_id, schema, blueprint, name }),
        });

        const { status, error } = await response.json();

        if (status !== 200) {
            throw new Error(error);
        }
    };

    return useMutation({
        mutationFn,
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: formKeys.all });
        },
    });
};
