'use client';

import FormBuilder from '@/components/forms/FormBuilder';
import { useGetFormQuery } from '@/components/forms/queries/getForm.client';
import Spinner from '@/components/ui/Loader';

export default function FormPage({ params }: { params: { id: string } }) {
    const form = useGetFormQuery(params.id);

    if (form.data === undefined) return <Spinner />;

    const parsedBlueprint = JSON.parse(form.data?.blueprint);

    return <FormBuilder blueprint={parsedBlueprint} />;
}
