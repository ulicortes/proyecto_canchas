'use client';

export default function BarraBusqueda({fechaActual}:{fechaActual : string}) {
    const cambiarDia = (h:string) => {
        location.replace(`/horarios?dia=${h}`);
    } 
    
    return <div className='flex flex-row w-100 items-center mb-8.'>
        <input
            type='date'
            className="text-center peer block w-max rounded-md border border-gray-200 py-[9px] pl-10. text-sm outline-2 placeholder:text-gray-500"
            onChange={(e) => {
                cambiarDia(e.target.value);
            }}
            defaultValue={fechaActual}
        />
    </div>
}