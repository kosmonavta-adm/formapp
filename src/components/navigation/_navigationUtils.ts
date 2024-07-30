import MenuDict from '@/dictionaries/MenuDict.json';
import { url } from '@/utils/utils';

export const checkIsActivePage = (urlToCheck: string, pathname: string) => {
    const baseUrl = urlToCheck.split('?')[0];
    return baseUrl === pathname;
};

export const menu = [
    { id: 1, url: url.dashboard, name: (locale: 'pl' | 'en') => MenuDict[locale].homepage },
    { id: 2, url: url.schedules, name: (locale: 'pl' | 'en') => MenuDict[locale].schedules },
];
