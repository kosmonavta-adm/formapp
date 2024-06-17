'use server';

import { cookies } from 'next/headers';

export const handleChangeLanguage = (language: 'pl' | 'en') => {
    'use server';
    cookies().set('NEXT_LOCALE', language);
};
