import type { FormEvent } from "react";

type Props = {                         
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
    onClose: () => void;
};

export default function FormularioDeporte({ onSubmit, onClose }: Props) {
    return (
        <div className="w-full h-full fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex flex-col justify-center items-center px-4 animate-in fade-in duration-200">
            <form
                onSubmit={onSubmit}
                className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
            >
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                    <h3 className="text-xl font-bold text-slate-800">
                        Agregar un deporte
                    </h3>
                    <button
                        type="button"
                        onClick={onClose}
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
                        onClick={onClose}
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
    );
}