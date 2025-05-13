'use client';

import Link from 'next/link';

export default function Error(
    {
        error,
        reset,
    }: {
        error: Error & { digest?: string };
        reset: () => void;
    }
) {
    return (
        <main className="flex h-screen flex-col items-center justify-center">
            <h2 className="text-center text-3xl m-5">Fallo la carga de turnos</h2>
            <div className="flex flex-row justify-around w-2/4">
                <button
                    type="submit"
                    onClick={
                        () => reset()
                    }
                    className="rounded-md bg-black px-2 py-1 text-xl font-semibold text-white shadow-sm hover:bg-yellow hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Volver a cargar turnos
                </button>
            </div>
        </main>
    );
}