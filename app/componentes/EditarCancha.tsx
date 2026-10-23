import { FormEvent } from "react";
import { cancha, deporte } from "../lib/tipos";

type Props = {
    cancha: cancha;    
    deportes: deporte[];      
    editar: (e: FormEvent<HTMLFormElement>) => void;
    cerrar: () => void;
};

export default function EditarCancha({ cancha, deportes, editar, cerrar }: Props) {
    return <div className="w-full h-full fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex flex-col justify-center items-center px-4 animate-in fade-in duration-200">
        <form
            onSubmit={editar}
            className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        >
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                <h3 className="text-xl font-bold text-slate-800">
                    Editar cancha
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
                    onClick={cerrar}
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
    </div>
}