import { traerTurno, actualizarCancha } from "@/app/lib/metodos";
import Link from "next/link";
import { cookies } from 'next/headers'


export default async function Page({ params }: { params: { id: string } }) {
    const t = await traerTurno(params.id);
    const cookie = cookies();
    const user_session = cookie.get('user')?.value;
    const actualizar = actualizarCancha.bind(null, t.id);
    let newdate = t.dia.split("-").reverse().join("/");
    let newhour = t.hora.split(":");

    return <div className="flex flex-col justify-center items-center text-center w-full h-max xl:h-screen pt-28 xl:pt-8">
        <div className="flex flex-col xl:flex-row justify-between xl:justify-evenly items-center h-4/6">
            <div className="bg-white/70 font-bold shadow-xl shadow-black/50 rounded-md w-3/5 h-full flex flex-wrap flex-row justify-evenly">
                <div className='p-8 xl:py-0 self-center'>
                    <div className="text-2xl xl:text-3xl">{t.organizador}</div>
                    <div className="underline underline-offset-4 text-greenpitch text-l">Organizador</div>
                </div>
                <div className='p-8 xl:py-0 self-center'>
                    <div className="text-2xl xl:text-3xl">{t.telefono}</div>
                    <div className="underline underline-offset-4 text-greenpitch text-l">Contacto</div>
                </div>
                <div className='p-8 xl:py-0 self-center'>
                    <div className="text-2xl xl:text-3xl">{t.lugar}</div>
                    <div className="underline underline-offset-4 text-greenpitch text-l">Lugar</div>
                </div>
                <div className='p-8 xl:py-0 self-center'>
                    <div className="text-2xl xl:text-3xl">{t.direccion}</div>
                    <div className="underline underline-offset-4 text-greenpitch text-l">Direccion</div>
                </div>

                <div className='p-8 xl:py-0 self-center'>
                    <div className="text-2xl xl:text-3xl">{newdate}</div>
                    <div className="underline underline-offset-4 text-greenpitch text-l">Dia</div>
                </div>
                <div className='p-8 xl:py-0 self-center'>
                    <div className="text-2xl xl:text-3xl">{newhour[0]}:{newhour[1]} hs</div>
                    <div className="underline underline-offset-4 text-greenpitch text-l">Hora</div>
                </div>
                <div className='p-8 xl:py-0 self-center'>
                    <div className="text-2xl xl:text-3xl">Futbol {t.cancha}</div>
                </div>
                <div className='p-8 xl:py-0 self-center'>
                    <div className="text-2xl xl:text-3xl">Faltan {cuantosFaltan(t.lista, t.cancha)} jugadores</div>
                </div>
                <div className="flex flex-col justify-center my-2 w-full">
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
            {user_session == t.organizador ?
                <div className="flex flex-col text-center my-8 xl:mt-0 bg-white/70 shadow-xl shadow-black/50 rounded-md p-2">
                    <div>
                        <h1>LISTADO DE JUGADORES</h1>
                    </div>
                    <form action={actualizar} className="w-min h-max flex flex-col self-center mt-4">
                        <textarea className="p-2 text-center" name="jugadores" id="" cols={16} rows={16} >{t.lista}</textarea>
                        <button
                            type="submit"
                            className="rounded-md bg-black px-2 py-1 mt-4 text-xl font-semibold text-white shadow-sm hover:bg-yellow hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Editar
                        </button>
                    </form>
                </div> :
                <></>}
        </div>
        {/* <div className='order-3 self-center justify-center py-12 xl:py-0 xl:w-1/3'>

            <div className="flex flex-col justify-center mt-2">
                <Link href={'/buscar'}>
                    <button
                        type="submit"
                        className="rounded-md bg-black px-2 py-1 mt-2 text-xl font-semibold text-white shadow-sm hover:bg-yellow hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Volver
                    </button>
                </Link>
            </div>
        </div> */}
    </div>
}

function cuantosFaltan(turno: String, tipoFutbol: number) {
    let cant = 0;
    if (turno != null) {
        let arrayJugadores = turno.split('\r\n')
        for (let j in arrayJugadores) {
            if (arrayJugadores[j] !== '') {
                cant++;
            }
        }
    }

    if (tipoFutbol == 5) {
        return 10 - cant;
    } else if (tipoFutbol == 7) {
        return 14 - cant;
    } else if (tipoFutbol == 8) {
        return 16 - cant;
    }
}
