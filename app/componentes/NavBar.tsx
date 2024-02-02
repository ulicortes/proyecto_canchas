import Image from "next/image";
import Link from "next/link";

export default function NavBar() {
    return <nav className="w-full py-2 xl:py-8 bg-yellow-300 flex flex-row justify-center absolute top-0">
        <Image alt='logo' src='/favicon.ico' width={80} height={80} className="hidden xl:block absolute left-0.5 top-0.5" />
        <Link
            href="/"
            rel="noopener noreferrer"
        >   
            <div>Volver al inicio</div>
        </Link>
    </nav>
}