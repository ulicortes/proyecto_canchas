import { cancha } from "../lib/tipos";

type Props = {
    canchas: cancha[];
    nombre_deportes: Record<string | number, string>;
    agregar: () => void;
    editar: (cancha: cancha) => void;
    borrar: (id: number) => void;
};

export default function Deportes({ canchas, nombre_deportes, agregar, editar, borrar }: Props) {
    return <div className="h-fit overflow-x-auto">
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
                            {c.estado == 0 ? <span className={`bg-emerald-400 text-emerald-950 px-3 py-1 rounded-full text-md font-semibold`}>Activa</span>
                                : c.estado == 1 ? <span className={`bg-slate-300 text-black px-3 py-1 rounded-full text-md font-semibold`}>Mantenimiento</span>
                                    : <span className={`bg-red-500 text-emerald-900 px-3 py-1 rounded-full text-md font-semibold`}>Inactiva</span>}

                        </td>
                        <td className="px-2 md:px-6 py-5 text-right space-x-2">
                            <button onClick={() => editar(c)} className="text-slate-100 hover:text-blue-600 p-1.5 rounded-lg hover:bg-blue-50 transition">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                            </button>
                            <button onClick={() => borrar(c.id)} className="text-slate-100 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                            </button>
                        </td>
                    </tr>
                })}
            </tbody>
        </table>
    </div>
}