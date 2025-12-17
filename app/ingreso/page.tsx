'use client';
import { ingresarUsuario } from '../lib/sesion';
import Link from 'next/link';
import { redirect, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import Loading from '../loading';

export default function Page(this: any, {
    searchParams,
}: {
    searchParams: {
        sendTo: string
    };
}) {
    let [loading, setLoading] = useState(false);
    let url = useSearchParams().get('returnUrl') || "";
    
    return <div className='content-center w-screen h-screen'>
        {loading ? <Loading message={"Verificando usuario..."} /> :
            <form action={ingresarUsuario} method='POST' className="bg-white/70 shadow-xl shadow-black/50 m-auto py-2 w-3/4 xl:w-2/4 rounded-md">
                <div className="text-center content-center">
                    <input type="text" name='returnUrl' value={url} hidden />
                    <h1 className="text-black text-3xl font-bold leading-7 text-neutral-950">Iniciar sesion</h1>
                    <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-1 w-3/5 m-auto content-center">

                        <div className="sm:col-span-1 sm:col-start-2.">
                            <label htmlFor="city" className="block text-sm font-semibold leading-6 text-neutral-950">
                                Nombre de usuario
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="mail"
                                    id="user"
                                    autoComplete="address-level2"
                                    required
                                    className="text-center block w-full rounded-md border-2 border-transparent py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-black sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-1 sm:col-start-2.">
                            <label htmlFor="city" className="block text-sm font-semibold leading-6 text-neutral-950">
                                Contraseña
                            </label>
                            <div className="mt-2">
                                <input
                                    type="password"
                                    name="pass"
                                    id="pass"
                                    autoComplete="address-level2"
                                    required
                                    className="text-center block w-full rounded-md border-2 border-transparent py-1.5 text-gray-900 shadow-sm ring-2. ring-inset ring-neutral-950 placeholder:text-gray-400 focus:outline-none focus:border-black sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-1 self-end">
                            <button
                                type="submit"
                                className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Ingresar
                            </button>
                        </div>
                        <div className="sm:col-span-1 self-end">
                            <h6>No tenes una cuenta?
                                <Link
                                    href={'/registro'}
                                    className="xl:w-min group rounded-lg border border-2 border-transparent px-1 transition-colors hover:text-greenpitch hover:underline hover:underline-offset-2"
                                    rel="noopener noreferrer"
                                >
                                    Registrate aca
                                </Link>
                            </h6>
                        </div>
                        <div className="sm:col-span-1 self-end">
                            <button
                                className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-800 hover:text-black. focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                <Link href="/">
                                    Volver
                                </Link>
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        }
    </div>
}