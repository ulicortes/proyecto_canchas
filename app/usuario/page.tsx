'use client'
import { useState } from "react";
import Loading from "../loading";
import { signOut } from "../lib/sesion";
import { useRouter } from "next/navigation";

export default function Page() {
    let [loading, setLoading] = useState(false);
    let router = useRouter();

    return <>
        {loading ? <Loading message={"Cerrando sesion..."} /> :
            <div className="h-screen flex flex-col justify-center items-center">
                <div className="flex flex-col justify-evenly items-center h-2/5 bg-white/70 shadow-xl shadow-black/50 w-3/4 xl:w-2/4 rounded-md">
                    <h1 className="font-bold text-3xl">Menu de usuario</h1>
                    <div className="flex flex-col xl:flex-row justify-evenly items-center w-full h-3/4">
                        <button type='submit'
                            onClick={() => {
                                router.push("/")
                            }}
                            className={`w-2/4 xl:w-1/4 flex rounded-md bg-black text-white p-3 text-sm font-medium hover:bg-blue-700 hover:text-white`}>
                            <div className="text-center w-full">Ir al menú principal</div>
                        </button>
                        <button type='submit'
                            onClick={() => {
                                setLoading(true);
                                signOut();
                                router.push("/horarios")
                            }}
                            className={`w-2/4 xl:w-1/4 flex rounded-md bg-black text-white p-3 text-sm font-medium hover:bg-brigthred hover:text-white`}>
                            <div className="text-center w-full">Cerrar sesion</div>
                        </button>
                    </div>
                </div>
            </div>
        }
    </>
}