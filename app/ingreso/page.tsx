'use server';
import { redirect } from 'next/navigation';
import { ingresarUsuario, verificarUsuario } from '../lib/metodos';
import { cookies } from "next/headers";

export default async function Page() {
    const cookie = cookies();
    const session = await verificarUsuario(cookie);
    if (session != undefined) redirect('/horarios');
    else return <div className='mt-16 h-screen'>
        <form action={ingresarUsuario} method='POST' className="m-auto w-2/4">
            <div className="pt-12 text-center">
                <h1 className="text-black text-3xl font-bold leading-7 text-gray-900">Ingresar</h1>

                <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-1 w-3/5 m-auto">

                    <div className="sm:col-span-1 sm:col-start-2.">
                        <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                            Email
                        </label>
                        <div className="mt-2">
                            <input
                                type="text"
                                name="email"
                                id="email"
                                autoComplete="address-level2"
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
                </div>
            </div>
        </form>
    </div>
}