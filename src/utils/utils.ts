import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const url = {
    login: '/',
    register: '/register',
    forgotPassword: '/auth/forgot-password',
    dashboard: '/dashboard',
};

export const cxTw = (...classes: ClassValue[]) => twMerge(clsx(...classes));

export const ERROR_KEYS = {
    MIN_LENGTH: 'minLength',
    INCORRECT_EMAIL: 'incorrectEmail',
    PASSWORDS_DOESNT_MATCH: 'passwordsDoesntMatch',
};

export const getErrorMessage = <T, K extends keyof T | undefined>(key: K, dict: T) => {
    if (key === undefined) return;

    return dict[key];
};
