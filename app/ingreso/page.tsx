'use client';
import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from '@/app/lib/metodos';

export default function Ingreso() {
    const [mensajeError, dispatch] = useFormState(authenticate, undefined);

    return <div>
        <form action={dispatch} className="m-auto w-2/4">
            <div className="pt-12 text-center">
                <h1 className="text-base text-3xl font-bold leading-7 text-gray-900">Ingresa</h1>

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
                                name="password"
                                id="password"
                                autoComplete="address-level2"
                                className="text-center block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <LoginButton />
                </div>
                <div
                    className="flex h-8 items-end space-x-1"
                    aria-live="polite"
                    aria-atomic="true"
                >
                    {mensajeError && (
                        <>
                            <p className="text-sm text-black">{mensajeError}</p>
                        </>
                    )}
                </div>
            </div>
        </form>
    </div>
}

function LoginButton() {
    const { pending } = useFormStatus();

    return (
        <div className="sm:col-span-1 self-end">
            <button
                type="submit"
                className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                Ingresar
            </button>
        </div>
    );
}