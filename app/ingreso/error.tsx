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
    return <>
        <div className="h-screen flex flex-col justify-center items-center">
            <label className="block text-3xl font-medium leading-6 text-black">
                {error.message}
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