import ListadoJugadores from "../../../componentes/ListadoJugadores";
import { traerTurno } from "@/app/lib/metodos";
import Link from "next/link";
import getSession from '@/app/lib/authenticate';
import PaginaIngreso from '@/app/ingreso/page'
import Buscar from '@/app/buscar/page'
import { cookies } from 'next/headers'
import { useEffect } from "react";
import Info from "@/app/componentes/Info";


export default async function Page({ params }: { params: { id: string } }) {
    const t = await traerTurno(params.id);
    const cookie = cookies();
    if(!cookie.has('usuario')) return <PaginaIngreso />;
    else if(!(cookie.get('usuario')?.value == t[0].organizador)) return <Info />;
    else return <div className="mt-20 content-center">
        <div className="h-max xl:h-screen flex flex-col xl:flex-row">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-1 xl:gap-0 text-center w-full xl:w-3/5 h-4/5 pb-0">
                <div className='col-span-1 xl:col-span-2. xl:col-start-1. self-center'>
                    <div className="text-3xl">{t[0].organizador}</div>
                    <div>Organizador</div>
                </div>
                <div className='col-span-1 xl:col-span-2. xl:col-start-3. self-center'>
                    <div className="text-3xl">{t[0].telefono}</div>
                    <div>Telefono</div>
                </div>
                <div className='col-span-1 xl:col-span-2. xl:col-start-1. self-center'>
                    <div className="text-3xl">{t[0].lugar}</div>
                    <div>Lugar</div>
                </div>
                <div className='col-span-1 xl:col-span-2. xl:col-start-3. self-center'>
                    <div className="text-3xl">{t[0].direccion}</div>
                    <div>Direccion</div>
                </div>
                <div className='col-span-1 xl:col-span-2. xl:col-start-1. self-center'>
                    <div className="text-3xl">{t[0].dia}</div>
                    <div>Dia</div>
                </div>
                <div className='col-span-1 xl:col-span-2. xl:col-start-3. self-center'>
                    <div className="text-3xl">{t[0].hora}</div>
                    <div>Hora</div>
                </div>
                <div className='col-span-1 xl:col-span-1. xl:col-start-1. self-center'>
                    <div className="text-3xl">{t[0].cancha}</div>
                </div>
                <div className='col-span-1 xl:col-span-1 xl:col-start-3. self-center'>
                    <div className="text-3xl">Faltan {t[0].jugadores_faltantes} jugadores</div>
                </div>
            </div>
            <div className="w-full xl:w-2/5 h-fit text-center mt-16 xl:mt-0 flex flex-col self-center.">
                <div>
                    <h1 className="mb-36.">LISTADO DE JUGADORES</h1>
                </div>
                <ListadoJugadores cant={t[0].cancha}></ListadoJugadores>
            </div>
        </div>
        <div className="w-full flex justify-center">
            <Link href={'/buscar'}>
                <button
                    type="submit"
                    className="rounded-md bg-black px-2 py-1 text-xl font-semibold text-white shadow-sm hover:bg-yellow-300 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Volver
                </button>
            </Link>
        </div>
    </div>
}