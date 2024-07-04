'use client';

import { createContext, useCallback, useContext, useReducer } from 'react';
import { z } from 'zod';
type BaseBlueprint = {
    temporal: boolean;
};

export type InputBlueprint = {
    component: 'Input';
    settings: {
        dataId: string;
        label: string;
        placeholder: string;
    };
} & BaseBlueprint;

export type SelectBlueprint = {
    component: 'Select';
    settings: {
        dataId: string;
        label: string;
        placeholder: string;
        options: { name: string; id: string }[];
    };
} & BaseBlueprint;

export type Blueprints = SelectBlueprint | InputBlueprint;

type FormBuilderStateContext = {
    componentsBlueprints: Blueprints[];
    componentBlueprint: Blueprints | undefined;
    tempComponentBlueprint: { blueprint: Blueprints | undefined; index: number | undefined };
};

type FormBuilderDispatchContext = {
    initInputBlueprint: () => void;
    initSelectBlueprint: () => void;
    appendComponentBlueprint: () => void;
    moveComponentBlueprintToEdit: (index: number) => void;
    deleteFromComponentsBlueprints: (index: number) => void;
    cancelComponentBlueprintEdit: () => void;
    updateComponentBlueprintLabel: (label: string) => void;
    updateComponentBlueprintOption: (option: { name: string; id: string }, optionIndex: number) => void;
    deleteComponentBlueprintOption: (optionIndex: number) => void;
    initComponentBlueprintToDefault: () => void;
    setComponentBlueprint: (blueprint: Blueprints) => void;
    reorderComponentsBlueprints: (formComponentsNewOrder: unknown[]) => void;
};

type InitInputBlueprintAction = { type: 'initInput' };
type InitSelectBlueprintAction = { type: 'initSelect' };
type AppendComponentBlueprintAction = { type: 'appendComponentBlueprint' };
type MoveComponentBlueprintToEdit = {
    type: 'moveComponentBlueprintToEdit';
    payload: { index: number };
};
type CancelComponentBlueprintEdit = {
    type: 'cancelComponentBlueprintEdit';
};
type DeleteFromComponentsBlueprints = { type: 'deleteFromComponentsBlueprints'; payload: { index: number } };
type UpdateComponentBlueprintLabelAction = { type: 'updateComponentBlueprintLabel'; payload: { label: string } };
type UpdateComponentBlueprintOptionsAction = {
    type: 'updateComponentBlueprintOptions';
    payload: { option: { name: string; id: string }; optionIndex: number };
};
type DeleteComponentBlueprintOptionAction = {
    type: 'deleteComponentBlueprintOption';
    payload: { optionIndex: number };
};
type InitComponentBlueprintToDefaultAction = { type: 'initComponentBlueprintToDefault' };
type SetComponentBlueprintAction = {
    type: 'setComponentBlueprint';
    payload: { blueprint: Blueprints };
};
type ReorderComponentsBlueprintsAction = {
    type: 'reorderComponentsBlueprints';
    payload: { formComponentsNewOrder: unknown[] };
};

type FormBuilderActions =
    | InitInputBlueprintAction
    | InitSelectBlueprintAction
    | AppendComponentBlueprintAction
    | MoveComponentBlueprintToEdit
    | CancelComponentBlueprintEdit
    | DeleteFromComponentsBlueprints
    | UpdateComponentBlueprintLabelAction
    | DeleteComponentBlueprintOptionAction
    | UpdateComponentBlueprintOptionsAction
    | InitComponentBlueprintToDefaultAction
    | SetComponentBlueprintAction
    | ReorderComponentsBlueprintsAction;

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
        componentBlueprint: undefined,
        tempComponentBlueprint: { blueprint: undefined, index: undefined },
    } satisfies FormBuilderStateContext;

    const ACTION_KEY = {
        INIT_INPUT_BLUEPRINT: 'initInput',
        INIT_SELECT_BLUEPRINT: 'initSelect',
        APPEND_COMPONENT_BLUEPRINT: 'appendComponentBlueprint',
        MOVE_COMPONENT_BLUEPRINT_TO_EDIT: 'moveComponentBlueprintToEdit',
        CANCEL_COMPONENT_BLUEPRINT_EDIT: 'cancelComponentBlueprintEdit',
        DELETE_FROM_COMPONENTS_BLUEPRINTS: 'deleteFromComponentsBlueprints',
        UPDATE_COMPONENT_BLUEPRINT_LABEL: 'updateComponentBlueprintLabel',
        UPDATE_COMPONENT_BLUEPRINT_OPTION: 'updateComponentBlueprintOptions',
        DELETE_COMPONENT_BLUEPRINT_OPTION: 'deleteComponentBlueprintOption',
        INIT_COMPONENT_BLUEPRINT_TO_DEFAULT: 'initComponentBlueprintToDefault',
        SET_COMPONENT_BLUEPRINT: 'setComponentBlueprint',
        REORDER_COMPONENTS_BLUEPRINTS: 'reorderComponentsBlueprints',
    } as const;

    const reducer = (state: FormBuilderStateContext, action: FormBuilderActions) => {
        switch (action.type) {
            case ACTION_KEY.INIT_INPUT_BLUEPRINT: {
                const newState = structuredClone(state);
                newState.componentBlueprint = {
                    component: 'Input',
                    temporal: true,
                    settings: { label: '', placeholder: '', dataId: crypto.randomUUID() },
                };
                return newState;
            }
            case ACTION_KEY.INIT_SELECT_BLUEPRINT: {
                const newState = structuredClone(state);
                newState.componentBlueprint = {
                    component: 'Select',
                    temporal: true,
                    settings: { label: '', placeholder: '', options: [], dataId: crypto.randomUUID() },
                };
                return newState;
            }
            case ACTION_KEY.APPEND_COMPONENT_BLUEPRINT: {
                const newState = structuredClone(state);
                if (newState.componentBlueprint !== undefined) {
                    newState.componentBlueprint.temporal = false;
                    newState.componentsBlueprints.push(newState.componentBlueprint);
                }

                return newState;
            }
            case ACTION_KEY.CANCEL_COMPONENT_BLUEPRINT_EDIT: {
                const newState = structuredClone(state);

                if (
                    newState.tempComponentBlueprint.blueprint !== undefined &&
                    newState.tempComponentBlueprint.index !== undefined
                ) {
                    newState.componentsBlueprints.splice(
                        newState.tempComponentBlueprint.index,
                        0,
                        newState.tempComponentBlueprint.blueprint
                    );

                    newState.tempComponentBlueprint.index = undefined;
                    newState.tempComponentBlueprint.blueprint = undefined;
                }

                return newState;
            }
            case ACTION_KEY.MOVE_COMPONENT_BLUEPRINT_TO_EDIT: {
                const newState = structuredClone(state);

                const [tempComponentBlueprint] = newState.componentsBlueprints.splice(action.payload.index, 1);
                tempComponentBlueprint.temporal = true;
                newState.tempComponentBlueprint = { blueprint: tempComponentBlueprint, index: action.payload.index };
                newState.componentBlueprint = tempComponentBlueprint;

                return newState;
            }
            case ACTION_KEY.DELETE_FROM_COMPONENTS_BLUEPRINTS: {
                const newState = structuredClone(state);

                newState.componentsBlueprints.splice(action.payload.index, 1);

                return newState;
            }
            case ACTION_KEY.UPDATE_COMPONENT_BLUEPRINT_LABEL: {
                const newState = structuredClone(state);
                if (newState.componentBlueprint !== undefined) {
                    newState.componentBlueprint.settings.label = action.payload.label;
                }
                return newState;
            }
            case ACTION_KEY.UPDATE_COMPONENT_BLUEPRINT_OPTION: {
                const newState = structuredClone(state);
                if (newState.componentBlueprint !== undefined && newState.componentBlueprint.component === 'Select') {
                    newState.componentBlueprint.settings.options[action.payload.optionIndex] = action.payload.option;
                }
                return newState;
            }
            case ACTION_KEY.DELETE_COMPONENT_BLUEPRINT_OPTION: {
                const newState = structuredClone(state);
                if (newState.componentBlueprint !== undefined && newState.componentBlueprint.component === 'Select') {
                    delete newState.componentBlueprint.settings.options[action.payload.optionIndex];
                }
                return newState;
            }
            case ACTION_KEY.INIT_COMPONENT_BLUEPRINT_TO_DEFAULT: {
                const newState = structuredClone(state);
                newState.componentBlueprint = undefined;
                return newState;
            }
            case ACTION_KEY.SET_COMPONENT_BLUEPRINT: {
                const newState = structuredClone(state);
                newState.componentBlueprint = action.payload.blueprint;
                return newState;
            }
            case ACTION_KEY.REORDER_COMPONENTS_BLUEPRINTS: {
                const newState = structuredClone(state);
                const componentsBlueprintsNewOrder: Blueprints[] = [];
                const componentBlueprintAsMap = new Map<string, Blueprints>(
                    newState.componentsBlueprints?.map((componentBlueprint) => {
                        const { dataId } = componentBlueprint.settings;
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
    const appendComponentBlueprint = useCallback(() => {
        dispatch({ type: ACTION_KEY.APPEND_COMPONENT_BLUEPRINT });
    }, []);
    const moveComponentBlueprintToEdit = useCallback((index: number) => {
        dispatch({ type: ACTION_KEY.MOVE_COMPONENT_BLUEPRINT_TO_EDIT, payload: { index } });
    }, []);
    const cancelComponentBlueprintEdit = useCallback(() => {
        dispatch({ type: ACTION_KEY.CANCEL_COMPONENT_BLUEPRINT_EDIT });
    }, []);
    const deleteFromComponentsBlueprints = useCallback((index: number) => {
        dispatch({ type: ACTION_KEY.DELETE_FROM_COMPONENTS_BLUEPRINTS, payload: { index } });
    }, []);
    const updateComponentBlueprintLabel = useCallback((label: string) => {
        dispatch({ type: ACTION_KEY.UPDATE_COMPONENT_BLUEPRINT_LABEL, payload: { label } });
    }, []);
    const updateComponentBlueprintOption = useCallback((option: { name: string; id: string }, optionIndex: number) => {
        dispatch({ type: ACTION_KEY.UPDATE_COMPONENT_BLUEPRINT_OPTION, payload: { option, optionIndex } });
    }, []);
    const deleteComponentBlueprintOption = useCallback((optionIndex: number) => {
        dispatch({ type: ACTION_KEY.DELETE_COMPONENT_BLUEPRINT_OPTION, payload: { optionIndex } });
    }, []);
    const initComponentBlueprintToDefault = useCallback(() => {
        dispatch({ type: ACTION_KEY.INIT_COMPONENT_BLUEPRINT_TO_DEFAULT });
    }, []);
    const setComponentBlueprint = useCallback((blueprint: Blueprints) => {
        dispatch({ type: ACTION_KEY.SET_COMPONENT_BLUEPRINT, payload: { blueprint } });
    }, []);
    const reorderComponentsBlueprints = useCallback((formComponentsNewOrder: unknown[]) => {
        dispatch({ type: ACTION_KEY.REORDER_COMPONENTS_BLUEPRINTS, payload: { formComponentsNewOrder } });
    }, []);

    const functions = {
        initInputBlueprint,
        initSelectBlueprint,
        appendComponentBlueprint,
        deleteFromComponentsBlueprints,
        moveComponentBlueprintToEdit,
        cancelComponentBlueprintEdit,
        updateComponentBlueprintLabel,
        updateComponentBlueprintOption,
        deleteComponentBlueprintOption,
        initComponentBlueprintToDefault,
        setComponentBlueprint,
        reorderComponentsBlueprints,
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
