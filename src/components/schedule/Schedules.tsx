'use client';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';

import { Plus, UnSchedule } from '@/components/icons';
import { useGetAllSchedulesQuery } from '@/components/schedule/queries/getAllSchedules.client';
import SchedulesTable from '@/components/schedule/SchedulesTable';
import Button from '@/components/ui/Button';
import Spinner from '@/components/ui/Loader';
import SchedulesDict from '@/dictionaries/SchedulesDict.json';
import { useLocaleContext } from '@/providers/LocaleProvider';
import { url } from '@/utils/utils';

const Schedules = () => {
    const schedules = useGetAllSchedulesQuery();

    const locale = useLocaleContext();

    const t = SchedulesDict[locale];

    const areNoForms = schedules.data?.length === 0;
    const areForms = areNoForms === false;

    if (schedules.data === undefined) return <Spinner />;

    return (
        <>
            <AnimatePresence>
                {areNoForms && (
                    <motion.div
                        className="z-0 flex min-h-svh w-full flex-col items-center justify-center gap-8"
                        initial={{ opacity: 0.1 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, type: 'spring' }}
                    >
                        <UnSchedule className="h-64" />
                        <div className="flex flex-col gap-2 text-balance text-center">
                            <p className="text-xl font-semibold">{t.noSchedulesTitle}</p>
                            <p className="">{t.noSchedulesBody}</p>
                        </div>
                        <div>
                            <Button asChild>
                                <Link href={url.addSchedule}>{t.addSchedule}</Link>
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            <AnimatePresence>
                {areForms && (
                    <motion.div
                        className="z-0 mt-20 flex w-full flex-col px-4 sm:px-10"
                        initial={{ opacity: 0.1 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, type: 'spring' }}
                    >
                        <div className="mb-6 flex items-center justify-between">
                            <h1 className="text-3xl font-bold">{t.schedules}</h1>
                            <Button asChild>
                                <Link href={url.addSchedule}>
                                    {t.addSchedule} <Plus className="h-5 stroke-white" />
                                </Link>
                            </Button>
                        </div>
                        <SchedulesTable schedulesData={schedules.data} />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Schedules;
