import { ReactNode } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { INPUT_BLUEPRINT, InputBlueprintForm } from '@/components/forms/_formUtils';
import { useFormBuilderDispatchContext } from '@/components/forms/FormBuilderProvider';
import { Input } from '@/components/ui/Input';

type InputSchemaSettingsProps = {
    handleSuccessSubmit: (data: InputBlueprintForm) => void;
    children: ReactNode;
};

const InputSchemaSettings = ({ handleSuccessSubmit, children }: InputSchemaSettingsProps) => {
    const { control, handleSubmit } = useFormContext<InputBlueprintForm>();

    const { updateComponentBlueprintLabel } = useFormBuilderDispatchContext();

    return (
        <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit((data) => handleSuccessSubmit(data))}
        >
            <Controller
                control={control}
                name={INPUT_BLUEPRINT.LABEL}
                render={({ field: { onChange, value, ...rest } }) => (
                    <Input
                        onChange={(e) => {
                            onChange(e.target.value);
                            updateComponentBlueprintLabel(e.target.value);
                        }}
                        label={{ value: 'Etykieta pola tekstowego' }}
                        value={value}
                        {...rest}
                    />
                )}
            />
            {children}
        </form>
    );
};

export default InputSchemaSettings;
