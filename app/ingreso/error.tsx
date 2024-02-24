'use client'

import Ingreso from "./page";

export default function Error(
    {
        error,
        reset,
    }: {
        error: Error & { digest?: string };
        reset: () => void;
    }
) {
    return <>
        <Ingreso />
        <div className="relative bottom-64 flex justify-center">
            <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                {error.message}, intente nuevamente
            </label>
        </div>

    </>
}