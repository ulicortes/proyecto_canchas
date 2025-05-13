import { guardarCancha } from "@/app/lib/metodos";
import { cookies } from "next/headers";
import { redirect } from 'next/navigation';
import Link from "next/link";

export default async function Page({ params }: { params: { dia: string, hora: string } }) {
    let hora = params.hora;
    let h = hora.split("%3A");
    const time = `${h[0]}:${h[1]}`;
    let hoy = params.dia.split("-");
    const cookie = cookies();
    
    return <div className="h-max xl:h-screen w-screen mt-20. self-center content-center items-center">
        <form action={guardarCancha} className="w-3/6 m-auto">
            <div className="pt-4 xl:pt-12. text-center bg-[#E0E0E0]. bg-gray-100 p-6 rounded-md">
                <h1 className="text-3xl font-bold text-black">Reservar cancha</h1>

                <div className="mt-4 xl:mt-10 grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-6 w-5/5 m-auto">

                    <div className="sm:col-span-3">
                        <div className="mt-2">
                            <input
                                type="text"
                                name="org"
                                id="org"
                                autoComplete="address-level2"
                                // placeholder="Organizador"
                                defaultValue={cookie.get('user')?.value}
                                className="text-center block w-full rounded-md border-0 py-1.5 bg-transparent text-black ring-4. ring-inset ring-greenpitch placeholder:text-grey focus:ring-2. focus:ring-offset focus:ring-black sm:text2xl. xl:text-[1.5rem] sm:leading-6"
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-3">
                        <div className="mt-2">
                            <input
                                type="number"
                                maxLength={20}
                                name="tel"
                                id="tel"
                                placeholder="Introducir nro de telefono"
                                className="text-center block w-full rounded-md border-0 py-1.5 bg-transparent text-black ring-4. ring-inset ring-greenpitch placeholder:text-grey focus:ring-2. focus:ring-offset focus:ring-black sm:text2xl. xl:text-[1.5rem] sm:leading-6"
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-3">
                        <div className="mt-2">
                            <input
                                type="text"
                                name="lugar"
                                id="lugar"
                                autoComplete="given-name"
                                placeholder="¿En que lugar?"
                                className="text-center block w-full rounded-md border-0 py-1.5 bg-transparent text-black ring-4. ring-inset ring-greenpitch placeholder:text-grey focus:ring-2. focus:ring-offset focus:ring-black sm:text2xl. xl:text-[1.5rem] sm:leading-6" />
                        </div>
                    </div>

                    <div className="sm:col-span-3">
                        <div className="mt-2">
                            <input
                                type="text"
                                name="direcc"
                                id="direcc"
                                autoComplete="family-name"
                                placeholder="¿En que direccion?"
                                className="text-center block w-full rounded-md border-0 py-1.5 bg-transparent text-black ring-4. ring-inset ring-greenpitch placeholder:text-grey focus:ring-2. focus:ring-offset focus:ring-black sm:text2xl. xl:text-[1.5rem] sm:leading-6" />
                        </div>
                    </div>

                    <div className="sm:col-span-2">
                        <div className="mt-2">
                            <input
                                type="text"
                                id="dia"
                                name="dia"
                                className="text-center block w-full rounded-md border-0 py-1.5 bg-transparent text-black ring-4. ring-inset ring-greenpitch placeholder:text-grey focus:ring-2. focus:ring-offset focus:ring-black sm:text2xl. xl:text-[1.5rem] sm:leading-6"
                                readOnly
                                defaultValue={hoy[2] + "/" + hoy[1] + "/" + hoy[0]}
                            />
                        </div>
                        <label className="block text-sm font-medium leading-6 text-black">
                            Dia
                        </label>
                    </div>

                    <div className="sm:col-span-2">
                        <div className="mt-2">
                            <input
                                defaultValue={time}
                                id="hora"
                                name="hora"
                                type="text"
                                readOnly
                                className="text-center block w-full rounded-md border-0 py-1.5 bg-transparent text-black placeholder:text-grey xl:text-[1.5rem] sm:leading-6" />
                        </div>
                        <label className="block text-sm font-medium leading-6 text-black">
                            Hora
                        </label>
                    </div>

                    <div className="sm:col-span-2 self-end">
                        <div className="mt-2">
                            <input
                                id="cancha"
                                name="cancha"
                                type="text"
                                placeholder="F5, F7 o F8?"
                                className="text-center block w-full rounded-md border-0 py-1.5 bg-transparent text-black ring-4. ring-inset ring-greenpitch placeholder:text-grey focus:ring-2. focus:ring-offset focus:ring-black sm:text2xl. xl:text-[1.5rem] sm:leading-6"
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-3 self-end">
                        <Link href={'/horarios'}>
                            <button
                                type="submit"
                                className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brigthred hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Volver
                            </button>
                        </Link>
                    </div>

                    <div className="sm:col-span-3 self-end">
                        <button
                            type="submit"
                            className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Reservar
                        </button>
                    </div>
                </div>
            </div>
        </form>
    </div>
}
