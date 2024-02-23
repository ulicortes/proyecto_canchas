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
        <Ingreso error={error.message}/>
    </>
}