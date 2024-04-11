'use client'
import Link from "next/link";
import { logout } from "../lib/authenticate";
import { redirect } from "next/navigation";

export default function Page({ searchParams }: {
    searchParams?: {
        usuario: string
    };
}) {
    if (searchParams?.usuario == undefined) redirect('/ingreso')
    else return <>
        <div className="flex flex-col justify-center pt-24. items-center w-full h-screen">
            <h1 className="text-5xl">Hola {searchParams?.usuario}</h1>
            <div className="flex flex-row">
                <button type='submit'
                    onClick={() => {
                        logout();
                    }}
                    className={`flex grow items-center justify-center gap-2 m-5 rounded-md bg-black text-center text-white p-3 text-sm font-medium hover:bg-brigthred hover:text-white md:flex-none md:justify-start md:p-2 md:px-3`}>
                    <div className="md:block">Salir</div>
                </button>
                <Link href={'/buscar'}>
                    <button type='submit'
                        className={`flex grow items-center justify-center gap-2 m-5 rounded-md bg-black text-center text-white p-3 text-sm font-medium hover:bg-yellow hover:text-black md:flex-none md:justify-start md:p-2 md:px-3`}>
                        <div className="md:block">Volver</div>
                    </button>
                </Link>
            </div>
        </div>
    </>
}