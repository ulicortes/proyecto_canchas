'use server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { usuario } from './tipos';
import { cookies } from 'next/headers';

const URL = process.env.NEXT_PUBLIC_AUTH_URL;
const baseUrl = "proyecto-canchas-xi.vercel.app";

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

    // let rsp = await fetch(`${URL}/auth/login`, {
    //     method: "POST",
    //     headers: {
    //         "Content-type": "Application/json"
    //     },
    //     body: JSON.stringify(login_user)
    // })
    // if (rsp.status == 200) {
        // let data = await rsp.json();
        let user = login_user.user || "";
        // setTokens(data.token, user);
        setTokens('123456', user);
    // }
    // return rsp.status;
    return 200;
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