'use server'
import ItemCancha from '../componentes/ItemCancha';
import { listarTurnos } from '../lib/metodos';
import Session from '../componentes/Session';


export default async function Page() {
    const lista = await listarTurnos();
    return <div className="pt-4 h-max text-center mt-16">
        <Session />
        <div className="mt-4 xl:mt-8 xl:px-4.">
            <h1 className="text-4xl">Listado de canchas</h1>
            <div className='overflow-x-scroll xl:overflow-x-visible'>
                <table className='xl:w-full'>
                    <thead className='font-extrabold text-xl bg-white'>
                        <tr>
                            <td className='px-8 xl:px-0'>Lugar</td>
                            <td className='px-8 xl:px-0'>Direccion</td>
                            <td className='px-8 xl:px-0'>Dia</td>
                            <td className='px-8 xl:px-0'>Hora</td>
                            <td className='px-8 xl:px-0'>Cancha</td>
                            <td className='px-8 xl:px-0'>Faltan</td>
                            <td className='px-8 xl:px-0'></td>
                        </tr>
                    </thead>
                    <tbody className='divide-y. divide-yellow-300'>
                        {lista ? lista.map((t) => {
                            return <ItemCancha key={t.id_turno} t={t} />
                        }) : ' '}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
}