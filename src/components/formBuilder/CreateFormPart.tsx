import { componentSelectItems } from '@/components/formBuilder/_formBuilderUtils';
import CreateInput from '@/components/formBuilder/CreateInput';
import CreateSelect from '@/components/formBuilder/CreateSelect';
import {
    useFormBuilderDispatchContext,
    useFormBuilderStateContext,
} from '@/components/formBuilder/FormBuilderProvider';
import { Select, SelectItem } from '@/components/ui/Select';

const CreateFormPart = () => {
    const { initInputBlueprint, initSelectBlueprint } = useFormBuilderDispatchContext();
    const { componentBlueprint } = useFormBuilderStateContext();

    return (
        <div className="flex flex-col gap-4">
            <p className="text-xl font-semibold">Dodaj pole do formularza</p>
            <Select
                label={{ name: 'Lista komponentów' }}
                placeholder="Wybierz komponent"
                onValueChange={(value) => {
                    if (value === 'Input') initInputBlueprint();
                    if (value === 'Select') initSelectBlueprint();
                }}
                value={componentBlueprint?.component ?? ''}
            >
                {componentSelectItems.map((component) => (
                    <SelectItem
                        value={component.value}
                        key={component.id}
                    >
                        {component.value}
                    </SelectItem>
                ))}
            </Select>
            {componentBlueprint?.component === 'Input' && <CreateInput />}
            {componentBlueprint?.component === 'Select' && <CreateSelect />}
        </div>
    );
};

export default CreateFormPart;
