'use client'

import NavBar from "../componentes/NavBar";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { signOut } from "../lib/sesion";
import { borrarCancha, borrarDeporte, crearCancha, crearDeporte, datos_admin, editarCancha, editarDeporte, listarCanchasPorAdmin, listarDeportes } from "../lib/metodos";

interface cancha {
    "id": number;
    "nombre": string;
    "deporte": number;
    "superficie": string;
    "estado": number;
}
interface deporte {
    "id": number;
    "nombre": string;
    "duracion": string;
    "precio": string;
}

export default function Page() {
    const [deportes, setDeportes] = useState<deporte[]>([]);
    const [deporte, setDeporte] = useState<deporte | null>(null);
    const [canchas, setCanchas] = useState<cancha[]>([]);
    const [cancha, setCancha] = useState<cancha | null>(null);
    const [usuario, setUsuario] = useState<string>("");
    const [mensaje_info, setMensajeInfo] = useState<String>("");
    const [cambio, setCambio] = useState<boolean>(false);
    const [form_cancha, setFormCancha] = useState<boolean>(false);
    const [form_editar_cancha, setFormEditarCancha] = useState<boolean>(false);
    const [form_deporte, setFormDeporte] = useState<boolean>(false);

    async function crear_cancha(e: FormEvent<HTMLFormElement>) {
        e.preventDefault(); // Evita que la página se recargue

        const formData = new FormData(e.currentTarget);

        setFormCancha(!form_cancha);
        try {
            let rsp = await crearCancha(formData);
            console.log(rsp)

            setMensajeInfo(rsp.message);
        } catch (err) {
            console.error('Error inesperado al crear cancha:', err);
            setMensajeInfo('Ocurrió un error inesperado');
        }
    }

    async function crear_deporte(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        setFormDeporte(!form_deporte);
        try {
            let rsp = await crearDeporte(formData);
            console.log(rsp)
            setMensajeInfo(rsp.message);
        } catch (err) {
            console.error('Error inesperado al crear cancha:', err);
            setMensajeInfo('Ocurrió un error inesperado');
        }
    }

    async function desloguear() {
        try {
            await signOut();
        } catch (error) {
            console.log(error)
        }
    }

    async function borrar_cancha(id: number) {
        try {
            let rsp = await borrarCancha(id);
            setMensajeInfo(rsp.message);
        } catch (error) {
            console.log(error)
        }
    }

    async function borrar_deporte(id: number) {
        try {
            let rsp = await borrarDeporte(id);
            setMensajeInfo(rsp.message)
        } catch (error) {
            console.log(error);
        }
    }

    async function editar_cancha(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        if (!cancha?.id) setMensajeInfo("Falta la cancha");
        try {
            let rsp = await editarCancha(formData, cancha?.id);
            setCancha(null);
            setMensajeInfo(rsp.message)
        } catch (error) {
            console.log(error);
        }
    }

    async function editar_deporte(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        if (!deporte?.id) setMensajeInfo("Falta el deporte");
        try {
            let rsp = await editarDeporte(formData, deporte?.id);
            setDeporte(null);
            setMensajeInfo(rsp.message)
        } catch (error) {
            console.log(error);
        }
    }

    function cerrar() {
        setMensajeInfo("");
        setCambio(!cambio)
    }

    useEffect(() => {
        async function cargarDeportes() {
            try {
                const [deps, canchasResult, usuarioResult] = await Promise.all([
                    listarDeportes(),
                    listarCanchasPorAdmin(),
                    datos_admin(),
                ]);
                setDeportes(deps.deportes);
                setCanchas(canchasResult.canchas);
                setUsuario(usuarioResult);
            } catch (error) {
                console.log(error)
            }
        }
        cargarDeportes()
    }, [cambio]);

    const nombre_deportes = useMemo(() => {
        return deportes.reduce((acc, deporte) => {
            acc[deporte.id] = deporte.nombre; // O guardar el objeto completo 'deporte'
            return acc;
        }, {} as Record<string | number, string>);
    }, [deportes]);


    return <div className="w-full h-[95%]. h-full overflow-y-hidden flex flex-col justify-start items-center text-center">
        {/* <NavBar /> */}
        {/* <div className='bg-white/80 shadow-xl shadow-black/50 md:rounded-md w-full md:w-[95%] h-full xl:h-[95%] max-h-[92%]. overflow-hidden'> */}
            <div className='w-full h-full overflow-y-auto flex flex-col justify-evenly items-center p-0.5 md:p-6'>
                <div className="w-full h-fit">
                    <h1 className="text-3xl py-10. md:text-3xl font-bold">Panel de administracion</h1>
                </div>
                {mensaje_info != "" ? <div className="w-full h-full fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex flex-col justify-center items-center px-4 animate-in fade-in duration-200">
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
                <section className="w-[100%] md:w-[70%] bg-black/70 p-0.5 md:p-6 my-4 rounded-2xl shadow-xl shadow-black/40">
                    <div className="h-24 md:h-fit flex flex-col md:flex-row justify-between items-center mb-2">
                        <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
                            Gestión de Canchas
                        </h2>

                        <button onClick={() => setFormCancha(!form_cancha)} className="bg-[#a7f3d0] text-[#1f2937] font-semibold px-0.5 md:px-5 py-2.5 rounded-xl hover:bg-emerald-300 transition flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                            Agregar Nueva Cancha
                        </button>
                    </div>


                    <div className="h-fit overflow-x-auto">
                        <table className="w-full text-center md:text-left text-sm">
                            <thead className="bg-slate-100 text-slate-700 uppercase font-semibold text-md rounded-lg">
                                <tr>
                                    <th className="min-w-[9rem] px-2 md:px-6 py-4 rounded-l-lg">Nombre</th>
                                    <th className="min-w-[9rem] px-2 md:px-6 py-4 ">Deporte</th>
                                    <th className="min-w-[9rem] px-2 md:px-6 py-4 ">Superficie</th>
                                    <th className="min-w-[9rem] px-2 md:px-6 py-4 ">Estado</th>
                                    <th className="min-w-[9rem] px-2 md:px-6 py-4 rounded-r-lg text-end">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {canchas.map(c => {
                                    return <tr key={c.id} className="hover:bg-slate-950 transition">
                                        <td className="truncate px-2 md:px-6 py-5 font-bold text-md text-slate-100">{c.nombre}</td>
                                        <td className="px-2 md:px-6 py-5">
                                            <span className="bg-orange-100 text-slate-700 px-1 md:px-3 py-1 rounded-full text-md font-semibold">{nombre_deportes[c.deporte] || 'Sin deporte'}</span>
                                        </td>
                                        <td className="px-2 md:px-6 py-5 text-slate-100 text-md">{c.superficie}</td>
                                        <td className="px-2 md:px-6 py-5 content-center items-center">
                                            {c.estado == 0 ? <span className={`bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-md font-semibold`}>Activa</span>
                                                : c.estado == 1 ? <span className={`bg-slate-300 text-black px-3 py-1 rounded-full text-md font-semibold`}>Mantenimiento</span>
                                                    : <span className={`bg-red-500 text-emerald-900 px-3 py-1 rounded-full text-md font-semibold`}>Inactiva</span>}

                                        </td>
                                        <td className="px-2 md:px-6 py-5 text-right space-x-2">
                                            <button onClick={() => setCancha(c)} className="text-slate-100 hover:text-blue-600 p-1.5 rounded-lg hover:bg-blue-50 transition">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                                            </button>
                                            <button className="text-slate-100 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                            </button>
                                        </td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                </section>
                <section className="w-[100%] md:w-[70%] bg-black/70 p-0.5 md:p-6 my-4 rounded-2xl shadow-xl shadow-black/40">
                    <div className="h-24 md:h-fit flex flex-col md:flex-row justify-between items-center mb-2">
                        <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
                            Gestión de Deportes
                        </h2>
                        <button onClick={() => setFormDeporte(!form_deporte)} className="bg-[#a7f3d0] text-[#1f2937] font-semibold px-5 py-2.5 rounded-xl hover:bg-emerald-300 transition flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                            Agregar Nuevo Deporte
                        </button>
                    </div>

                    <div className="h-fit overflow-x-auto">
                        <table className="w-full text-center md:text-left text-sm">
                            <thead className="bg-slate-100 text-slate-700 uppercase font-semibold text-xs">
                                <tr>
                                    <th className="px-2 md:px-6 py-4 rounded-l-lg">Deporte</th>
                                    <th className="px-2 md:px-6 py-4">Duración Estándar</th>
                                    <th className="px-2 md:px-6 py-4">Precio Base</th>
                                    <th className="px-2 md:px-6 py-4 rounded-r-lg text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {deportes.map(d => {
                                    return <tr key={d.id} className="hover:bg-slate-950 transition">
                                        <td className="truncate px-2 md:px-6 py-5 font-medium text-slate-100">{d.nombre}</td>
                                        <td className="px-2 md:px-6 py-5 text-slate-100">{d.duracion} minutos</td>
                                        <td className="px-2 md:px-6 py-5 font-semibold text-slate-100">{new Intl.NumberFormat("es-AR", {
                                            style: "currency",
                                            currency: "ARS",
                                            minimumFractionDigits: 0, // Cambia a 2 si necesitas centavos
                                            maximumFractionDigits: 2,
                                        }).format(Number(d.precio))}</td>
                                        <td className="px-2 md:px-6 py-5 text-right space-x-2">
                                            <button onClick={() => setDeporte(d)} className="text-slate-100 hover:text-blue-600 p-1.5 rounded-lg hover:bg-blue-50 transition">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                                            </button>
                                            <button onClick={() => borrar_deporte(d.id)} className="text-slate-100 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                            </button>
                                        </td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                </section>
                {form_cancha ? <div className="w-full h-full fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex flex-col justify-center items-center px-4 animate-in fade-in duration-200">
                    <form
                        onSubmit={crear_cancha}
                        className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
                    >
                        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                            <h3 className="text-xl font-bold text-slate-800">
                                Agregar una cancha
                            </h3>
                            <button
                                type="button"
                                onClick={() => setFormCancha(false)}
                                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-200/50 transition-colors cursor-pointer"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="p-6 space-y-4 text-left">
                            {/* Campo Nombre */}
                            <div>
                                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1">
                                    Nombre
                                </label>
                                <input
                                    type="text"
                                    name="nombre"
                                    placeholder="Ej: Cancha 1, Techada A"
                                    required
                                    className="w-full px-3.5 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50/50 text-slate-950 text-sm transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1">
                                    Tipo de superficie
                                </label>
                                <input
                                    type="text"
                                    name="superficie"
                                    placeholder="Ej: Césped sintético, Polvo de ladrillo"
                                    required
                                    className="w-full px-3.5 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50/50 text-slate-950 text-sm transition-all"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                {/* Campo Deporte */}
                                <div>
                                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1">
                                        Deporte
                                    </label>
                                    <select
                                        name="deporte"
                                        className="w-full px-3.5 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50/50 text-slate-950 text-sm transition-all cursor-pointer"
                                    >
                                        {deportes.map((c) => (
                                            <option key={c.id} value={c.id}>
                                                {c.nombre}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1">
                                        Estado
                                    </label>
                                    <select
                                        name="estado"
                                        className="w-full px-3.5 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50/50 text-slate-950 text-sm transition-all cursor-pointer"
                                    >
                                        <option value="0">Activa</option>
                                        <option value="1">Mantenimiento</option>
                                        <option value="2">Inactiva</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-3 px-6 py-4 bg-slate-50/50 border-t border-slate-100">
                            <button
                                type="button"
                                onClick={() => setFormCancha(!form_cancha)}
                                className="px-4 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-200/60 transition-colors cursor-pointer"
                            >
                                Volver
                            </button>
                            <button
                                type="submit"
                                className="px-5 py-2 rounded-lg text-sm font-bold bg-emerald-600 hover:bg-greenpitch text-white shadow-md shadow-emerald-600/20 transition-all active:scale-[0.98] cursor-pointer"
                            >
                                Agregar
                            </button>
                        </div>
                    </form>
                </div> : <></>}
                {form_deporte ? <div className="w-full h-full fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex flex-col justify-center items-center px-4 animate-in fade-in duration-200">
                    <form
                        onSubmit={crear_deporte}
                        className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
                    >
                        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                            <h3 className="text-xl font-bold text-slate-800">
                                Agregar un deporte
                            </h3>
                            <button
                                type="button"
                                onClick={() => setFormDeporte(false)}
                                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-200/50 transition-colors cursor-pointer"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="p-6 space-y-4 text-left">
                            <div>
                                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1">
                                    Deporte
                                </label>
                                <input
                                    type="text"
                                    name="nombre"
                                    placeholder="Ej: Pádel, Fútbol 7"
                                    required
                                    className="w-full px-3.5 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50/50 text-slate-950 text-sm transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1">
                                    Duración
                                </label>
                                <select
                                    name="duracion"
                                    className="w-full px-3.5 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50/50 text-slate-950 text-sm transition-all cursor-pointer"
                                >
                                    <option value="60">60 minutos</option>
                                    <option value="90">90 minutos</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1">
                                    Precio
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-semibold text-sm">
                                        $
                                    </span>
                                    <input
                                        type="text"
                                        name="precio"
                                        placeholder="0"
                                        required
                                        className="w-full pl-8 pr-3.5 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50/50 text-slate-950 text-sm transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-3 px-6 py-4 bg-slate-50/50 border-t border-slate-100">
                            <button
                                type="button"
                                onClick={() => setFormDeporte(!form_deporte)}
                                className="px-4 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-200/60 transition-colors cursor-pointer"
                            >
                                Volver
                            </button>
                            <button
                                type="submit"
                                className="px-5 py-2 rounded-lg text-sm font-bold bg-emerald-600 hover:bg-greenpitch text-white shadow-md shadow-emerald-600/20 transition-all active:scale-[0.98] cursor-pointer"
                            >
                                Agregar
                            </button>
                        </div>
                    </form>
                </div> : <></>}
                {cancha ? <div className="w-full h-full fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex flex-col justify-center items-center px-4 animate-in fade-in duration-200">
                    <form
                        onSubmit={editar_cancha}
                        className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
                    >
                        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                            <h3 className="text-xl font-bold text-slate-800">
                                Editar cancha
                            </h3>
                            <button
                                type="button"
                                onClick={() => setCancha(null)}
                                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-200/50 transition-colors cursor-pointer"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="p-6 space-y-4 text-left">
                            {/* Campo Nombre */}
                            <div>
                                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1">
                                    Nombre
                                </label>
                                <input
                                    type="text"
                                    name="nombre"
                                    defaultValue={cancha.nombre}
                                    placeholder="Ej: Cancha 1, Techada A"
                                    required
                                    className="w-full px-3.5 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50/50 text-slate-950 text-sm transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1">
                                    Tipo de superficie
                                </label>
                                <input
                                    type="text"
                                    name="superficie"
                                    defaultValue={cancha.superficie}
                                    placeholder="Ej: Césped sintético, Polvo de ladrillo"
                                    required
                                    className="w-full px-3.5 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50/50 text-slate-950 text-sm transition-all"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                {/* Campo Deporte */}
                                <div>
                                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1">
                                        Deporte
                                    </label>
                                    <select
                                        name="deporte"
                                        defaultValue={cancha.deporte}
                                        className="w-full px-3.5 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50/50 text-slate-950 text-sm transition-all cursor-pointer"
                                    >
                                        {deportes.map((c) => (
                                            <option key={c.id} value={c.id}>
                                                {c.nombre}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1">
                                        Estado
                                    </label>
                                    <select
                                        defaultValue={cancha.estado}
                                        name="estado"
                                        className="w-full px-3.5 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50/50 text-slate-950 text-sm transition-all cursor-pointer"
                                    >
                                        <option value="0">Activa</option>
                                        <option value="1">Mantenimiento</option>
                                        <option value="2">Inactiva</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-3 px-6 py-4 bg-slate-50/50 border-t border-slate-100">
                            <button
                                type="button"
                                onClick={() => setCancha(null)}
                                className="px-4 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-200/60 transition-colors cursor-pointer"
                            >
                                Volver
                            </button>
                            <button
                                type="submit"
                                className="px-5 py-2 rounded-lg text-sm font-bold bg-emerald-600 hover:bg-greenpitch text-white shadow-md shadow-emerald-600/20 transition-all active:scale-[0.98] cursor-pointer"
                            >
                                Agregar
                            </button>
                        </div>
                    </form>
                </div> : <></>}
                {deporte ? <div className="w-full h-full fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex flex-col justify-center items-center px-4 animate-in fade-in duration-200">
                    <form
                        onSubmit={editar_deporte}
                        className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
                    >
                        {/* Header con título y botón 'X' */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                            <h3 className="text-lg font-bold text-slate-800">
                                Editar deporte
                            </h3>
                            <button
                                type="button"
                                onClick={() => setDeporte(null)}
                                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-200/50 transition-colors cursor-pointer"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="p-6 space-y-4 text-left">
                            <div>
                                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1">
                                    Deporte
                                </label>
                                <input
                                    type="text"
                                    name="nombre"
                                    defaultValue={deporte.nombre}
                                    placeholder="Ej: Pádel, Fútbol 7"
                                    required
                                    className="w-full px-3.5 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50/50 text-slate-950 text-sm transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1">
                                    Duración
                                </label>
                                <select
                                    name="duracion"
                                    defaultValue={deporte.duracion}
                                    className="w-full px-3.5 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50/50 text-slate-950 text-sm transition-all cursor-pointer"
                                >
                                    <option value="60">60 minutos</option>
                                    <option value="90">90 minutos</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1">
                                    Precio
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-semibold text-sm">
                                        $
                                    </span>
                                    <input
                                        type="text"
                                        name="precio"
                                        placeholder="0"
                                        defaultValue={deporte.precio}
                                        required
                                        className="w-full pl-8 pr-3.5 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50/50 text-slate-950 text-sm transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-3 px-6 py-4 bg-slate-50/50 border-t border-slate-100">
                            <button
                                type="button"
                                onClick={() => setDeporte(null)}
                                className="px-4 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-200/60 transition-colors cursor-pointer"
                            >
                                Volver
                            </button>
                            <button
                                type="submit"
                                className="px-5 py-2 rounded-lg text-sm font-bold bg-emerald-600 hover:bg-greenpitch text-white shadow-md shadow-emerald-600/20 transition-all active:scale-[0.98] cursor-pointer"
                            >
                                Editar
                            </button>
                        </div>
                    </form>
                </div> : <></>}
            </div>
        {/* </div> */}
    </div>
}