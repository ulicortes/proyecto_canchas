'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

const estructuraForm = z.object({
    user: z.string(),
    password: z.string(),
    email: z.string(),
    id: z.number(),
});

const nuevoUsuario = estructuraForm.omit({ id: true });

const bcrypt = require("bcrypt");

export async function registrarUsuario(formData: FormData) {
    const { user, password, email } = nuevoUsuario.parse({
        user: formData.get('user'),
        password: formData.get('pass'),
        email: formData.get('mail')
    });
    const hash = await bcrypt.hash(password, 10);


    await sql`
    INSERT INTO usuarios (u_nombre, u_password, email)
    VALUES (${user}, ${hash}, ${email})
  `;
    revalidatePath('/');
    redirect('/')
}

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials....';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}