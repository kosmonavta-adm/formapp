import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import {
    baseScheduleSchema,
    scheduleDataSchemaRevived,
    scheduleKeys,
    scheduleSchemaFromQuery,
} from '@/components/schedule/queries/_scheduleQueriesUtils';

export const useGetAllSchedulesQuery = () => {
    const queryKey = scheduleKeys.all;

    const queryFn = async () => {
        const response = await fetch('/api/schedules', {
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

        const parsedData = z.array(scheduleSchemaFromQuery).parse(data);

        const convertedPrasedScheduleData = parsedData.map((item) => ({ ...item, data: JSON.parse(item.data) }));

        const parsedScheduleData = z
            .array(baseScheduleSchema.extend({ data: scheduleDataSchemaRevived }))
            .parse(convertedPrasedScheduleData);

        return parsedScheduleData;
    };

    return useQuery({ queryKey, queryFn });
};
