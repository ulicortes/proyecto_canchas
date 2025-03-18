import ListadoJugadores from "../../../componentes/ListadoJugadores";
import { traerTurno, actualizarCancha, verificarUsuario } from "@/app/lib/metodos";
import Link from "next/link";
import { cookies } from 'next/headers'


export default async function Page({ params }: { params: { id: string } }) {
    const t = await traerTurno(params.id);
    const cookie = cookies();
    const session = await verificarUsuario(cookie);
    const actualizar = actualizarCancha.bind(null, t[0].id_turno);
    let newdate = t[0].dia.split("-").reverse().join("-");
    let newhour = t[0].hora.split(":");
    return <div className='w-screen h-screen flex flex-col justify-evenly xl:justify-center'>
        <div className="flex flex-col xl:flex-row justify-center items-center mb-10 xl:mb-0">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 xl:gap-10 text-center w-full pt-36 xl:w-4/6 xl:pt-0">
                <div className='col-span-1 self-center'>
                    <div className="text-3xl">{t[0].organizador}</div>
                    <div className="underline underline-offset-4 text-greenpitch">Organizador</div>
                </div>
                <div className='col-span-1 self-center'>
                    <div className="text-3xl">{t[0].telefono}</div>
                    <div className="underline underline-offset-4 text-greenpitch">Telefono</div>
                </div>
                <div className='col-span-1 self-center'>
                    <div className="text-3xl">{t[0].lugar}</div>
                    <div className="underline underline-offset-4 text-greenpitch">Lugar</div>
                </div>
                <div className='col-span-1 self-center'>
                    <div className="text-3xl">{t[0].direccion}</div>
                    <div className="underline underline-offset-4 text-greenpitch">Direccion</div>
                </div>
                <div className='col-span-1 self-center'>
                    <div className="text-3xl">{newdate}</div>
                    <div className="underline underline-offset-4 text-greenpitch">Dia</div>
                </div>
                <div className='col-span-1 self-center'>
                    <div className="text-3xl">{newhour[0]}:{newhour[1]}</div>
                    <div className="underline underline-offset-4 text-greenpitch">Hora</div>
                </div>
                <div className='col-span-1 self-center'>
                    <div className="text-3xl">{t[0].cancha}</div>
                </div>
                <div className='col-span-1 self-center'>
                    <div className="text-3xl">Faltan {cuantosFaltan(t[0].lista, t[0].cancha)} jugadores</div>
                </div>
                {/* <div className="col-span-1 xl:col-span-2 flex justify-center">
                    <Link href={'/buscar'}>
                        <button
                            type="submit"
                            className="rounded-md bg-black px-2 py-1 text-xl font-semibold text-white shadow-sm hover:bg-yellow hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Volver
                        </button>
                    </Link>
                </div> */}
            </div>
            {session == t[0].organizador ? <>
                <div className="w-full xl:w-2/5 h-max flex flex-col text-center mt-4 xl:mt-0.">
                    <div>
                        <h1>LISTADO DE JUGADORES</h1>
                    </div>
                    <form action={actualizar}>
                        <ListadoJugadores cant={t[0].cancha} jugs={t[0].lista} />
                        <button
                            type="submit"
                            className="rounded-md bg-black px-2 py-1 mt-4 text-xl font-semibold text-white shadow-sm hover:bg-yellow hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Editar
                        </button>
                    </form>
                </div>
            </> : <>
            </>}
        </div>
        <div className="w-full flex justify-center">
            <Link href={'/buscar'}>
                <button
                    type="submit"
                    className="rounded-md bg-black px-2 py-1 mb-4 text-xl font-semibold text-white shadow-sm hover:bg-yellow hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Volver
                </button>
            </Link>
        </div>
    </div>
}

function cuantosFaltan(turno: [], tipoFutbol: String) {
    let cant = 0;
    if (turno != null) cant = turno.length;

    if (tipoFutbol == 'F5') {
        return 10 - cant;
    } else if (tipoFutbol == 'F7') {
        return 14 - cant;
    } else if (tipoFutbol == 'F8') {
        return 16 - cant;
    }
}