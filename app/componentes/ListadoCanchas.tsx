'use client';

import Link from "next/link";
import { horarios } from "../lib/tipos";

export default function ListadoCanchas({ hoy }: { hoy: string }) {
    const horas = ['07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00',
        '14:00', '15:00', '16:00', '17:00', '18:00', '19:00',
        '20:00', '21:00', '22:00', '23:00', '00:00'
    ];
    return <div id="carrusel" className="flex flex-row flex-wrap xl:flex-row xl:flex-wrap overflow-scroll xl:overflow-visible select-none m-auto justify-center w-fit xl:w-3/6">
        {horas.map((h, i) =>
            <div key={h} className="rounded-xl. border-2. m-0.5 border-black bg-gray-300 py-5 px-5 xl:py-4 xl:w-24 xl:px-0 m-2. text-center cursor-pointer hover:bg-yellow" >
                <Link href={`/horarios/reserva/${hoy}/${h}`}>
                    <h1 className="text-l">
                        {h}
                    </h1>
                </Link>
            </div>
        )}
    </div>

}