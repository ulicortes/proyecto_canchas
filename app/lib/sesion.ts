'use server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

const URL = process.env.NEXT_PUBLIC_AUTH_URL;
const baseUrl = "proyecto-canchas-xi.vercel.app";
const _backendurl_ = process.env.BACKEND_URL;

interface user {
    nombre?: string;
    clave?: string;
    mail?: string;
    contacto?: string;
    tipo?: string;
}

type LoginResult =
    | { success: true; id: string; nombre: string }
    | { success: false; error: string; status?: number };

enum mensaje {
    NO_CRED = "Faltan credenciales",
    NO_SERV = "No se pudo conectar con el servidor",
    NO_ING = "Error en el ingreso",
    NO_USR_PSW = "Usuario o contraseña incorrectos",
    NO_PSW = "La contraseña debe tener entre 6 y 20 caracteres",
    NO_CMP = "Todos los campos son obligatorios"
}

export async function registrarUsuario(formData: FormData): Promise<LoginResult> {
    const camposRequeridos = ['usuario', 'clave', 'mail', 'contacto', 'tipo'];

    const faltanCampos = camposRequeridos.some(campo => !formData.get(campo));

    if (faltanCampos) return { success: false, error: mensaje.NO_CMP };

    let nuevoUsuario: user = {
        nombre: formData.get('usuario')?.toString(),
        clave: formData.get('clave')?.toString(),
        mail: formData.get('mail')?.toString(),
        contacto: formData.get('contacto')?.toString(),
        tipo: formData.get('tipo')?.toString(),
    }

    if (nuevoUsuario.clave && (nuevoUsuario.clave.length < 6 || nuevoUsuario.clave.length > 20)) return { success: false, error: mensaje.NO_PSW };

    let data;
    try {
        let rsp = await fetch(`${_backendurl_}/usuarios`, {
            method: "POST",
            headers: {
                "Content-type": "Application/json"
            },
            body: JSON.stringify(nuevoUsuario)
        })
        if (!rsp.ok) return { success: false, error: mensaje.NO_CRED }
        data = await rsp.json();
    } catch (error) {
        return { success: false, error: mensaje.NO_SERV }
    }
    revalidatePath('/');
    redirect('/');
}

export async function ingresarUsuario(formData: FormData) {
    const camposRequeridos = ['mail', 'clave'];

    const faltanCampos = camposRequeridos.some(campo => !formData.get(campo));

    if (faltanCampos) return { success: false, error: mensaje.NO_CMP };
    let login_user = {
        mail: formData.get('mail')?.toString() || "",
        clave: formData.get('clave')?.toString() || ""
    }
    let token: string
    let usuario
    try {
        let rsp = await fetch(`${_backendurl_}/usuarios/ingreso`, {
            method: "POST",
            headers: {
                "Content-type": "Application/json"
            },
            credentials: 'include',
            body: JSON.stringify(login_user)
        })
        if (!rsp.ok) return { success: false, error: mensaje.NO_USR_PSW }
        let data = await rsp.json();
        token = data.token;
        usuario = data.usuario;
    } catch (e) {
        console.error("Error en ingresarUsuario:", e);
        return { success: false, error: mensaje.NO_SERV }
    }
    const cookieStore = await cookies()
    cookieStore.set('tkn', token, {
        path: '/',
        httpOnly: true,
        // secure: true,
        sameSite: 'lax',
        maxAge: 3600,
    })
    cookieStore.set('data', JSON.stringify(usuario), {
        path: '/',
        httpOnly: false,
        // secure: true,
        sameSite: 'lax',
        maxAge: 3600,
    })
    revalidatePath('/');
    redirect('/horarios');
}

export async function signOut() {
    // try {
    //     await fetch('${_backendurl_}/usuarios/logout', {
    //         method: 'POST',
    //         headers: {
    //             Cookie: `authToken=${"token"}`, // reenviás la cookie para que el back sepa qué sesión matar
    //         },
    //     })
    // } catch (err) {
    //     return { success: false, error: mensaje.NO_SERV }
    //     // no bloqueamos el logout local aunque falle el backend
    // }

    // pase lo que pase con el backend, borrás la cookie local de Next
    (await
        // try {
        //     await fetch('${_backendurl_}/usuarios/logout', {
        //         method: 'POST',
        //         headers: {
        //             Cookie: `authToken=${"token"}`, // reenviás la cookie para que el back sepa qué sesión matar
        //         },
        //     })
        // } catch (err) {
        //     return { success: false, error: mensaje.NO_SERV }
        //     // no bloqueamos el logout local aunque falle el backend
        // }
        // pase lo que pase con el backend, borrás la cookie local de Next
        cookies()).delete('tkn');
    (await cookies()).delete('data');
    console.log("token eliminado")
    revalidatePath('/')
    redirect('/ingreso')
}

export async function deleteCookies() {
    async function setTokens() {
        (await cookies()).delete('authToken')
        ;(await cookies()).delete('user')
    }
    return setTokens();
}

