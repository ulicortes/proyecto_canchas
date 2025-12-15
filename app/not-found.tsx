import Link from "next/link"

export default function NotFound() {
    return <div className="w-screen h-screen flex flex-col justify-center items-center text-center">
        <div className="xl:m-auto xl:w-2/4 bg-white/70 shadow-xl shadow-black/50 rounded-md py-2">
            <h1 className="font-bold text-2xl py-4">Lo sentimos, la pagina que queres buscar no existe!</h1>
            <button
                className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-800 hover:text-black. focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                <Link href="/">
                    Volver
                </Link>
            </button>
        </div>
    </div>
}