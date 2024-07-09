import { ComponentPropsWithRef } from 'react';

type FormComponentButtonProps = ComponentPropsWithRef<'button'>;

const FormComponentButton = (props: FormComponentButtonProps) => {
    return (
        <button
            className="aspect-square border border-neutral-100 bg-neutral-50 p-4 transition-colors hover:bg-neutral-100"
            {...props}
        />
    );
};

export default FormComponentButton;
