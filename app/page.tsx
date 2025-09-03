import './globals.css';
import Link from 'next/link';

export default async function Home() {
  return (
    <main className="w-screen h-screen flex flex-col items-center">
      <div className="h-full flex flex-col items-center text-center text-black lg:max-w-2xl lg:w-full lg:mb-0 lg:grid-cols-1 lg:text-left justify-evenly">
        
        <Link
          href="/buscar"
          className="xl:w-2/4 group rounded-lg border border-2 border-transparent px-5 transition-colors hover:underline hover:underline-offset-8 xl:hover:no-underline xl:hover:text-white xl:hover:bg-greenpitch/80"
          rel="noopener noreferrer"
        >
          <h2 className={`py-2 xl:p-3 text-2xl text-center font-semibold`}>
            Buscar canchas
          </h2>
        </Link>
        <Link
          href="/horarios"
          className="xl:w-2/4 group rounded-lg border border-2 border-transparent px-5 transition-colors hover:underline hover:underline-offset-8 xl:hover:no-underline xl:hover:text-white xl:hover:bg-greenpitch/80"
          rel="noopener noreferrer"
        >
          <h2 className={`py-2 xl:p-3 text-2xl text-center font-semibold`}>
            Reservar turno
          </h2>
        </Link>

      </div>
    </main>
  )
}