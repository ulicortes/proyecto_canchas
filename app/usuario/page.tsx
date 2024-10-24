'use client'
import { logout } from "../lib/authenticate";

export default function Page() {
    return <>
        <div className="flex flex-col justify-center pt-24. items-center w-full h-screen.">
            <div className="flex flex-row">
                <button type='submit'
                    onClick={() => {
                        logout();
                    }}
                    className={`flex grow items-center justify-center gap-2 m-5 rounded-md bg-black text-center text-white p-3 text-sm font-medium hover:bg-brigthred hover:text-white md:flex-none md:justify-start md:p-2 md:px-3`}>
                    <div className="md:block">Salir</div>
                </button>
            </div>
        </div>
    </>
}