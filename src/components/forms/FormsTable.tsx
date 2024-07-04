'use client';

import Link from 'next/link';

import { FormSchema } from '@/components/forms/_formUtils';
import Button from '@/components/ui/Button';
import { url } from '@/utils/utils';

type FormsTableProps = {
    forms: FormSchema[];
};

const FormsTable = ({ forms }: FormsTableProps) => {
    return (
        <div className="border border-neutral-100">
            <div className="grid grid-cols-[1fr,1fr,300px] bg-neutral-50 p-4">
                <p className="font-medium">Nazwa formularza</p>
                <p className="font-medium">Status</p>
            </div>
            {forms.map((form) => {
                const editUrl = new URL(`${url.editForm}/${form.id}`, process.env.NEXT_PUBLIC_ROOT_DOMAIN);

                return (
                    <div
                        className="grid grid-cols-[1fr,1fr,300px] items-center bg-white p-4"
                        key={form.id}
                    >
                        <p>{form.name}</p>
                        <p>{form.isPublished ? 'Opublikowany' : 'Nieopublikowany'}</p>
                        <div className="flex gap-4">
                            <Button
                                asChild
                                variant="ghost"
                            >
                                <Link href={editUrl}>Opublikuj</Link>
                            </Button>
                            <Button
                                asChild
                                variant="ghost"
                            >
                                <Link href={editUrl}>Edytuj</Link>
                            </Button>
                            <Button
                                asChild
                                variant="ghost"
                            >
                                <Link href={editUrl}>Usuń</Link>
                            </Button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default FormsTable;
