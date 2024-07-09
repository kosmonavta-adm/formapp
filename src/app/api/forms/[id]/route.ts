import { deleteFormMutation } from '@/components/forms/queries/deleteForm.server';
import { getFormQuery } from '@/components/forms/queries/getForm.server';
import { updateFormMutation } from '@/components/forms/queries/updateForm.server';

export const GET = getFormQuery;
export const PATCH = updateFormMutation;
export const DELETE = deleteFormMutation;
