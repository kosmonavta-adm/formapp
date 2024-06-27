'use client';

import { useGetAllForms } from '@/components/forms/forms.queries';

const FormsTable = () => {
    const forms = useGetAllForms();

    return (
        <div>
            <div className="grid grid-cols-2">
                <p>Nazwa formularza</p>
                <p>Status</p>
            </div>
            {forms.data?.map((form) => (
                <div
                    className="grid grid-cols-2"
                    key={form.id}
                >
                    <p>{form.name}</p>
                    <p>{form.isActive}</p>
                </div>
            ))}
        </div>
    );
};

export default FormsTable;
