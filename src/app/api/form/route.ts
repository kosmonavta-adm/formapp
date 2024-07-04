import { createFormMutation } from '@/components/forms/queries/createForm.server';
import { getFormQuery } from '@/components/forms/queries/getForm.server';

export const POST = createFormMutation;
export const GET = getFormQuery;
