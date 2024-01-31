'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function Error(
    {
        error,
        reset,
      }: {
        error: Error & { digest?: string };
        reset: () => void;
      }
) {
    //   useEffect(() => {
    //     // Optionally log the error to an error reporting service
    //     console.error(error);
    //   }, [error]);

    return (
        <main className="flex h-screen flex-col items-center justify-evenly">
            <h2 className="text-center text-3xl">No se pudo reservar el turno!</h2>
            <div className="flex flex-row justify-around w-2/4">
                <button
                    type="submit"
                    onClick={
                        // Attempt to recover by trying to re-render the invoices route
                        () => reset()
                        }
                    className="rounded-md bg-black px-2 py-1 text-xl font-semibold text-white shadow-sm hover:bg-yellow-300 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Reservar otro turno
                </button>
                <Link
                    href='/'
                    rel="noopener noreferrer"
                >
                    <button
                        type="submit"
                        className="rounded-md bg-black px-2 py-1 text-xl font-semibold text-white shadow-sm hover:bg-yellow-300 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Volver al inicio
                    </button>
                </Link>
            </div>
        </main>
    );
}