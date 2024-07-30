import { ClassValue } from 'clsx';
import { ComponentPropsWithRef, forwardRef, ReactNode, useId } from 'react';

import { Eye, EyeOff } from '@/components/icons';
import ErrorText from '@/components/ui/ErrorText';
import { Label } from '@/components/ui/Label';
import { useToggle } from '@/utils/hooks/useToggle';
import { cxTw } from '@/utils/utils';

export type InputProps = {
    label?: {
        value: ReactNode;
        className?: ClassValue;
    };
    decorator?: string;
    helperText?: string;
    error?: string;
} & ComponentPropsWithRef<'input'>;

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, label, error, decorator, helperText, ...props }, ref) => {
        const id = useId();

        const [isPasswordShown, toggleIsPasswordShown] = useToggle(false);

        const isInputPassword = type === 'password';

        return (
            <div className="flex w-full flex-col gap-2">
                {label !== undefined && (
                    <Label
                        htmlFor={id}
                        className={label.className}
                    >
                        {label.value}
                    </Label>
                )}
                <div className="relative">
                    <input
                        id={id}
                        type={isInputPassword && isPasswordShown ? 'text' : type}
                        className={cxTw(
                            'flex h-10 w-full border border-neutral-300 px-3 py-2 text-sm placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:bg-neutral-50 disabled:opacity-50',
                            className
                        )}
                        ref={ref}
                        {...props}
                    />
                    {decorator && (
                        <div className="absolute right-[1px] top-[1px] my-auto flex h-[38px] select-none items-center rounded-r-md bg-white px-3">
                            {decorator}
                        </div>
                    )}
                    {isInputPassword && (
                        <button
                            type="button"
                            className="absolute bottom-0 right-3 top-0 my-auto"
                            onClick={toggleIsPasswordShown}
                        >
                            {isPasswordShown ? (
                                <EyeOff
                                    width={16}
                                    height={16}
                                />
                            ) : (
                                <Eye
                                    width={16}
                                    height={16}
                                />
                            )}
                        </button>
                    )}
                    <p className="mt-1 text-xs text-neutral-600">{helperText}</p>
                </div>
                {error && <ErrorText>{error}</ErrorText>}
            </div>
        );
    }
);

Input.displayName = 'Input';

export { Input };
