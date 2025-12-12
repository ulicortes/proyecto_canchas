import './globals.css';
import Link from 'next/link';
import { cookies } from 'next/headers'
import { signOut } from "./lib/sesion";


export default async function Home() {
  const cookie = cookies();
  const user_session = cookie.get('user')?.value;
  
  return (
    <main className="w-screen h-screen flex flex-col items-center">
      <div className="h-full flex flex-col items-center text-center text-white lg:max-w-2xl. lg:w-full lg:mb-0 lg:grid-cols-1 lg:text-left justify-evenly">
        <h1 className="font-bold text-center text-3xl">Bienvenido al sitio de reserva de turnos para la ciudad de Tandil</h1>
        {user_session ? <>
          <Link
              href="/usuario"
              className="xl:w-1/4 rounded-lg bg-slate-400 xl:hover:bg-slate-300"
              rel="noopener noreferrer"
            >
              <h2 className={`p-2 xl:p-2 xl:text-2xl text-center font-semibold text-black`}>
                Perfil de {user_session}
              </h2>
            </Link>
        </> :
          <div className='flex flex-col xl:flex-row justify-evenly items-center w-full h-1/4'>
            <Link
              href="/buscar"
              className="w-3/4 xl:w-1/4 rounded-lg bg-white/70 xl:hover:bg-white content-center"
              rel="noopener noreferrer"
            >
              <h2 className={`p-2 xl:p-2 text-xl xl:text-2xl text-center font-semibold text-black`}>
                Iniciar sesión
              </h2>
            </Link>
            <Link
              href="/registro"
              className="w-3/4 xl:w-1/4 rounded-lg bg-blue-900 xl:hover:bg-blue-950 content-center"
              rel="noopener noreferrer"
            >
              <h2 className={`p-2 xl:p-2 text-xl xl:text-2xl text-center font-semibold`}>
                Registrate acá
              </h2>
            </Link>
          </div>
        }
      </div>
    </main>
  )
}