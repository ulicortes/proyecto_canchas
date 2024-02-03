import NavBar from "@/app/componentes/NavBar";
import { traerTurno } from "@/app/lib/metodos";
import Link from "next/link";

export default async function Page({ params }: { params: { id: string } }) {
    const t = await traerTurno(params.id);
    let x = 0;
    return <div className="h-screen. mt-24">
        <NavBar></NavBar>
        <div className="h-screen flex flex-row">
            <div className="grid grid-cols-5 gap-4. text-center w-3/5 h-4/5 m-auto">
                <div className='col-span-1 col-start-2'>
                    <div className="text-3xl">{t[0].organizador}</div>
                    <div>Organizador</div>
                </div>
                <div className='col-span-1 col-start-4'>
                    <div className="text-3xl">{t[0].telefono}</div>
                    <div>Telefono</div>
                </div>
                <div className='col-span-2 col-start-1'>
                    <div className="text-3xl">{t[0].lugar}</div>
                    <div>Lugar</div>
                </div>
                <div className='col-span-1 col-start-3'>
                    <div className="text-3xl">{t[0].cancha}</div>
                </div>
                <div className='col-span-2 col-start-4'>
                    <div className="text-3xl">{t[0].direccion}</div>
                    <div>Direccion</div>
                </div>
                <div className='col-span-2 col-start-1'>
                    <div className="text-3xl">{t[0].dia}</div>
                    <div>Dia</div>
                </div>
                <div className='col-span-2 col-start-4'>
                    <div className="text-3xl">{t[0].hora}</div>
                    <div>Hora</div>
                </div>
                <div className='col-span-5'>
                    <div className="text-3xl">Faltan {t[0].jugadores_faltantes} jugadores</div>
                </div>
            </div>
            <div className="w-2/5 text-center">
                <h1>LISTADO DE JUGADORES</h1>
                <div className="flex flex-col py-4 justify-evenly w-full h-4/5 items-center	">
                    <input type="text" className="w-3/5 text-center bg-white border-solid border-2 rounded-sm border-black" />
                    <input type="text" className="w-3/5 text-center bg-white border-solid border-2 rounded-sm border-black" />
                    <input type="text" className="w-3/5 text-center bg-white border-solid border-2 rounded-sm border-black" />
                    <input type="text" className="w-3/5 text-center bg-white border-solid border-2 rounded-sm border-black" />
                    <input type="text" className="w-3/5 text-center bg-white border-solid border-2 rounded-sm border-black" />
                    <input type="text" className="w-3/5 text-center bg-white border-solid border-2 rounded-sm border-black" />
                    <input type="text" className="w-3/5 text-center bg-white border-solid border-2 rounded-sm border-black" />
                    <input type="text" className="w-3/5 text-center bg-white border-solid border-2 rounded-sm border-black" />
                    <input type="text" className="w-3/5 text-center bg-white border-solid border-2 rounded-sm border-black" />
                    <input type="text" className="w-3/5 text-center bg-white border-solid border-2 rounded-sm border-black" />
                    <input type="text" className="w-3/5 text-center bg-white border-solid border-2 rounded-sm border-black" />
                    <input type="text" className="w-3/5 text-center bg-white border-solid border-2 rounded-sm border-black" />
                    <input type="text" className="w-3/5 text-center bg-white border-solid border-2 rounded-sm border-black" />
                    <input type="text" className="w-3/5 text-center bg-white border-solid border-2 rounded-sm border-black" />
                    <input type="text" className="w-3/5 text-center bg-white border-solid border-2 rounded-sm border-black" />
                    <input type="text" className="w-3/5 text-center bg-white border-solid border-2 rounded-sm border-black" />
                </div>
            </div>
        </div>
        <div className="w-full flex justify-center">
            <Link href={'/buscar'}>
                <button
                    type="submit"
                    className="rounded-md bg-black px-2 py-1 text-xl font-semibold text-white shadow-sm hover:bg-yellow-300 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Volver
                </button>
            </Link>
        </div>
    </div>
}