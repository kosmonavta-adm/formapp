import { ClassNameValue } from 'tailwind-merge';

import { Loader } from '@/components/icons';
import { cxTw } from '@/utils/utils';

const Spinner = ({ className }: { className?: ClassNameValue }) => {
    return <Loader className={cxTw('m-auto h-12 w-12 animate-spin', className)} />;
};

export default Spinner;
