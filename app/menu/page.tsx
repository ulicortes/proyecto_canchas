import '../globals.css';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-full flex-col items-center justify-around p-2">
      <div className="mx-0 rounded-md border-8 border-slate-100 p-5">
        <h1 className="font-bold text-white text-2xl">Bienvenido al sitio de reserva de turnos para el fulbito</h1>
      </div>  
      <div className="pt-64 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-2 lg:text-left">
        <Link
          href="/menu/buscar"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          rel="noopener noreferrer"
        >
          <h2 className={`p-3 text-2xl text-center font-semibold`}>
            Buscar canchas
          </h2>
        </Link>

        <Link
          href="/menu/reservar"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          rel="noopener noreferrer"
        >
          <h2 className={`p-3 text-2xl text-center font-semibold`}>
            Reservar cancha
          </h2>
        </Link>
      </div> 
    </main>
  )
}