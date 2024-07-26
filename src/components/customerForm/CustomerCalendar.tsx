'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { addMinutes, format, formatISO, isSameMinute, set, startOfDay, startOfMinute } from 'date-fns';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { useScheduleAppointmentMutation } from '@/components/customerForm/queries/scheduleAppointment.client';
import { ScheduleDay } from '@/components/schedule/ScheduleWizardDayEdit';
import Button from '@/components/ui/Button';
import { Calendar } from '@/components/ui/Calendar';
import { Input } from '@/components/ui/Input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/RadioGroup';

type CustomerCalendarProps = {
    data: {
        scheduleData: string;
        response: { date: string }[];
        id: number;
    };
    subdomain: string;
};

const customerCalendarFormSchema = z.object({
    email: z.string().email(),
    date: z.date(),
    time: z.string(),
});

const CustomerCalendar = ({ data, subdomain }: CustomerCalendarProps) => {
    const { scheduleData, response: responses, id } = data;
    const parsedData = JSON.parse(scheduleData) as ScheduleDay[];

    const scheduleAppointment = useScheduleAppointmentMutation();

    const { register, handleSubmit, control, formState, getValues } = useForm({
        defaultValues: {
            email: '',
            date: new Date(),
            time: '',
        },
        resolver: zodResolver(customerCalendarFormSchema),
    });

    const scheduleAsMap = parsedData.reduce((result, item) => {
        result.set(format(item.date, 'yyyy-MM-dd'), item);
        return result;
    }, new Map());

    const scheduleForDate = scheduleAsMap.get(format(getValues('date'), 'yyyy-MM-dd'));

    const handleSuccessSubmit = (data: z.infer<typeof customerCalendarFormSchema>) => {
        const email = getValues('email');
        const [hours, minutes] = data.time.split(':').map((part) => Number(part));

        const dateWithTime = set(data.date, { hours, minutes });

        scheduleAppointment.mutate({
            subdomain,
            date: formatISO(startOfMinute(dateWithTime)),
            email,
            customer_form_id: id,
        });
    };

    return (
        <div className="w-[40vw]">
            {formState.isSubmitSuccessful === false && (
                <form onSubmit={handleSubmit(handleSuccessSubmit)}>
                    <Controller
                        control={control}
                        name="date"
                        render={({ field }) => (
                            <Calendar
                                disabled={{ before: new Date() }}
                                mode="single"
                                onSelect={(date) => {
                                    if (date === undefined) return;

                                    field.onChange(startOfDay(date));
                                }}
                                selected={field.value}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="time"
                        render={({ field }) => {
                            return (
                                <RadioGroup
                                    className="grid grid-cols-2"
                                    onValueChange={(time) => field.onChange(time)}
                                    value={field.value}
                                >
                                    {new Array(scheduleForDate?.appointmentsPerDay ?? 0)
                                        .fill(undefined)
                                        .reduce((result, _, index) => {
                                            const startTime = startOfMinute(
                                                addMinutes(
                                                    scheduleForDate!.startTime,
                                                    index * scheduleForDate!.meetingDuration +
                                                        scheduleForDate!.meetingInterval * index
                                                )
                                            );

                                            const isAlreadyTaken = responses.some(({ date }) =>
                                                isSameMinute(startTime, date)
                                            );

                                            if (isAlreadyTaken) return result;

                                            result.push(
                                                <RadioGroupItem
                                                    key={index}
                                                    value={`${format(startTime, 'HH:mm')}`}
                                                    label={`${format(startTime, 'HH:mm')}`}
                                                />
                                            );

                                            return result;
                                        }, [])}
                                </RadioGroup>
                            );
                        }}
                    />

                    <Input
                        label={{ value: 'E-mail' }}
                        {...register('email')}
                    />
                    <Button>Wyślij</Button>
                </form>
            )}
            {formState.isSubmitSuccessful && <p>Udało się!</p>}
        </div>
    );
};

export default CustomerCalendar;
