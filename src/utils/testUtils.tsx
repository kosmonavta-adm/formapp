import { QueryClientProvider } from '@tanstack/react-query';
import { render, RenderOptions } from '@testing-library/react';
import React, { ReactElement, ReactNode } from 'react';

import LocaleProvider from '@/providers/LocaleProvider';
import { getQueryClient } from '@/providers/ReactQueryProvider';

const AllTheProviders = ({ children }: { children: ReactNode }) => {
    const locale = 'pl';
    const queryClient = getQueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <LocaleProvider locale={locale}>{children}</LocaleProvider>
        </QueryClientProvider>
    );
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
    render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
