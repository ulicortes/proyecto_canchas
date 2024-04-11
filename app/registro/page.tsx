'use client';
import { registrarUsuario } from "../lib/metodos";

export default function Registro() {
    return <div>
        <form action={registrarUsuario} className="m-auto w-2/4 mt-16 h-screen">
                <div className="pt-12 text-center">
                    <h1 className="text-3xl font-bold leading-7 text-gray-900">Registrate</h1>

                    <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-1 w-3/5 m-auto">

                        <div className="sm:col-span-1">
                            <label htmlFor="city" className="block text-md font-medium leading-6 text-gray-900">
                                Nombre de usuario
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="user"
                                    id="user"
                                    autoComplete="address-level2"
                                    required
                                    className="text-center block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-4 ring-offset ring-black placeholder:text-gray-400 focus:ring-8 focus:ring-offset focus:ring-yellow-500 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-1">
                            <label htmlFor="city" className="block text-md font-medium leading-6 text-gray-900">
                                Contraseña
                            </label>
                            <div className="mt-2">
                                <input
                                    type="password"
                                    name="pass"
                                    id="pass"
                                    autoComplete="address-level2"
                                    required
                                    className="text-center block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-4 ring-offset ring-black placeholder:text-gray-400 focus:ring-8 focus:ring-offset focus:ring-yellow-500 sm:text-sm sm:leading-6"
                                />
                            </div>
                            <p className='text-sm mt-2 w-72 absolute left-8 xl:relative xl:left-0 xl:w-full'>(minimo 6 caracteres y maximo 20)</p>
                        </div>

                        <div className="sm:col-span-1">
                            <label htmlFor="city" className="block text-md font-medium leading-6 text-gray-900">
                                Email
                            </label>
                            <div className="mt-2">
                                <input
                                    type="email"
                                    name="mail"
                                    id="mail"
                                    autoComplete="address-level2"
                                    required
                                    className="text-center block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-4 ring-offset ring-black placeholder:text-gray-400 focus:ring-8 focus:ring-offset focus:ring-yellow-500 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-1 self-end">
                            <button
                                type="submit"
                                className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-greenpitch focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Registrarse
                            </button>
                        </div>
                    </div>
                </div>
            </form>
    </div>
}