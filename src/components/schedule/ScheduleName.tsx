import Link from 'next/link';

import { ArrowLeft } from '@/components/icons';
import { PHASE } from '@/components/schedule/_scheduleUtils';
import Button from '@/components/ui/Button';
import ScheduleNameDict from '@/dictionaries/ScheduleNameDict.json';
import { useLocaleContext } from '@/providers/LocaleProvider';
import { url } from '@/utils/utils';

type ScheduleNameProps = {
    handlePhaseChange: (phase: keyof typeof PHASE) => void;
    handleScheduleName: (name: string) => void;
    scheduleName: string;
};

const ScheduleName = ({ handlePhaseChange, handleScheduleName, scheduleName }: ScheduleNameProps) => {
    const locale = useLocaleContext();

    const t = ScheduleNameDict[locale];
    return (
        <div className="m-auto flex w-3/4 max-w-screen-2xl flex-col gap-16">
            <Button
                className="p-0"
                variant="ghost"
                asChild
            >
                <Link href={url.schedules}>
                    <ArrowLeft className="h-4" />
                    {t.back}
                </Link>
            </Button>
            <p className="mx-auto mb-4 text-4xl font-bold">{t.scheduleName}</p>
            <input
                value={scheduleName}
                className="flex w-full border border-neutral-300 px-6 py-3 text-lg placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:bg-neutral-50 disabled:opacity-50"
                onChange={(e) => handleScheduleName(e.currentTarget.value)}
            />
            <Button
                className="mx-auto"
                size="lg"
                onClick={() => {
                    handlePhaseChange(PHASE.EDIT_SCHEDULE_RANGE);
                }}
            >
                {t.next}
            </Button>
        </div>
    );
};

export default ScheduleName;
