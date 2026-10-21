'use client'
import { useEffect, useRef, useState } from "react";
import NavBar from "../componentes/NavBar";
import { listarCanchas, listarDeportes, listarTurnos, nuevoTurno } from "../lib/metodos";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Field, Label } from '@headlessui/react'

interface cancha {
    "id": number;
    "nombre": string;
}

interface deporte {
    "id": number;
    "nombre": string;
    "duracion": string;
    "precio": string;
}

interface turno {
    "id": number;
    "nombre": string;
    "hora": number;
}

interface TurnosOcupados {
    nombre: string;
    horasOcupadas: number[];
}

export default function Page() {
    const getToday = () => {
        let fecha = new Date();
        fecha.setHours(0);
        fecha.setMinutes(0);
        fecha.setSeconds(0);
        return fecha;
    }

    const [fecha, setFecha] = useState<Date>(getToday());
    const [hora, setHora] = useState(0);
    const [cancha, setCancha] = useState<cancha | null>(null);
    const [deportes, setDeportes] = useState<deporte[]>([]);
    const [deporte, setDeporte] = useState<deporte | null>();
    const [duracion_deporte, setDuracionDeporte] = useState<number>(0);
    const [turnos, setTurnos] = useState<turno[]>([]);
    const [canchas, setCanchas] = useState<cancha[]>([])
    const [id_deporte, setIdDeporte] = useState<number>(0);
    const [nombre, setNombre] = useState<string>("");
    const [contacto, setContacto] = useState<string>("");
    const [mensaje_info, setMensajeInfo] = useState<String>("");
    const [cambio, setCambio] = useState<boolean>(false);
    const [lista_llena, setListaLlena] = useState<boolean>(false);
    const cachePorDeporte = useRef<Record<number, turno[]>>({});
    const fechaCache = useRef<string>("");

    useEffect(() => {
        async function cargarDeportes() {
            try {
                let f = fecha.toISOString().split('T')[0]
                if (fechaCache.current !== f) fechaCache.current = f;

                let listaDeportes = deportes;
                if (deportes.length == 0) {
                    const deps = await listarDeportes();
                    listaDeportes = deps.deportes;
                    setDeportes(listaDeportes);
                }
                // Seteamos el deporte activo ni bien sabemos cuál es, sin esperar al click
                const dd = listaDeportes.find(d => d.id === deporte?.id) || listaDeportes[0];

                if (!deporte?.id) return;
                if (cachePorDeporte.current[deporte?.id]) {
                    let deporte_cacheado = cachePorDeporte.current[deporte?.id];
                    setTurnos(deporte_cacheado);
                    let canchasUnicas = Array.from(
                        new Map<number, cancha>(deporte_cacheado.map((item: turno) => [item.id, { id: item.id, nombre: item.nombre }])).values()
                    );
                    setCanchas(canchasUnicas);
                    return;
                }

                if (deporte?.id) {
                    let t = await listarTurnos(fecha.toISOString().split('T')[0], deporte?.id.toString());
                    cachePorDeporte.current[deporte?.id] = t.turnos;
                    setTurnos(t.turnos);
                    setDuracionDeporte(Number(dd?.duracion));
                    let canchasUnicas = Array.from(
                        new Map<number, cancha>(t.turnos.map((item: turno) => [item.id, { id: item.id, nombre: item.nombre }])).values()
                    );
                    setCanchas(canchasUnicas);
                }
            } catch (error) {
                console.log(error)
            }
        }
        cargarDeportes();
    }, [fecha, id_deporte, cambio]);

    const traerCanchas = async (deporte: number) => {
        try {
            let data = await listarCanchas(deporte);
            setCanchas(data.canchas)
        } catch (error) {

        }
    }

    const guardarTurno = async () => {
        let id_cancha = cancha?.id || 0;
        // let id_cancha = turnos.filter(c => c.nombre == cancha)[0].id;
        let turno = {
            dia: fecha.toISOString().split('T')[0],
            hora: hora,
            cancha: id_cancha,
            contacto: contacto,
            responsable: nombre
        }
        setListaLlena(false);
        setHora(0);
        delete cachePorDeporte.current[deporte?.id || 0];
        try {
            let rsp = await nuevoTurno(turno);
            setMensajeInfo(rsp.message);
        } catch (error) {
            console.log(error);
        }
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
    type BloqueHorario = 'Mañana' | 'Tarde' | 'Noche';

    const BLOQUES_HORARIOS: Record<BloqueHorario, Record<number, string>> = {
        Mañana: {
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
        },
        Tarde: {
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
        },
        Noche: {
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
        },
    };

    function formatMinutosAHora(minutos: number): string {
        const hrs = Math.floor(minutos / 60);
        const mins = minutos % 60;

        const hrsStr = hrs.toString().padStart(2, '0');
        const minsStr = mins.toString().padStart(2, '0');

        return `${hrsStr}:${minsStr}`;
    }

    function agruparPorCancha(data: turno[]): TurnosOcupados[] {
        const mapa = new Map<string, TurnosOcupados>();

        for (const fila of data) {
            if (!mapa.has(fila.nombre)) {
                mapa.set(fila.nombre, { nombre: fila.nombre, horasOcupadas: [] });
            }

            if (fila.hora !== null) {
                mapa.get(fila.nombre)!.horasOcupadas.push(fila.hora);
                mapa.get(fila.nombre)!.horasOcupadas.push(fila.hora + (Number(deporte?.duracion) - 30));
            }
        }
        return Array.from(mapa.values());
    }

    function obtenerImagenDeporte(nombre: string): string {
        const nombreLower = nombre.toLowerCase();

        if (nombreLower.includes('futbol') || nombreLower.includes('fútbol')) return 'futbol.svg';
        if (nombreLower.includes('basquet') || nombreLower.includes('básquet')) return 'basquet.svg';
        if (nombreLower.includes('tenis') || nombreLower.includes('padel') || nombreLower.includes('pádel')) return 'tenis.svg';
        if (nombreLower.includes('voley') || nombreLower.includes('vóley')) return 'voley.svg';

        return '/deportes/generico.svg'; // fallback si no matchea ninguno
    }

    function manipularModal() {
        if (id_deporte > 0 && fecha && hora && cancha && nombre != "" && contacto != "") {
            setListaLlena(true);
        }
    }

    const esHoraPasada = (keyNum: number): boolean => {
        const ahora = new Date();

        // Normalizar ambas fechas a medianoche (AAAA-MM-DD) para comparar solo días
        const fechaSeleccionada = new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate());
        const hoy = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate());

        // Si la fecha seleccionada es previa a hoy, todo ya pasó
        if (fechaSeleccionada < hoy) return true;

        // Si la fecha seleccionada es posterior a hoy, nada pasó aún
        if (fechaSeleccionada > hoy) return false;

        // Si es el día de hoy, convertimos la hora actual a minutos totales (ej: 10:30 AM -> 10 * 60 + 30 = 630)
        const minutosActuales = ahora.getHours() * 60 + ahora.getMinutes();

        // Compramos si los minutos de la celda son menores o iguales a la hora actual
        return keyNum <= minutosActuales;
    };

    function cerrar() {
        setMensajeInfo("");
        setCambio(!cambio)
    }

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

    return <div className="w-full h-[95%] flex flex-col justify-evenly items-center text-center">
        {/* Mensaje informativo */}
        {mensaje_info !== "" ? <div className="w-full h-full fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex flex-col justify-center items-center px-4 animate-in fade-in duration-200">
            <div className="bg-white shadow-2xl shadow-black/50 rounded-2xl w-full max-w-md p-8 flex flex-col items-center gap-4 animate-in zoom-in-95 duration-200">
                <h1 className="font-bold text-xl text-black text-center leading-snug">
                    {mensaje_info}
                </h1>

                <button
                    onClick={cerrar}
                    className="mt-2 w-full bg-green-500 hover:bg-green-600 active:scale-95 transition-all duration-150 text-white font-bold py-3 rounded-lg"
                >
                    Volver
                </button>
            </div>
        </div> : <></>}
        {/* Bloque superior */}
        <div className="w-full h-[90%] flex flex-col md:flex-row. justify-evenly items-center bg-transparent rounded-lg">
            {/* Bloque inferior */}
            <div className="w-full md:w-[95%] min-h-full max-h-full rounded-none md:rounded-xl flex flex-col justify-between gap-6 p-4 bg-black/70 shadow-lg shadow-black/50">
                {/* Selector de Deporte */}
                <div className="w-full flex flex-col-reverse md:flex-col md:flex-row justify-start items-center">
                    <Field className="min-w-[15%] flex flex-row items-center content-center rounded-l-md border-r-2 border-slate-200 bg-white p-0 md:p-2">
                        <Listbox value={deporte ?? null} onChange={setDeporte}>
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
                    <div className='w-full md:w-[20%] h-full flex flex-row justify-between items-center bg-white rounded-r-md px-2'>
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
                {/* Matriz Tabla: Horarios en Header, Canchas en Filas */}
                <div className="w-full h-full overflow-x-auto border-3 border-slate-900 rounded-lg bg-white shadow-sm">
                    <div className="min-w-max flex flex-col">
                        {turnos.length > 0 && canchas.length > 0 ? (
                            canchas.map((c) => (
                                <div
                                    key={c.id}
                                    className="flex flex-row items-center odd: bg-gray-200 even:bg-slate-200. border-b border-slate-900 last:border-b-0 hover:bg-slate-50/50. transition-colors"
                                >
                                    {/* Nombre de la Cancha (Fixed al scrollear hacia la derecha) */}
                                    <div className="w-20 break-words md:min-w-50 min-h-[3rem] font-bold text-slate-900 content-center bg-inherit text-center sticky left-0">
                                        {c.nombre}
                                    </div>

                                    {/* Botones de Horarios por Cancha */}
                                    {Object.entries(horas).map(([minutosStr]) => {
                                        const keyNum = Number(minutosStr);
                                        const esPasado = esHoraPasada ? esHoraPasada(keyNum) : false;

                                        // Evaluación de disponibilidad para esta cancha (c.id) y este horario (keyNum)
                                        const estaOcupado = turnos
                                            .filter((t) => t.id === c.id)
                                            .some((t) => t.hora === keyNum || t.hora + 30 === keyNum);

                                        const esSeleccionado = cancha?.id === c.id && hora === keyNum;

                                        let estilo = "bg-white cursor-pointer hover:bg-emerald-300 text-slate-800";
                                        if (esPasado || estaOcupado) {
                                            estilo = "bg-slate-500 opacity-40 cursor-not-allowed pointer-events-none text-slate-500";
                                        } else if (esSeleccionado) {
                                            estilo = "bg-emerald-400 text-white font-extrabold shadow-md";
                                        }

                                        if (!esPasado && !estaOcupado) return (
                                            <div
                                                key={keyNum}
                                                className={`h-full min-h-[3rem] min-w-[5rem] text-md rounded-sm m-1 border border-slate-400 
                                                        font-bold text-center select-none transition-all duration-300 content-center
                                                        ${esSeleccionado ? 'bg-emerald-400 text-white font-extrabold shadow-md' :
                                                        'bg-white cursor-pointer hover:bg-emerald-300 text-slate-800'}
                                                            `}

                                                // disabled={esPasado || estaOcupado}
                                                onClick={() => {
                                                    setCancha(c);
                                                    setHora(keyNum);
                                                }}
                                            >
                                                {horas[Number(minutosStr)]}
                                            </div>
                                        );
                                    })}
                                </div>
                            ))
                        ) : (
                            <div className="p-8 text-start text-slate-500 font-medium">
                                No hay canchas disponibles para mostrar.
                            </div>
                        )}
                    </div>
                </div>
                {/* Carteles de disponible y seleccionado */}
                <div className="flex flex-row items-center gap-2 text-xs md:text-sm">
                    <span className="px-2 py-1 border border-slate-900 font-bold bg-white rounded">
                        DISPONIBLE
                    </span>
                    <span className="px-2 py-1 border border-slate-900 font-bold bg-emerald-400 text-white rounded">
                        SELECCIONADO
                    </span>
                </div>
                {/* Bloque inferior */}
                <div className="w-full h-[35%] py-2 px-2 md:p-0 flex flex-col justify-evenly items-center">
                    <label className="w-[100%] h-fit text-3xl text-center md:text-start h-fit text-slate-100 font-bold">Datos de contacto</label>
                    <div className='w-full h-full md:h-fit flex flex-col md:flex-row justify-evenly items-center md:items-end gap-2'>
                        <div className="w-full md:w-[35%] h-fit flex flex-col justify-center items-center">
                            <label className="w-full text-xl text-start h-fit text-slate-100 font-bold">Nombre</label>
                            <input
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                className="w-full font-semibold text-base text-center p-2 rounded-lg outline-none text-black bg-slate-100 border border-slate-400"
                                type="text"
                            />
                        </div>
                        <div className="w-full md:w-[35%] h-fit flex flex-col justify-center items-center">
                            <label className="w-full text-xl text-start h-fit text-slate-100 font-bold">Contacto</label>
                            <input
                                value={contacto}
                                onChange={(e) => setContacto(e.target.value)}
                                className="w-full font-semibold text-base text-center p-2 rounded-lg outline-none text-black bg-slate-100 border border-slate-400"
                                type="number"
                            />
                        </div>
                        <div className='w-full md:w-[20%] h-full md:h-fit flex flex-row justify-center items-center'>
                            <button
                                onClick={manipularModal}
                                className="w-fit md:w-full h-fit text-lg font-bold flex items-center justify-center rounded-lg bg-green-300 hover:bg-green-200 text-slate-900 border border-slate-400 px-8 py-2 transition-colors duration-200"
                            >
                                Revisar reserva
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {lista_llena ? <div className="fixed top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-black/70">
            <div className="w-full md:w-[50%] h-[70%] md:h-[60%] flex flex-col justify-between items-center bg-[#516d5c] p-3 rounded-lg shadow-md shadow-black">
                <div className="w-[90%] md:w-[50%] h-full flex flex-col justify-between items-center">
                    <h1 className="w-full font-bold text-3xl text-white text-center border-b-2 border-white/60">DETALLES DE LA RESERVA</h1>
                    <div className="w-full flex flex-row justify-evenly text-2xl text-white">
                        <img src="sports.svg" alt="deporte" className="w-8" />
                        <h1 className="w-[30%] font-thin text-start">Deporte:</h1>
                        <h1 className="w-[70%] font-bold text-center">{deporte?.nombre}</h1>
                    </div>
                    <div className="w-full flex flex-row justify-evenly text-2xl text-white">
                        <img src="field.svg" alt={deporte?.nombre} className="w-8" />
                        <h1 className="w-[30%] font-thin text-start">Cancha:</h1>
                        <h1 className="w-[70%] font-bold text-center">{cancha?.nombre}</h1>
                    </div>
                    <div className="w-full flex flex-row justify-evenly text-2xl text-white">
                        <img src="date.svg" alt="date" className="w-8" />
                        <h1 className="w-[30%] font-thin text-start">Fecha:</h1>
                        <h1 className="w-[70%] font-bold text-center">{fecha.toLocaleDateString('es-AR', { timeZone: 'UTC' })}</h1>
                    </div>
                    <div className="w-full flex flex-row justify-evenly text-2xl text-white">
                        <img src="time.svg" alt="time" className="w-8" />
                        <h1 className="w-[30%] font-thin text-start">Horario:</h1>
                        <h1 className="w-[70%] font-bold text-center">{formatMinutosAHora(hora)} hs</h1>
                    </div>
                    <div className="w-full flex flex-row justify-evenly text-2xl text-white">
                        <img src="price.svg" alt="time" className="w-8" />
                        <h1 className="w-[20%] font-thin text-start">Precio:</h1>
                        <h1 className="w-[70%] font-bold text-center">{new Intl.NumberFormat("es-AR", {
                            style: "currency",
                            currency: "ARS",
                            minimumFractionDigits: 0, // Cambia a 2 si necesitas centavos
                            maximumFractionDigits: 2,
                        }).format(Number(deporte?.precio))}</h1>
                    </div>
                    <div className="w-full flex flex-row justify-evenly text-2xl text-white">
                        <img src="person_white.svg" alt="time" className="w-8" />
                        <h1 className="w-[20%] font-thin text-start">Nombre:</h1>
                        <h1 className="w-[70%] font-bold text-center">{nombre}</h1>
                    </div>
                    <div className="w-full flex flex-row justify-evenly text-2xl text-white">
                        <img src="contact.svg" alt="time" className="w-8" />
                        <h1 className="w-[20%] font-thin text-start">Contacto:</h1>
                        <h1 className="w-[70%] font-bold text-center">{contacto}</h1>
                    </div>
                    <div className="w-full h-[15%] flex flex-row justify-evenly items-center">
                        <button
                            onClick={() => { setHora(0); setListaLlena(false) }}
                            className="max-w-[220px] h-fit flex items-center justify-center gap-2 rounded-full bg-white/80 hover:bg-slate-500 hover:text-white shadow-lg shadow-black/20 backdrop-blur-sm px-4 py-3 transition-colors duration-200"
                        >
                            Volver
                        </button>
                        <button
                            onClick={guardarTurno}
                            className="max-w-[220px] h-fit flex items-center justify-center gap-2 rounded-full bg-green-400 hover:bg-emerald-600 hover:text-white shadow-lg shadow-black/20 backdrop-blur-sm px-4 py-3 transition-colors duration-200"
                        >
                            Confirmar reserva
                        </button>
                    </div>
                </div>
            </div>
        </div> : <></>}
    </div>

}
