import { z } from 'zod';

import { Blueprints } from '@/components/formBuilder/FormBuilderProvider';
import { Input } from '@/components/ui/Input';
import { Select, SelectItem } from '@/components/ui/Select';
import { cxTw } from '@/utils/utils';

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
                    data-id={blueprint.settings.dataId}
                    className={cxTw(blueprint.temporal && 'animate-pulse')}
                    label={{
                        value: blueprint.settings.label,
                        className: cxTw(blueprint.temporal && 'animate-pulse', 'select-none'),
                    }}
                />
            );
        }
        case 'Select': {
            return (
                <Select
                    data-id={blueprint.settings.dataId}
                    className={cxTw(blueprint.temporal && 'animate-pulse')}
                    label={{
                        name: blueprint.settings.label,
                        className: cxTw(blueprint.temporal && 'animate-pulse', 'select-none'),
                    }}
                >
                    {blueprint.settings.options.map((option) => (
                        <SelectItem
                            key={option.id}
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
