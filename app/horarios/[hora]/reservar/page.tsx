import { guardarCancha } from "@/app/lib/metodos";
import { cookies } from "next/headers";
import Link from "next/link";

export default function Page({ params, searchParams }: { params: { hora: string},
    searchParams?: {
        hoy:string
    };
  }) {
    let hora = params.hora;
    let h = hora.split("%3A");
    const time = `${h[0]}:${h[1]}`;
    let hoy = searchParams?.hoy;
    if (hoy == undefined) {
        let today = new Date();
        hoy = `${today.getFullYear()}-0${today.getMonth() + 1}-0${today.getDate()}`
    }
    const cookie = cookies();

    return <div className="h-max xl:h-screen mt-20">
        <form action={guardarCancha} className="w-4/6 m-auto">
            <div className="pt-6 xl:pt-12 text-center bg-[#E0E0E0] p-6 rounded-md">
                <h1 className="text-3xl font-bold text-black">Reservar cancha</h1>

                <div className="mt-4 xl:mt-10 grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-6 w-5/5 m-auto">

                    <div className="sm:col-span-3">
                        <label className="block text-sm font-medium leading-6 text-black">
                            Organizador
                        </label>
                        <div className="mt-2">
                            <input
                                type="text"
                                name="org"
                                id="org"
                                autoComplete="address-level2"
                                className="text-center block w-full rounded-md border-0 py-1.5 bg-white text-black ring-4 ring-inset ring-greenpitch placeholder:text-black focus:ring-2 focus:ring-offset focus:ring-black sm:text-sm sm:leading-6"
                                defaultValue={cookie.get('usuario')?.value}
                                readOnly
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-3">
                        <label className="block text-sm font-medium leading-6 text-black">
                            Numero de telefono
                        </label>
                        <div className="mt-2">
                            <input
                                type="number"
                                maxLength={20}
                                name="tel"
                                id="tel"
                                className="text-center block w-full rounded-md border-0 py-1.5 bg-white text-black ring-4 ring-inset ring-greenpitch placeholder:text-black focus:ring-2 focus:ring-offset focus:ring-black sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-3">
                        <label className="block text-sm font-medium leading-6 text-black">
                            Lugar
                        </label>
                        <div className="mt-2">
                            <input
                                type="text"
                                name="lugar"
                                id="lugar"
                                autoComplete="given-name"
                                className="text-center block w-full rounded-md border-0 py-1.5 bg-white text-black ring-4 ring-inset ring-greenpitch placeholder:text-black focus:ring-2 focus:ring-offset focus:ring-black sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-3">
                        <label className="block text-sm font-medium leading-6 text-black">
                            Direccion
                        </label>
                        <div className="mt-2">
                            <input
                                type="text"
                                name="direcc"
                                id="direcc"
                                autoComplete="family-name"
                                className="text-center block w-full rounded-md border-0 py-1.5 bg-white text-black ring-4 ring-inset ring-greenpitch placeholder:text-black focus:ring-2 focus:ring-offset focus:ring-black sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-2">
                        <label className="block text-sm font-medium leading-6 text-black">
                            Dia
                        </label>
                        <div className="mt-2">
                            <input
                                type="date"
                                id="dia"
                                name="dia"
                                className="text-center block w-full rounded-md border-0 py-1.5 bg-white text-black ring-4 ring-inset ring-greenpitch placeholder:text-black focus:ring-2 focus:ring-offset focus:ring-black sm:text-sm sm:leading-6"
                                defaultValue={hoy}
                                readOnly
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-2">
                        <label className="block text-sm font-medium leading-6 text-black">
                            Hora
                        </label>
                        <div className="mt-2">
                            <input
                                defaultValue={time}
                                id="hora"
                                name="hora"
                                type="text"
                                className="text-center block w-full rounded-md border-0 py-1.5 bg-white text-black ring-4 ring-inset ring-greenpitch placeholder:text-black focus:ring-2 focus:ring-offset focus:ring-black sm:text-sm sm:leading-6"
                                readOnly
                            />
                        </div>
                    </div>

                    {/* <div className="sm:col-span-1">
                        <label className="block text-sm font-medium leading-6 text-black">
                            Cuantos jugadores faltan
                        </label>
                        <div className="mt-2">
                            <input
                                type="number"
                                id="jqf"
                                name="jqf"
                                className="text-center block w-full rounded-md border-0 py-1.5 bg-white text-black ring-4 ring-inset ring-greenpitch placeholder:text-black focus:ring-2 focus:ring-offset focus:ring-black sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div> */}

                    <div className="sm:col-span-2 self-end">

                        <div className="mt-3">
                            <select
                                id="jugs"
                                name="jugs"
                                className="text-center block w-full rounded-md border-0 py-2 px-1 bg-white text-black ring-2 ring-inset ring-greenpitch placeholder:text-black focus:ring-2 focus:ring-offset focus:ring-black sm:max-w-xs sm:text-sm sm:leading-3"
                            >
                                <option>Futbol 5</option>
                                <option>Futbol 7</option>
                                <option>Futbol 8</option>
                            </select>
                        </div>
                    </div>

                    <div className="sm:col-span-6 self-end">
                        <button
                            type="submit"
                            className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Reservar
                        </button>
                    </div>

                    <div className="sm:col-span-6 self-end">
                        <Link href={'/horarios'}>
                            <button
                                type="submit"
                                className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brigthred hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Volver
                            </button>
                        </Link>
                    </div>

                </div>
            </div>
        </form>
    </div>
}