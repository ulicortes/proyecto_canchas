'use server';
import { cookies } from 'next/headers'

const URL = process.env.BACKEND_URL;

interface usuario {
  id: number;
  nombre: string;
  tipo: string;
}

interface turno {
  dia: string,
  hora: number,
  cancha: number,
  contacto: string,
  responsable: string
}

export async function error() {
  throw new Error("Hubo un error al reservar la cancha. Por favor, intente nuevamente.");
}
//////////////////////// GET ////////////////////////
export async function listarDeportes() {
  const cookieStore = await cookies();
  const token = cookieStore.get('tkn')?.value;
  try {
    const data = await fetch(`${URL}/deportes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      credentials: 'include'
    })
    return await data.json();
  } catch (error) {
    console.log(error)
  }
}
export async function listarCanchas(deporte: number) {
  const cookieStore = await cookies();
  const token = cookieStore.get('tkn')?.value;
  try {
    const data = await fetch(`${URL}/canchas?d=${deporte}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      credentials: 'include'
    })
    return await data.json();
  } catch (error) {
    console.log(error)
  }
}
export async function datos_admin() {
  try {
    const cookieStore = await cookies();
    const dd = cookieStore.get('data')?.value;

    if (!dd) {
      return null; // O puedes retornar un string por defecto como 'Invitado'
    }

    const usuario = JSON.parse(dd);

    // Validar que realmente exista la propiedad nombre
    return usuario?.nombre || null;
  } catch (error) {
    // Si la cookie está corrupta o falla el JSON.parse, no rompe la app
    console.error("Error al leer o parsear la cookie de admin:", error);
    return null;
  }
}
export async function traer_token() {
  const cookieStore = await cookies();
  const token = cookieStore.get('tkn')?.value;
  return token;
}
export async function listarCanchasPorAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get('tkn')?.value;
  const dd = cookieStore.get('data')?.value;
  const usuario = dd ? JSON.parse(dd) : null;
  try {
    const data = await fetch(`${URL}/canchas/lista/${usuario.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      credentials: 'include'
    })
    return await data.json();
  } catch (error) {
    console.log(error)
  }
}
export async function listarTurnos(fecha: string, deporte: string) {
  const cookieStore = await cookies();
  const token = cookieStore.get('tkn')?.value;
  try {
    const data = await fetch(`${URL}/turnos?q=${fecha}&d=${deporte}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      credentials: 'include'
    })
    return await data.json();
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}
export async function turnosCompletos(fecha: string) {
  const cookieStore = await cookies();
  const token = cookieStore.get('tkn')?.value;
  try {
    const data = await fetch(`${URL}/turnos/listado?q=${fecha}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      credentials: 'include'
    })
    return await data.json();
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

//////////////////////// POST ////////////////////////
export async function crearCancha(formData: FormData) {
  const cookieStore = await cookies();
  const token = cookieStore.get('tkn')?.value;
  const cancha = Object.fromEntries(formData);
  try {
    const data = await fetch(`${URL}/canchas`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      credentials: 'include',
      body: JSON.stringify(cancha),
    })
    return await data.json();
  } catch (error) {
    throw new Error('Algo salio mal');
  }
}
export async function crearDeporte(formData: FormData) {
  const cookieStore = await cookies();
  const token = cookieStore.get('tkn')?.value;
  const deporte = Object.fromEntries(formData);
  try {
    const data = await fetch(`${URL}/deportes`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      credentials: 'include',
      body: JSON.stringify(deporte),
    })
    return await data.json();
  } catch (error) {
    throw new Error('Algo salio mal');
  }
}
export async function nuevoTurno(nuevo_turno: turno) {
  const cookieStore = await cookies();
  const token = cookieStore.get('tkn')?.value;
  try {
    const data = await fetch(`${URL}/turnos/reservar`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      credentials: 'include',
      body: JSON.stringify(nuevo_turno),
    })
    return await data.json();
  } catch (error) {
    throw new Error('Algo salio mal');
  }
}

//////////////////////// PATCH ////////////////////////
export async function editarDeporte(formData: FormData, id: number | undefined) {
  if(!id) return "Falta el id";
  const cookieStore = await cookies();
  const token = cookieStore.get('tkn')?.value;
  const deporte = Object.fromEntries(formData);
  const bodyData: Record<string, any> = {};

  // Recorremos los inputs y solo agregamos los que tienen valor
  formData.forEach((value, key) => {
    if (value !== "") { // O podés compararlo con el valor original previo
      bodyData[key] = value;
    }
  });
  
  try {
    const data = await fetch(`${URL}/deportes/${id}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      credentials: 'include',
      body: JSON.stringify(bodyData),
    })
    return await data.json();
  } catch (error) {
    throw new Error('Algo salio mal');
  }
}
export async function editarCancha(formData: FormData, id: number | undefined) {
  if(!id) return "Falta el id";
  const cookieStore = await cookies();
  const token = cookieStore.get('tkn')?.value;
  const cancha = Object.fromEntries(formData);
  const bodyData: Record<string, any> = {};

  // Recorremos los inputs y solo agregamos los que tienen valor
  formData.forEach((value, key) => {
    if (value !== "") { // O podés compararlo con el valor original previo
      bodyData[key] = value;
    }
  });
  console.log(bodyData)
  try {
    const data = await fetch(`${URL}/canchas/${id}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      credentials: 'include',
      body: JSON.stringify(bodyData),
    })
    return await data.json();
  } catch (error) {
    throw new Error('Algo salio mal');
  }
}
export async function cobrarTurno(id: number | undefined) {
  if(!id) return "Falta el id";
  const cookieStore = await cookies();
  const token = cookieStore.get('tkn')?.value;
  try {
    const data = await fetch(`${URL}/turnos/${id}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      credentials: 'include',
    })
    return await data.json();
  } catch (error) {
    throw new Error('Algo salio mal');
  }
}

//////////////////////// DELETE ////////////////////////
export async function borrarCancha(id: number) {
  // return { message: "Cancha borrada" }
  const cookieStore = await cookies();
  const token = cookieStore.get('tkn')?.value;
  // if (!token) throw new Error('No autenticado', { cause: 401 });
  try {
    const data = await fetch(`${URL}/canchas/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      credentials: 'include'
    })
    return await data.json();
  } catch (error) {
    throw new Error('Algo salio mal');
  }
}
export async function borrarDeporte(id: number) {
  // return { message: "Cancha borrada" }
  const cookieStore = await cookies();
  const token = cookieStore.get('tkn')?.value;
  // if (!token) throw new Error('No autenticado', { cause: 401 });
  try {
    const data = await fetch(`${URL}/deportes/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      credentials: 'include'
    })
    return await data.json();
  } catch (error) {
    throw new Error('Algo salio mal');
  }
}
