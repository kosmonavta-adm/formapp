import { z } from 'zod';

import { Blueprints } from '@/components/forms/FormBuilderProvider';
import { Input } from '@/components/ui/Input';
import { Select, SelectItem } from '@/components/ui/Select';

export type FormPhase = keyof typeof FORM_PHASE;

export const FORM_PHASE = {
    VIEW_FORM: 'VIEW_FORM',
    BUILDER: 'BUILDER',
} as const;

export const formKeys = {
    all: ['allForms'],
    single: () => [...formKeys.all, 'singleForm'],
};

export const formSchema = z.object({
    id: z.number(),
    isPublished: z.boolean(),
    name: z.string(),
    schema: z.string(),
    blueprint: z.string(),
});

export type FormSchema = z.infer<typeof formSchema>;

export const INPUT_BLUEPRINT = {
    LABEL: 'label',
} as const;

export const inputBlueprintSchema = z.object({
    [INPUT_BLUEPRINT.LABEL]: z.string().min(1),
});

export type InputBlueprintForm = z.infer<typeof inputBlueprintSchema>;

export const SELECT_BLUEPRINT = {
    LABEL: 'label',
    OPTIONS: 'options',
    OPTION_NAME: 'name',
    OPTION_VALUE: 'value',
} as const;

export const selectBlueprintSchema = z.object({
    [SELECT_BLUEPRINT.LABEL]: z.string().min(1),
    [SELECT_BLUEPRINT.OPTIONS]: z.array(
        z.object({
            name: z.string(),
            value: z.string(),
        })
    ),
});

export type SelectBlueprintForm = z.infer<typeof selectBlueprintSchema>;

export const componentSelectItems = [
    {
        id: 0,
        value: 'Input',
    },

    {
        id: 1,
        value: 'Select',
    },
];

export const buildComponentFromBlueprint = (blueprint: Blueprints | undefined) => {
    switch (blueprint?.component) {
        case 'Input': {
            return (
                <Input
                    data-id={blueprint.dataId}
                    label={{
                        value: blueprint.settings.label,
                        className: 'select-none',
                    }}
                />
            );
        }
        case 'Select': {
            return (
                <Select
                    data-id={blueprint.dataId}
                    label={{
                        name: blueprint.settings.label,
                        className: 'select-none',
                    }}
                    placeholder={blueprint.settings.placeholder}
                >
                    {blueprint.settings.options.map((option) => (
                        <SelectItem
                            key={option.value}
                            value={option.name}
                        >
                            {option.name}
                        </SelectItem>
                    ))}
                </Select>
            );
        }
    }
};
