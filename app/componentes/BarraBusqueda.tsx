'use client';
import Link from 'next/link';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

export default function BarraBusqueda({fechaActual}:{fechaActual : string}) {
    const [hoy, setHoy] = useState("");
    const cambiarDia = (h:string) => {
        setHoy(h);
    } 
    
    return <div className='flex flex-row w-100 items-center pb-8'>
        <input
            type='date'
            className="peer block w-max rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
            onChange={(e) => {
                cambiarDia(e.target.value);
            }}
            defaultValue={fechaActual}
        />
        <Link href={{
            pathname: '/horarios',
            query: { hoy: `${hoy}`}
        }}>
            <button className="rounded-md bg-black px-2 py-1 ml-5 text-xl font-semibold text-white shadow-sm hover:bg-yellow-300 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Buscar</button>
        </Link>
    </div>
}