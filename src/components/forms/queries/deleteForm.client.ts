import { useMutation, useQueryClient } from '@tanstack/react-query';

import { formKeys } from '@/components/forms/_formUtils';

type DeleteFormData = { id: number };

export const useDeleteFormMutation = () => {
    const queryClient = useQueryClient();

    const mutationFn = async ({ id }: DeleteFormData) => {
        const response = await fetch(`/api/forms/${id}`, {
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
            queryClient.invalidateQueries({ queryKey: formKeys.all });
        },
    });
};
