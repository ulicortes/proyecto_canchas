'use client'
import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { es } from "date-fns/locale";

interface Turno {
    hora: number,
    cancha: string
}

export default function Picker() {

    const getToday = () => {
        let fecha = new Date();
        fecha.setHours(0);
        fecha.setMinutes(0);
        fecha.setSeconds(0);
        return fecha;
    }
    const [inicio, setInicio] = useState<keyof typeof horas>();
    const [franja_actual, setFranjaActual] = useState<number>(0);
    const [fin, setFin] = useState<number>();

    const [selected, setSelected] = useState<Date | undefined>(getToday());
    const manejarSeleccionDia = (dia: Date | undefined) => {
        setSelected(dia);
        setInicio(undefined)
        setFin(undefined)
        if (dia) {
            const anio = dia.getFullYear();
            const mes = String(dia.getMonth() + 1).padStart(2, '0');
            const nroDia = String(dia.getDate()).padStart(2, '0');
            const nombreDia = new Intl.DateTimeFormat("es-AR", { weekday: "long" }).format(dia);

            const fechaCompleta = `${nombreDia} ${nroDia}/${mes}/${anio}`;
            const fechaFormateada = `${anio}-${mes}-${nroDia}`;


            // console.log(fechaCompleta);

        }
    };

    // const horas: Record<number, string> = {
    //     480: "08:00",
    //     510: "08:30",
    //     540: "09:00",
    //     570: "09:30",
    //     600: "10:00",
    //     630: "10:30",
    //     660: "11:00",
    //     690: "11:30",
    //     720: "12:00",
    //     750: "12:30",
    //     780: "13:00",
    //     810: "13:30",
    //     840: "14:00",
    //     870: "14:30",
    //     900: "15:00",
    //     930: "15:30",
    //     960: "16:00",
    //     990: "16:30",
    //     1020: "17:00",
    //     1050: "17:30",
    //     1080: "18:00",
    //     1110: "18:30",
    //     1140: "19:00",
    //     1170: "19:30",
    //     1200: "20:00",
    //     1230: "20:30",
    //     1260: "21:00",
    //     1290: "21:30",
    //     1320: "22:00",
    //     1350: "22:30",
    //     1380: "23:00",
    //     1410: "23:30",
    // };

    const horas: Record<number, string> = {
        480: "08:00",
        540: "09:00",
        600: "10:00",
        660: "11:00",
        720: "12:00",
        780: "13:00",
        840: "14:00",
        900: "15:00",
        960: "16:00",
        1020: "17:00",
        1080: "18:00",
        1140: "19:00",
        1200: "20:00",
        1260: "21:00",
        1320: "22:00",
        1380: "23:00",
    };
    const horasOcupadas: number[] = [
        480,   // "08:00": "09:00"
        600,   // "11:30": "12:30"
        780,   // "13:00": "14:30"
        990,  // "16:30": "18:00"
        1110, // "18:30": "19:30"
        1200, // "20:00": "21:30"
        1290, // "21:30": "22:30"
        1350, // "22:30": "00:00" (la medianoche equivale a 1440 min)
    ];

    const turnosOcupados = [
    { "cancha": "F5_1", "hora": 480 },
    { "cancha": "F5_1", "hora": 600 },
    { "cancha": "F5_1", "hora": 780 },

    { "cancha": "F5_2", "hora": 510 },
    { "cancha": "F5_2", "hora": 480 },
    { "cancha": "F5_2", "hora": 990 },

    { "cancha": "F7_1", "hora": 600 },
    { "cancha": "F7_1", "hora": 1110 },
    { "cancha": "F7_1", "hora": 1200 },

    { "cancha": "F7_2", "hora": 720 },

    { "cancha": "F11_1", "hora": 480 },
    { "cancha": "F11_1", "hora": 1290 },

    { "cancha": "F11_2", "hora": 900 },
    { "cancha": "F11_2", "hora": 1350 }
]

    const set_inicio = (hora: number) => {
        let dif = hora - inicio! | 0;
        console.log(!!!horasOcupadas[hora])
        if (!inicio || (!!horasOcupadas[hora - 30]) || dif < 0 || dif == 30 || dif > 90) {
            setFin(undefined)
            setInicio(hora)
        } else if (hora != inicio) setFin(hora)
    }
    // console.log(setHorasOcupadas(horasOcupadas)[0].has(480))
    const estaOcupado = (mins: number): boolean => {
        let rsp = false;
        for (const m of Object.keys(horasOcupadas)) {
            if (Number(m) <= mins && mins <= horasOcupadas[Number(m)]) { rsp = true; break; }
            // if (Number(m) <= mins + 30 && mins + 30 < horasOcupadas[Number(m)]) { rsp = true; break; }
        }
        // setHorasOcupadas(horasOcupadas).map(m => {
        //     if (m.has(mins)) rsp = true;
        // });
        return rsp;
    }

    return (
        <div className='bg-white. w-full px-10. py-4. h-[45%] flex flex-row justify-evenly items-start border-1 content-center rounded-lg'>
            <div className='w-fit h-full bg-green-50 p-2 rounded-xl'>

                <DayPicker
                    styles={{
                        caption_label: { color: 'black', fontSize: '25px', fontWeight: 'bold' },
                        chevron: { fill: 'green' },
                        day_button: { borderColor: 'white', background: 'white', fontWeight: 'bold' },
                        selected: { color: 'white' },
                        focused: { color: 'goldenrod' },
                        today: { color: 'goldenrod' },
                    }}
                    classNames={{
                        // months: "w-full",
                        // month: "w-full",
                        day: "[&_button]:focus:outline-none [&_button]:focus-visible:outline-none [&_button]:focus-visible:!ring-2 [&_button]:focus-visible:!ring-green-500",
                        today: "[&_button]:!text-green-100. [&_button]:!font-bold [&_button]:!border-green-900/30"
                    }}
                    mode="single"
                    captionLayout="label"
                    startMonth={new Date()}
                    animate
                    locale={es}
                    disabled={{ before: new Date(new Date().setHours(0, 0, 0, 0)) }}
                    // 1. Definimos las reglas lógicas (Filtros)
                    modifiers={{
                        diaElegido: (date) =>
                            selected ? date.toDateString() === selected.toDateString() : false
                    }}
                    modifiersClassNames={{
                        diaElegido: "[&_button]:!bg-green-600 [&_button]:!text-white [&_button]:!border-green-600 [&_button]:!ring-0 [&_button]:focus:!ring-0"
                    }}
                    selected={selected}
                    onSelect={manejarSeleccionDia}
                />
            </div>

            <div className='w-[60%] h-full bg-white. text-black flex flex-col justify-center items-center '>
                {/* <h1 className='h-[10%] font-bold'>INICIO TURNO</h1> */}
                <div className='w-full h-full p-2 bg-green-50 flex flex-row flex-wrap overflow-y-scroll. justify-center items-center rounded-xl'>
                    {Object.keys(horas).map(m => {
                        if (!!!horasOcupadas[Number(m)] && !estaOcupado(Number(m))) return <div key={Number(m)} className='w-[12.5%] h-fit'>
                            <div className={`px-2 bg-white. w-full h-full cursor-pointer font-bold text-start hover:bg-green-200 ${inicio == Number(m) || fin == Number(m) ? 'bg-green-600 hover:bg-green-600 text-white cursor-default' : ''}`} onClick={() => set_inicio(Number(m))}>{horas[Number(m)]}</div>
                        </div>
                        else return <div key={Number(m)} className='w-[12.5%] h-fit'>
                            <div className={`px-2 bg-slate-200 w-full h-full cursor-pointer font-bold text-start`} onClick={() => set_inicio(Number(m))}>{horas[Number(m)]}</div>
                        </div>
                    })}
                </div>
            </div>
            {/* <div className='w-[20%] h-full text-black flex flex-col justify-start items-center'>
                <h1 className='h-[10%] font-bold'>FIN TURNO</h1>
                <div className='w-full h-[35%] p-2 bg-green-50 flex flex-col justify-around items-center rounded-xl'>
                    <div className='w-full h-full flex flex-col justify-between'>
                        {inicio && !!!horasOcupadas[inicio + 30] ? <div key={horas[inicio + 60]} className={`py-4 bg-white. border-black w-full h-fit cursor-pointer font-bold hover:bg-green-200 ${fin == inicio + 60 ? 'bg-green-600 hover:bg-green-600 text-white cursor-default' : ''}`} onClick={() => setFin(inicio + 60)}>{horas[inicio + 60]}</div> : <></>}
                        {inicio && !!!horasOcupadas[inicio + 60] ? <div key={horas[inicio + 90]} className={`py-4 bg-white. border-black w-full h-fit cursor-pointer font-bold hover:bg-green-200 ${fin == inicio + 90 ? 'bg-green-600 hover:bg-green-600 text-white cursor-default' : ''}`} onClick={() => setFin(inicio + 90)}>{horas[inicio + 90]}</div> : <></>}
                    </div>
                </div>

            </div>*/}
            <div className='w-[10%] h-full flex flex-col'>
                <h1 className='h-[20%] font-bold'>INICIO: {inicio} </h1>
                <h1 className='h-[20%] font-bold'>FIN: {fin}</h1>
            </div>
        </div>
    );
}