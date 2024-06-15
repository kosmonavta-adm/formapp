'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { updatePassword } from '@/components/auth/actions';
import Button from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { url } from '@/utils/utils';

const UPDATE_PASSWORD = {
    NEW_PASSWORD: 'newPassword',
    CONFIRM_NEW_PASSWORD: 'confirmNewPassword',
} as const;

const updatePasswordSchema = z
    .object({
        [UPDATE_PASSWORD.NEW_PASSWORD]: z.string().min(6, 'Hasło musi mieć przynajmniej 6 znaków'),
        [UPDATE_PASSWORD.CONFIRM_NEW_PASSWORD]: z.string().min(6, 'Hasło musi mieć przynajmniej 6 znaków'),
    })
    .refine(
        (values) => {
            return values[UPDATE_PASSWORD.NEW_PASSWORD] === values[UPDATE_PASSWORD.CONFIRM_NEW_PASSWORD];
        },
        {
            message: 'Hasła się nie zgadzają',
            path: [UPDATE_PASSWORD.CONFIRM_NEW_PASSWORD],
        }
    );

export type UpdateasswordData = z.infer<typeof updatePasswordSchema>;

const UpdatePassword = () => {
    const router = useRouter();

    const { register, handleSubmit } = useForm({
        resolver: zodResolver(updatePasswordSchema),
        defaultValues: {
            [UPDATE_PASSWORD.NEW_PASSWORD]: '',
            [UPDATE_PASSWORD.CONFIRM_NEW_PASSWORD]: '',
        },
    });

    const handleUpdatePassword = async (formData: UpdateasswordData) => {
        const error = await updatePassword(formData);

        if (error === null) router.replace(url.dashboard);
    };

    return (
        <section className="m-auto flex w-full max-w-md flex-col gap-6 px-4">
            <h1 className="mb-4 text-xl font-bold">Ustawianie nowego hasła</h1>
            <form
                onSubmit={handleSubmit(handleUpdatePassword)}
                className="flex flex-col gap-6"
            >
                <Input
                    type="password"
                    label={{
                        value: (
                            <>
                                <span className="text-red-600">*</span> Hasło
                            </>
                        ),
                    }}
                    {...register(UPDATE_PASSWORD.NEW_PASSWORD)}
                />
                <Input
                    type="password"
                    label={{
                        value: (
                            <>
                                <span className="text-red-600">*</span> Potwierdź hasło
                            </>
                        ),
                    }}
                    {...register(UPDATE_PASSWORD.CONFIRM_NEW_PASSWORD)}
                />

                <Button type="submit">Zaktualizuj hasło</Button>
            </form>
        </section>
    );
};

export default UpdatePassword;
