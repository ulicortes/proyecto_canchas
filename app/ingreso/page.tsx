'use client';
import { ingresarUsuario, verificarUsuario } from '../lib/metodos';
import { cookies } from "next/headers";
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';


export default async function Page(this: any, {
    searchParams,
}: {
    searchParams: {
        sendTo: string
    };
}) {
    let sendTo = searchParams.sendTo;
    // const cookie = cookies();
    // const session = await verificarUsuario(cookie);
    // if(sendTo != undefined) redirect('/horarios')
    // if (session != undefined) {
    //     redirect('/horarios');
    // }
    // else
    let param = useSearchParams().get('returnUrl');
    return <div className='mt-16. content-center w-screen h-screen'>
        {/* <div className="top-0 mx-0 w-full rounded-md. border-8 bg-greenpitch border-greenpitch p-5">
            <h1 className="font-bold text-white text-center text-2xl">Bienvenido al sitio de reserva de turnos para el fulbito</h1>
        </div> */}
        <form action={ingresarUsuario} method='POST' className="m-auto w-2/4 content-center.">
            <div className="pt-12. text-center content-center">
                <h1 className="text-black text-3xl font-bold leading-7 text-gray-900">Iniciar sesion</h1>
                <input name="url" value={param || ""} hidden/>
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
                    <div className="sm:col-span-1 self-end">
                        <h6>No tenes una cuenta?
                            <Link
                                href={'/registro'}
                                className="xl:w-min group rounded-lg border border-2 border-transparent px-1 transition-colors hover:text-greenpitch hover:underline hover:underline-offset-2"
                                rel="noopener noreferrer"
                            >
                                {/* <button
                                type="submit"
                                className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-greenpitch hover:text-black. focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Registrarse
                            </button> */}
                                Registrate aca
                            </Link>
                        </h6>
                    </div>
                    <div className="sm:col-span-1 self-end">
                        <button
                            type="submit"
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
    </div>
}