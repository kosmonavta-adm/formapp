import { ReactNode } from 'react';

import { X } from '@/components/icons';

type ChipParams = {
    value: ReactNode;

    onDelete?: () => void;
};

const Chip = ({ value, onDelete }: ChipParams) => {
    const isOnDeleteDefined = onDelete !== undefined;
    return (
        <div className={'flex w-fit rounded-md border border-neutral-200 px-2 py-0.5 text-sm font-medium'}>
            <div className="flex gap-2">{value}</div>
            {isOnDeleteDefined && (
                <button
                    type="button"
                    onClick={() => onDelete()}
                >
                    <X
                        width={16}
                        height={16}
                    />
                </button>
            )}
        </div>
    );
};

export default Chip;
