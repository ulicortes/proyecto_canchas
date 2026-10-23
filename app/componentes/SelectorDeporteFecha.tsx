import { Field, Listbox, ListboxButton, ListboxOptions, ListboxOption } from "@headlessui/react";
import { Deporte } from "../lib/tipos";

type Props = {
    deporte: Deporte;
    deportes: Deporte[];
    asignarDeporte: (deporte: Deporte) => void;
    labelBoton: string;
    agregar: () => void;
};

export default function SelectorDeporteFecha({deporte, deportes, asignarDeporte}: Props) {
    return <div className="w-full flex flex-col-reverse md: flex-col md:flex-row justify-start items-center">
        <Field className="min-w-full md:min-w-[15%] flex flex-row items-center content-center rounded-b-xl md:rounded-r-none md:rounded-l-md border-r-2 border-slate-200 bg-white p-0 md:p-2">
            <Listbox value={deporte ?? null} onChange={asignarDeporte}>
                <ListboxButton className="w-full p-2 cursor-pointer font-bold rounded-md flex flex-row justify-center items-center gap-2">
                    {deporte ? (
                        <>
                            <img
                                src={obtenerImagenDeporte(deporte.nombre)}
                                alt={deporte.nombre}
                                className="w-8 h-8"
                            />
                            <span>{deporte.nombre}</span>
                            <img
                                src="flecha_izq.svg"
                                alt="desplegar"
                                className="w-6 transition-transform duration-300 bg-black. rounded-full rotate-270"
                            />
                        </>
                    ) : (
                        <span className="text-gray-500 p-1">Seleccionar deporte...</span>
                    )}
                </ListboxButton>

                <ListboxOptions className="w-48 rounded-lg border border-slate-400 bg-white shadow-lg z-50" anchor="bottom">
                    <ListboxOption key={-1} disabled value={null} />
                    {deportes.length > 0 ? deportes.map((c) => (
                        <ListboxOption
                            key={c.id}
                            value={c}
                            onClick={() => {
                                setIdDeporte(Number(c.id));
                                setCancha(null);
                            }}
                            className="w-full border-b border-slate-200 flex flex-row justify-start items-center p-2 cursor-pointer transition-all duration-300 hover:bg-emerald-300 gap-2"
                        >
                            <img
                                src={obtenerImagenDeporte(c.nombre)}
                                alt={c.nombre}
                                className="w-8 h-8"
                            />
                            <span>{c.nombre}</span>
                        </ListboxOption>
                    )) : <ListboxOption value={undefined}
                        className="w-full border-b border-slate-200 flex flex-row justify-start items-center p-2 cursor-pointer transition-all duration-300 hover:bg-emerald-300 gap-2"
                    ><span>No hay deportes para mostrar</span></ListboxOption>}
                </ListboxOptions>
            </Listbox>
        </Field>
        <div className='w-full md:w-[20%] h-full flex flex-row justify-between items-center bg-white rounded-t-md md:rounded-l-none md:rounded-r-md p-2'>
            <button className="cursor-pointer hover:bg-slate-200 rounded-lg" onClick={() => cambiarDia(-1)}><img src="flecha_izq.svg" alt="izq" className="w-6 h-6" /></button>
            <div className="overflow-x-auto font-bold text-xl rounded-lg flex flex-row justify-start items-center gap-2">
                <input
                    className="w-fit font-bold text-md rounded-xl. outline-none bg-transparent text-black [color-scheme:dark]. text-center"
                    type="date"
                    min={getToday().toISOString().split('T')[0]}
                    value={fecha.toISOString().split('T')[0]}
                    onChange={(e) => {
                        const val = e.target.value; // "2026-09-14"
                        if (!val) return;

                        // Separamos el string en año, mes y día
                        const [year, month, day] = val.split('-').map(Number);

                        // El mes en JS es base 0 (0 = Enero, 8 = Septiembre, 11 = Diciembre)
                        const fechaLocal = new Date(year, month - 1, day);

                        setFecha(fechaLocal);
                        setHora(0);
                    }}
                />
            </div>
            <button className="cursor-pointer hover:bg-slate-200 rounded-lg" onClick={() => cambiarDia(1)}><img src="flecha_izq.svg" alt="izq" className="w-6 h-6 rotate-180" /></button>
        </div>
    </div>
}