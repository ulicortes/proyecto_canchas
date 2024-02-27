'use client';
export default function ListadoJugadores({ cant, jugs }: { cant: String, jugs: string[]}) {
    if (cant == 'Futbol 5') return <Futbol5 j={jugs} />;
    else if (cant == 'Futbol 7') return <Futbol7 j={jugs} />;
    else if (cant == 'Futbol 8') return <Futbol8 j={jugs} />;
}

function Futbol5({j} : {j:string[]}) {
    let a = array(10, j);
    return <div className="flex flex-col py-4 justify-evenly w-full h-4/5 items-center">
        {a.map((i) => {
            return i;
        })}
    </div>
}

function Futbol7({j} : {j:string[]}) {
    let a = array(14, j);
    return <div className="flex flex-col py-4 justify-evenly w-full h-4/5 items-center">
        {a.map((i) => {
            return i;
        })}
    </div>
}

function Futbol8({j} : {j:string[]}) {
    let a = array(16,j);
    return <div className="flex flex-col py-4 justify-evenly w-full h-4/5 items-center">
        {a.map((i) => {
            return i;
        })}
    </div>
}
function array(index : number, jugadores : string[]) {
    let inp;
    let array = [];
    for(let i = 0; i < index; i++) {
        if(jugadores != undefined && i < jugadores.length) {
            inp = <input type="text" name="jug" defaultValue={jugadores[i]} className="w-3/5 mb-1 text-center bg-white border-solid border-2 rounded-sm border-black active:border-transparent" />;
        } else { 
            inp = <input type="text" name="jug" className="w-3/5 mb-1 text-center bg-white border-solid border-2 rounded-sm border-black active:border-transparent" />;
        }
        array.push(inp);
    }
    return array;
}