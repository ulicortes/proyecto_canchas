'use client'
import Link from "next/link";
import { useState } from "react";

export default async function Page() {
    let now = new Date(Date.now());
    let current_date = now.toISOString().slice(0, 10);
    let min = now.getMinutes()
    let current_time = now.getHours() + ":" + (min < 10 ? `0${min}` : min);

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
        <div className='bg-gray-900/30 w-4/6 p-3'>
            <div className='flex flex-col justify-center my-6 items-center'>
                <h1 className="text-2xl mb-3 font-bold">Que dia?</h1>
                <div className='flex flex-row flex-wrap w-100. xl:w-100. justify-center'>
                    {week.map((d, i) =>
                        <div
                            key={d.getDate()}
                            onClick={() => { setChosenDate(d.toISOString().slice(0, 10)); setChosenHour('0') }}
                            className={`${d.toISOString().slice(0, 10) == chosen_date ? 'bg-yellow text-black' : 'bg-gray-900 text-white'} m-0.5 border-black py-2. px-3 xl:py-1 xl:px-0 w-24 text-center cursor-pointer hover:bg-yellow hover:text-black`} >

                            <h1 className="text-l font-bold text-white.">
                                {days[d.getDay()]}
                            </h1>
                            <h1 className="text-l font-bold">
                                {d.getDate()}
                            </h1>
                        </div>
                    )}
                </div>
            </div>
            <div className='flex flex-col items-center my-6 w-full'>
                <h1 className="text-2xl mb-3 font-bold">A que hora?</h1>
                <div id="carrusel" className="flex flex-col xl:flex-row flex-wrap h-56 xl:h-fit overflow-x-scroll xl:overflow-x-none select-none w-full xl:w-4/5 xl:w-full. border-2. rounded-md border-gray-900. p-3 bg-gray-900/50.">

                    {horas.map((h, i) =>
                        <div className="-translate-x-96. ">
                            {(chosen_date == current_date && h > current_time) || chosen_date > current_date ?
                                <div
                                    key={h}
                                    onClick={() => setChosenHour(`${h}`)}
                                    className={`${h == chosen_hour ? 'bg-yellow' : 'bg-gray-300'} m-1 border-2 border-black rounded-md py-3 px-3 xl:py-3 xl:px-3 text-center cursor-pointer hover:bg-yellow`} >
                                    <h1 className="text-l font-bold">
                                        {h}
                                    </h1>
                                </div> :
                                <></>
                            }
                        </div>
                    )}
                </div>
            </div>
            {chosen_hour != '0' ? <Link href={`/horarios/reserva/${chosen_date}/${chosen_hour}`}>
                <button
                    className="rounded-md bg-greenpitch px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Terminar reserva
                </button>
            </Link> :
                <></>}

        </div>
    </div>
}
