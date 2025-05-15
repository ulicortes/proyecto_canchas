'use client'
import { useState } from "react";
import Loading from "../loading";
import { signOut } from "../lib/metodos";
import { useRouter } from "next/navigation";

export default function Session() {
    let router = useRouter();
    let [loading, setLoading] = useState(false);
    return <>
        <div className='flex justify-center'>
            {loading ? <Loading message={"Cerrando sesion..."} /> :
                <div className="flex flex-col justify-center items-center">
                    <div className="flex flex-row">
                        <button type='button'
                            onClick={() => {
                                setLoading(true);
                                signOut();
                                router.push("/")
                            }}
                            className={`flex grow items-center justify-center gap-2 m-5 rounded-md bg-black text-center text-white p-3 text-sm font-medium hover:bg-brigthred hover:text-white md:flex-none md:justify-start md:p-2 md:px-3`}>
                            <div className="md:block">Cerrar sesion</div>
                        </button>
                    </div>
                </div>
            }
        </div>
    </>
}