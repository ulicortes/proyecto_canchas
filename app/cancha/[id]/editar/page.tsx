import ListadoJugadores from "../../../componentes/ListadoJugadores";
import { traerTurno, actualizarCancha } from "@/app/lib/metodos";
import Link from "next/link";
import { cookies } from 'next/headers'


export default async function Page({ params }: { params: { id: string } }) {
    const t = await traerTurno(params.id);
    const cookie = cookies();
    const user_session = cookie.get('user')?.value;
    const actualizar = actualizarCancha.bind(null, t[0].id_turno);
    let newdate = t[0].dia.split("-").reverse().join("/");
    let newhour = t[0].hora.split(":");

    return <div className="flex flex-col xl:flex-row justify-evenly text-center w-full h-max xl:h-screen pt-28 xl:pt-8">

        <div className="order-1 flex flex-col justify-evenly xl:w-1/3">
            <div className='py-3 xl:py-0 self-center'>
                <div className="text-2xl xl:text-3xl">{t[0].organizador}</div>
                <div className="underline underline-offset-4 text-greenpitch text-l">Organizador</div>
            </div>
            <div className='py-3 xl:py-0 self-center'>
                <div className="text-2xl xl:text-3xl">{t[0].telefono}</div>
                <div className="underline underline-offset-4 text-greenpitch text-l">Telefono</div>
            </div>
            <div className='py-3 xl:py-0 self-center'>
                <div className="text-2xl xl:text-3xl">{t[0].lugar}</div>
                <div className="underline underline-offset-4 text-greenpitch text-l">Lugar</div>
            </div>
            <div className='py-3 xl:py-0 self-center'>
                <div className="text-2xl xl:text-3xl">{t[0].direccion}</div>
                <div className="underline underline-offset-4 text-greenpitch text-l">Direccion</div>
            </div>
        </div>
        <div className='order-3 xl:order-2 self-center justify-center py-12 xl:py-0 xl:w-1/3'>
            {user_session == t[0].organizador ?
                <div className="flex flex-col text-center">
                    <div>
                        <h1>LISTADO DE JUGADORES</h1>
                    </div>
                    <form action={actualizar} className="w-min h-max flex flex-col self-center mt-4">
                        <textarea className="p-2 text-center" name="jugadores" id="" cols={16} rows={16} >{t[0].lista}</textarea>
                        <button
                            type="submit"
                            className="rounded-md bg-black px-2 py-1 mt-4 text-xl font-semibold text-white shadow-sm hover:bg-yellow hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Editar
                        </button>
                    </form>
                </div> :
                <></>}
            <div className="flex flex-col justify-between">
                <Link href={'/buscar'}>
                    <button
                        type="submit"
                        className="rounded-md bg-black px-2 py-1 mt-2 text-xl font-semibold text-white shadow-sm hover:bg-yellow hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Volver
                    </button>
                </Link>
            </div>
        </div>
        <div className='order-2 xl:order-3 flex flex-col justify-evenly xl:w-1/3'>
            <div className='py-3 xl:py-0 self-center'>
                <div className="text-2xl xl:text-3xl">{newdate}</div>
                <div className="underline underline-offset-4 text-greenpitch text-l">Dia</div>
            </div>
            <div className='py-3 xl:py-0 self-center'>
                <div className="text-2xl xl:text-3xl">{newhour[0]}:{newhour[1]} hs</div>
                <div className="underline underline-offset-4 text-greenpitch text-l">Hora</div>
            </div>
            <div className='py-3 xl:py-0 self-center'>
                <div className="text-2xl xl:text-3xl">{t[0].cancha}</div>
            </div>
            <div className='py-3 xl:py-0 self-center'>
                <div className="text-2xl xl:text-3xl">Faltan {cuantosFaltan(t[0].lista, t[0].cancha)} jugadores</div>
            </div>
        </div>
    </div>
}

function cuantosFaltan(turno: String, tipoFutbol: String) {
    let cant = 0;
    if(turno != null) {
        let arrayJugadores = turno.split('\r\n')
        for (let j in arrayJugadores) {
            if (arrayJugadores[j] !== '') {
                cant++;
            }
        }
    }

    if (tipoFutbol == 'F5') {
        return 10 - cant;
    } else if (tipoFutbol == 'F7') {
        return 14 - cant;
    } else if (tipoFutbol == 'F8') {
        return 16 - cant;
    }
}
