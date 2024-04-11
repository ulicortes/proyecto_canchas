'use client';

import Link from 'next/link';

export default function Error(
    {
        error,
    }: {
        error: Error & { digest?: string };
    }
) {
    return (
        <main className="flex h-screen flex-col items-center justify-evenly">
            <h2 className="text-center text-3xl">{error.message}</h2>
            <div className="flex flex-row justify-around w-2/4">
                <Link
                    href='/buscar'
                    rel="noopener noreferrer"
                >
                    <button
                        type="submit"
                        className="rounded-md bg-black px-2 py-1 text-xl font-semibold text-white shadow-sm hover:bg-yellow hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Volver
                    </button>
                </Link>
            </div>
        </main>
    );
}