'use client';

import Link from "next/link";

export default function ListadoCanchas({ selected_date }: { selected_date: string }) {
    const horas = ['07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00',
        '14:00', '15:00', '16:00', '17:00', '18:00', '19:00',
        '20:00', '21:00', '22:00', '23:00', '00:00'
    ];
    let tz = (new Date()).getTimezoneOffset() * 60000;
    let today = new Date(Date.now() - tz);
    selected_date = today.toISOString().slice(0, 10);

    let now = new Date(Date.now());
    let current_date = now.toISOString().slice(0, 10);
    let current_time = `${now.getHours()}:${now.getMinutes()}`;
    return <div id="carrusel" className="flex flex-row flex-wrap xl:flex-row xl:flex-wrap overflow-scroll xl:overflow-visible select-none m-auto justify-center w-5/6 xl:w-3/6">
        {horas.map((h, i) =>
            (selected_date > current_date) || (h < current_time) ? <></> :
                <div key={h} className="rounded-xl. border-2. m-0.5 border-black bg-gray-300 py-5 px-5 xl:py-4 xl:w-24 xl:px-0 m-2. text-center cursor-pointer hover:bg-yellow" >
                    <Link href={`/horarios/reserva/${selected_date}/${h}`}>
                        <h1 className="text-l font-bold">
                            {h}
                        </h1>
                    </Link>
                </div>
        )}
    </div>

}