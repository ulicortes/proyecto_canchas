'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect, RedirectType } from 'next/navigation';
import { horarios, jugadores, turno, usuario } from './tipos';
import { unstable_noStore as noStore } from 'next/cache';
import { cookies } from 'next/headers';

const URL = process.env.NEXT_PUBLIC_AUTH_URL;
const baseUrl = "proyecto-canchas-xi.vercel.app";

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

const nuevaCancha = guardarCanchaForm.omit({ id: true });


export async function registrarUsuario(formData: FormData) {
  let nuevoUsuario: usuario = {
    user: formData.get('user')?.toString() || "",
    password: formData.get('pass')?.toString() || "",
    email: formData.get('mail')?.toString() || ""
  }

  if (nuevoUsuario.password.length < 6 || nuevoUsuario.password.length > 20) throw new Error('La contraseña tiene menos de 6 o mas de 20 caracteres.');

  let rsp = await fetch(`${URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-type": "Application/json"
    },
    body: JSON.stringify(nuevoUsuario)
  })
  console.log("STATUS CODE " + rsp.status)
  if (rsp.status == 201) {
    revalidatePath('/');
    redirect('/');
  }
  if (rsp.status == 500) throw new Error("Error en el servidor");
  else throw new Error('Hubo un problema con el registro.');
}

export async function ingresarUsuario(u: string, p: string, path: string) {
  const redirect_ulr = path;

  let login_user = {
    user: u,
    password: p
  }

  if (login_user.user == "" || login_user.password == "") throw new Error("El usuario y la contraseña no deben estar vacios");

  let rsp = await fetch(`${URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-type": "Application/json"
    },
    body: JSON.stringify(login_user)
  })
  if (rsp.status == 200) {
    let data = await rsp.json();
    let user = login_user.user || "";
    setTokens(data.token, user);
  }
  return rsp.status;
}

export async function signOut() {
  cookies().delete('authToken');
  cookies().delete('user')
}

export async function deleteCookies() {
  function setTokens() {
    cookies().delete('authToken')
    cookies().delete('user')
  }
  return setTokens();
}

export async function setTokens(tkn: string, usr: string) {
  cookies()
    .set({
      name: 'authToken',
      value: tkn,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600,
      path: '/'
    });
  cookies().set(
    {
      name: 'user',
      value: usr,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600,
      path: '/'
    }
  )
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
  let dia_final = formatDia[2] + "-" + formatDia[1] + "-" + formatDia[0]
  try {
    const row = await sql<Number>`SELECT 1 FROM turnos WHERE lugar=${lugar} AND direccion=${direccion}
    AND dia=${dia_final} AND hora=${hora}`;
    if (row.rows.length == 0) {
      await sql`
        INSERT INTO turnos (organizador, telefono, lugar, direccion, dia, hora, cancha)
        VALUES (${org}, ${telefono}, ${lugar}, ${direccion}, ${dia_final}, ${hora}, ${cancha})
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
    const data = await sql<turno>`SELECT * FROM turnos WHERE date(dia) >= date(now()) ORDER BY dia, hora`;

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function traerTurno(id: string) {
  //noStore();
  try {
    const data = await sql<turno>`SELECT * FROM turnos where id_turno=${id}`;
    if (data.rows.length == 0) throw Error('Algo salio mal');
    else return data.rows;
  } catch (error) {
    throw new Error('Algo salio mal');
  }
}

export async function turnosDeHoy(hoy: string) {
  //noStore();
  try {

    const data = await sql<horarios>`SELECT hora, cancha FROM turnos where dia=${hoy}`;
    return data.rows;
  } catch (error) {
    throw new Error('Algo salio mal.');
  }
}

export async function actualizarCancha(id_turno: string, formData: FormData) {
  noStore();
  const lista = formData.getAll('jugadores');
  let lista_jugadores = `${lista}`
  await sql`
      UPDATE turnos SET lista=${lista_jugadores} WHERE id_turno=${id_turno}
    `;
  revalidatePath(`/cancha/${id_turno}/editar`);
  redirect(`/cancha/${id_turno}/editar`);

}
