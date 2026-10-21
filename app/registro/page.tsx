'use client';
import { FormEvent, useState } from "react";
import { registrarUsuario } from "../lib/sesion";
import Link from 'next/link';


export default function Registro() {
    const [error_message, setError] = useState<string | null>(null);

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault(); // Evita que la página se recargue
        // setError(null);

        // 2. Extraés los datos del formulario
        const formData = new FormData(e.currentTarget);

        try {
            // Si registrarUsuario es una Server Action o función asíncrona:
            const resultado = await registrarUsuario(formData);
            if (!resultado.success) setError(resultado.error);

            // if (!resultado.success) {
            //     setError(resultado.error);
            //     return;
            // }

            // Éxito: podés redirigir o limpiar el formulario
        } catch (err) {
            // setError('Ocurrió un error inesperado');
        }
    }

    return <div className="content-center w-screen h-screen">
        <form onSubmit={handleSubmit} className="xl:m-auto xl:w-2/4 bg-white/70 shadow-xl shadow-black/50 rounded-md py-2">
            <div className="text-center">
                <h1 className="text-3xl font-bold leading-7 text-neutral-950">Registrate</h1>

                <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-1 w-3/5 m-auto">


                    <div className="sm:col-span-1">
                        <label htmlFor="city" className="block text-md font-semibold leading-6 text-neutral-950">
                            Email
                        </label>
                        <div className="mt-2">
                            <input
                                type="email"
                                name="mail"
                                id="mail"
                                autoComplete="address-level2"
                                required
                                className="text-center block w-full rounded-md border-2 border-transparent py-1.5 text-neutral-950 shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-black sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-1">
                        <label htmlFor="city" className="block text-md font-semibold leading-6 text-neutral-950">
                            Contacto
                        </label>
                        <div className="mt-2">
                            <input
                                type="text"
                                name="contacto"
                                id="pass"
                                autoComplete="address-level2"
                                required
                                className="text-center block w-full rounded-md border-2 border-transparent py-1.5 text-neutral-950 shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-black sm:text-sm sm:leading-6"
                            />

                        </div>
                    </div>

                    <div className="sm:col-span-1">
                        <label htmlFor="city" className="block text-md font-semibold leading-6 text-neutral-950">
                            Nombre de usuario
                        </label>
                        <div className="mt-2">
                            <input
                                type="text"
                                name="usuario"
                                id="user"
                                autoComplete="address-level2"
                                required
                                className="text-center block w-full rounded-md border-2 border-transparent py-1.5 text-neutral-950 shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-black sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-1">
                        <label htmlFor="city" className="block text-md font-semibold leading-6 text-neutral-950">
                            Contraseña
                        </label>
                        <div className="mt-2">
                            <input
                                type="password"
                                name="clave"
                                id="pass"
                                autoComplete="address-level2"
                                required
                                className="text-center block w-full rounded-md border-2 border-transparent py-1.5 text-neutral-950 shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-black sm:text-sm sm:leading-6"
                            />
                            <p className='text-sm mt-2 xl:relative xl:left-0 xl:w-full'>(minimo 6 caracteres y maximo 20)</p>

                        </div>
                    </div>
                    <div className="sm:col-span-1">
                        <label htmlFor="tipo" className="block text-md font-semibold leading-6 text-neutral-950">
                            Tipo de usuario
                        </label>
                        <div className="mt-2">
                            <select
                                name="tipo"
                                id="tipo"
                                defaultValue="jugador"
                                required
                                className="text-center block w-full rounded-md border-2 border-transparent py-1.5 text-neutral-950 shadow-sm focus:outline-none focus:border-black sm:text-sm sm:leading-6"
                            >
                                <option value="jugador">Jugador</option>
                                <option value="administrador">Administrador</option>
                            </select>
                        </div>
                    </div>
                    <label className="h-5 w-full bg-transparent text-red-700 font-bold">{error_message}</label>
                    {/* {error_message ? <label className="h-20 w-full bg-black text-red-300 font-bold">{error_message}</label> : <></>} */}
                    <div className="sm:col-span-1 self-end">
                        <button
                            type="submit"
                            className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-greenpitch focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Registrarse
                        </button>
                    </div>
                    <div className="sm:col-span-1 self-end">
                        <button
                            className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            <Link href="/">
                                Volver
                            </Link>
                        </button>
                    </div>
                </div>
            </div>
        </form>
    </div>
}