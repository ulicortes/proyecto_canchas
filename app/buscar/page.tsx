// 'use client';
import ItemCancha from '../componentes/ItemCancha';
import BarraBusqueda from '../componentes/BarraBusqueda';
import { listarTurnos } from '../lib/metodos';

export default async function Page() {

    const lista = await listarTurnos();

    return <div className="pt-4 text-center">
        <h1 className="text-4xl">Buscar cancha</h1>
        {/* <BarraBusqueda></BarraBusqueda> */}
        <div className="mt-4 xl:mt-8 xl:px-4.">
            <h1 className="text-4xl">Listado de canchas</h1>
            <div className='overflow-x-scroll xl:overflow-x-visible'>
                <table className='xl:w-full'>
                    <thead className='font-extrabold text-xl bg-white'>
                        <tr>
                            <td className='px-8 xl:px-0'>Organizador</td>
                            <td className='px-8 xl:px-0'>Telefono</td>
                            <td className='px-8 xl:px-0'>Lugar</td>
                            <td className='px-8 xl:px-0'>Direccion</td>
                            <td className='px-8 xl:px-0'>Dia</td>
                            <td className='px-8 xl:px-0'>Hora</td>
                            <td className='px-8 xl:px-0'>Cancha</td>
                            <td className='px-8 xl:px-0'>Faltan</td>
                            <td className='px-8 xl:px-0'></td>
                        </tr>

                        {/* <h1 className="col-span-1">Organizador</h1>
                    <h1 className="col-span-1">Telefono</h1>
                    <h1 className="col-span-1">Lugar</h1>
                    <h1 className="col-span-1">Direccion</h1>
                    <h1 className="col-span-1">Dia</h1>
                    <h1 className="col-span-1">Hora</h1>
                    <h1 className="col-span-1">Cancha</h1> */}
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