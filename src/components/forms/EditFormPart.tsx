import EditInput from '@/components/forms/EditInput';
import EditSelect from '@/components/forms/EditSelect';
import { useFormBuilderStateContext } from '@/components/forms/FormBuilderProvider';

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
