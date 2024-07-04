import { differenceInMonths, startOfMonth } from 'date-fns';

export const PHASE = {
    NO_SCHEDULE: 'NO_SCHEDULE',
    VIEW_SCHEDULE: 'VIEW_SCHEDULE',
    EDIT_SCHEDULE_RANGE: 'EDIT_SCHEDULE_RANGE',
    EDIT_SCHEDULE_DAY: 'EDIT_SCHEDULE_DAY',
} as const;

export const getDifferenceInMonths = ({ endDate, startDate }: { endDate: string | Date; startDate: string | Date }) => {
    const result = differenceInMonths(endDate, startOfMonth(startDate));
    if (result === 0) return 1;
    else if (result === 1) return 2;
    else return result;
};
