'use client';

import { nanoid } from 'nanoid';
import { createContext, useCallback, useContext, useReducer } from 'react';
import { z } from 'zod';
type BaseBlueprint = {
    dataId: string;
};

export type InputBlueprint = {
    component: 'Input';
    settings: {
        label: string;
        placeholder: string;
    };
} & BaseBlueprint;

export type SelectBlueprint = {
    component: 'Select';
    settings: {
        label: string;
        placeholder: string;
        options: { name: string; value: string }[];
    };
} & BaseBlueprint;

export type Blueprints = SelectBlueprint | InputBlueprint;

type FormBuilderStateContext = {
    componentsBlueprints: Blueprints[];
    selectedBlueprint: Blueprints | undefined;
};

type FormBuilderDispatchContext = {
    initInputBlueprint: () => void;
    initSelectBlueprint: () => void;
    setSelectedBlueprint: (blueprint: Blueprints | undefined) => void;
    deleteBlueprint: (index: number) => void;
    cancelBlueprintEdit: () => void;
    updateBlueprint: (blueprint: Blueprints) => void;
    reorderBlueprints: (formComponentsNewOrder: unknown[]) => void;
};

const ACTION_KEY = {
    INIT_INPUT_BLUEPRINT: 'initInput',
    INIT_SELECT_BLUEPRINT: 'initSelect',
    SET_SELECTED_BLUEPRINT: 'setSelectedBlueprint',
    CANCEL_BLUEPRINT_EDIT: 'cancelBlueprintEdit',
    DELETE_BLUEPRINT: 'deleteBlueprint',
    UPDATE_BLUEPRINT: 'updateBlueprint',
    REORDER_BLUEPRINTS: 'reorderBlueprints',
} as const;

type InitInputBlueprintAction = { type: typeof ACTION_KEY.INIT_INPUT_BLUEPRINT };
type InitSelectBlueprintAction = { type: typeof ACTION_KEY.INIT_SELECT_BLUEPRINT };
type SetSelectedBlueprintAction = {
    type: typeof ACTION_KEY.SET_SELECTED_BLUEPRINT;
    payload: { blueprint: Blueprints | undefined };
};
type CancelBlueprintEdit = {
    type: typeof ACTION_KEY.CANCEL_BLUEPRINT_EDIT;
};
type UpdateBlueprintAction = {
    type: typeof ACTION_KEY.UPDATE_BLUEPRINT;
    payload: { blueprint: Blueprints };
};
type DeleteBlueprintAction = {
    type: typeof ACTION_KEY.DELETE_BLUEPRINT;
    payload: { index: number };
};
type ReorderBlueprintsAction = {
    type: typeof ACTION_KEY.REORDER_BLUEPRINTS;
    payload: { formComponentsNewOrder: unknown[] };
};

type FormBuilderActions =
    | InitInputBlueprintAction
    | InitSelectBlueprintAction
    | SetSelectedBlueprintAction
    | DeleteBlueprintAction
    | CancelBlueprintEdit
    | UpdateBlueprintAction
    | ReorderBlueprintsAction;

export const formBuilderStateContext = createContext<FormBuilderStateContext | undefined>(undefined);
export const formBuilderDispatchContext = createContext<FormBuilderDispatchContext | undefined>(undefined);

export default function FormBuilderProvider({
    componentsBlueprints,
    children,
}: {
    children: React.ReactNode;
    componentsBlueprints?: Blueprints[];
}) {
    const initialState = {
        componentsBlueprints: componentsBlueprints ?? [],
        selectedBlueprint: undefined,
    } satisfies FormBuilderStateContext;

    const reducer = (state: FormBuilderStateContext, action: FormBuilderActions) => {
        switch (action.type) {
            case ACTION_KEY.INIT_INPUT_BLUEPRINT: {
                const newState = structuredClone(state);
                const blueprint = {
                    component: 'Input',
                    dataId: nanoid(),
                    settings: { label: 'Przykładowa etykieta', placeholder: '' },
                } satisfies InputBlueprint;

                newState.componentsBlueprints.push(blueprint);
                newState.selectedBlueprint = blueprint;

                return newState;
            }
            case ACTION_KEY.INIT_SELECT_BLUEPRINT: {
                const newState = structuredClone(state);
                const blueprint = {
                    component: 'Select',
                    dataId: nanoid(),
                    settings: {
                        label: 'Przykładowa etykieta',
                        placeholder: 'Wybierz element z listy',
                        options: [{ name: 'Przykładowy element listy', value: '' }],
                    },
                } satisfies SelectBlueprint;

                newState.componentsBlueprints.push(blueprint);
                newState.selectedBlueprint = blueprint;

                return newState;
            }
            case ACTION_KEY.SET_SELECTED_BLUEPRINT: {
                const newState = structuredClone(state);
                newState.selectedBlueprint = action.payload.blueprint;
                return newState;
            }
            case ACTION_KEY.CANCEL_BLUEPRINT_EDIT: {
                const newState = structuredClone(state);

                newState.selectedBlueprint = undefined;

                return newState;
            }
            case ACTION_KEY.DELETE_BLUEPRINT: {
                const newState = structuredClone(state);

                newState.componentsBlueprints.splice(action.payload.index, 1);
                newState.selectedBlueprint = undefined;

                return newState;
            }
            case ACTION_KEY.UPDATE_BLUEPRINT: {
                const newState = structuredClone(state);
                const blueprintId = action.payload.blueprint.dataId;
                const blueprintToUpdateIndex = newState.componentsBlueprints.findIndex(
                    (componentBlueprint) => componentBlueprint.dataId === blueprintId
                );
                newState.componentsBlueprints[blueprintToUpdateIndex] = action.payload.blueprint;

                return newState;
            }
            case ACTION_KEY.REORDER_BLUEPRINTS: {
                const newState = structuredClone(state);
                const componentsBlueprintsNewOrder: Blueprints[] = [];
                const componentBlueprintAsMap = new Map<string, Blueprints>(
                    newState.componentsBlueprints?.map((componentBlueprint) => {
                        const { dataId } = componentBlueprint;
                        return [dataId, componentBlueprint];
                    })
                );
                const formComponentSchema = z.object({
                    props: z.object({
                        'data-id': z.string(),
                    }),
                });
                action.payload.formComponentsNewOrder.forEach((formComponent) => {
                    const parsedFormComponents = formComponentSchema.safeParse(formComponent);
                    if (parsedFormComponents.success === false) return;

                    const { ['data-id']: dataId } = parsedFormComponents.data.props;
                    const componentBlueprint = componentBlueprintAsMap.get(dataId);
                    if (componentBlueprint === undefined) return;

                    componentsBlueprintsNewOrder.push(componentBlueprint);
                });
                newState.componentsBlueprints = componentsBlueprintsNewOrder;
                return newState;
            }
            default: {
                return state;
            }
        }
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    const initInputBlueprint = useCallback(() => {
        dispatch({ type: ACTION_KEY.INIT_INPUT_BLUEPRINT });
    }, []);
    const initSelectBlueprint = useCallback(() => {
        dispatch({ type: ACTION_KEY.INIT_SELECT_BLUEPRINT });
    }, []);
    const setSelectedBlueprint = useCallback((blueprint: Blueprints | undefined) => {
        dispatch({ type: ACTION_KEY.SET_SELECTED_BLUEPRINT, payload: { blueprint } });
    }, []);
    const cancelBlueprintEdit = useCallback(() => {
        dispatch({ type: ACTION_KEY.CANCEL_BLUEPRINT_EDIT });
    }, []);
    const updateBlueprint = useCallback((blueprint: Blueprints) => {
        dispatch({ type: ACTION_KEY.UPDATE_BLUEPRINT, payload: { blueprint } });
    }, []);
    const reorderBlueprints = useCallback((formComponentsNewOrder: unknown[]) => {
        dispatch({ type: ACTION_KEY.REORDER_BLUEPRINTS, payload: { formComponentsNewOrder } });
    }, []);
    const deleteBlueprint = useCallback((index: number) => {
        dispatch({ type: ACTION_KEY.DELETE_BLUEPRINT, payload: { index } });
    }, []);

    const functions = {
        initInputBlueprint,
        initSelectBlueprint,
        setSelectedBlueprint,
        cancelBlueprintEdit,
        updateBlueprint,
        reorderBlueprints,
        deleteBlueprint,
    };

    return (
        <formBuilderDispatchContext.Provider value={functions}>
            <formBuilderStateContext.Provider value={state}>{children}</formBuilderStateContext.Provider>
        </formBuilderDispatchContext.Provider>
    );
}

export const useFormBuilderDispatchContext = () => {
    const context = useContext(formBuilderDispatchContext);

    if (context === undefined) {
        throw new Error('useFormBuilderDispatchContext must be used inside the FormBuilderProvider');
    }

    return context;
};

export const useFormBuilderStateContext = () => {
    const context = useContext(formBuilderStateContext);
    if (context === undefined) {
        throw new Error('useFormBuilderDispatchContext must be used inside the FormBuilderProvider');
    }
    return context;
};
