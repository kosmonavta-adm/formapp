'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { loginUser } from '@/components/auth/actions';
import Button from '@/components/ui/Button';
import CustomLink from '@/components/ui/CustomLink';
import { Input } from '@/components/ui/Input';
import { Separator } from '@/components/ui/Separator';
import { useToast } from '@/components/ui/Toast/useToast';
import { url } from '@/utils/utils';

const LOGIN = {
    EMAIL: 'email',
    PASSWORD: 'password',
} as const;

const loginSchema = z.object({
    [LOGIN.EMAIL]: z.string().email('Adres e-mail jest nieprawidłowy'),
    [LOGIN.PASSWORD]: z.string(),
});

export type LoginData = z.infer<typeof loginSchema>;

const LoginForm = () => {
    const { toast } = useToast();
    const router = useRouter();

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
        else toast({ description: 'Mail lub hasło są nieprawidłowe' });
    };

    return (
        <section className="m-auto flex w-full max-w-md flex-col gap-6 px-4">
            <h1 className="mb-4 text-xl font-bold">Logowanie</h1>
            <form
                onSubmit={handleSubmit(handleLogin)}
                className="flex flex-col gap-6"
            >
                <Input
                    label={{
                        value: (
                            <>
                                <span className="text-red-600">*</span> E-mail
                            </>
                        ),
                    }}
                    error={formState.errors[LOGIN.EMAIL]?.message}
                    placeholder="adres@mail.pl"
                    {...register(LOGIN.EMAIL)}
                />
                <Input
                    type="password"
                    label={{
                        value: (
                            <>
                                <span className="text-red-600">*</span> Hasło
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
                        Zapomniałeś hasła?
                    </CustomLink>
                    <Button type="submit">Zaloguj się</Button>
                </div>
            </form>
            <div className="grid grid-cols-[1fr,auto,1fr] items-center gap-6">
                <Separator className="my-4" />
                <p className="font-medium">lub</p>
                <Separator className="my-4" />
            </div>
            <p>
                <CustomLink
                    className="font-medium"
                    href={url.register}
                >
                    Załóż konto
                </CustomLink>{' '}
                w naszym serwisie!
            </p>
        </section>
    );
};

export default LoginForm;
