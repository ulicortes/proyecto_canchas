'use client'
import Image from "next/image";
import Link from "next/link";
import { usePathname } from 'next/navigation'
import { useState } from "react";

export default function NavBar() {
    let path = usePathname();
    let [arrow, setArrow] = useState("▼");
    let crrnt = path == "/buscar" ? "Buscar": "Horarios";
    let [open, setOpen] = useState(false);
    let [current, setCurrent] = useState(crrnt);
    let toggle = () => {
        setOpen(!open);
    }
    if (path == '/') return <div className="absolute top-0 mx-0 w-full border-8 bg-greenpitch border-greenpitch p-5">
        <h1 className="font-bold text-white text-center text-2xl">Bienvenido al sitio de reserva de turnos para el fulbito</h1>
    </div>
    else return <nav className={`${open ? 'translate-y-0 xl:translate-y-0':'-translate-y-72 xl:translate-y-0'} duration-300 w-full bg-greenpitch text-xl xl:text-l flex flex-col xl:flex-row text-center justify-center fixed top-0. text-white`}>
        <Image alt='logo' src='/favicon.ico' width={60} height={60} className="xl:block absolute left-1 top-0.5" />
        <Link
            href="/"
            rel="noopener noreferrer"
            className="w-full"
            onClick={()=>setOpen(false)}
        >
            <div className="py-8 xl:py-5 xl:hover:bg-ligthyellow xl:hover:text-black">Inicio</div>
        </Link>
        <Link
            href="/buscar"
            rel="noopener noreferrer"
            className="w-full"
            onClick={()=>{setCurrent("Buscar"); setOpen(false); setArrow("▼")}}
            >
            <div className={`py-8 xl:py-5 xl:hover:bg-ligthyellow xl:hover:text-black ${path == '/buscar'|| path == "/ingreso" ? "underline decoration-yellow decoration-4 underline-offset-8" : " "}`}>Buscar</div>
        </Link>
        <Link
            href="/horarios"
            rel="noopener noreferrer"
            className="w-full"
            onClick={()=>{setCurrent("Horarios"); setOpen(false); setArrow("▼")}}
            >
            <div className={`py-8 xl:py-5 xl:hover:bg-ligthyellow xl:hover:text-black  ${path == '/horarios' ? "underline decoration-yellow decoration-4 underline-offset-8" : " "}`}>Reservar</div>
        </Link>
        <div className="pt-6 pb-2 xl-pt-0 xl:pb-0 w-full xl:hidden" onClick={()=>{setOpen(!open); setArrow(arrow=="▲"?"▼":"▲")}}>{current} {arrow}</div>
    </nav >
}