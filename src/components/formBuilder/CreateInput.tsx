import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { INPUT_BLUEPRINT, InputBlueprintForm, inputBlueprintSchema } from '@/components/formBuilder/_formBuilderUtils';
import { useFormBuilderDispatchContext } from '@/components/formBuilder/FormBuilderProvider';
import InputSchemaSettings from '@/components/formBuilder/InputSchemaSettings';
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
