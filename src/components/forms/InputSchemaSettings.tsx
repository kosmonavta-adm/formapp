import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { InputBlueprintForm, inputBlueprintSchema, SELECT_BLUEPRINT } from '@/components/forms/_formUtils';
import { InputBlueprint } from '@/components/forms/FormBuilderProvider';
import Button from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

type InputSchemaSettingsProps = {
    handleSuccessSubmit: (data: InputBlueprintForm) => void;
    defaultValues: InputBlueprint;
};

const InputSchemaSettings = ({ handleSuccessSubmit, defaultValues }: InputSchemaSettingsProps) => {
    const { register, handleSubmit, formState, reset } = useForm({
        resolver: zodResolver(inputBlueprintSchema),
        defaultValues: {
            [SELECT_BLUEPRINT.LABEL]: defaultValues.settings.label,
        },
    });

    useEffect(() => {
        reset(undefined, { keepDirtyValues: true });
    }, [formState.submitCount]);

    return (
        <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit((data) => handleSuccessSubmit(data))}
        >
            <Input
                label={{ value: 'Etykieta pola tekstowego' }}
                {...register(SELECT_BLUEPRINT.LABEL)}
            />
            <Button
                className="ml-auto"
                type="submit"
                disabled={formState.isDirty === false}
            >
                Zapisz zmiany
            </Button>
        </form>
    );
};

export default InputSchemaSettings;
