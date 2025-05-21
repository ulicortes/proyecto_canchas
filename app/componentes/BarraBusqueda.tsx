'use client';

import Link from "next/link";

export default function BarraBusqueda({ fechaActual }: { fechaActual: string }) {
    const cambiarDia = (h: string) => {
        location.replace(`/horarios?dia=${h}`);
    }
    function selectWeek() {
        return Array(7).fill(new Date(Date.now())).map((el, idx) =>
            new Date(el.setDate(el.getDate() - el.getDay() + idx + 1)))
    }
    let days = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"]
    return <div className='flex flex-row w-100 items-center mb-8.'>
        {selectWeek().map((h, i) =>
            <div key={h.getDate()} className={`${h.toISOString().slice(0, 10) == fechaActual? 'bg-yellow':'bg-gray-300'} rounded-xl. border-2. m-0.5 border-black  py-5 px-5 xl:py-4 xl:w-24 xl:px-0 m-2. text-center cursor-pointer hover:bg-yellow`} >
                <Link href={`/horarios?dia=${h.toISOString().slice(0, 10)}`}>
                    <h1 className="text-l font-bold">
                        {days[h.getDay()]}
                    </h1>
                    <h1 className="text-l font-bold">
                        {h.getDate()}
                    </h1>
                </Link>
            </div>
        )}
    </div>
}