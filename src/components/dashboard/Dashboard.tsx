'use client';

import UpcomingAppointments from '@/components/dashboard/UpcomingAppointments';
import { useGetProfileQuery } from '@/components/profile/getProfile.client';
import Spinner from '@/components/ui/Loader';

const Dashboard = () => {
    const { data: profile } = useGetProfileQuery();

    if (profile.data === undefined) return <Spinner />;

    return <>{profile.data?.subdomain !== undefined && <UpcomingAppointments subdomain={profile.data.subdomain} />}</>;
};

export default Dashboard;
