import { createScheduleMutation } from '@/components/schedule/queries/createSchedule.mutation.server';
import { getAllSchedulesQuery } from '@/components/schedule/queries/getAllSchedules.server.ts';

export const GET = getAllSchedulesQuery;

export const POST = createScheduleMutation;
