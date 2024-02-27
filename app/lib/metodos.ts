'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { horarios, jugadores, turno, usuario } from './tipos';
import { unstable_noStore as noStore } from 'next/cache';
import { cookies } from 'next/headers';

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
  jqf: z.string(),
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

export async function verificarUsuario(formData: FormData) {
  const email = formData.get('email')?.toString();
  const pass = formData.get('pass')?.toString();

  const data = await sql<usuario>`SELECT * FROM usuarios where email=${email}`;
  const userData = data.rows[0];
  if (!userData) return null;
  const passwordsMatch = await bcrypt.compare(pass, userData.u_password);
  if (passwordsMatch) {
    setCookies(userData.u_nombre);
    revalidatePath('/');
    redirect('/')
  } else {
    throw new Error();
  }
}

export async function signOut() {
  deleteCookies();
  revalidatePath('/');
  redirect('/')
}

export async function guardarCancha(formData: FormData) {
  const { org, telefono, lugar, direccion, dia, hora, cancha, jqf } = nuevaCancha.parse({
    org: formData.get('org'),
    telefono: formData.get('tel'),
    lugar: formData.get('lugar'),
    direccion: formData.get('direcc'),
    dia: formData.get('dia'),
    hora: formData.get('hora'),
    jqf: formData.get('jqf'),
    cancha: formData.get('jugs'),
  });

  try {
    await sql`
      INSERT INTO turnos (organizador, telefono, lugar, direccion, dia, hora, cancha, jugadores_faltantes)
      VALUES (${org}, ${telefono}, ${lugar}, ${direccion}, ${dia}, ${hora}, ${cancha}, ${jqf})
    `;
  } catch (error) {
    throw new Error('NO SE PUEDE GUARDAR ESTE TURNO PORQUE YA EXISTE!');
  }
  revalidatePath('/buscar');
  redirect('/buscar')

}

export async function listarTurnos() {
  noStore();
  try {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const data = await sql<turno>`SELECT * FROM turnos order by dia, hora`;

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function traerTurno(id: string) {
  noStore();
  try {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const data = await sql<turno>`SELECT * FROM turnos where id_turno=${id}`;
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function turnosDeHoy(hoy: string) {
  noStore();
  try {

    await new Promise((resolve) => setTimeout(resolve, 3000));
    const data = await sql<horarios>`SELECT hora FROM turnos where dia=${hoy}`;
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('no traje nada');
  }
}

export async function actualizarCancha(id_turno: string, formData: FormData) {
  const lista = formData.getAll('jug');
  let arrayLista = `{${lista[0]}`;
  for (let i = 1; i < lista.length; i++) {
    if(lista[i] != '') {
      arrayLista += `, ${lista[i]}`;
    }
  }
  arrayLista += `}`;
  await sql`
      UPDATE turnos SET lista=${arrayLista} WHERE id_turno=${id_turno}
    `;

  revalidatePath(`/cancha/${id_turno}/editar`);
  redirect(`/cancha/${id_turno}/editar`)

}

export async function setCookies(n: string) {
  async function setTokens() {
    const today = new Date();
    today.setHours(today.getHours() + 1);
    cookies().set({
      name: 'usuario',
      value: n,
      expires: today,
      path: '/',
    })
  }
  return setTokens();
}

export async function deleteCookies() {
  async function setTokens() {
    cookies().delete('usuario')
  }
  return setTokens();
}

export async function listarJugadores() {
  noStore();
  try {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const data = await sql<jugadores>`SELECT * FROM ejemplo`;

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}