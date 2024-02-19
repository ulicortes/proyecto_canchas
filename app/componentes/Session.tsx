'use client'
import { logout } from "../lib/authenticate";
import getSession from "../lib/authenticate";
export default function Session() {
    return <div>
        <button type='submit' 
        onClick={() => {
            logout();
        }}
        className={`w-full flex h-[48px]. grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3 ${getSession().name == 'guest' ? 'hidden' : ''}`}>
            <div className="hidden md:block">Salir</div>
        </button>
    </div>
}