import { ClassNameValue } from 'tailwind-merge';

import { Loader } from '@/components/icons';
import { cxTw } from '@/utils/utils';

const Spinner = ({ className }: { className?: ClassNameValue }) => {
    return (
        <Loader
            className={cxTw('m-auto animate-spin', className)}
            width={48}
            height={48}
        />
    );
};

export default Spinner;
