import EditInput from '@/components/formBuilder/EditInput';
import EditSelect from '@/components/formBuilder/EditSelect';
import { useFormBuilderStateContext } from '@/components/formBuilder/FormBuilderProvider';

const EditFormPart = () => {
    const { componentBlueprint } = useFormBuilderStateContext();
    return (
        <div className="flex flex-col gap-4">
            <p className="text-xl font-semibold">Edytuj pole</p>
            {componentBlueprint?.component === 'Input' && <EditInput componentBlueprint={componentBlueprint} />}
            {componentBlueprint?.component === 'Select' && <EditSelect componentBlueprint={componentBlueprint} />}
        </div>
    );
};

export default EditFormPart;
