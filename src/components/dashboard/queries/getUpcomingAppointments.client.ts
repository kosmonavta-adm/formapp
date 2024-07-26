import { useQuery } from '@tanstack/react-query';

export const useGetUpcomingAppointmentsQuery = (subdomain: string) => {
    const queryKey = ['appointments'];

    const queryFn = async () => {
        const response = await fetch(`/api/appointments/${subdomain}`, {
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
        return data as { date: string; email: string; fullName: string }[];
    };

    return useQuery({ queryKey, queryFn });
};
