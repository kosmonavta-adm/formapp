'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { registerUser } from '@/components/auth/_authActions';
import { useGetAllSubdomains } from '@/components/auth/getAllSubdomains';
import Button from '@/components/ui/Button';
import CustomLink from '@/components/ui/CustomLink';
import { Input } from '@/components/ui/Input';
import { Separator } from '@/components/ui/Separator';
import { useToast } from '@/components/ui/Toast/useToast';
import FormErrorMessagesDict from '@/dictionaries/FormErrorMessagesDict.json';
import RegisterFormDict from '@/dictionaries/RegisterFormDict.json';
import { useLocaleContext } from '@/providers/LocaleProvider';
import { ERROR_KEYS, getFormErrorMessage, url } from '@/utils/utils';

export const REGISTER = {
    EMAIL: 'email',
    ADDRESS: 'address',
    PASSWORD: 'password',
    CONFIRM_PASSWORD: 'confirmPassword',
} as const;

const RegisterForm = () => {
    const { toast } = useToast();
    const locale = useLocaleContext();

    const subdomains = useGetAllSubdomains();

    const t = RegisterFormDict[locale];
    const tFormErrorMessages: Record<string, string> = FormErrorMessagesDict[locale];

    const registerSchema = z
        .object({
            [REGISTER.EMAIL]: z.string().email(ERROR_KEYS.INCORRECT_EMAIL),
            [REGISTER.ADDRESS]: z
                .string()
                .min(1, ERROR_KEYS.ADDRESS_MIN_LENGTH)
                .max(32, ERROR_KEYS.ADDRESS_MAX_LENGTH)
                .refine(
                    (value) => subdomains.data?.every(({ subdomain }) => subdomain !== value),
                    ERROR_KEYS.ADDRESS_ALREADY_TAKEN
                ),
            [REGISTER.PASSWORD]: z.string().min(6, ERROR_KEYS.PASSWORD_MIN_LENGTH),
            [REGISTER.CONFIRM_PASSWORD]: z.string(),
        })
        .refine(
            (values) => {
                return values[REGISTER.PASSWORD] === values[REGISTER.CONFIRM_PASSWORD];
            },
            {
                message: ERROR_KEYS.PASSWORDS_DOESNT_MATCH,
                path: [REGISTER.CONFIRM_PASSWORD],
            }
        );

    const { register, handleSubmit, formState } = useForm({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            [REGISTER.EMAIL]: '',
            [REGISTER.ADDRESS]: '',
            [REGISTER.PASSWORD]: '',
            [REGISTER.CONFIRM_PASSWORD]: '',
        },
    });

    const handleRegister = async (formData: z.infer<typeof registerSchema>) => {
        const { confirmPassword: _, ...registerData } = formData;
        const error = await registerUser(registerData);

        if (error === null) toast({ description: 'Mail z potwierdzeniem został wysłany. Sprawdź skrzynkę e-mail.' });
        else toast({ description: 'Wystąpił błąd, spróbuj ponownie później' });
    };

    return (
        <section className="m-auto flex w-full max-w-md flex-col gap-6 px-4">
            <h1 className="mb-4 text-xl font-bold">{t.register}</h1>
            <form
                onSubmit={handleSubmit(handleRegister)}
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
                    error={getFormErrorMessage(formState.errors[REGISTER.EMAIL]?.message, tFormErrorMessages)}
                    {...register(REGISTER.EMAIL)}
                />
                <Input
                    label={{
                        value: (
                            <>
                                <span className="text-red-600">*</span> {t.siteAddress}
                            </>
                        ),
                    }}
                    decorator=".formapp.pl"
                    placeholder="twojanazwa"
                    helperText="Nazwę możesz zmienić po utworzeniu konta."
                    error={getFormErrorMessage(formState.errors[REGISTER.ADDRESS]?.message, tFormErrorMessages)}
                    {...register(REGISTER.ADDRESS)}
                />
                <Input
                    type="password"
                    label={{
                        value: (
                            <>
                                <span className="text-red-600">*</span> {t.password}
                            </>
                        ),
                    }}
                    error={getFormErrorMessage(formState.errors[REGISTER.PASSWORD]?.message, tFormErrorMessages)}
                    {...register(REGISTER.PASSWORD)}
                />
                <Input
                    type="password"
                    label={{
                        value: (
                            <>
                                <span className="text-red-600">*</span> {t.confirmPassword}
                            </>
                        ),
                    }}
                    error={getFormErrorMessage(
                        formState.errors[REGISTER.CONFIRM_PASSWORD]?.message,
                        tFormErrorMessages
                    )}
                    {...register(REGISTER.CONFIRM_PASSWORD)}
                />

                <Button
                    className="w-full"
                    type="submit"
                >
                    {t.signUp}
                </Button>
            </form>
            <div className="grid grid-cols-[1fr,auto,1fr] items-center gap-6">
                <Separator className="my-4" />
                <p className="font-medium">lub</p>
                <Separator className="my-4" />
            </div>
            <p>
                {t.alreadyHaveAnAccount}{' '}
                <CustomLink
                    className="font-medium"
                    href={url.login}
                >
                    {t.signIn}
                </CustomLink>
            </p>
        </section>
    );
};

export default RegisterForm;
