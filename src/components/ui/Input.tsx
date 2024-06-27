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
    error?: string;
} & ComponentPropsWithRef<'input'>;

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, type, label, error, ...props }, ref) => {
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
                        'flex h-10 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:bg-neutral-50 disabled:opacity-50',
                        className
                    )}
                    ref={ref}
                    {...props}
                />
                <button
                    type="button"
                    className="absolute bottom-0 right-3 top-0 my-auto"
                    onClick={toggleIsPasswordShown}
                >
                    {isInputPassword &&
                        (isPasswordShown ? (
                            <EyeOff
                                width={16}
                                height={16}
                            />
                        ) : (
                            <Eye
                                width={16}
                                height={16}
                            />
                        ))}
                </button>
            </div>
            {error && <ErrorText>{error}</ErrorText>}
        </div>
    );
});

Input.displayName = 'Input';

export { Input };
