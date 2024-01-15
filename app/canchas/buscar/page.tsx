import ItemCancha from '../../componentes/ItemCancha';
import { turnos } from '../../lib/db';

export default async function Page() {
    const usuarios = await turnos();
    // if(usuarios != undefined) {
    //     usuarios.map((i) => {
    //         console.log(i.id_usuario);
    //         console.log(i.u_nombre);
    //         console.log(i.u_password);
    //         console.log(i.email);
    //     });
    // }
    return <div className="pt-12 text-center">
        <h1 className="text-4xl">Listado de canchas</h1>
        <ItemCancha></ItemCancha>
        {usuarios? <div>
            <p>id: {usuarios[0].id_usuario}</p>
            <p>user: {usuarios[0].u_nombre}</p>
            <p>pass: {usuarios[0].u_password}</p>
            <p>mail: {usuarios[0].email}</p>
        </div> : <p>no</p>}
    </div>
}