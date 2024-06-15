'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { registerUser } from '@/components/auth/actions';
import Button from '@/components/ui/Button';
import CustomLink from '@/components/ui/CustomLink';
import { Input } from '@/components/ui/Input';
import { Separator } from '@/components/ui/Separator';
import { useToast } from '@/components/ui/Toast/useToast';
import { url } from '@/utils/utils';

const REGISTER = {
    EMAIL: 'email',
    PASSWORD: 'password',
    CONFIRM_PASSWORD: 'confirmPassword',
} as const;

const registerSchema = z
    .object({
        [REGISTER.EMAIL]: z.string().email('Adres e-mail jest nieprawidłowy'),
        [REGISTER.PASSWORD]: z.string().min(6, 'Hasło musi mieć przynajmniej 6 znaków'),
        [REGISTER.CONFIRM_PASSWORD]: z.string(),
    })
    .refine(
        (values) => {
            return values[REGISTER.PASSWORD] === values[REGISTER.CONFIRM_PASSWORD];
        },
        {
            message: 'Hasła się nie zgadzają',
            path: [REGISTER.CONFIRM_PASSWORD],
        }
    );

export type RegisterdData = z.infer<typeof registerSchema>;

const RegisterForm = () => {
    const { toast } = useToast();

    const { register, handleSubmit, formState } = useForm({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            [REGISTER.EMAIL]: '',
            [REGISTER.PASSWORD]: '',
            [REGISTER.CONFIRM_PASSWORD]: '',
        },
    });

    const handleRegister = async (formData: RegisterdData) => {
        const error = await registerUser(formData);

        if (error === null) toast({ description: 'Mail z potwierdzeniem został wysłany. Sprawdź skrzynkę e-mail.' });
        else toast({ description: 'Wystąpił błąd, spróbuj ponownie później' });
    };

    return (
        <section className="m-auto flex w-full max-w-md flex-col gap-6 px-4">
            <h1 className="mb-4 text-xl font-bold">Rejestracja</h1>
            <form
                onSubmit={handleSubmit(handleRegister)}
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
                    placeholder="adres@mail.pl"
                    error={formState.errors[REGISTER.EMAIL]?.message}
                    {...register(REGISTER.EMAIL)}
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
                    error={formState.errors[REGISTER.PASSWORD]?.message}
                    {...register(REGISTER.PASSWORD)}
                />
                <Input
                    type="password"
                    label={{
                        value: (
                            <>
                                <span className="text-red-600">*</span> Powtórz hasło
                            </>
                        ),
                    }}
                    error={formState.errors[REGISTER.CONFIRM_PASSWORD]?.message}
                    {...register(REGISTER.CONFIRM_PASSWORD)}
                />

                <Button
                    className="w-full"
                    type="submit"
                >
                    Zarejestruj się
                </Button>
            </form>
            <div className="grid grid-cols-[1fr,auto,1fr] items-center gap-6">
                <Separator className="my-4" />
                <p className="font-medium">lub</p>
                <Separator className="my-4" />
            </div>
            <p>
                Masz już konto?{' '}
                <CustomLink
                    className="font-medium"
                    href={url.login}
                >
                    Zaloguj się
                </CustomLink>
            </p>
        </section>
    );
};

export default RegisterForm;
