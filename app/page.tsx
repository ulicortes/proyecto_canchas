import './globals.css';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="h-screen flex flex-col items-center">
      <div className="mx-0 w-full rounded-md border-8 bg-greenpitch border-greenpitch p-5">
        <h1 className="font-bold text-white text-center text-2xl">Bienvenido al sitio de reserva de turnos para el fulbito</h1>
      </div>
      <div className="h-full flex flex-col items-center text-center text-black lg:max-w-2xl lg:w-full lg:mb-0 lg:grid-cols-1 lg:text-left justify-evenly">
        <Link
          href="/buscar"
          className="xl:w-2/4 group rounded-lg border border-2 border-transparent px-5 transition-colors hover:border-greenpitch hover:text-greenpitch"
          rel="noopener noreferrer"
        >
          <h2 className={`py-2 xl:p-3 text-2xl text-center font-semibold`}>
            Buscar canchas
          </h2>
        </Link>

        <Link
          href="/horarios"
          className="xl:w-2/4 group rounded-lg border border-2 border-transparent px-5 transition-colors hover:border-greenpitch text-white. hover:text-greenpitch"
          rel="noopener noreferrer"
        >
          <h2 className={`py-2 xl:p-3 text-2xl text-center font-semibold`}>
            Reservar cancha
          </h2>
        </Link>

        <Link 
          href={'/registro'}
          className="xl:w-2/4 group rounded-lg border border-2 border-transparent px-5 transition-colors hover:border-greenpitch text-white. hover:text-greenpitch"
          rel="noopener noreferrer"
          >
          <h2 className="py-2 xl:p-3 text-2xl text-center font-semibold">Registrarse</h2>
        </Link>
      </div>
    </main>
  )
}