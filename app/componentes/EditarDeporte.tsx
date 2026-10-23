import { FormEvent } from "react";
import { deporte } from "../lib/tipos";

type Props = {
    deporte: deporte;      
    editar: (e: FormEvent<HTMLFormElement>) => void;
    cerrar: () => void;
};

export default function EditarDeporte({ deporte, editar, cerrar }: Props) {
    return <div className="w-full h-full fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex flex-col justify-center items-center px-4 animate-in fade-in duration-200">
        <form
                    onSubmit={editar}
                    className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
                >
                    {/* Header con título y botón 'X' */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                        <h3 className="text-lg font-bold text-slate-800">
                            Editar deporte
                        </h3>
                        <button
                            type="button"
                            onClick={cerrar}
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
                            onClick={cerrar}
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
    </div>
}