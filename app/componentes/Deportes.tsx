import { Deporte } from "../lib/tipos";


type Props = {
    deportes: Deporte[];
    agregar: () => void;
    editar: (deporte: Deporte) => void;
    borrar: (id: number) => void;
};

export default function Deportes({ deportes, agregar, editar, borrar }: Props) {
    return <div className="h-fit overflow-x-auto">
        <table className="w-full text-center md:text-left text-sm">
            <thead className="bg-slate-100 text-slate-700 uppercase font-semibold text-xs">
                <tr>
                    <th className="min-w-[9rem] px-2 md:px-6 py-4 rounded-l-lg">Deporte</th>
                    <th className="min-w-[9rem] px-2 md:px-6 py-4">Duración Estándar</th>
                    <th className="min-w-[9rem] px-2 md:px-6 py-4">Precio Base</th>
                    <th className="min-w-[9rem] px-2 md:px-6 py-4 rounded-r-lg text-right">Acciones</th>
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
                            <button onClick={() => editar(d)} className="text-slate-100 hover:text-blue-600 p-1.5 rounded-lg hover:bg-blue-50 transition">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                            </button>
                            <button onClick={() => borrar(d.id)} className="text-slate-100 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                            </button>
                        </td>
                    </tr>
                })}
            </tbody>
        </table>
    </div>
}