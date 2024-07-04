import { getScheduleQuery } from '@/components/schedule/queries/getSchedule.query.server';
import { updateScheduleMutation } from '@/components/schedule/queries/updateSchedule.server';

export const GET = getScheduleQuery;
export const PATCH = updateScheduleMutation;
