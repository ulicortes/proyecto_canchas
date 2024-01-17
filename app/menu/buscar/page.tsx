// 'use client';
import ItemCancha from '../../componentes/ItemCancha';
import BarraBusqueda from '../../componentes/BarraBusqueda';
// import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { turnos } from '../../lib/db';

export default async function Page(
    // {
    //     searchParams,
    // }: {
    //     searchParams?: {
    //         query?: string;
    //         page?: string;
    //     };
    // }
) {
    // const query = searchParams?.query || '';
    // const currentPage = Number(searchParams?.page) || 1;

    return <div className="pt-4 text-center">
        <BarraBusqueda></BarraBusqueda>
        <h1 className="text-4xl">Listado de canchas</h1>
        <ItemCancha></ItemCancha>

        {/* {usuarios? <div>
            <p>id: {usuarios[0].id_usuario}</p>
            <p>user: {usuarios[0].u_nombre}</p>
            <p>pass: {usuarios[0].u_password}</p>
            <p>mail: {usuarios[0].email}</p>
        </div> : <p>no</p>} */}
    </div>
}