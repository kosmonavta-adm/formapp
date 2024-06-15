import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const url = {
    login: '/',
    register: '/register',
    forgotPassword: '/auth/forgot-password',
    dashboard: '/dashboard',
};

export const cxTw = (...classes: ClassValue[]) => twMerge(clsx(...classes));
