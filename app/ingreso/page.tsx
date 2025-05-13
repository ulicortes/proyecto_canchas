'use client';
import { ingresarUsuario } from '../lib/metodos';
import Link from 'next/link';
import { redirect, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import Loading from '../loading';
import { revalidatePath } from 'next/cache';

export default function Page(this: any, {
    searchParams,
}: {
    searchParams: {
        sendTo: string
    };
}) {
    let [loading, setLoading] = useState(false);
    let [usr, setUsr] = useState("");
    let [ps, setPs] = useState("");
    let param = useSearchParams().get('returnUrl');

    const check = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!usr || !ps) {
            return;
        }
        setLoading(true);
        try {
            await ingresarUsuario(usr, ps, param || "");
        } catch (error) {
            throw new Error('Usuario o contraseña incorrectos. Intente nuevamente');
        } 
        finally {
            setLoading(false);
        }
    }
    return <div className='content-center w-screen h-screen'>
        {loading ? <Loading message={"Verificando usuario..."} /> :
            <form onSubmit={check} method='POST' className="m-auto w-2/4">
                <div className="pt-12. text-center content-center">
                    <h1 className="text-black text-3xl font-bold leading-7 text-gray-900">Iniciar sesion</h1>
                    <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-1 w-3/5 m-auto content-center">

                        <div className="sm:col-span-1 sm:col-start-2.">
                            <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                Nombre de usuario
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="user"
                                    id="user"
                                    autoComplete="address-level2"
                                    required
                                    // value={usr}
                                    onChange={(e) => {
                                        setUsr(e.target.value)
                                    }}
                                    className="text-center block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-1 sm:col-start-2.">
                            <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                Contraseña
                            </label>
                            <div className="mt-2">
                                <input
                                    type="password"
                                    name="pass"
                                    id="pass"
                                    autoComplete="address-level2"
                                    required
                                    // value={ps}
                                    onChange={(e) => {
                                        setPs(e.target.value)
                                    }}
                                    className="text-center block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                                // type="submit"
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