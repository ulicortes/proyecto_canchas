import { turno } from "../lib/tipos";

export default function ItemCancha({t}:{t:turno}) {
    return <tr className='text-center hover:bg-yellow-300 rounded-full w-max xl:w-full divide-x divide-yellow-300 cursor-pointer'>
        <td className='py-4'>
            {t.organizador}
        </td>
        <td className='py-4'>
            {t.telefono}
        </td>
        <td className='py-4'>
            {t.lugar}
        </td>
        <td className='py-4'>
            {t.direccion}
        </td>
        <td className='py-4'>
            {t.dia}
        </td>
        <td className='py-4'>
            {t.hora}
        </td>
        <td className='py-4'>
            {t.cancha}
        </td>
    </tr>
}
{/* <div className="col-span-1 xl:p-4">
            {t.organizador}
        </div>
        <div className="col-span-1 xl:p-4">
            {t.telefono}
        </div>
        <div className="col-span-1 xl:p-4">
            {t.lugar}
        </div>
        <div className="col-span-1 xl:p-4">
            {t.direccion}
        </div>
        <div className="col-span-1 xl:p-4">
            {t.dia}
        </div>
        <div className="col-span-1 xl:p-4">
            {t.hora}
        </div>
        <div className="col-span-1 xl:p-4">
            {t.cancha}
        </div> */}