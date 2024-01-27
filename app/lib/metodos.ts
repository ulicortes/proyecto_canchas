'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { turno } from './tipos';
import { unstable_noStore as noStore } from 'next/cache';

const estructuraForm = z.object({
    user: z.string(),
    password: z.string(),
    email: z.string(),
    id: z.number(),
});

const guardarCanchaForm = z.object({
    id: z.number(),
    org: z.string(),
    telefono: z.string(),
    lugar: z.string(),
    direccion: z.string(),
    dia: z.string(),
    hora: z.string(),
    cancha: z.string(),
});

const nuevoUsuario = estructuraForm.omit({ id: true });
const nuevaCancha = guardarCanchaForm.omit({ id: true });

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

export async function guardarCancha(formData: FormData) {
    const { org, telefono, lugar, direccion, dia, hora, cancha } = nuevaCancha.parse({
        org: formData.get('org'),
        telefono: formData.get('tel'),
        lugar: formData.get('lugar'),
        direccion: formData.get('direcc'),
        dia: formData.get('dia'),
        hora: formData.get('hora'),
        cancha: formData.get('jugs'),
    });


    await sql`
    INSERT INTO turnos (organizador, telefono, lugar, direccion, dia, hora, cancha)
    VALUES (${org}, ${telefono}, ${lugar}, ${direccion}, ${dia}, ${hora}, ${cancha})
  `;
    revalidatePath('/buscar');
    redirect('/buscar')
}


export async function listarTurnos() {
    noStore();
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      const data = await sql<turno>`SELECT * FROM turnos order by dia`;  
      return data.rows;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch revenue data.');
    }
} 

export async function turnosDeHoy() {
    const fechaActual = new Date();
    const hoy = `${fechaActual.getFullYear()}-${fechaActual.getMonth()}-${fechaActual.getDay()}`
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      const data = await sql<turno>`SELECT hora FROM turnos where dia=${hoy}`;  
      return data.rows;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch revenue data.');
    }
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