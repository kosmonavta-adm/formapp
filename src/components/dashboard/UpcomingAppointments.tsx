import { format, isAfter } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';

import { useGetUpcomingAppointmentsQuery } from '@/components/dashboard/queries/getUpcomingAppointments.client';
import Spinner from '@/components/ui/Loader';

type UpcomingAppointmentsProps = {
    subdomain: string;
};

const UpcomingAppointments = ({ subdomain }: UpcomingAppointmentsProps) => {
    const upcomingAppointments = useGetUpcomingAppointmentsQuery(subdomain);
    if (upcomingAppointments.data === undefined) return <Spinner />;
    const areAppointments = upcomingAppointments.data.length > 0;
    const currentDate = new Date();
    return (
        <AnimatePresence>
            {areAppointments && (
                <motion.div
                    className="z-0 mt-20 flex w-full flex-col gap-8 px-20"
                    initial={{ opacity: 0.1 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, type: 'spring' }}
                >
                    <h1 className="text-3xl font-bold">Nadchodzące wizyty</h1>
                    {upcomingAppointments.data
                        .filter((appointment) => isAfter(appointment.date, currentDate))
                        .map((appointment) => {
                            return (
                                <div
                                    className="bg-white p-4"
                                    key={appointment.date}
                                >
                                    <p>Imię i nazwisko: {appointment.fullName}</p>
                                    <p>Email: {appointment.email}</p>
                                    <p>Data: {format(appointment.date, 'dd.MM.yyyy HH:mm')}</p>
                                </div>
                            );
                        })}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default UpcomingAppointments;
