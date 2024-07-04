import { z } from 'zod';

export const customerFormSchema = z.object({
    scheduleData: z.array(
        z
            .object({
                component: z.string(),
                temporal: z.boolean(),
                settings: z.object({
                    dataId: z.string(),
                    label: z.string(),
                    placeholder: z.string(),
                }),
            })
            .or(
                z.object({
                    component: z.string(),
                    temporal: z.boolean(),
                    settings: z.object({
                        dataId: z.string(),
                        label: z.string(),
                        placeholder: z.string(),
                        options: z.array(
                            z.object({
                                name: z.string(),
                                id: z.string(),
                            })
                        ),
                    }),
                })
            )
    ),
    formData: z.string(),
});

export const formDataSchema = z.array(
    z
        .object({
            component: z.literal('Input'),
            temporal: z.boolean(),
            settings: z.object({
                dataId: z.string(),
                label: z.string(),
                placeholder: z.string(),
            }),
        })
        .or(
            z.object({
                component: z.literal('Select'),
                temporal: z.boolean(),
                settings: z.object({
                    dataId: z.string(),
                    label: z.string(),
                    placeholder: z.string(),
                    options: z.array(
                        z.object({
                            name: z.string(),
                            id: z.string(),
                        })
                    ),
                }),
            })
        )
);

export const customerFormKeys = {
    single: (subdomain: string) => ['single', subdomain],
};
