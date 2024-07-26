'use client';

import { format } from 'date-fns/format';
import { pl } from 'date-fns/locale/pl';
import Link from 'next/link';

import { useUpdateCustomerFormMutation } from '@/components/customerForm/queries/updateCustomerForm.client';
import { useGetProfileQuery } from '@/components/profile/getProfile.client';
import { ScheduleSchemaRevived } from '@/components/schedule/queries/_scheduleQueriesUtils';
import { useDeleteScheduleMutation } from '@/components/schedule/queries/deleteSchedule.client';
import { useUpdateScheduleMutation } from '@/components/schedule/queries/updateSchedule.client';
import Button from '@/components/ui/Button';
import Spinner from '@/components/ui/Loader';
import { url } from '@/utils/utils';

type SchedulesTableProps = {
    schedulesData: ScheduleSchemaRevived[];
};

const SchedulesTable = ({ schedulesData }: SchedulesTableProps) => {
    const updateSchedule = useUpdateScheduleMutation();
    const updateCustomerForm = useUpdateCustomerFormMutation();
    const profile = useGetProfileQuery();
    const deleteSchedule = useDeleteScheduleMutation();
    const handlePublishSchedule = (
        schedule: ScheduleSchemaRevived,
        previousPublishedSchedule: ScheduleSchemaRevived[]
    ) => {
        updateSchedule.mutate({ id: schedule.id, data: { is_published: true } });
        if (previousPublishedSchedule.length === 1) {
            updateSchedule.mutate({ id: previousPublishedSchedule[0].id, data: { is_published: false } });
        }
        if (schedule.isPublished) {
            updateCustomerForm.mutate({
                customerFormData: { schedule_data: null },
                subdomain: profile.data?.subdomain,
            });
        } else {
            updateCustomerForm.mutate({
                customerFormData: { schedule_data: JSON.stringify(schedule.data) },
                subdomain: profile.data?.subdomain,
            });
        }
    };

    const previousPublishedSchedule = schedulesData.filter((schedule) => schedule.isPublished);

    const handleDeleteSchedule = (id: number) => {
        deleteSchedule.mutate({ id });
    };

    return (
        <div className="border border-neutral-100">
            <div className="grid grid-cols-4 bg-neutral-50 p-4">
                <p className="font-medium">Ważny od</p>
                <p className="font-medium">Ważny do</p>
                <p className="font-medium">Status</p>
            </div>
            {schedulesData.map((schedule) => {
                const editUrl = `${url.schedules}/edit/${schedule.id}`;

                return (
                    <div
                        className="grid grid-cols-4 items-center bg-white p-4 transition-colors hover:bg-neutral-50"
                        key={schedule.id}
                    >
                        <p>{format(schedule.startDate, "d MMMM yyyy 'r.'", { locale: pl })}</p>
                        <p>{format(schedule.endDate, "d MMMM yyyy 'r.'", { locale: pl })}</p>
                        <p>{schedule.isPublished ? 'Opublikowany' : 'Nieopublikowany'}</p>
                        <div className="flex gap-4">
                            <Button
                                variant="ghost"
                                onClick={() => handlePublishSchedule(schedule, previousPublishedSchedule)}
                                disabled={updateSchedule.isPending}
                                className="relative w-48"
                            >
                                {schedule.isPublished ? 'Cofnij publikację' : 'Opublikuj'}
                                {updateSchedule.isPending && updateSchedule.variables.id === schedule.id && (
                                    <Spinner className="absolute left-0 h-6 w-6" />
                                )}
                            </Button>
                            <Button
                                asChild
                                variant="ghost"
                            >
                                <Link href={editUrl}>Edytuj</Link>
                            </Button>
                            <Button
                                variant="ghost"
                                onClick={() => handleDeleteSchedule(schedule.id)}
                            >
                                Usuń
                            </Button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default SchedulesTable;
