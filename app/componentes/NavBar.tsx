import Image from "next/image";
import Link from "next/link";
import { metadata } from "../layout";

export default function NavBar() {

    return <nav className="w-full py-2. xl:py-5. bg-yellow-300 flex flex-row justify-evenly justify-items-center absolute top-0 text-center">
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
            <div className={`py-2 xl:py-5 xl:hover:bg-yellow-500 ${metadata.title == 'Buscar' ? "bg-yellow-500" : " "}`}>Buscar</div>
        </Link>
        <Link
            href="/horarios"
            rel="noopener noreferrer"
            className="w-full">
            <div className={`py-2 xl:py-5 xl:hover:bg-yellow-500 ${metadata.title == 'Horarios' ? "bg-yellow-500" : " "}`}>Reservar</div>
        </Link>
        {/* {metadata.title == 'Buscar' ? <>
            <div className="bg-yellow-500 py-2 w-full xl:py-5">Buscar</div>
            <div className="py-2 xl:py-5 w-full">Reservar</div>
        </> :
            <>
                <div className="py-2 w-full xl:py-5">Buscar</div>
                <div className="bg-yellow-500 py-2 xl:py-5 w-full">Reservar</div>
            </>} */}
    </nav>
}