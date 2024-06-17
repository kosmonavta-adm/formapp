'use client';
import { useState } from 'react';

import { Select, SelectItem } from '@/components/ui/Select';
import { useLocaleContext } from '@/providers/LocaleProvider';
import { handleChangeLanguage } from '@/utils/actions';

const LanguageSwitcher = () => {
    const locale = useLocaleContext();
    const [language, setLanguage] = useState(locale);

    const languages = [
        {
            value: 'pl',
            name: 'Polski',
        },
        {
            value: 'en',
            name: 'English',
        },
    ] as const;

    return (
        <Select
            className="ml-auto w-full max-w-32"
            onValueChange={(value: 'pl' | 'en') => {
                handleChangeLanguage(value);
                setLanguage(value);
            }}
            value={language}
        >
            {languages.map((language) => (
                <SelectItem
                    key={language.value}
                    value={language.value}
                >
                    {language.name}
                </SelectItem>
            ))}
        </Select>
    );
};

export default LanguageSwitcher;
