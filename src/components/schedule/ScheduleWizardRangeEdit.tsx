import { addMonths, endOfMonth, endOfYear, format } from 'date-fns';
import { pl } from 'date-fns/locale/pl';
import Link from 'next/link';
import { Dispatch, SetStateAction } from 'react';

import { ArrowLeft } from '@/components/icons';
import { PHASE } from '@/components/schedule/_scheduleUtils';
import Button from '@/components/ui/Button';
import { Calendar } from '@/components/ui/Calendar';
import { RadioGroup, RadioGroupItem } from '@/components/ui/RadioGroup';
import { Separator } from '@/components/ui/Separator';
import ScheduleEditorRangeDict from '@/dictionaries/ScheduleEditorRangeDict.json';
import { useLocaleContext } from '@/providers/LocaleProvider';
import { url } from '@/utils/utils';

type ScheduleDurationProps = {
    currentDate: Date;
    setCalendarEndDate: Dispatch<SetStateAction<Date | undefined>>;
    calendarEndDate: Date | undefined;
    presetEndDate: string;
    setPresetEndDate: Dispatch<SetStateAction<string>>;
    handlePhaseChange: (phase: keyof typeof PHASE) => void;
};

const ScheduleWizardRangeEdit = ({
    currentDate,
    setCalendarEndDate,
    calendarEndDate,
    presetEndDate,
    setPresetEndDate,
    handlePhaseChange,
}: ScheduleDurationProps) => {
    const locale = useLocaleContext();

    const t = ScheduleEditorRangeDict[locale];

    return (
        <div className="m-auto flex w-3/4 max-w-screen-2xl flex-col gap-16">
            <Button
                className="p-0"
                variant="ghost"
                asChild
            >
                <Link href={url.schedules}>
                    <ArrowLeft className="h-4" />
                    Wróć
                </Link>
            </Button>

            <p className="mx-auto mb-4 text-balance text-center text-4xl font-bold">{t.scheduleAvailability}</p>
            <div className="grid grid-cols-1 gap-12 3xl:grid-cols-[auto,1fr,auto]">
                <div className="mx-auto w-fit">
                    <p className="mb-4 text-center font-bold">{t.choosePreset}</p>
                    <RadioGroup
                        onValueChange={(value) => {
                            setPresetEndDate(value);
                            setCalendarEndDate(undefined);
                        }}
                        value={presetEndDate}
                    >
                        <RadioGroupItem
                            value={format(endOfMonth(currentDate), 'yyyy-MM-dd')}
                            label="Bieżący miesiąc"
                        />
                        <RadioGroupItem
                            value={format(endOfMonth(addMonths(currentDate, 1)), 'yyyy-MM-dd')}
                            label="Do końca następnego miesiąca"
                        />
                        <RadioGroupItem
                            value={format(endOfYear(currentDate), 'yyyy-MM-dd')}
                            label="Do końca roku"
                        />
                    </RadioGroup>
                </div>
                <div className="mx-auto grid w-full min-w-32 max-w-lg grid-cols-[1fr,auto,1fr] items-center gap-6">
                    <Separator className="my-4" />
                    <p className="font-medium">lub</p>
                    <Separator className="my-4" />
                </div>
                <div className="mx-auto w-fit">
                    <p className="mb-4 text-center font-bold">{t.chooseOwnRange}</p>
                    <Calendar
                        locale={pl}
                        disabled={{ before: currentDate }}
                        mode="single"
                        onSelect={(date) => {
                            setPresetEndDate('');
                            setCalendarEndDate(date);
                        }}
                        selected={calendarEndDate}
                    />
                </div>
            </div>
            <Button
                className="mx-auto"
                size="lg"
                onClick={() => {
                    handlePhaseChange(PHASE.EDIT_SCHEDULE_DAY);
                }}
            >
                {t.next}
            </Button>
        </div>
    );
};

export default ScheduleWizardRangeEdit;
