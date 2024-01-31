import { turnosDeHoy } from "../lib/metodos";
import { horarios } from "../lib/tipos";


export default function Horarios({ setTime }: { setTime: Function }) {
    const horas = ['07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00',
        '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
        '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30', '00:00'];


    return (
        <div className="text-center xl:mx-10">
            <h1 className="text-3xl font-bold text-gray-900">Selecciona un horario</h1>
            <div id="carrusel" className="xl:pt-5 xl:px-4 flex flex-row flex-nowrap xl:flex-wrap overflow-scroll xl:overflow-visible select-none">
                {horas.map((h, index) =>
                    <div key={h} onClick={() => setTime({ h })} className="rounded-xl border-2 border-black bg-yellow-300 py-4 px-4 xl:py-4 xl:w-24 xl:px-0 m-2 text-center cursor-pointer" >
                        <h1 className="text-l">{h}</h1>
                    </div>
                )}
            </div>
        </div>
    );
}

async function get() {
    const hor = await turnosDeHoy();
    return hor;
}

// function estaOcupado(hs: horarios, h: number) {
//     hs.map((hora) => {
//         if (hora == `${h}:00`) return true;
//     });
//     return false
// }