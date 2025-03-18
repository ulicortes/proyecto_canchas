'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { horarios, jugadores, turno, usuario } from './tipos';
import { unstable_noStore as noStore } from 'next/cache';
import { cookies } from 'next/headers';
import { signToken, verifyToken } from '../api/auth/auth';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server';

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
  noStore();
  const { user, password, email } = nuevoUsuario.parse({
    user: formData.get('user'),
    password: formData.get('pass'),
    email: formData.get('mail')
  });
  if (password.length < 6 || password.length > 20) throw new Error('La contraseña tiene menos de 6 o mas de 20 caracteres.');
  let newUser = await sql`
  SELECT 1 as exist FROM usuarios WHERE u_nombre=${user} AND email=${email}
  `;
  if (newUser.rows[0] != undefined) throw new Error('Este usuario ya existe!');
  else {
    const hash = await bcrypt.hash(password, 10);
    await sql`
    INSERT INTO usuarios (u_nombre, u_password, email)
    VALUES (${user}, ${hash}, ${email})
    `;
    revalidatePath('/buscar');
    redirect('/buscar')
  }
}

export async function ingresarUsuario(formData: FormData) {
  noStore();
  const email = formData.get('email')?.toString();
  const pass = formData.get('pass')?.toString();
  const ulr = formData.get('ulr')?.toString();

  const data = await sql<usuario>`SELECT u_nombre, u_password FROM usuarios where email=${email}`;
  const userData = data.rows[0];
  if (!userData) throw new Error("2");
  const passwordsMatch = await bcrypt.compare(pass, userData.u_password);

  if (passwordsMatch) {
    await setCookies(userData.u_nombre);
    redirect(`${ulr}`);
  } else {
    throw new Error("1");
  }
}

export async function verificarUsuario(cookie: ReadonlyRequestCookies) {
  const token = cookie.get('authToken');

  try {
    const decoded = verifyToken(token?.value);
    return decoded;
  } catch (error) {
    return false;
  }
}

export async function signOut() {
  await deleteCookies();
  revalidatePath('/');
  redirect('/')
}

export async function deleteCookies() {
  function setTokens() {
    cookies().delete('authToken')
  }
  return setTokens();
}

export async function setCookies(n: string) {
  const token = await signToken({ sub: n });
  function setTokens() {
    cookies().set({
      name: 'authToken',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600,
      path: '/'
    })
  }

  return setTokens();
}

export async function guardarCancha(formData: FormData) {
  const { org, telefono, lugar, direccion, dia, hora, cancha } = nuevaCancha.parse({
    org: formData.get('org'),
    telefono: formData.get('tel'),
    lugar: formData.get('lugar'),
    direccion: formData.get('direcc'),
    dia: formData.get('dia'),
    hora: formData.get('hora'),
    cancha: formData.get('cancha'),
  });
  let formatDia = dia.split('/');
  let dia_final = formatDia[2]+"-"+formatDia[1]+"-"+formatDia[0]
  try {
    const row = await sql<Number>`SELECT 1 FROM turnos WHERE lugar=${lugar} AND direccion=${direccion}
    AND dia=${dia} AND hora=${hora}`;
    if(row.rows.length == 0) {
      await sql`
        INSERT INTO turnos (organizador, telefono, lugar, direccion, dia, hora, cancha)
        VALUES (${org}, ${telefono}, ${lugar}, ${direccion}, ${dia}, ${hora}, ${cancha})
      `;
    }
  } catch (error) {
    throw new Error('NO SE PUEDE GUARDAR ESTE TURNO PORQUE YA EXISTE!');
  }
  revalidatePath('/buscar');
  redirect('/buscar')

}

export async function listarTurnos() {
  noStore();
  try {
    const data = await sql<turno>`SELECT * FROM turnos WHERE date(dia) >= date(now()) ORDER BY dia, hora `;

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function traerTurno(id: string) {
  noStore();
  try {
    const data = await sql<turno>`SELECT * FROM turnos where id_turno=${id}`;
    if (data.rows.length == 0) throw Error('Algo salio mal');
    else return data.rows;
  } catch (error) {
    throw new Error('Algo salio mal');
  }
}

export async function turnosDeHoy(hoy: string) {
  noStore();
  try {

    const data = await sql<horarios>`SELECT hora, cancha FROM turnos where dia=${hoy}`;
    return data.rows;
  } catch (error) {
    throw new Error('Algo salio mal.');
  }
}

export async function actualizarCancha(id_turno: string, formData: FormData) {
  noStore();
  let indice = 0;
  const lista = formData.getAll('jug');
  let primer_jugador = lista[0];
  if (primer_jugador == '') {
    primer_jugador = lista[1];
    indice++;
  }
  let arrayLista = `{${primer_jugador}`;
  for (let i = indice + 1; i < lista.length; i++) {
    if (lista[i] != '') {
      arrayLista += `, ${lista[i]}`;
    }
  }
  arrayLista += `}`;
  await sql`
      UPDATE turnos SET lista=${arrayLista} WHERE id_turno=${id_turno}
    `;
  revalidatePath(`/cancha/${id_turno}/editar`);
  redirect(`/cancha/${id_turno}/editar`);

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