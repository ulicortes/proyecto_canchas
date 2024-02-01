import { guardarCancha } from "@/app/lib/metodos";
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

    return <div className="h-screen">
        <form action={guardarCancha} className="m-auto. mt-4">
            <div className="pt-6 xl:pt-12 text-center">
                <h1 className="text-3xl font-bold text-gray-900">Reservar cancha</h1>

                <div className="mt-4 xl:mt-10 grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-4 w-3/5 m-auto">

                    <div className="sm:col-span-2 sm:col-start-2.">
                        <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                            Organizador
                        </label>
                        <div className="mt-2">
                            <input
                                type="text"
                                name="org"
                                id="org"
                                autoComplete="address-level2"
                                className="text-center block w-full rounded-md border-0 py-1.5 bg-yellow-300 text-black shadow-md shadow-black ring-1. ring-inset. ring-black. placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                            Numero de telefono
                        </label>
                        <div className="mt-2">
                            <input
                                type="number"
                                maxLength={20}
                                name="tel"
                                id="tel"
                                className="text-center block w-full rounded-md border-0 py-1.5 bg-yellow-300 text-black shadow-md shadow-black ring-1. ring-inset. ring-black. placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                            Lugar
                        </label>
                        <div className="mt-2">
                            <input
                                type="text"
                                name="lugar"
                                id="lugar"
                                autoComplete="given-name"
                                className="text-center block w-full rounded-md border-0 py-1.5 bg-yellow-300 text-black shadow-md shadow-black ring-1. ring-inset. ring-black. placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                            Direccion
                        </label>
                        <div className="mt-2">
                            <input
                                type="text"
                                name="direcc"
                                id="direcc"
                                autoComplete="family-name"
                                className="text-center block w-full rounded-md border-0 py-1.5 bg-yellow-300 text-black shadow-md shadow-black ring-1. ring-inset. ring-black. placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-1">
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Dia
                        </label>
                        <div className="mt-2">
                            <input
                                type="date"
                                id="dia"
                                name="dia"
                                className="text-center block w-full rounded-md border-0 py-1.5 bg-yellow-300 text-black shadow-md shadow-black ring-1. ring-inset. ring-black. placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                defaultValue={hoy}
                                readOnly
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-1">
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Hora
                        </label>
                        <div className="mt-2">
                            <input
                                defaultValue={time}
                                id="hora"
                                name="hora"
                                type="time"
                                autoComplete="email"
                                className="text-center block w-full rounded-md border-0 py-1.5 bg-yellow-300 text-black shadow-md shadow-black ring-1. ring-inset. ring-black. placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                readOnly
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-1">
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Cuantos jugadores faltan
                        </label>
                        <div className="mt-2">
                            <input
                                type="number"
                                id="jqf"
                                name="jqf"
                                className="text-center block w-full rounded-md border-0 py-1.5 bg-yellow-300 text-black shadow-md shadow-black ring-1. ring-inset. ring-black. placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-1 self-end">

                        <div className="mt-3">
                            <select
                                id="jugs"
                                name="jugs"
                                className="text-center block w-full rounded-md border-0 py-2.5 bg-yellow-300 text-black shadow-md shadow-black ring-1. ring-inset. ring-black. focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-3"
                            >
                                <option>Futbol 5</option>
                                <option>Futbol 7</option>
                                <option>Futbol 8</option>
                            </select>
                        </div>
                    </div>

                    <div className="sm:col-span-4 self-end">
                        <button
                            type="submit"
                            className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-300 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Reservar
                        </button>
                    </div>

                    <div className="sm:col-span-4 self-end">
                        <Link href={'/horarios'}>
                            <button
                                type="submit"
                                className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-300 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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