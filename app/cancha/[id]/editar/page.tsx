import { traerTurno } from "@/app/lib/metodos";

export default async function Page({ params }: { params: { id: string } }) {
    const t = await traerTurno(params.id);
    console.log(t);
    

    return <div className="flex flex-col justify-center items-center w-screen h-screen">
        <div className='py-4'>
            {t[0].organizador}
        </div>
        <div className='py-4'>
            {t[0].telefono}
        </div>
        <div className='py-4'>
            {t[0].lugar}
        </div>
        <div className='py-4'>
            {t[0].direccion}
        </div>
        <div className='py-4'>
            {t[0].dia}
        </div>
        <div className='py-4'>
            {t[0].hora}
        </div>
        <div className='py-4'>
            {t[0].cancha}
        </div>
        <div className='py-4'>
            {t[0].jugadores_faltantes} 
        </div>
    </div>
}