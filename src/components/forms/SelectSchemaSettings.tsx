import { ReactNode } from 'react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';

import { SELECT_BLUEPRINT, SelectBlueprintForm } from '@/components/forms/_formUtils';
import { useFormBuilderDispatchContext } from '@/components/forms/FormBuilderProvider';
import { Trash } from '@/components/icons';
import Button from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

type SelectSchemaSettingsProps = {
    handleSuccessSubmit: (data: SelectBlueprintForm) => void;
    children: ReactNode;
};

const SelectSchemaSettings = ({ handleSuccessSubmit, children }: SelectSchemaSettingsProps) => {
    const { updateComponentBlueprintLabel, updateComponentBlueprintOption, deleteComponentBlueprintOption } =
        useFormBuilderDispatchContext();

    const { handleSubmit, control } = useFormContext<SelectBlueprintForm>();

    const { remove, append, fields } = useFieldArray({
        control: control,
        name: SELECT_BLUEPRINT.OPTIONS,
    });

    return (
        <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit((data) => handleSuccessSubmit(data))}
        >
            <Controller
                control={control}
                name={SELECT_BLUEPRINT.LABEL}
                render={({ field: { onChange, value, ...rest } }) => (
                    <Input
                        onChange={(e) => {
                            onChange(e.target.value);
                            updateComponentBlueprintLabel(e.target.value);
                        }}
                        label={{ value: 'Etykieta listy' }}
                        value={value}
                        {...rest}
                    />
                )}
            />
            {fields.map((field, index) => (
                <div
                    key={field.id}
                    className="flex gap-2"
                >
                    <Controller
                        control={control}
                        name={`${SELECT_BLUEPRINT.OPTIONS}.${index}`}
                        render={({ field: { onChange, value, ...rest } }) => (
                            <Input
                                onChange={(e) => {
                                    const newOption = {
                                        name: e.target.value,
                                        id: field.id,
                                    };
                                    onChange(newOption);
                                    updateComponentBlueprintOption(newOption, index);
                                }}
                                label={{ value: <p>Element listy #{index + 1}</p> }}
                                value={value.name}
                                {...rest}
                            />
                        )}
                    />

                    {index > 0 && (
                        <Button
                            variant="icon"
                            className="self-end"
                            onClick={() => {
                                remove(index);
                                deleteComponentBlueprintOption(index);
                            }}
                        >
                            <Trash />
                        </Button>
                    )}
                </div>
            ))}
            <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={() => append({ name: '' })}
            >
                Dodaj kolejny element listy
            </Button>
            {children}
        </form>
    );
};

export default SelectSchemaSettings;
