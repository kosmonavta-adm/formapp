import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { INPUT_BLUEPRINT, InputBlueprintForm, inputBlueprintSchema } from '@/components/forms/_formUtils';
import { useFormBuilderDispatchContext } from '@/components/forms/FormBuilderProvider';
import InputSchemaSettings from '@/components/forms/InputSchemaSettings';
import Button from '@/components/ui/Button';

const AddInput = () => {
    const { appendComponentBlueprint, initComponentBlueprintToDefault } = useFormBuilderDispatchContext();

    const form = useForm({
        resolver: zodResolver(inputBlueprintSchema),
        defaultValues: {
            [INPUT_BLUEPRINT.LABEL]: '',
        },
    });

    const handleAddFormsComponent = (_: InputBlueprintForm) => {
        appendComponentBlueprint();
    };

    useEffect(() => {
        if (form.formState.isSubmitSuccessful) {
            initComponentBlueprintToDefault();

            form.reset();
        }
    }, [form.formState.submitCount]);

    return (
        <FormProvider {...form}>
            <InputSchemaSettings handleSuccessSubmit={handleAddFormsComponent}>
                <Button className="mx-auto">Dodaj</Button>
            </InputSchemaSettings>
        </FormProvider>
    );
};

export default AddInput;
