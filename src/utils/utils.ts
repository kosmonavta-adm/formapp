import { ClassValue, clsx } from 'clsx';
import { set } from 'date-fns';
import { twMerge } from 'tailwind-merge';

export const url = {
    login: '/',
    register: '/register',
    forgotPassword: '/auth/forgot-password',
    dashboard: '/dashboard',
    schedule: '/schedule',
    formBuilder: '/form',
    forms: '/forms',
};

export const cxTw = (...classes: ClassValue[]) => twMerge(clsx(...classes));

export const ERROR_KEYS = {
    REQUIRED: 'required',
    MIN_LENGTH: 'minLength',
    INCORRECT_EMAIL: 'incorrectEmail',
    PASSWORDS_DOESNT_MATCH: 'passwordsDoesntMatch',
    END_AFTER_MIDNIGHT: 'endAfterMidnight',
    SAME_END_AND_START: 'sameEndAndStart',
    LESS_THAN_ZERO: 'lessThanZero',
};

export const getFormErrorMessage = <T, K extends keyof T | undefined>(key: K, dict: T) => {
    if (key === undefined) return;

    return dict[key];
};

export const convertTimeToDate = (time: string) => {
    if (time.includes(':') === false) {
        throw new Error('Incorrect time format');
    }

    const [hours, minutes] = time.split(':');
    const result = set(new Date(), { hours: Number(hours), minutes: Number(minutes) });

    return result;
};
