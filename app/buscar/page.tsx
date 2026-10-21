'use client'
import { Suspense, useEffect, useState } from 'react';
import Loading from '../loading';
import { cobrarTurno, turnosCompletos } from '../lib/metodos';

interface turno {
    "id": number;
    "hora": string;
    "contacto": string;
    "responsable": string;
    "cancha": string;
    "deporte": string;
    "duracion": string;
    "precio": string;
    "pagado": number;
}

const horas: Record<number, string> = {
    480: "08:00",
    510: "08:30",
    540: "09:00",
    570: "09:30",
    600: "10:00",
    630: "10:30",
    660: "11:00",
    690: "11:30",
    720: "12:00",
    750: "12:30",
    780: "13:00",
    810: "13:30",
    840: "14:00",
    870: "14:30",
    900: "15:00",
    930: "15:30",
    960: "16:00",
    990: "16:30",
    1020: "17:00",
    1050: "17:30",
    1080: "18:00",
    1110: "18:30",
    1140: "19:00",
    1170: "19:30",
    1200: "20:00",
    1230: "20:30",
    1260: "21:00",
    1290: "21:30",
    1320: "22:00",
    1350: "22:30",
    1380: "23:00",
    1410: "23:30",
};



export default function Page() {
    const CAMPOS: { key: keyof turno; label: string; format?: (valor: turno[keyof turno]) => any }[] = [
        { key: "deporte", label: "Deporte" },
        { key: "hora", label: "Hora", format: (v) => horas[Number(v)] },
        { key: "cancha", label: "Cancha" },
        // { key: "duracion", label: "Duración (en minutos)" },
        {
            key: "precio", label: "Precio", format: (p) => {
                return new Intl.NumberFormat("es-AR", {
                    style: "currency",
                    currency: "ARS",
                    minimumFractionDigits: 0, // Cambia a 2 si necesitas centavos
                    maximumFractionDigits: 2,
                }).format(Number(p));
            }
        },
        { key: "responsable", label: "Responsable" },
        { key: "contacto", label: "Contacto" },
    ];
    const getToday = () => {
        let fecha = new Date();
        fecha.setHours(0);
        fecha.setMinutes(0);
        fecha.setSeconds(0);
        return fecha;
    }

    const [fecha, setFecha] = useState<Date>(getToday());
    const [hora, setHora] = useState(0);
    const [turnos, setTurnos] = useState<turno[]>([]);
    const [cobro, setCobro] = useState<boolean>(false);
    const [id_cobro, setIdCobro] = useState<number | null>(null);

    const cambiarDia = (dias: number) => {
        const nuevaFecha = new Date(fecha);
        nuevaFecha.setDate(nuevaFecha.getDate() + dias);

        // Opcional: Evitar ir a fechas anteriores a hoy si 'min' aplica
        if (dias < 0 && getToday) {
            const hoy = new Date(getToday());
            hoy.setHours(0, 0, 0, 0);
            nuevaFecha.setHours(0, 0, 0, 0);
            if (nuevaFecha < hoy) return;
        }

        setFecha(nuevaFecha);
        setHora(0);
    };

    useEffect(() => {
        async function cargarDeportes() {
            try {
                let t = await turnosCompletos(fecha.toISOString().split('T')[0]);
                setTurnos(t.turnos);
            } catch (error) {
                console.log(error)
            }
        }
        cargarDeportes();
    }, [fecha]);

    async function cobrar_turno() {
        if(!id_cobro) return;
        try {
            let t = await cobrarTurno(id_cobro);
            console.log(t)
        } catch (error) {
            console.log(error)
        }
    }

    console.log(turnos)
    return <Suspense fallback={<Loading message={"Cargando turnos..."} />}>
        <div className="w-full h-[95%] flex flex-col justify-evenly items-center text-center">
            <div className="w-full h-[95%] md:h-[90%] flex flex-col md:flex-row. justify-center items-center bg-transparent rounded-lg">
                {/* Bloque inferior */}
                {cobro ? <div className="w-full h-full fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex flex-col justify-center items-center px-4 animate-in fade-in duration-200">
                    <form
                        onSubmit={cobrar_turno}
                        className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
                    >
                        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                            <h3 className="text-xl font-bold text-slate-800">
                                Confirmar cobro del turno
                            </h3>
                            <button
                                type="button"
                                onClick={() => setCobro(false)}
                                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-200/50 transition-colors cursor-pointer"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="flex items-center justify-end gap-3 px-6 py-4 bg-slate-50/50 border-t border-slate-100">
                            {/* <button
                                type="button"
                                // onClick={() => setFormCancha(!form_cancha)}
                                className="px-4 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-200/60 transition-colors cursor-pointer"
                            >
                                Volver
                            </button> */}
                            <button
                                type="submit"
                                className="px-5 py-2 rounded-lg text-sm font-bold bg-emerald-600 hover:bg-greenpitch text-white shadow-md shadow-emerald-600/20 transition-all active:scale-[0.98] cursor-pointer"
                            >
                                Confirmar
                            </button>
                        </div>
                    </form>
                </div> : <></>}
                <div className="w-full md:w-[95%] min-h-full max-h-full rounded-none md:rounded-xl flex flex-col justify-center items-center gap-6 p-0 md:p-4 bg-black/70 shadow-lg shadow-black/50">
                    {/* Selector de Deporte */}
                    <div className="w-full md:w-[20%] h-fit flex justify-between items-center">
                        <div className='w-full md:w-[20%]. h-full flex flex-row justify-between items-center bg-white rounded-md p-4'>
                            <button className="cursor-pointer" onClick={() => cambiarDia(-1)}><img src="flecha_izq.svg" alt="izq" className="w-6 h-6" /></button>
                            <div className="overflow-x-auto font-bold text-xl text-white rounded-lg flex flex-row justify-start items-center gap-2">
                                <input
                                    className="w-fit font-bold text-md rounded-xl outline-none bg-transparent text-black [color-scheme:dark]. text-center"
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
                            <button className="cursor-pointer" onClick={() => cambiarDia(1)}><img src="flecha_izq.svg" alt="izq" className="w-6 h-6 rotate-180" /></button>
                        </div>
                    </div>

                    {/* Matriz Tabla: Horarios en Header, Canchas en Filas */}
                    <div className="w-full h-full overflow-x-auto border border-slate-300 rounded-lg bg-white shadow-sm">
                        <div className="w-full h-full overflow-x-auto border border-slate-300 rounded-lg bg-white shadow-sm">
                            {turnos && turnos.length > 0 ? (
                                <table className="min-w-max w-full border-collapse">
                                    <thead>
                                        <tr className="bg-transparent text-white">
                                            {CAMPOS.map(({ key, label }, i) => (
                                                <th
                                                    key={key}
                                                    className="min-w-20 px-4 py-3 text-center font-semibold bg-black/80"
                                                >
                                                    {label}
                                                </th>
                                            ))}
                                            <th
                                                    key={"pago"}
                                                    className="min-w-20 px-4 py-3 text-center font-semibold bg-black/80"
                                                >
                                                    Estado
                                                </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {turnos.map((t) => (
                                            <tr
                                                key={t.id}
                                                className={`${t.pagado === 1 ? 'bg-slate-300' : 'bg-white hover:bg-green-200'} border-b border-slate-200 last:border-b-0 transition-colors`}
                                            >
                                                {CAMPOS.map(({ key, format }, i) => (
                                                    <td
                                                        key={key}
                                                        className="min-w-20 h-12 px-4 border-r last:border-r-0 font-bold text-slate-900 text-center align-middle bg-inherit"
                                                    >
                                                        {format ? format(t[key]) : t[key]}
                                                    </td>
                                                ))}
                                                <td
                                                        key={-4}
                                                        className="min-w-20 h-12 px-4 border-r last:border-r-0 font-bold text-slate-900 text-center align-middle bg-inherit"
                                                    >
                                                        {t.pagado === 1 ? 'Pagado' : <button onClick={() => {setCobro(true); setIdCobro(t.id)}} className='bg-emerald-400 hover:bg-emerald-700 hover:text-white rounded-lg p-2 cursor-pointer'>Cobrar</button>}
                                                    </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div className="p-8 text-start text-slate-500 font-medium">
                                    No hay turnos para mostrar.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Suspense>
}