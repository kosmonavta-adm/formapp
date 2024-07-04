import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';

import { inputBlueprintSchema, SELECT_BLUEPRINT } from '@/components/forms/_formUtils';
import { InputBlueprint, useFormBuilderDispatchContext } from '@/components/forms/FormBuilderProvider';
import InputSchemaSettings from '@/components/forms/InputSchemaSettings';
import { useIsEditModeOnContext } from '@/components/forms/IsEditModeOnProvider';
import Button from '@/components/ui/Button';

type EditInputProps = {
    componentBlueprint: InputBlueprint;
};

const EditInput = ({ componentBlueprint }: EditInputProps) => {
    const { appendComponentBlueprint, initComponentBlueprintToDefault, cancelComponentBlueprintEdit } =
        useFormBuilderDispatchContext();
    const { setIsEditModeOn } = useIsEditModeOnContext();

    const form = useForm({
        resolver: zodResolver(inputBlueprintSchema),
        defaultValues: {
            [SELECT_BLUEPRINT.LABEL]: componentBlueprint.settings.label,
        },
    });

    const handleUpdateFormsComponent = () => {
        appendComponentBlueprint();
        initComponentBlueprintToDefault();
        setIsEditModeOn(false);
    };

    return (
        <FormProvider {...form}>
            <InputSchemaSettings handleSuccessSubmit={handleUpdateFormsComponent}>
                <div className="flex justify-between">
                    <Button
                        onClick={() => {
                            cancelComponentBlueprintEdit();
                            setIsEditModeOn(false);
                        }}
                    >
                        Anuluj
                    </Button>
                    <Button type="submit">Aktualizuj</Button>
                </div>
            </InputSchemaSettings>
        </FormProvider>
    );
};

export default EditInput;
