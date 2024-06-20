'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { loginUser } from '@/components/auth/_authActions';
import Button from '@/components/ui/Button';
import CustomLink from '@/components/ui/CustomLink';
import { Input } from '@/components/ui/Input';
import { Separator } from '@/components/ui/Separator';
import { useToast } from '@/components/ui/Toast/useToast';
import FormErrorMessagesDict from '@/dictionaries/FormErrorMessagesDict.json';
import LoginFormDict from '@/dictionaries/LoginFormDict.json';
import { useLocaleContext } from '@/providers/LocaleProvider';
import { ERROR_KEYS, getFormErrorMessage, url } from '@/utils/utils';

const LOGIN = {
    EMAIL: 'email',
    PASSWORD: 'password',
} as const;

const loginSchema = z.object({
    [LOGIN.EMAIL]: z.string().email(ERROR_KEYS.INCORRECT_EMAIL),
    [LOGIN.PASSWORD]: z.string(),
});

export type LoginData = z.infer<typeof loginSchema>;

const LoginForm = () => {
    const { toast } = useToast();
    const router = useRouter();
    const locale = useLocaleContext();

    const t = LoginFormDict[locale];
    const tFormErrorMessages: Record<string, string> = FormErrorMessagesDict[locale];

    const { register, handleSubmit, formState } = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            [LOGIN.EMAIL]: '',
            [LOGIN.PASSWORD]: '',
        },
    });

    const handleLogin = async (formData: LoginData) => {
        const error = await loginUser(formData);

        if (error === null) router.replace(url.dashboard);
        else toast({ description: t.mailOrPasswordAreIncorrect });
    };

    return (
        <section className="m-auto flex w-full max-w-md flex-col gap-6">
            <h1 className="mb-4 text-xl font-bold">{t.login}</h1>
            <form
                onSubmit={handleSubmit(handleLogin)}
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
                    error={getFormErrorMessage(formState.errors[LOGIN.EMAIL]?.message, tFormErrorMessages)}
                    placeholder="adres@mail.pl"
                    {...register(LOGIN.EMAIL)}
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
                    {...register(LOGIN.PASSWORD)}
                />
                <div className="flex items-baseline justify-between">
                    <CustomLink
                        href={url.forgotPassword}
                        className=""
                    >
                        {t.forgotPassword}
                    </CustomLink>
                    <Button type="submit">{t.signIn}</Button>
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
                    href={url.register}
                >
                    {t.signUp}
                </CustomLink>{' '}
                {t.inOurService}
            </p>
        </section>
    );
};

export default LoginForm;
