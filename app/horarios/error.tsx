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
        <main className="flex h-screen flex-col justify-center content-center items-center">
            <div className="flex flex-col justify-around items-center w-3/5 h-2/5 text-center bg-gray-100 rounded-md my-12. p-2">
                <h2 className="text-center text-3xl w-5/5 font-bold">{error.message}</h2>
                <div className="flex flex-row justify-around w-4/5">
                    <button
                        type="submit"
                        onClick={
                            () => reset()
                        }
                        className="rounded-md bg-black px-2 py-1 text-xl font-semibold text-white shadow-sm hover:bg-yellow hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Intentar otra vez
                    </button>
                    <Link
                        href='/'
                        rel="noopener noreferrer"
                    >
                        <button
                            type="submit"
                            className="rounded-md bg-black px-2 py-1 text-xl font-semibold text-white shadow-sm hover:bg-yellow hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Volver al inicio
                        </button>
                    </Link>
                </div>
            </div>
        </main>
    );
}