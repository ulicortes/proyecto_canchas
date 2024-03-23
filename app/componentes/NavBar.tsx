'use client'
import Image from "next/image";
import Link from "next/link";
import { usePathname } from 'next/navigation'

export default function NavBar() {
    let path = usePathname();
    return <nav className={`${path == '/' ? "hidden" : " "} w-full bg-greenpitch flex flex-row justify-center justify-items-center absolute top-0 text-center text-white`}>
        <Image alt='logo' src='/favicon.ico' width={60} height={60} className="hidden xl:block absolute left-1 top-0.5" />
        <Link
            href="/"
            rel="noopener noreferrer"
            className="w-full"
        >
            <div className="py-2 xl:py-5 xl:hover:bg-ligthyellow xl:hover:text-black">Inicio</div>
        </Link>
        <Link
            href="/buscar"
            rel="noopener noreferrer"
            className="w-full">
            <div className={`py-2 xl:py-5 xl:hover:bg-ligthyellow xl:hover:text-black ${path == '/buscar' ? "underline decoration-yellow decoration-4 underline-offset-8" : " "}`}>Buscar</div>
        </Link>
        <Link
            href="/horarios"
            rel="noopener noreferrer"
            className="w-full">
            <div className={`py-2 xl:py-5 xl:hover:bg-ligthyellow xl:hover:text-black  ${path == '/horarios' ? "underline decoration-yellow decoration-4 underline-offset-8" : " "}`}>Reservar</div>
        </Link>
    </nav>
}