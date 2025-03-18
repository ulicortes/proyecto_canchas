import { cookies } from "next/headers";
import { turno } from "../lib/tipos";
import Link from 'next/link';


export default function ItemCancha({ t }: { t: turno }) {
    const cookie = cookies();
    let newdate = t.dia.split("-").reverse().join("/");
    let newhour = t.hora.split(":");
    
    return <tr className='text-center text-black bg-[#E0E0E0]. bg-ligthgreen hover:bg-ligthyellow rounded-full w-max xl:w-full border-b-8 border-b-white cursor-pointer'>
        <td className='py-4'>
            {t.lugar}
        </td>
        <td className='hidden xl:inline-table py-4'>
            {t.direccion}
        </td>
        <td className='py-4'>
            {newdate}
        </td>
        <td className='py-4'>
            {newhour[0]}:{newhour[1]}
        </td>
        <td className='hidden xl:inline-table py-4'>
            {t.cancha}
        </td>
        <td className='py-4'>
            <Link
                href={`/cancha/${t.id_turno}/editar`}
                rel="noopener noreferrer"
            >
                <button
                    type="submit"
                    className="rounded-md bg-black px-2 py-1 text-xl font-semibold text-white shadow-sm hover:bg-greenpitch focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    +
                </button>
            </Link>
        </td>
    </tr>
}
