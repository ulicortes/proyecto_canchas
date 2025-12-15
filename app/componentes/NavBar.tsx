'use client'
import Link from "next/link";
import { usePathname } from 'next/navigation'
import { useState } from "react";
import Image from 'next/image'


export default function NavBar() {
    let path = usePathname();
    let [open, setOpen] = useState(false);

    return <nav className={`w-full h-fit bg-green-950 xl:bg-transparent text-2xl flex flex-col xl:flex-row text-center justify-center fixed ${open?'top-0':'-top-96 xl:top-0'} duration-150 text-white z-50 font-bold`}>
            <Link
                href="/"
                rel="noopener noreferrer"
                className="w-full"
                onClick={() => setOpen(false)}
            >
                <div className={`py-6 xl:py-4 xl:hover:border-b-4 duration-100 ease-in-out ${path == '/' ? "xl:border-b-4" : " "}`}>Inicio</div>
            </Link>
            <Link
                href="/buscar"
                rel="noopener noreferrer"
                className="w-full"
                onClick={() => { setOpen(false); }}
            >
                <div className={`py-6 xl:py-4 xl:hover:border-b-4 duration-100 ease-in-out ${path == '/buscar' ? "xl:border-b-4" : " "}`}>Buscar turnos</div>
            </Link>
            <Link
                href="/horarios"
                rel="noopener noreferrer"
                className="w-full"
                onClick={() => { setOpen(false); }}
            >
                <div className={`py-6 xl:py-4 xl:hover:border-b-4 duration-100 ease-in-out ${path.match('/horarios') || path.includes('horarios/reserva') ? "xl:border-b-4" : " "}`}>Reservar un turno</div>
            </Link>
            <Link
                href="/usuario"
                rel="noopener noreferrer"
                className="w-full xl:w-fit p-2 xl:hover:border-b-4. duration-100 flex flex-col justify-center content-center items-center"
                onClick={() => { setOpen(false); }}
            >
                <div className="block xl:hidden py-6 xl:py-0">Cuenta</div>
                <Image className="w-0 xl:w-40 h-20. bg-transparent" src={'/user_w.png'} alt={"Jorge"} width={200} height={90} />
            </Link>
        <div className="pt-16 pb-4 xl-pt-0 xl:pb-0 w-full xl:hidden" onClick={() => { setOpen(!open); }}>Menu</div>
    </nav >
}