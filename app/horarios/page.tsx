'use client'
import Link from "next/link";
import { useState } from "react";

export default function Page() {
    let now = new Date(Date.now());
    let current_date = now.toISOString().slice(0, 10);
    let hs = now.getHours()
    let min = now.getMinutes()
    let current_time = (hs < 10 ? `0${hs}` : hs) + ":" + (min < 10 ? `0${min}` : min);

    let week = [];
    for (let i = 0; i < 8; i++) {
        week.push(new Date(Date.now() + (86400000 * i)))
    }
    let days = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"]
    let horas = ['07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
        '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00',
        '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30',
        '23:00', '23:30'
    ];

    let [chosen_date, setChosenDate] = useState(current_date);
    let [chosen_hour, setChosenHour] = useState('0');

    return <div className="w-screen h-screen flex flex-col justify-center items-center text-center">
        <div className='bg-white/40 shadow-xl shadow-black/50 w-4/6 h-5/6 xl:h-4/6 p-3 mt-12 flex flex-col justify-center'>
            <div className='flex flex-col my-6. items-center'>
                <h1 className="text-2xl mb-3 font-bold text-neutral-950">Que dia?</h1>
                <div className='flex flex-row flex-wrap justify-center w-6/6'>
                    {week.map((d, i) =>
                        <div
                            key={d.getDate()}
                            onClick={() => { setChosenDate(d.toISOString().slice(0, 10)); setChosenHour('0') }}
                            className={`${d.toISOString().slice(0, 10) == chosen_date ? 'bg-yellow text-black' : 'bg-gray-900 text-white'} m-0.5 border-black py-2. px-3 xl:py-1 xl:px-0 w-24 text-center cursor-pointer hover:bg-yellow hover:text-black`} >

                            <h1 className="text-l font-bold">
                                {days[d.getDay()]}
                            </h1>
                            <h1 className="text-l font-bold">
                                {d.getDate()}
                            </h1>
                        </div>
                    )}
                </div>
            </div>
            <div className='flex flex-col justify-center items-center w-full h-full'>
                <h1 className="text-2xl mb-3 font-bold text-neutral-950">A que hora?</h1>
                <div id="carrusel" className="flex flex-col md:flex-row. flex-wrap w-fit h-40 overflow-x-scroll justify-center. select-none items-center. rounded-md p-3">
                    {horas.map((h, i) =>
                        ((chosen_date == current_date && h > current_time) || chosen_date > current_date) ?
                            <div
                                key={i + h}
                                onClick={() => setChosenHour(`${h}`)}
                                className={`${h == chosen_hour ? 'bg-yellow text-neutral-950' : 'bg-gray-900 text-white'} mx-0.5 my-1 border-2. border-black rounded-md py-3 px-3 xl:py-3 xl:px-2 text-center cursor-pointer hover:bg-yellow hover:text-neutral-950`} >
                                <h1 className="text-l font-bold">
                                    {h}
                                </h1>
                            </div> :
                            <></>
                    )}
                </div>
            </div>
            {chosen_hour != '0' ? <Link href={`/horarios/reserva/${chosen_date}/${chosen_hour}`}>
                <button
                    className="rounded-md bg-greenpitch px-3 py-2 m-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Terminar reserva
                </button>
            </Link> :
                <div>
                    <button
                        disabled
                        className="rounded-md bg-gray-400/30 px-3 py-2 m-2 text-sm font-semibold text-white"
                    >
                        Terminar reserva
                    </button>
                </div>}
        </div>
    </div>
}
