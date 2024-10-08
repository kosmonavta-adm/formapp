'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { resetPassword } from '@/components/auth/_authActions';
import Button from '@/components/ui/Button';
import CustomLink from '@/components/ui/CustomLink';
import { Input } from '@/components/ui/Input';
import { Separator } from '@/components/ui/Separator';
import { useToast } from '@/components/ui/Toast/useToast';
import ForgotPasswordDict from '@/dictionaries/ForgotPasswordDict.json';
import FormErrorMessagesDict from '@/dictionaries/FormErrorMessagesDict.json';
import { useLocaleContext } from '@/providers/LocaleProvider';
import { getFormErrorMessage, url } from '@/utils/utils';

const FORGOT_PASSWORD = {
    EMAIL: 'email',
} as const;

const forgotPasswordSchema = z.object({
    [FORGOT_PASSWORD.EMAIL]: z.string().email('Adres e-mail jest nieprawidłowy'),
});

export type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;

const ForgotPassword = () => {
    const { toast } = useToast();
    const locale = useLocaleContext();

    const t = ForgotPasswordDict[locale];
    const tFormErrorMessages: Record<string, string> = FormErrorMessagesDict[locale];

    const { register, handleSubmit, formState } = useForm({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            [FORGOT_PASSWORD.EMAIL]: '',
        },
    });

    const handleForgotPassword = async (formData: ForgotPasswordData) => {
        const error = await resetPassword(formData);

        if (error === null)
            toast({ description: 'Mail do zresetowania hasła został wysłany. Sprawdź skrzynkę e-mail.' });
        else toast({ description: 'Wystąpił błąd, spróbuj ponownie później' });
    };

    return (
        <section className="m-auto flex w-full max-w-md flex-col gap-6 px-4">
            <h1 className="mb-4 text-xl font-bold">{t.passwordReset}</h1>
            <form
                onSubmit={handleSubmit(handleForgotPassword)}
                className="flex flex-col gap-6"
            >
                <Input
                    label={{
                        value: (
                            <>
                                <span className="text-red-600">*</span> {t.email}
                            </>
                        ),
                    }}
                    placeholder="adres@mail.pl"
                    error={getFormErrorMessage(formState.errors[FORGOT_PASSWORD.EMAIL]?.message, tFormErrorMessages)}
                    {...register(FORGOT_PASSWORD.EMAIL)}
                />

                <div className="flex items-baseline justify-between">
                    <Button
                        className="w-full"
                        type="submit"
                    >
                        {t.resetPassword}
                    </Button>
                </div>
            </form>
            <div className="grid grid-cols-[1fr,auto,1fr] items-center gap-6">
                <Separator className="my-4" />
                <p className="font-medium">{t.or}</p>
                <Separator className="my-4" />
            </div>
            <p>
                <CustomLink
                    className="font-medium"
                    href={url.login}
                >
                    {t.logInWithYourPassword}
                </CustomLink>{' '}
                {t.inOurService}
            </p>
        </section>
    );
};

export default ForgotPassword;
