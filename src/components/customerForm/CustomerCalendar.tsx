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
        name: string;
        id: number;
    };
    subdomain: string;
};

const customerCalendarFormSchema = z.object({
    email: z.string().email(),
    date: z.date(),
    time: z.string(),
    fullName: z.string(),
});

const CustomerCalendar = ({ data, subdomain }: CustomerCalendarProps) => {
    const { scheduleData, response: responses, id } = data;
    const parsedData = JSON.parse(scheduleData) as ScheduleDay[];

    const scheduleAppointment = useScheduleAppointmentMutation();

    const { register, handleSubmit, control, formState, watch } = useForm({
        defaultValues: {
            email: '',
            fullName: '',
            date: new Date(),
            time: '',
        },
        resolver: zodResolver(customerCalendarFormSchema),
    });

    const scheduleAsMap = parsedData.reduce((result, item) => {
        result.set(format(item.date, 'yyyy-MM-dd'), item);
        return result;
    }, new Map());

    const scheduleForDate = scheduleAsMap.get(format(watch('date'), 'yyyy-MM-dd'));

    const handleSuccessSubmit = (data: z.infer<typeof customerCalendarFormSchema>) => {
        const [hours, minutes] = data.time.split(':').map((part) => Number(part));

        const dateWithTime = set(data.date, { hours, minutes });

        scheduleAppointment.mutate({
            subdomain,
            date: formatISO(startOfMinute(dateWithTime)),
            email: data.email,
            full_name: data.fullName,
            customer_form_id: id,
        });
    };

    return (
        <div className="w-[40vw]">
            {formState.isSubmitSuccessful === false && (
                <div>
                    <h1 className="mb-8 text-4xl font-bold">{data.name}</h1>
                    <form
                        onSubmit={handleSubmit(handleSuccessSubmit)}
                        className="flex flex-col gap-8"
                    >
                        <Input
                            label={{ value: 'E-mail' }}
                            {...register('email')}
                        />
                        <Input
                            label={{ value: 'Imię i nazwisko' }}
                            {...register('fullName')}
                        />
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
                                                // console.log(
                                                //     '🚀 ~ CustomerCalendar ~ scheduleForDate:',
                                                //     scheduleForDate
                                                // );

                                                const startTime = startOfMinute(
                                                    addMinutes(
                                                        scheduleForDate!.startTime,
                                                        index * scheduleForDate!.meetingDuration +
                                                            scheduleForDate!.meetingInterval * index
                                                    )
                                                );

                                                const isAlreadyTaken = responses.some(({ date }) => {
                                                    // console.log('🚀 ~ isAlreadyTaken ~ date:', new Date(date));
                                                    // console.log('🚀 ~ isAlreadyTaken ~ startTime:', startTime);
                                                    // console.log(
                                                    //     '🚀 ~ isAlreadyTaken ~ isSameMinute(startTime, date):',
                                                    //     isSameMinute(startTime, new Date(date))
                                                    // );
                                                    return isSameMinute(startTime, new Date(date));
                                                });

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

                        <Button>Wyślij</Button>
                    </form>
                </div>
            )}
            {formState.isSubmitSuccessful && <p>Udało się!</p>}
        </div>
    );
};

export default CustomerCalendar;
