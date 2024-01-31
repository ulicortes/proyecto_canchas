// 'use client';

import { useState } from "react";
import { guardarCancha, turnosDeHoy } from "../lib/metodos";
import Horarios from "../componentes/Horarios";
import { horarios, turno } from "../lib/tipos";
import Link from "next/link";

export default async function Page() {

    // const [time, setTime] = useState("");
    // let setting = (t: String) => {
    //     let u = Object.values(t)[0];
    //     (t != "" ? setTime(u) : "");
    // }
    let change = 'hidden';
    const horasHoy = await turnosDeHoy();
    console.log(horasHoy);

    const horas = ['07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00',
        '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
        '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30', '00:00'];
    return <div className="pt-6 xl:pt-24 text-center h-screen">
        <h1 className="text-3xl font-bold text-gray-900">Selecciona un horario</h1>
        <div id="carrusel" className="xl:pt-5 xl:px-4 flex flex-row flex-nowrap xl:flex-wrap overflow-scroll xl:overflow-visible select-none m-auto w-4/5">
            {horas.map((h) =>
                <div key={h}>

                    {estaOcupado(horasHoy, h) ?
                        <div className="rounded-xl border-2 border-black bg-red-600 py-4 px-4 xl:py-4 xl:w-24 xl:px-0 m-2 text-center cursor-pointer" >
                            <h1 className="text-l">{h}</h1>
                        </div>
                        :
                        <div className="rounded-xl border-2 border-black bg-lime-500 py-4 px-4 xl:py-4 xl:w-24 xl:px-0 m-2 text-center cursor-pointer" >
                            <Link href={`/horarios/${h}/reservar`}>
                                <h1 className="text-l">{h}</h1>
                            </Link>
                        </div>}
                </div>
            )}
        </div>
        {/* <Horarios setTime={setting} />
            <form action={guardarCancha} className="m-auto">
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
                                    placeholder={time}
                                    id="hora"
                                    name="hora"
                                    type="time"
                                    autoComplete="email"
                                    className="text-center block w-full rounded-md border-0 py-1.5 bg-yellow-300 text-black shadow-md shadow-black ring-1. ring-inset. ring-black. placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                                className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Reservar
                            </button>
                        </div>
                    </div>
                </div>
            </form> */}
    </div>
}
function estaOcupado(hs: horarios[], h: string) {
    let ho = false
    hs.map((hora) => {
        if (hora.hora == `${h}:00`) ho = true;
    });
    return ho;
}