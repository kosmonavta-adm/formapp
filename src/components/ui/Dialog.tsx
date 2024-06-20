'use client';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { AnimatePresence, motion } from 'framer-motion';
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react';

import { X } from '@/components/icons';

export const DialogContent = forwardRef<
    ElementRef<typeof DialogPrimitive.Content>,
    ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & { open: boolean }
>(({ className, children, open, ...props }, ref) => {
    return (
        <AnimatePresence>
            {open && (
                <DialogPrimitive.Portal forceMount>
                    <DialogPrimitive.Overlay asChild>
                        <motion.div
                            className="fixed inset-0 left-80 bg-neutral-200/50 lg:left-96"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3, type: 'spring' }}
                        />
                    </DialogPrimitive.Overlay>

                    <div>
                        <DialogPrimitive.Close
                            className="absolute"
                            aria-label="Close"
                        >
                            <X
                                width={16}
                                height={16}
                            />
                        </DialogPrimitive.Close>
                        <DialogPrimitive.Content
                            {...props}
                            ref={ref}
                            className="absolute inset-0 left-80 m-auto flex h-min w-full max-w-md flex-col rounded-md bg-white p-4 lg:left-96"
                            asChild
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0 }}
                                transition={{ duration: 0.3, type: 'spring' }}
                            >
                                {children}
                            </motion.div>
                        </DialogPrimitive.Content>
                    </div>
                </DialogPrimitive.Portal>
            )}
        </AnimatePresence>
    );
});

DialogContent.displayName = 'DialogContent';

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
