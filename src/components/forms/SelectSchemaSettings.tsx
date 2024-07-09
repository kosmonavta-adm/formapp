import { zodResolver } from '@hookform/resolvers/zod';
import { nanoid } from 'nanoid';
import { useEffect } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';

import { SELECT_BLUEPRINT, SelectBlueprintForm, selectBlueprintSchema } from '@/components/forms/_formUtils';
import { SelectBlueprint } from '@/components/forms/FormBuilderProvider';
import { Trash } from '@/components/icons';
import Button from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

type SelectSchemaSettingsProps = {
    handleSuccessSubmit: (data: SelectBlueprintForm) => void;
    defaultValues: SelectBlueprint;
};

const SelectSchemaSettings = ({ handleSuccessSubmit, defaultValues }: SelectSchemaSettingsProps) => {
    const { handleSubmit, register, control, formState, reset } = useForm({
        resolver: zodResolver(selectBlueprintSchema),
        defaultValues: {
            [SELECT_BLUEPRINT.LABEL]: defaultValues.settings.label,
            [SELECT_BLUEPRINT.OPTIONS]: defaultValues.settings.options,
        },
    });

    const { remove, append, fields } = useFieldArray({
        control: control,
        name: SELECT_BLUEPRINT.OPTIONS,
    });

    useEffect(() => {
        reset(undefined, { keepDirtyValues: true });
    }, [formState.submitCount]);

    return (
        <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit((data) => {
                const newOptions = data.options.map((item) => ({ ...item, value: nanoid() }));
                const newData = { ...data, options: newOptions };
                handleSuccessSubmit(newData);
            })}
        >
            <Input
                label={{ value: 'Etykieta listy' }}
                {...register(SELECT_BLUEPRINT.LABEL)}
            />

            {fields.map((field, index) => {
                return (
                    <div key={field.id}>
                        <div className="flex w-full gap-3">
                            <div className="w-full">
                                <Controller
                                    control={control}
                                    name={`${SELECT_BLUEPRINT.OPTIONS}.${index}`}
                                    render={({ field: { onChange, value, ...rest } }) => (
                                        <Input
                                            onChange={(e) => {
                                                const newOption = {
                                                    name: e.target.value,
                                                    value: '',
                                                };
                                                onChange(newOption);
                                            }}
                                            label={{ value: <p>Element listy #{index + 1}</p> }}
                                            value={value.name}
                                            {...rest}
                                        />
                                    )}
                                />
                            </div>

                            {index > 0 && (
                                <Button
                                    variant="icon"
                                    className="self-end"
                                    onClick={() => {
                                        remove(index);
                                    }}
                                >
                                    <Trash />
                                </Button>
                            )}
                        </div>
                        {index === fields.length - 1 && (
                            <Button
                                type="button"
                                size="sm"
                                variant="ghost"
                                className="p-0"
                                onClick={() => append({ name: '', value: '' })}
                            >
                                Dodaj kolejny element listy
                            </Button>
                        )}
                    </div>
                );
            })}

            <Button
                className="ml-auto"
                type="submit"
                disabled={formState.isDirty === false}
            >
                Zapisz zmiany
            </Button>
        </form>
    );
};

export default SelectSchemaSettings;
