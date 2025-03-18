'use client'
import Image from "next/image";
import Link from "next/link";
import { usePathname } from 'next/navigation'

export default function NavBar() {
    let path = usePathname();
    if (path == '/') return <div className="flex. flex-row. justify-evenly. absolute top-0 mx-0 w-full rounded-md. border-8 bg-greenpitch border-greenpitch p-5">
        <h1 className="font-bold text-white text-center text-2xl">Bienvenido al sitio de reserva de turnos para el fulbito</h1>
        {/* <Link
            href="/ingreso"
            className="absolute top-5 right-0 xl:w-1/5. group. rounded-lg border border-2 border-black bg-black px-5 text-white transition-colors hover:border-white hover:bg-white hover:text-black"
            rel="noopener noreferrer"
        >
            <h2 className={`py-2. xl:p-3. text-xl text-center font-semibold`}>
                Ingresar
            </h2>
        </Link> */}
    </div>
    else if (path == '/ingreso') return <div className="flex. flex-row. justify-evenly. absolute top-0 mx-0 w-full rounded-md. border-8 bg-greenpitch border-greenpitch p-5">
        {/* <h1 className="font-bold text-white text-center text-2xl">Iniciar sesion</h1> */}
        {/* <h1 className="text-black text-3xl font-bold leading-7 text-gray-900">Ingresar</h1> */}
        {/* <Link
            href="/"
            className="relative. top-5. right-0. w-4/5 xl:w-1/5. group. rounded-lg border border-2 border-black bg-black px-5 text-white transition-colors hover:border-white hover:bg-red-900 hover:text-black."
            rel="noopener noreferrer"
        >
            <h2 className={`py-2. xl:p-3. text-xl text-center font-semibold`}>
                Volver
            </h2>
        </Link> */}
    </div>
    else return <nav className='w-full bg-greenpitch text-xl xl:text-l flex flex-row text-center justify-center fixed top-0 text-white'>
        {/* <nav className={`${path == '/' || path == '/ingreso' ? "hidden" : " "} w-full bg-greenpitch text-xl xl:text-l flex flex-row text-center justify-center absolute top-0 text-white`}> */}

        <Image alt='logo' src='/favicon.ico' width={60} height={60} className="hidden xl:block absolute left-1 top-0.5" />
        <Link
            href="/"
            rel="noopener noreferrer"
            className="w-full"
        >
            <div className="py-8 xl:py-5 xl:hover:bg-ligthyellow xl:hover:text-black">Inicio</div>
        </Link>
        <Link
            href="/buscar"
            rel="noopener noreferrer"
            className="w-full">
            <div className={`py-8 xl:py-5 xl:hover:bg-ligthyellow xl:hover:text-black ${path == '/buscar' ? "underline decoration-yellow decoration-4 underline-offset-8" : " "}`}>Buscar</div>
        </Link>
        <Link
            href="/horarios"
            rel="noopener noreferrer"
            className="w-full">
            <div className={`py-8 xl:py-5 xl:hover:bg-ligthyellow xl:hover:text-black  ${path == '/horarios' ? "underline decoration-yellow decoration-4 underline-offset-8" : " "}`}>Reservar</div>
        </Link>
    </nav >
}