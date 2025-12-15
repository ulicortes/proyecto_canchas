'use server';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { unstable_noStore as noStore } from 'next/cache';
import { cookies } from 'next/headers'

const URL = process.env.BACKEND_URL;

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
  if (!telefono.startsWith('@') && telefono.match("^[0-9]{1,20}$") === null) {
    throw new Error('EL CONTACTO DEBE SER UN NRO DE TELEFONO O UN PERFIL DE INSTAGRAM (COMENZANDO CON @)');
  }
  let error = undefined;
  try {
    let res = await fetch(`${URL}/matches`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        organizador: org,
        telefono: telefono,
        lugar: lugar,
        direccion: direccion,
        dia: dia,
        hora: hora,
        cancha: parseInt(cancha as string, 10),
        jugadores_faltantes: 16
      }),
    }).then(async r => await r);
    console.log(res.status)
    if (!res.ok) {
      throw 'El turno ya fue reservado, por favor elija otro';
      // return 404;
    }
  } catch (e) {
      error = e as string;
  }
  if (error) throw new Error(error);
  revalidatePath('/buscar');
  redirect('/buscar')
}

export async function error() {
  throw new Error("Hubo un error al reservar la cancha. Por favor, intente nuevamente.");
}

export async function listarTurnos() {
  noStore();
  const token = cookies().get('authToken');
  try {
    const data = await fetch(`${URL}/matches`).then(res => res.json());
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function traerTurno(id: string) {
  try {
    const data = await fetch(`${URL}/matches/${id}`).then(res => res.json());
    return data;
    if (data.rows.length == 0) throw Error('Algo salio mal');
    else return data.rows;
  } catch (error) {
    throw new Error('Algo salio mal');
  }
}

export async function actualizarCancha(id_turno: string, formData: FormData) {
  noStore();
  const lista = formData.getAll('jugadores');
  let lista_jugadores = `${lista}`
  const row = await fetch(`${URL}/matches/${id_turno}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      lista: lista_jugadores
    }),
  });
  revalidatePath(`/cancha/${id_turno}/editar`);
  redirect(`/cancha/${id_turno}/editar`);
}
