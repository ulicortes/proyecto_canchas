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
    return <div className="h-screen flex flex-col justify-center items-center">
        <div className="bg-white/70 shadow-xl shadow-black/50 m-auto py-12 w-3/4 xl:w-2/5 rounded-md content-center flex flex-col justify-center items-center">
            <label className="block text-3xl font-medium leading-6 text-black">
                {error.message}
            </label>
            <div className="flex flex-row justify-evenly items-center w-full">
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
        </div>
    </div>

}