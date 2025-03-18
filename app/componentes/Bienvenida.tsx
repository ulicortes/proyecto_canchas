import Link from "next/link";

export default function Bienvenida() {
    
    return <div className='flex. flex-row. h-screen w-screen content-center text-center'>
        <h1 className="text-xl">Para poder reservar un turno o ver que turnos necesitan jugadores tenes que iniciar sesion</h1>
        <Link
          href="/ingreso"
          className="xl:w-2/4 group rounded-lg border border-2 border-transparent px-5 transition-colors hover:border-greenpitch hover:text-greenpitch hover:bg-white"
          rel="noopener noreferrer"
        >
          <h2 className={`py-2 xl:p-3 text-2xl text-center font-semibold`}>
            Iniciar sesion
          </h2>
        </Link>
    </div>
}