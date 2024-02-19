'use client'
import Image from "next/image";
import Link from "next/link";
import { usePathname } from 'next/navigation'
import { logout } from "../lib/authenticate";
import getSession from "../lib/authenticate";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export default function NavBar() {
    let path = usePathname();
    return <nav className={`${path == '/' ? "hidden" : " "} w-full bg-yellow-300 flex flex-row justify-evenly justify-items-center absolute top-0 text-center`}>
        <Image alt='logo' src='/favicon.ico' width={60} height={60} className="hidden xl:block absolute left-1 top-0.5" />
        <Link
            href="/"
            rel="noopener noreferrer"
            className="w-full"
        >
            <div className="py-2 xl:py-5 xl:hover:bg-yellow-500">Inicio</div>
        </Link>
        <Link
            href="/buscar"
            rel="noopener noreferrer"
            className="w-full">
            <div className={`py-2 xl:py-5 xl:hover:bg-yellow-500 ${path == '/buscar' ? "bg-yellow-500" : " "}`}>Buscar</div>
        </Link>
        <Link
            href="/horarios"
            rel="noopener noreferrer"
            className="w-full">
            <div className={`py-2 xl:py-5 xl:hover:bg-yellow-500 ${path == '/horarios' ? "bg-yellow-500" : " "}`}>Reservar</div>
        </Link>
        <div>
            <button type='submit'
                onClick={() => {
                    logout();
                }}
                className={`w-full flex h-[48px]. grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3 `}>
                <div className="hidden md:block">Salir</div>
            </button>
        </div>
    </nav>
}