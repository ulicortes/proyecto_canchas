'use server'
import ItemCancha from '../componentes/ItemCancha';
import { listarTurnos, verificarUsuario } from '../lib/metodos';
import Session from '../componentes/Session';
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
    const lista = await listarTurnos();
    const cookie = cookies();
    const session = await verificarUsuario(cookie);
    // if (session == undefined) redirect('/ingreso');
    return <div className="pt-4 text-center mb-6">
        <div className="mt-24 xl:mt-24 text-black">
            <h1 className="text-3xl font-bold pb-4">Listado de canchas</h1>
            <div className='overflow-x-scroll xl:overflow-x-visible'>
                <table className='xl:w-full border-separate border-spacing-y-3'>
                    <thead className='font-extrabold text-greenpitch text-xl'>
                        <tr>
                            <td className='px-16 xl:px-0'>Lugar</td>
                            <td className='hidden xl:inline px-12 xl:px-0'>Direccion</td>
                            <td className='px-12 xl:px-0'>Dia</td>
                            <td className='px-12 xl:px-0'>Hora</td>
                            <td className='hidden xl:inline px-12 xl:px-0'>Cancha</td>
                            <td className='px-12 xl:px-0'></td>
                        </tr>
                    </thead>
                    <tbody>
                        {lista ? lista.map((t) => {
                            return <ItemCancha key={t.id_turno} t={t} />
                        }) : ' '}
                    </tbody>
                </table>
            </div>
        </div>
        <div className='pt-16'>
            <Session />
        </div>
    </div>
}