import { clsx } from 'clsx';
import { ChangeEvent, ComponentPropsWithoutRef, ElementRef, KeyboardEvent, useId, useRef, useState } from 'react';

import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { ScrollArea, ScrollBar } from '@/components/ui/ScrollArea';
import { useClickOutside } from '@/utils/hooks/useClickOutside';
import { cxTw } from '@/utils/utils';

type Item = {
    name: string;
    value: string;
};

interface InputProps extends ComponentPropsWithoutRef<'input'> {
    label?: {
        name: string;
        className?: string;
    };
    error?: string;
    items: Item[];
    onAcceptItem: (item: Item) => void;
}

const Autocomplete = ({ className, error, items, onAcceptItem, label, ...props }: InputProps) => {
    const menuRef = useRef<ElementRef<'div'>>(null);

    const [isSugesstionsListOpen, setIsSugesstionsListOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;

        setInputValue(value);
    };

    const handleSubmit = (e: KeyboardEvent<HTMLInputElement>) => {
        const { key } = e;
        const trimmedInputValue = inputValue.trim();

        if (trimmedInputValue.length === 0 && key === ' ') {
            e.preventDefault();
            return;
        }

        if (key === 'Enter' && trimmedInputValue.length > 0) {
            e.preventDefault();
            if (isExactMatch) {
                const acceptedItem = items[exactMatchIndex];
                if ('id' in acceptedItem && 'name' in acceptedItem) {
                    onAcceptItem(acceptedItem);
                }
                return;
            }
        }
    };

    const handleAcceptItem = (item: Item) => {
        handleCloseSugesstions();
        onAcceptItem(item);
        setInputValue('');
    };

    const handleOpenSugesstions = () => setIsSugesstionsListOpen(true);
    const handleCloseSugesstions = () => setIsSugesstionsListOpen(false);

    useClickOutside(menuRef, handleCloseSugesstions);

    const filteredSuggestions = items.filter((item) => item.name.toLowerCase().includes(inputValue.trim()));
    const exactMatchIndex = filteredSuggestions.findIndex(
        (item) => item.name.trim().toLowerCase() === inputValue.trim().toLowerCase()
    );

    const isExactMatch = exactMatchIndex !== -1;

    const isInputNotEmpty = inputValue.trim().length > 0;
    const areSuggestionsEmpty = filteredSuggestions.length === 0;
    const areSuggestionsNotEmpty = filteredSuggestions.length > 0;
    const isLabelGiven = label !== undefined;
    const id = useId();
    return (
        <div
            ref={menuRef}
            className={cxTw('grid')}
        >
            <div className={cxTw('flex w-full flex-col gap-2', className)}>
                {isLabelGiven && (
                    <Label
                        className={label.className}
                        htmlFor={id}
                    >
                        {label.name}
                    </Label>
                )}
                <Input
                    id={id}
                    onChange={handleChange}
                    onKeyDown={handleSubmit}
                    onFocus={handleOpenSugesstions}
                    value={inputValue}
                    autoComplete="off"
                    {...props}
                />

                <div className="relative">
                    <div
                        ref={menuRef}
                        className="absolute top-1 w-full"
                    >
                        {isSugesstionsListOpen &&
                            (areSuggestionsNotEmpty || (areSuggestionsEmpty && isInputNotEmpty)) && (
                                <ScrollArea className="relative w-full rounded-md border border-neutral-300 bg-white">
                                    <div className="flex max-h-48 w-full flex-col">
                                        {filteredSuggestions.map((item, index) => (
                                            <button
                                                key={item.value}
                                                className={clsx(
                                                    'cursor-default select-none items-center rounded-sm px-3 py-1.5 text-left text-sm hover:bg-blue-100',
                                                    exactMatchIndex === index && 'font-semibold'
                                                )}
                                                type="button"
                                                onClick={() => handleAcceptItem(item)}
                                            >
                                                {item.name}
                                            </button>
                                        ))}
                                    </div>
                                    <ScrollBar orientation="vertical" />
                                </ScrollArea>
                            )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Autocomplete;
