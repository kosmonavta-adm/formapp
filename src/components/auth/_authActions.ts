'use server';

import { createClient } from '@/auth/server';
import { ForgotPasswordData } from '@/components/auth/ForgotPassword';
import { LoginData } from '@/components/auth/LoginForm';
import { RegisterdData } from '@/components/auth/RegisterForm';
import { UpdateasswordData } from '@/components/auth/UpdatePassword';

export async function loginUser(formData: LoginData) {
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword(formData);

    return error === null ? null : error.message;
}

export async function registerUser(formData: RegisterdData) {
    const supabase = createClient();

    const { error } = await supabase.auth.signUp(formData);

    return error === null ? null : error.message;
}

export async function resetPassword(formData: ForgotPasswordData) {
    const supabase = createClient();

    const { email } = formData;

    const { error } = await supabase.auth.resetPasswordForEmail(email);

    return error === null ? null : error.message;
}

export async function updatePassword(formData: UpdateasswordData) {
    const supabase = createClient();

    const { newPassword } = formData;

    const { error } = await supabase.auth.updateUser({ password: newPassword });

    return error === null ? null : error.message;
}

export async function logoutUser() {
    const supabase = createClient();

    const { error } = await supabase.auth.signOut();

    return error === null ? null : error.message;
}
