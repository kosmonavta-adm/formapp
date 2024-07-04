import { useQuery } from '@tanstack/react-query';

import {
    scheduleDataSchemaRevived,
    scheduleKeys,
    scheduleSchemaFromQuery,
} from '@/components/schedule/queries/_scheduleQueriesUtils';

export const useGetScheduleQuery = (id: string) => {
    const queryKey = scheduleKeys.single();

    const queryFn = async () => {
        const response = await fetch(`/api/schedules/${id}`, {
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

        const parsedData = scheduleSchemaFromQuery.parse(data);

        const convertedPrasedScheduleData = JSON.parse(parsedData?.data ?? '{}');

        const parsedScheduleData = scheduleDataSchemaRevived.parse(convertedPrasedScheduleData);

        const newData = {
            ...parsedData,
            data: parsedScheduleData,
        };

        return newData;
    };

    return useQuery({ queryKey, queryFn });
};
