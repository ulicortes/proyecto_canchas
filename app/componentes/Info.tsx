import Link from "next/link";

export default function Info() {
    return <div className="flex flex-col justify-center pt-24. items-center w-full h-screen">
        <h1 className="mb-10 text-xl">No se puede acceder porque no sos el responsable de este turno!</h1>
        <Link href={'/buscar'} >
            <button
                className="rounded-md bg-black px-2 py-1 text-xl font-semibold text-white shadow-sm hover:bg-yellow-300 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >Volver</button>
        </Link>
    </div>
}