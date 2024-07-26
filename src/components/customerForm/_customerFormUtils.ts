import { z } from 'zod';

export const CUSTOMER_FORM = {
    APPOINTMENT: 'APPOINTMENT',
    RESPONSES: 'RESPONSES',
};

export const customerFormSchema = z.object({
    scheduleData: z.string(),
    formData: z.string(),
});

export const formDataSchema = z.array(
    z
        .object({
            component: z.literal('Input'),
            temporal: z.boolean(),
            dataId: z.string(),
            settings: z.object({
                label: z.string(),
                placeholder: z.string(),
            }),
        })
        .or(
            z.object({
                component: z.literal('Select'),
                temporal: z.boolean(),
                dataId: z.string(),
                settings: z.object({
                    label: z.string(),
                    placeholder: z.string(),
                    options: z.array(
                        z.object({
                            name: z.string(),
                            value: z.string(),
                        })
                    ),
                }),
            })
        )
);

export const customerFormKeys = {
    single: (subdomain: string) => ['single', subdomain],
};
