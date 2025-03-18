import { turnosDeHoy, verificarUsuario } from "../lib/metodos";
import BarraBusqueda from "../componentes/BarraBusqueda";
import ListadoCanchas from "../componentes/ListadoCanchas";

export default async function Page({
    searchParams,
}: {
    searchParams?: {
        dia: string,
        cancha: string
    };
}) {
    let hoy = searchParams?.dia;
    if (hoy == undefined) {
        let tz = (new Date()).getTimezoneOffset() * 60000;
        let today = new Date(Date.now() - tz);
        hoy = today.toISOString().slice(0, 10);
    }
    // let horasHoy = await turnosDeHoy(hoy);
    return <div className="w-screen h-screen flex flex-col justify-center items-center text-center">
        <div className='flex flex-col justify-center my-6'>
            <h1 className="text-xl mb-3">Elegi el dia</h1>
            <BarraBusqueda fechaActual={hoy}></BarraBusqueda>
        </div>
        <div className='flex flex-col justify-center my-6'>
            <h1 className="text-xl mb-3">Elegi el horario</h1>
            <ListadoCanchas hoy={hoy} />
        </div>

    </div>
}