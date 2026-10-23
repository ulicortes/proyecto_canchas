'use client'
import Link from "next/link";
import { usePathname } from 'next/navigation'
import { useEffect, useState } from "react";
import Image from 'next/image'
import { signOut } from "../lib/sesion";
import { datos_admin } from "../lib/metodos";

export default function NavBar() {
    let path = usePathname();
    let [seccion, setSeccion] = useState<string>(path);
    const [usuario, setUsuario] = useState<string>("");
    const [popup, setPopup] = useState<boolean>(false);
    const [menuMobileAbierto, setMenuMobileAbierto] = useState<boolean>(false);

    // Sincronizar la sección actual si el path cambia externamente
    useEffect(() => {
        setSeccion(path);
    }, [path]);

    useEffect(() => {
        async function cargarDeportes() {
            try {
                const usuarioResult = await datos_admin();
                setUsuario(usuarioResult);
            } catch (error) {
                console.log(error)
            }
        }
        cargarDeportes()
    }, []);

    async function desloguear() {
        try {
            await signOut();
        } catch (error) {
            console.log(error)
        }
    }

    const handleNavegacion = (ruta: string) => {
        setSeccion(ruta);
        setMenuMobileAbierto(false);
    };

    const enlaces = [
        { href: "/horarios", label: "Reservar un turno" },
        { href: "/buscar", label: "Turnos" },
        // { href: "/perfil", label: "Panel" },
    ];

    return (
        usuario && <nav className="sticky top-0 w-full h-fit flex flex-col md:flex-row justify-between md:justify-center items-center bg-black/70 z-50">
            <div className="w-full md:w-[95%] h-full flex flex-row text-white items-center justify-start md:justify-start p-2">

                {/* Botón Hamburguesa (solo visible en pantallas móviles) */}
                <button
                    onClick={() => setMenuMobileAbierto(!menuMobileAbierto)}
                    className="md:hidden p-2. text-white focus:outline-none"
                    aria-label="Abrir menú"
                >
                    <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                        {menuMobileAbierto ? (
                            <path fillRule="evenodd" clipRule="evenodd" d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z" />
                        ) : (
                            <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
                        )}
                    </svg>
                </button>

                {/* Enlaces Desktop */}
                <div className="hidden md:w-1/4 md:flex flex-row justify-evenly items-center p-2. rounded-lg">
                    {enlaces.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            rel="noopener noreferrer"
                            className="w-fit"
                            onClick={() => handleNavegacion(link.href)}
                        >
                            <div
                                className={`text-xl font-bold px-6 py-1 transition-colors rounded-lg ${seccion === link.href ? "bg-white/90 rounded-lg text-black" : "text-white hover:text-slate-900 hover:bg-white"
                                    }`}
                            >
                                {link.label}
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Usuario */}
                <div className="ml-auto w-auto md:w-fit h-full text-lg md:text-md content-center">
                    <div
                        onClick={() => setPopup(!popup)}
                        className="font-bold px-2 flex flex-row justify-evenly items-center rounded-lg bg-white transition-colors ease-in-out hover:bg-green-100 cursor-pointer select-none"
                    >
                        <img src="person.svg" alt="deporte" className="w-5" />
                        <h1 className="px-1 max-w-[50px]. md:max-w-none truncate. text-black">{usuario}</h1>
                        <img
                            src="flecha_abajo.svg"
                            alt="deporte"
                            className={`w-4 transition-transform duration-300 ${popup ? 'rotate-180' : 'rotate-0'}`}
                        />
                    </div>
                </div>
            </div>

            <div
                className={`md:hidden absolute top-full left-0 w-full flex flex-col bg-black/90 border-t-2 border-white rounded-b-lg px-2 py-10 text-white space-y-2 z-50 transition-all duration-300 ease-in-out transform origin-top ${menuMobileAbierto
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 -translate-y-4 pointer-events-none"
                    }`}
            >
                {enlaces.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        rel="noopener noreferrer"
                        onClick={() => handleNavegacion(link.href)}
                        className={`px-4 py-2 text-lg font-bold rounded-md transition-colors ${seccion === link.href ? "bg-white text-black" : "hover:bg-white/20"
                            }`}
                    >
                        {link.label}
                    </Link>
                ))}
            </div>

            {/* Popup del perfil con transición suave de apertura y cierre */}
            <div
                className={`absolute top-full right-4 md:right-[2.5%] z-50 w-56 md:w-56 h-fit bg-black/90 rounded-b-xl shadow-2xl shadow-black p-3 text-slate-800 transition-all duration-300 ease-in-out transform origin-top ${popup
                    ? "opacity-100 translate-y-0 scale-y-100 pointer-events-auto"
                    : "opacity-0 -translate-y-3 scale-y-95 pointer-events-none"
                    }`}
            >
                {/* <button className="w-full text-sm text-start font-bold hover:underline text-white rounded-lg transition-colors cursor-pointer py-1 bg-red-200"> */}
                    <Link
                        href={"/perfil"}
                        rel="noopener noreferrer"
                        onClick={() => {handleNavegacion("/perfil"); setPopup(!popup)}}
                        className="w-full block text-sm text-start font-bold hover:underline text-white rounded-lg transition-colors cursor-pointer py-1 "
                    >
                        Panel
                    </Link>
                {/* </button> */}
                
                <button
                    type="button"
                    className="w-full text-sm text-start font-bold hover:underline text-white rounded-lg transition-colors cursor-pointer py-1"
                    onClick={desloguear}
                >
                    Cerrar sesión
                </button>
            </div>
        </nav>
    );
}