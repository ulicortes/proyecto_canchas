type Props = {
    titulo: string;
    labelBoton: string;
    agregar: () => void;
};

export default function Gestion({ titulo, labelBoton, agregar }: Props) {
    return <div className="h-fit flex flex-row justify-evenly md:justify-between items-center mb-2 py-2">
        <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            {titulo}
        </h2>
        <button onClick={agregar} className="bg-[#a7f3d0] text-[#1f2937] font-semibold px-5 py-2.5 rounded-xl hover:bg-emerald-300 transition flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
            <p className="hidden md:block">{labelBoton}</p>
        </button>
    </div>
}