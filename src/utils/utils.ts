import { ClassValue, clsx } from 'clsx';
import { formatISO, set } from 'date-fns';
import { twMerge } from 'tailwind-merge';

export const url = {
    login: '/',
    register: '/register',
    forgotPassword: '/auth/forgot-password',
    dashboard: '/dashboard',
    addSchedule: '/schedules/add',
    schedules: '/schedules',
    scheduleWizard: (params?: { key: string; value: string }[]) => {
        const url = new URL('/schedule-wizard', process.env.NEXT_PUBLIC_ROOT_DOMAIN);
        params?.forEach((param) => {
            url.searchParams.set(param.key, param.value);
        });
        return url.toString();
    },
};

export const cxTw = (...classes: ClassValue[]) => twMerge(clsx(...classes));

export const ERROR_KEYS = {
    REQUIRED: 'required',
    PASSWORD_MIN_LENGTH: 'passwordMinLength',
    ADDRESS_MIN_LENGTH: 'addressMinLength',
    ADDRESS_MAX_LENGTH: 'addressMaxLength',
    INCORRECT_EMAIL: 'incorrectEmail',
    PASSWORDS_DOESNT_MATCH: 'passwordsDoesntMatch',
    END_AFTER_MIDNIGHT: 'endAfterMidnight',
    SAME_END_AND_START: 'sameEndAndStart',
    LESS_THAN_ZERO: 'lessThanZero',
    ADDRESS_ALREADY_TAKEN: 'addressAlreadyTaken',
};

export const getFormErrorMessage = <T, K extends keyof T | undefined>(key: K, dict: T) => {
    if (key === undefined) return;

    return dict[key];
};

export const convertTimeToDate = (time: string, date?: Date) => {
    if (time.includes(':') === false) {
        throw new Error('Incorrect time format');
    }

    const [hours, minutes] = time.split(':');
    const result = set(date ?? new Date(), { hours: Number(hours), minutes: Number(minutes) });

    return formatISO(result);
};
