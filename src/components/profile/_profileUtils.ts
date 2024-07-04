import { z } from 'zod';

export const profileKeys = {
    single: ['singleProfile'],
};

export const profileSchema = z
    .object({
        id: z.number(),
        subdomain: z.string(),
    })
    .nullable();
