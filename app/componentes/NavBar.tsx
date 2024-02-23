'use client'
import Image from "next/image";
import Link from "next/link";
import { usePathname } from 'next/navigation'

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
        {/* <Link
            href="/usuario"
            rel="noopener noreferrer"
            className="w-max.">
            <div>
                <Image alt='user image' src='/user_i.png' width={200} height={200} />
            </div>
        </Link> */}
    </nav>
}