import { formDataSchema } from '@/components/customerForm/_customerFormUtils';
import { buildComponentFromBlueprint } from '@/components/forms/_formUtils';

type CustomerFormProps = {
    data: string | null;
};

const CustomerForm = ({ data }: CustomerFormProps) => {
    if (data === null) return null;
    const formBlueprint = JSON.parse(data);
    const parsedFormBlueprint = formDataSchema.parse(formBlueprint);
    const Form = parsedFormBlueprint.map((component) => buildComponentFromBlueprint(component));
    return Form;
};

export default CustomerForm;
