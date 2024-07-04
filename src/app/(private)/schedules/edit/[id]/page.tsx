'use client';

import { useRouter } from 'next/navigation';

import { useGetScheduleQuery } from '@/components/schedule/queries/getSchedule.query.client';
import ScheduleWizard from '@/components/schedule/ScheduleWizard';
import Spinner from '@/components/ui/Loader';

export default function FormPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const schedule = useGetScheduleQuery(params.id);

    if (schedule.isError) router.push('/404');
    if (schedule.data === undefined) return <Spinner />;

    return (
        <ScheduleWizard
            scheduleData={schedule.data}
            inEditMode={true}
        />
    );
}
