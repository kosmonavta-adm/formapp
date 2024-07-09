'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from 'react';

import { createClient } from '@/auth/client';
import { buildComponentFromBlueprint } from '@/components/forms/_formUtils';
import { useFormBuilderDispatchContext, useFormBuilderStateContext } from '@/components/forms/FormBuilderProvider';
import { useCreateFormMutation } from '@/components/forms/queries/createForm.client';
import { UnConcept } from '@/components/icons';
import Button from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ReorderButton, ReorderGroup, ReorderItem } from '@/components/ui/Reorder';
import { cxTw, url } from '@/utils/utils';

const FormVisualizer = () => {
    const router = useRouter();

    const { componentsBlueprints, selectedBlueprint } = useFormBuilderStateContext();
    const { reorderBlueprints, deleteBlueprint, setSelectedBlueprint } = useFormBuilderDispatchContext();

    const [formName, setFormName] = useState('');
    const [formComponents, setFormComponents] = useState(() =>
        componentsBlueprints.map((blueprint) => buildComponentFromBlueprint(blueprint))
    );

    const createForm = useCreateFormMutation();

    const handleFormName = (e: ChangeEvent<HTMLInputElement>) => setFormName(e.currentTarget.value);

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
            const { dataId } = componentBlueprint;
            return [dataId, componentBlueprint];
        })
    );

    const isAtLeastOneBlueprintAdded = componentBlueprintAsMap.size > 0;
    const isFormEmpty = formName.length === 0 || isAtLeastOneBlueprintAdded === false;

    useEffect(() => {
        setFormComponents(() =>
            componentsBlueprints.map((componentBlueprint) => buildComponentFromBlueprint(componentBlueprint))
        );
    }, [componentsBlueprints]);

    return (
        <>
            <AnimatePresence mode="popLayout">
                {isAtLeastOneBlueprintAdded && (
                    <motion.div
                        initial={{ opacity: 0.1 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, type: 'spring' }}
                        className="mx-auto flex w-full max-w-screen-xl flex-col gap-8 p-4"
                    >
                        <Input
                            label={{ value: 'Nazwa formularza' }}
                            value={formName}
                            onChange={handleFormName}
                        />
                        <div className="flex flex-col gap-4">
                            {formComponents !== undefined && (
                                <ReorderGroup
                                    className="flex flex-col gap-8"
                                    axis="y"
                                    onReorder={(newFormComponentsOrder) => {
                                        setFormComponents(newFormComponentsOrder as React.JSX.Element[]);
                                        reorderBlueprints(newFormComponentsOrder);
                                    }}
                                    values={formComponents}
                                >
                                    {formComponents.map((Item, index) => {
                                        const componentId = Item?.props['data-id'];
                                        const currentBlueprint = componentBlueprintAsMap.get(componentId);

                                        if (currentBlueprint === undefined) return;

                                        const isSelectedComponent = selectedBlueprint?.dataId === componentId;

                                        const isSelect = currentBlueprint.component === 'Select';
                                        const isInput = currentBlueprint.component === 'Input';

                                        return (
                                            <ReorderItem
                                                value={Item}
                                                key={componentId}
                                            >
                                                <div
                                                    className={cxTw(
                                                        'flex flex-col rounded border border-neutral-50 bg-white p-4 shadow transition-colors',
                                                        isSelectedComponent && 'outline outline-neutral-500'
                                                    )}
                                                >
                                                    <div className="mb-6 flex justify-between">
                                                        <p className="font-medium">
                                                            {isSelect && 'Lista wyboru'}
                                                            {isInput && 'Krótka odpowiedź'}
                                                        </p>
                                                        <ReorderButton />
                                                    </div>

                                                    {Item}
                                                    <div className="mt-6 flex justify-between gap-4">
                                                        <Button
                                                            onClick={() => deleteBlueprint(index)}
                                                            variant="ghost"
                                                            className="p-0 text-red-500"
                                                        >
                                                            Usuń
                                                        </Button>
                                                        <Button
                                                            onClick={() => {
                                                                if (
                                                                    selectedBlueprint === undefined ||
                                                                    selectedBlueprint !== currentBlueprint
                                                                ) {
                                                                    setSelectedBlueprint(currentBlueprint);
                                                                } else {
                                                                    setSelectedBlueprint(undefined);
                                                                }
                                                            }}
                                                            variant="ghost"
                                                            className="p-0"
                                                        >
                                                            Edytuj
                                                        </Button>
                                                    </div>
                                                </div>
                                            </ReorderItem>
                                        );
                                    })}
                                </ReorderGroup>
                            )}
                        </div>
                        {isAtLeastOneBlueprintAdded && (
                            <Button
                                className="ml-auto"
                                onClick={handleCreateForm}
                                disabled={isFormEmpty}
                            >
                                Dodaj formularz
                            </Button>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence mode="popLayout">
                {isAtLeastOneBlueprintAdded === false && (
                    <motion.div
                        initial={{ opacity: 0.1 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, type: 'spring' }}
                        className="m-auto flex flex-col items-center gap-8"
                    >
                        <UnConcept className="w-full max-w-lg" />
                        <p className="text-xl font-semibold">Twój formularz jest pusty</p>
                        <p>Żeby rozpocząć, wybierz element z menu po prawej</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default FormVisualizer;
