import { z } from 'zod';

export const scheduleKeys = {
    all: ['all'],
    single: () => [...scheduleKeys.all, 'single'],
};

export const baseScheduleSchema = z.object({
    id: z.number(),
    isPublished: z.boolean(),
    startDate: z.string(),
    endDate: z.string(),
});

export const scheduleSchemaFromQuery = baseScheduleSchema.extend({
    data: z.string(),
});

export const scheduleDataSchemaRevived = z.array(
    z.object({
        meetingDuration: z.number(),
        meetingInterval: z.number(),
        startTime: z.string(),
        endTime: z.string(),
        appointmentsPerDay: z.number(),
        workdayDuration: z.object({
            years: z.number().optional(),
            months: z.number().optional(),
            weeks: z.number().optional(),
            days: z.number().optional(),
            hours: z.number().optional(),
            minutes: z.number().optional(),
            seconds: z.number().optional(),
        }),
        date: z.string(),
    })
);

export const scheduleSchemaRevived = baseScheduleSchema.extend({
    data: scheduleDataSchemaRevived,
});

export type ScheduleSchemaFromQuery = z.infer<typeof scheduleSchemaFromQuery>;
export type ScheduleSchemaRevived = z.infer<typeof scheduleSchemaRevived>;
