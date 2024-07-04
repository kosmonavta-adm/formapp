import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';

import { SELECT_BLUEPRINT, selectBlueprintSchema } from '@/components/forms/_formUtils';
import { SelectBlueprint, useFormBuilderDispatchContext } from '@/components/forms/FormBuilderProvider';
import { useIsEditModeOnContext } from '@/components/forms/IsEditModeOnProvider';
import SelectSchemaSettings from '@/components/forms/SelectSchemaSettings';
import Button from '@/components/ui/Button';

type EditSelectProps = {
    componentBlueprint: SelectBlueprint;
};

const EditSelect = ({ componentBlueprint }: EditSelectProps) => {
    const { appendComponentBlueprint } = useFormBuilderDispatchContext();
    const { setIsEditModeOn } = useIsEditModeOnContext();

    const form = useForm({
        resolver: zodResolver(selectBlueprintSchema),
        defaultValues: {
            [SELECT_BLUEPRINT.LABEL]: componentBlueprint.settings.label,
            [SELECT_BLUEPRINT.OPTIONS]: componentBlueprint.settings.options,
        },
    });

    const handleUpdateFormsComponent = () => {
        appendComponentBlueprint();
    };

    return (
        <FormProvider {...form}>
            <SelectSchemaSettings handleSuccessSubmit={handleUpdateFormsComponent}>
                <div className="flex justify-between">
                    <Button onClick={() => setIsEditModeOn(false)}>Anuluj</Button>
                    <Button>Aktualizuj</Button>
                </div>
            </SelectSchemaSettings>
        </FormProvider>
    );
};

export default EditSelect;
