import { turnosDeHoy, verificarUsuario } from "../lib/metodos";
import { horarios } from "../lib/tipos";
import Link from "next/link";
import BarraBusqueda from "../componentes/BarraBusqueda";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page({
    searchParams,
}: {
    searchParams?: {
        hoy: string
    };
}) {
    let hoy = searchParams?.hoy;
    if (hoy == undefined) {
        let today = new Date();
        hoy = today.toISOString().slice(0, 10);
    }

    let horasHoy = await turnosDeHoy(hoy);
    let f = new Date(hoy);

    // const horas = ['07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00',
    //     '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
    //     '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30', '00:00'];

    const horas = ['07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00',
        '14:00', '15:00', '16:00', '17:00', '18:00', '19:00',
        '20:00', '21:00', '22:00', '23:00', '00:00'
    ];
    const cookie = cookies();
    const session = await verificarUsuario(cookie);
    if (session == undefined) redirect('/ingreso');
    else return <div className="text-center h-full xl:h-screen flex flex-col justify-center mt-20 xl:mt-0 xl:mb-44.">

        <div className="mt-0." >
            <h1 className="text-3xl font-bold text-gray-900">Selecciona el dia</h1>
            <div className='w-2/5 flex flex-row justify-center m-auto pt-3'>
                <BarraBusqueda fechaActual={hoy}></BarraBusqueda>
            </div>
        </div>
        <div className="mt-8">
            <h1 className="text-3xl font-bold text-gray-900">Selecciona un horario de la fecha {`${f.getUTCDate()}/${f.getUTCMonth() + 1}/${f.getUTCFullYear()}`}</h1>
            <div id="carrusel" className="h-50 xl:h-full pt-5 xl:px-4 flex flex-row flex-wrap xl:flex-row xl:flex-wrap overflow-scroll xl:overflow-visible select-none m-auto items-center justify-center w-full xl:w-3/5">
                {horas.map((h) =>
                    <div key={h}>
                        {estaOcupado(horasHoy, h) ?
                            <div className="rounded-xl border-2 border-black bg-red-600 py-5 px-5 xl:py-4 xl:w-24 xl:px-0 m-2 text-center" >
                                <h1 className="text-l">{h}</h1>
                            </div>
                            :
                            <div className="rounded-xl border-2 border-black bg-lime-500 py-5 px-5 xl:py-4 xl:w-24 xl:px-0 m-2 text-center cursor-pointer" >
                                <Link href={{
                                    pathname: `/horarios/${h}/reservar`,
                                    query: { hoy: hoy }
                                }}>
                                    <h1 className="text-l">{h}</h1>
                                </Link>
                            </div>}
                    </div>
                )}
            </div>
        </div>
    </div>
}
function estaOcupado(hs: horarios[], h: string) {
    let ho = false
    hs.map((hora) => {
        if (hora.hora == `${h}:00`) ho = true;
    });
    return ho;
}