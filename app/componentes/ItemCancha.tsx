import { turno } from "../lib/tipos";

export default function ItemCancha({t}:{t:turno}) {
    return <div className='grid grid-cols-7 text-center mt-2 mb-4. bg-yellow-300 rounded-2xl border-t-4. border-black.'>
        <div className="col-span-1 p-4">
            {t.organizador}
        </div>
        <div className="col-span-1 p-4">
            {t.telefono}
        </div>
        <div className="col-span-1 p-4">
            {t.lugar}
        </div>
        <div className="col-span-1 p-4">
            {t.direccion}
        </div>
        <div className="col-span-1 p-4">
            {t.dia}
        </div>
        <div className="col-span-1 p-4">
            {t.hora}
        </div>
        <div className="col-span-1 p-4">
            {t.cancha}
        </div>
    </div>
}