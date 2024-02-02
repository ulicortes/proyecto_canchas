import Image from 'next/image';
import './globals.css';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="h-screen flex flex-col items-center justify-evenly.">
      <div className="mx-0 w-full rounded-md border-8 bg-yellow-300 border-yellow-300 p-5">
        <h1 className="font-bold text-black text-center text-2xl">Bienvenido al sitio de reserva de turnos para el fulbito</h1>
      </div>
      <div className="h-full flex flex-col items-center text-center lg:max-w-2xl lg:w-full lg:mb-0 lg:grid-cols-1 lg:text-left justify-evenly">
        <Link
          href="/buscar"
          className="xl:w-2/4 group rounded-lg border border-transparent px-5 transition-colors hover:border-yellow-300 hover:bg-yellow-300 hover:dark:border-yellow-300 hover:dark:bg-yellow-300"
          rel="noopener noreferrer"
        >
          <h2 className={`py-2 xl:p-3 text-2xl text-center font-semibold hover:text-3xl.`}>
            Buscar canchas
          </h2>
        </Link>

        <Link
          href="/horarios"
          className="xl:w-2/4 group rounded-lg border border-transparent px-5 transition-colors hover:border-yellow-300 hover:bg-yellow-300 hover:dark:border-yellow-300 hover:dark:bg-yellow-300"
          rel="noopener noreferrer"
        >
          <h2 className={`py-2 xl:p-3 text-2xl text-center font-semibold hover:text-3xl.`}>
            Reservar cancha
          </h2>
        </Link>
      </div>
    </main>
  )
}