import { turnosDeHoy } from "../lib/metodos";
import { horarios } from "../lib/tipos";
import Link from "next/link";
import BarraBusqueda from "../componentes/BarraBusqueda";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Session from "../componentes/Session";

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
        hoy = `${today.getFullYear()}-0${today.getMonth() + 1}-${today.getDate()}`
    }
    let horasHoy = await turnosDeHoy(hoy);
    let f = new Date(hoy);

    const horas = ['07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00',
        '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
        '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30', '00:00'];

    const cookie = cookies();
    if (!cookie.has('usuario')) redirect('/ingreso');
    else return <div className="text-center h-screen flex flex-col justify-center xl:mt-5">
        <div className="mt-14" >
            <Session p="" />
        </div>

        <div className="mt-4" >
            <h1 className="text-3xl font-bold text-gray-900">Selecciona el dia</h1>
            <div className='w-2/5 flex flex-row justify-center m-auto pt-3'>
                <BarraBusqueda fechaActual={hoy}></BarraBusqueda>
            </div>
        </div>
        <div className="mt-4">
            <h1 className="text-3xl font-bold text-gray-900">Selecciona un horario de la fecha {`${f.getUTCDate()}/${f.getUTCMonth() + 1}/${f.getUTCFullYear()}`}</h1>
            <div id="carrusel" className="h-60 xl:h-full xl:pt-5 xl:px-4 flex flex-col flex-wrap xl:flex-row xl:flex-wrap overflow-scroll xl:overflow-visible select-none m-auto w-4/5">
                {horas.map((h) =>
                    <div key={h}>
                        {estaOcupado(horasHoy, h) ?
                            <div className="rounded-xl border-2 border-black bg-red-600 py-4 px-4 xl:py-4 xl:w-24 xl:px-0 m-2 text-center" >
                                <h1 className="text-l">{h}</h1>
                            </div>
                            :
                            <div className="rounded-xl border-2 border-black bg-lime-500 py-4 px-4 xl:py-4 xl:w-24 xl:px-0 m-2 text-center cursor-pointer" >
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