'use client';

import Link from 'next/link';

import { useUpdateCustomerFormMutation } from '@/components/customerForm/queries/updateCustomerForm.client';
import { FormSchema } from '@/components/forms/_formUtils';
import { useUpdateFormMutation } from '@/components/forms/queries/updateForm.client';
import { useGetProfileQuery } from '@/components/profile/getProfile.client';
import Button from '@/components/ui/Button';
import { url } from '@/utils/utils';

type FormsTableProps = {
    forms: FormSchema[];
};

const FormsTable = ({ forms }: FormsTableProps) => {
    const updateForm = useUpdateFormMutation();
    const updateCustomerForm = useUpdateCustomerFormMutation();
    const profile = useGetProfileQuery();

    const handlePublishForm = ({ id, isPublished }: { id: number; isPublished: boolean }) => {
        updateForm.mutate({ id, is_published: !isPublished });
        if (isPublished) {
            updateCustomerForm.mutate({ customerFormData: { form_id: id }, subdomain: null });
        } else {
            updateCustomerForm.mutate({ customerFormData: { form_id: id }, subdomain: profile.data?.subdomain });
        }
    };

    return (
        <div className="border border-neutral-100">
            <div className="grid grid-cols-[1fr,1fr,300px] bg-neutral-50 p-4">
                <p className="font-medium">Nazwa formularza</p>
                <p className="font-medium">Status</p>
            </div>
            {forms.map((form) => {
                const editUrl = `${url.schedules}/edit/${form.id}`;

                return (
                    <div
                        className="grid grid-cols-[1fr,1fr,300px] items-center bg-white p-4"
                        key={form.id}
                    >
                        <p>{form.name}</p>
                        <p>{form.isPublished ? 'Opublikowany' : 'Nieopublikowany'}</p>
                        <div className="flex gap-4">
                            <Button
                                variant="ghost"
                                onClick={() => handlePublishForm({ id: form.id, isPublished: form.isPublished })}
                            >
                                {form.isPublished ? 'Cofnij publikację' : 'Opublikuj'}
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
