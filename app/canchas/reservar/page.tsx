export default function Page() {
    return <div>
        <div>
            <form action="" method="" className="m-auto">
                <div className="pt-12 pb-12. text-center">
                    <h1 className="text-base text-3xl font-bold leading-7 text-gray-900">Reservar cancha</h1>
                    <p className="mt-1 text-sm leading-6 text-gray-600">Completa los datos de la cancha</p>

                    <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-4 w-3/5 m-auto">

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
                                    className="text-center block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                                    name="tel"
                                    id="tel"
                                    className="text-center block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                                    className="text-center block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                                    className="text-center block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-1">
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Dia
                            </label>
                            <div className="mt-2">
                                <input
                                    id="dia"
                                    name="dia"
                                    type="date"
                                    className="text-center block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-1">
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Hora
                            </label>
                            <div className="mt-2">
                                <input
                                    id="hora"
                                    name="hora"
                                    type="time"
                                    autoComplete="email"
                                    className="text-center block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-1">
                            <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                Cantidad de jugadores
                            </label>
                            <div className="mt-3">
                                <select
                                    id="jugs"
                                    name="jugs"
                                    className="text-center block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-3"
                                >
                                    <option>10</option>
                                    <option>14</option>
                                    <option>16</option>
                                    <option>22</option>
                                </select>
                            </div>
                        </div>

                        <div className="sm:col-span-1 self-end">
                            <button
                                type="submit"
                                className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Reservar
                            </button>
                        </div>

                        {/* <div className="col-span-full">
                            <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                                -
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="street-address"
                                    id="street-address"
                                    autoComplete="street-address"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div> */}



                        {/* <div className="sm:col-span-2">
                            <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                                ZIP / Postal code
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="postal-code"
                                    id="postal-code"
                                    autoComplete="postal-code"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div> */}
                    </div>
                </div>
            </form>
        </div>
    </div>
}