import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { SELECT_BLUEPRINT, SelectBlueprintForm, selectBlueprintSchema } from '@/components/forms/_formUtils';
import { useFormBuilderDispatchContext } from '@/components/forms/FormBuilderProvider';
import SelectSchemaSettings from '@/components/forms/SelectSchemaSettings';
import Button from '@/components/ui/Button';

const CreateSelect = () => {
    const { appendComponentBlueprint, initComponentBlueprintToDefault } = useFormBuilderDispatchContext();

    const form = useForm({
        resolver: zodResolver(selectBlueprintSchema),
        defaultValues: {
            [SELECT_BLUEPRINT.LABEL]: '',
            [SELECT_BLUEPRINT.OPTIONS]: [{ name: '' }],
        },
    });

    const handleAddFormsComponent = (_: SelectBlueprintForm) => {
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
            <SelectSchemaSettings handleSuccessSubmit={handleAddFormsComponent}>
                <Button>Dodaj</Button>
            </SelectSchemaSettings>
        </FormProvider>
    );
};

export default CreateSelect;
