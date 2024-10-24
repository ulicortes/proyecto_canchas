'use session'
import Link from "next/link";
import { cookies } from "next/headers";
import Usuario from "../usuario/page"

export default function Session() {
    const cookie = cookies();
    return <>
        {cookie.has('authToken') ?
            <div className='flex justify-center'>
                <Usuario />
            </div> :
            <div className='flex justify-center'>
                <Link href={'/ingreso'}>
                    <button type='submit'
                        className={`flex grow items-center justify-center gap-2 rounded-lg bg-black text-white p-3 text-sm font-medium hover:bg-yellow hover:text-black md:flex-none md:justify-start md:p-2 md:px-3 self-center mx-2`}>
                        <div className="hidden. md:block">Ingresar</div>
                    </button>
                </Link>
            </div>
        }
    </>
}