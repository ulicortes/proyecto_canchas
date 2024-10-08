'use client'

import Link from "next/link";

export default function Error(
    {
        error,
        reset
    }: {
        error: Error & { digest?: string };
        reset: () => void;
    }
) {
    if(error.message == "1") return <>
        <div className="h-screen flex flex-col justify-center items-center">
            <label className="block text-3xl font-medium leading-6 text-black">
                Usuario o clave erroneos, intente nuevamente
            </label>
            <button
                className="bg-black text-white hover:bg-yellow hover:text-black py-2 px-2 rounded-md mt-4"
                onClick={
                    () => reset()
                }>
                Intentar otra vez
            </button>
        </div>
    </>
    else return <>
    <div className="h-screen flex flex-col justify-center items-center">
            <label className="block text-3xl font-medium leading-6 text-black">
                Usuario inexistente
            </label>
            <button
                className="bg-black text-white hover:bg-yellow hover:text-black py-2 px-2 rounded-md mt-8"
                onClick={
                    () => reset()
                }>
                Intentar otra vez
            </button>
            <Link
                href={'/registro'}
                className="bg-black text-white hover:bg-yellow hover:text-black py-2 px-2 rounded-md mt-8"
                rel="noopener noreferrer"
            >
                Registrarse
            </Link>
        </div>
    </>
}