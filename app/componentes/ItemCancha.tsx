// import dynamic from 'next/dynamic';

// const MiComponenteDificil = dynamic(
//     // Utiliza una función anónima que retorna una promesa con el componente importado.
//     () => import('./ItemCancha'),
//     // Establece la opción 'ssr' en 'false' para deshabilitar el pre-renderizado en el lado del servidor.
//     { ssr: false }
//   );

export default function ItemCancha() {
    return <div className='flex flex-row justify-around mt-4 mb-4'>
        <div>
            Cancha
        </div>
        <div>
            Direccion
        </div>
        <div>
            Jugadores
        </div>
        <div>
            Horario
        </div>
    </div>
}