// 'use client';
import ItemCancha from '../componentes/ItemCancha';
import BarraBusqueda from '../componentes/BarraBusqueda';
import { listarTurnos } from '../lib/metodos';

export default async function Page() {
    
    const lista = await listarTurnos();
    console.log(lista[0]);


    return <div className="pt-4 text-center">
        <BarraBusqueda></BarraBusqueda>
        <div className="mt-8 px-4">
            <h1 className="text-4xl">Listado de canchas</h1>
            <div className='grid grid-cols-7 font-extrabold text-xl mt-4'>
                <h1 className="col-span-1">Organizador</h1>
                <h1 className="col-span-1">Telefono</h1>
                <h1 className="col-span-1">Lugar</h1>
                <h1 className="col-span-1">Direccion</h1>
                <h1 className="col-span-1">Dia</h1>
                <h1 className="col-span-1">Hora</h1>
                <h1 className="col-span-1">Cancha</h1>
            </div>
            {lista ? lista.map((t) => {

                return <ItemCancha key={t.id_turno} t={t} />
            }) : ' '}
        </div>
    </div>
}