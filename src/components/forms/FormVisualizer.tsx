'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { createClient } from '@/auth/client';
import { buildComponentFromBlueprint } from '@/components/forms/_formUtils';
import { useFormBuilderDispatchContext, useFormBuilderStateContext } from '@/components/forms/FormBuilderProvider';
import { useFormNameContext } from '@/components/forms/FormNameProvider';
import { useIsEditModeOnContext } from '@/components/forms/IsEditModeOnProvider';
import { useCreateFormMutation } from '@/components/forms/queries/createForm.client';
import { Edit, Trash } from '@/components/icons';
import Button from '@/components/ui/Button';
import { ReorderGroup, ReorderItem } from '@/components/ui/Reorder';
import { url } from '@/utils/utils';

const FormVisualizer = () => {
    const router = useRouter();
    const { formName } = useFormNameContext();
    const { componentBlueprint, componentsBlueprints } = useFormBuilderStateContext();
    const { setIsEditModeOn } = useIsEditModeOnContext();

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
            is_published: false,
        });

        router.replace(url.forms);
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
        </>
    );
};

export default FormVisualizer;
