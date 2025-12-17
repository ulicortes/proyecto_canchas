'use server'
import ItemCancha from '../componentes/ItemCancha';
import { listarTurnos } from '../lib/metodos';
import { Suspense } from 'react';
import Loading from '../loading';
import { turno } from '../lib/tipos';

export default async function Page() {
    const lista = await listarTurnos();
    return <Suspense fallback={<Loading message={"Cargando turnos..."} />}>
        <div className="pt-2 text-center w-screen max-w-screen h-screen max-h-screen flex flex-col justify-center items-center">
            <div className="text-black w-5/6 h-4/5 rounded-md shadow-xl shadow-black/50 overflow-hidden bg-white/70">
                <div className='h-full overflow-x-scroll xl:overflow-x-visible overflow-y-scroll'>
                    <table className='xl:w-full overflow-y-visible'>
                        <thead className='bg-neutral-950 font-extrabold text-white text-xl sticky top-0 z-index-0'>
                            <tr className='align-top'>
                                <td className='py-2 px-16 xl:px-0'>Lugar</td>
                                <td className='py-2 hidden xl:block px-12 xl:px-0'>Direccion</td>
                                <td className='py-2 px-12 xl:px-0'>Dia</td>
                                <td className='py-2 px-12 xl:px-0'>Hora</td>
                                <td className='py-2 px-12 xl:px-0'>Cancha</td>
                                <td className='py-2 px-12 xl:px-0'></td>
                            </tr>
                        </thead>
                        <tbody className='border-separate border-spacing-y-1'>
                            {lista ? lista.map((t: turno) => {
                                return <ItemCancha key={t.id} t={t} />
                            }) : ' '}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </Suspense>
}