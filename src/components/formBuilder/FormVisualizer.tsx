'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { createClient } from '@/auth/client';
import { buildComponentFromBlueprint } from '@/components/formBuilder/_formBuilderUtils';
import { useCreateFormMutation } from '@/components/formBuilder/formBuilder.mutations';
import {
    useFormBuilderDispatchContext,
    useFormBuilderStateContext,
} from '@/components/formBuilder/FormBuilderProvider';
import { useFormNameContext } from '@/components/formBuilder/FormNameProvider';
import { useIsEditModeOnContext } from '@/components/formBuilder/IsEditModeOnProvider';
import { Edit, Trash } from '@/components/icons';
import Button from '@/components/ui/Button';
import { Dialog, DialogContent } from '@/components/ui/Dialog';
import { ReorderGroup, ReorderItem } from '@/components/ui/Reorder';
import { useToggle } from '@/utils/hooks/useToggle';
import { url } from '@/utils/utils';

const FormVisualizer = () => {
    const { formName } = useFormNameContext();
    const { componentBlueprint, componentsBlueprints } = useFormBuilderStateContext();
    const { setIsEditModeOn } = useIsEditModeOnContext();
    const [isNoSchedulesDialogOpen, toggleIsNoSchedulesDialogOpen] = useToggle(false);

    const { reorderComponentsBlueprints, moveComponentBlueprintToEdit, deleteFromComponentsBlueprints } =
        useFormBuilderDispatchContext();

    const [formComponents, setFormComponents] = useState(() =>
        componentsBlueprints.map((blueprint) => buildComponentFromBlueprint(blueprint))
    );

    const TemporaryComponent = buildComponentFromBlueprint(componentBlueprint);

    const createForm = useCreateFormMutation();

    const handleCreateForm = async () => {
        const supabase = createClient();
        const user = await supabase.auth.getSession();
        const userId = user.data.session?.user.id;
        const formBlueprintJson = JSON.stringify(componentsBlueprints);
        const formSchema = JSON.stringify({});

        createForm.mutate({
            user_id: userId,
            blueprint: formBlueprintJson,
            name: formName,
            schema: formSchema,
            is_active: false,
        });
    };

    const componentBlueprintAsMap = new Map(
        componentsBlueprints?.map((componentBlueprint) => {
            const { dataId } = componentBlueprint.settings;
            return [dataId, componentBlueprint];
        })
    );

    const isAtLeastOneBlueprintAdded = componentBlueprintAsMap.size > 0;

    useEffect(() => {
        setFormComponents(() => componentsBlueprints.map((blueprint) => buildComponentFromBlueprint(blueprint)));
    }, [componentsBlueprints.length]);

    return (
        <>
            <div className="flex flex-col">
                <div className="flex flex-col gap-4">
                    <p className="text-center text-xl font-semibold">Podgląd formularza</p>
                    {formComponents !== undefined && (
                        <ReorderGroup
                            className="flex flex-col gap-4"
                            axis="y"
                            onReorder={(newFormComponentsOrder) => {
                                setFormComponents(newFormComponentsOrder as React.JSX.Element[]);
                                reorderComponentsBlueprints(newFormComponentsOrder);
                            }}
                            values={formComponents}
                        >
                            {formComponents.map((Item, index) => {
                                const componentId = Item?.props['data-id'];
                                const currentBlueprint = componentBlueprintAsMap.get(componentId);

                                if (currentBlueprint === undefined) return;

                                return (
                                    <ReorderItem
                                        value={Item}
                                        key={componentId}
                                    >
                                        <div className="flex gap-2">
                                            <Button
                                                onClick={() => deleteFromComponentsBlueprints(index)}
                                                variant="icon"
                                                className="self-end"
                                            >
                                                <Trash className="h-5 stroke-neutral-600 group-hover:stroke-neutral-950" />
                                            </Button>
                                            <Button
                                                variant="icon"
                                                className="self-end"
                                                onClick={() => {
                                                    moveComponentBlueprintToEdit(index);
                                                    setIsEditModeOn(true);
                                                }}
                                            >
                                                <Edit className="h-5 stroke-neutral-600 group-hover:stroke-neutral-950" />
                                            </Button>
                                            {Item}
                                        </div>
                                    </ReorderItem>
                                );
                            })}
                        </ReorderGroup>
                    )}

                    {TemporaryComponent !== undefined && TemporaryComponent}
                </div>
                {isAtLeastOneBlueprintAdded && (
                    <Button
                        className="ml-auto"
                        onClick={handleCreateForm}
                        disabled={formName.length === 0}
                    >
                        Zapisz
                    </Button>
                )}
            </div>

            <Dialog onOpenChange={toggleIsNoSchedulesDialogOpen}>
                <DialogContent
                    className="flex w-full max-w-xl flex-col gap-4"
                    open={isNoSchedulesDialogOpen}
                    onInteractOutside={(e) => e.preventDefault()}
                >
                    <p>
                        Formularz został dodany, ale będzie widoczny na stronie dopiero kiedy dodasz harmonogram
                        spotkań.
                    </p>
                    <p>Czy chcesz teraz stworzyć harmonogram?</p>
                    <div className="flex justify-between">
                        <Button
                            asChild
                            variant="ghost"
                        >
                            <Link href={url.forms}>Nie, zrobię to później</Link>
                        </Button>
                        <Button asChild>
                            <Link href={url.formBuilder}>Tak, stwórz harmonogram</Link>
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default FormVisualizer;
