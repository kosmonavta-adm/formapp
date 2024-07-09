import { useFormBuilderDispatchContext } from '@/components/forms/FormBuilderProvider';
import FormComponentButton from '@/components/forms/FormComponentButton';

const FormComponents = () => {
    const { initInputBlueprint, initSelectBlueprint } = useFormBuilderDispatchContext();

    return (
        <div className="min-h-svh border-l border-l-neutral-100 bg-white">
            <p className="mx-auto my-4 w-full max-w-[30ch] text-balance text-center text-lg font-semibold">
                Wybierz element który chcesz dodać do formularza
            </p>
            <div className="grid grid-cols-2 gap-2 px-2">
                <FormComponentButton onClick={initSelectBlueprint}>Lista wyboru</FormComponentButton>
                <FormComponentButton onClick={initInputBlueprint}>Krótka odpowiedź</FormComponentButton>
            </div>
        </div>
    );
};

export default FormComponents;
