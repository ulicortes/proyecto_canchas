'use session'
import Link from "next/link";
import Image from "next/image";
import { cookies } from "next/headers";

export default function Session() {
    const cookie = cookies();
    return <>
        {cookie.has('usuario') ?
            <div className='flex justify-center'>
                <Link href={{ pathname: '/usuario', query: { usuario: cookie.get('usuario')?.value } }}>
                    <button type='submit'
                        className={`flex grow items-center justify-center gap-2 rounded-lg bg-yellow-400 text-black px-1 text-sm font-medium hover:bg-yellow-300 hover:text-black md:flex-none md:justify-start md:p-2 md:px-3 self-center`}>
                        <div>
                            <Image alt='user image' src='/user_i.png' width={40} height={40} />
                        </div>
                        <div className="hidden. md:block text-black">Ir al perfil personal</div>
                    </button>
                </Link>
            </div> :
            <div className='flex justify-center'>
                <Link href={'/ingreso'}>
                    <button type='submit'
                        className={`flex grow items-center justify-center gap-2 rounded-lg bg-black text-white p-3 text-sm font-medium hover:bg-yellow-300 hover:text-black md:flex-none md:justify-start md:p-2 md:px-3 self-center mx-2`}>
                        <div className="hidden. md:block">Ingresar</div>
                    </button>
                </Link>
                {/* <Link href={'/registro'}>
                    <button type='submit'
                        className={`flex grow items-center justify-center gap-2 rounded-lg bg-black text-white p-3 text-sm font-medium hover:bg-yellow-300 hover:text-black md:flex-none md:justify-start md:p-2 md:px-3 self-center mx-2`}>
                        <div className="hidden. md:block">Registrarse</div>
                    </button>
                </Link> */}
            </div>
        }
    </>
}