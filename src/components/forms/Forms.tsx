'use client';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';

import FormsTable from '@/components/forms/FormsTable';
import { useGetAllForms } from '@/components/forms/queries/getAllForms.client';
import { Plus, UnForm } from '@/components/icons';
import Button from '@/components/ui/Button';
import Spinner from '@/components/ui/Loader';
import { url } from '@/utils/utils';

const Forms = () => {
    const forms = useGetAllForms();

    const areNoForms = forms.data?.length === 0;
    const areForms = areNoForms === false;

    if (forms.data === undefined) return <Spinner />;

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
                        <UnForm className="h-64" />
                        <div className="flex flex-col gap-2 text-balance text-center">
                            <p className="text-xl font-semibold">Nie stworzyłeś jeszcze formularza...</p>
                            <p className="">
                                Dodaj formularz i pozyskuj informacje na których Ci zależy od swoich klientów!
                            </p>
                        </div>
                        <div>
                            <Button asChild>
                                <Link href={url.addForm}>Dodaj formularz</Link>
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            <AnimatePresence>
                {areForms && (
                    <motion.div
                        className="z-0 mt-20 flex w-full flex-col px-20"
                        initial={{ opacity: 0.1 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, type: 'spring' }}
                    >
                        <div className="mb-6 flex items-center justify-between">
                            <h1 className="text-3xl font-bold">Formularze</h1>
                            <Button asChild>
                                <Link href={url.addForm}>
                                    Dodaj formularz <Plus className="h-5 stroke-white" />
                                </Link>
                            </Button>
                        </div>
                        <FormsTable forms={forms.data} />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Forms;
