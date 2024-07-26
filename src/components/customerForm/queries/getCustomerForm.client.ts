import { useQuery } from '@tanstack/react-query';

import { customerFormKeys } from '@/components/customerForm/_customerFormUtils';

export const useGetCustomerFormQuery = (subdomain: string) => {
    const queryKey = customerFormKeys.single(subdomain);

    const queryFn = async () => {
        const response = await fetch(`/api/customer-form/${subdomain}`, {
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
        return data;
    };

    return useQuery({ queryKey, queryFn });
};
