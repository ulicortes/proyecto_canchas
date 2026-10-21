'use client';
import { ingresarUsuario } from './lib/sesion';
import { redirect, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';


export default function Home(this: any, {
  searchParams,
}: {
  searchParams: {
    sendTo: string
  };
}) {
  let [loading, setLoading] = useState(false);
  let [info, setInfo] = useState("");
  let url = useSearchParams().get('returnUrl') || "";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInfo("")
    const formData = new FormData(e.currentTarget);
    formData.set('mail', "cficticio@gmail.com");
    formData.set('clave', "amarillo");
    let data;
    try {
      data = await ingresarUsuario(formData);
      console.log(data);
      setInfo(data.error)
    } catch (err) {
      // setErrorMsg(err.message);
      console.log(err)
    }
    if (data?.success) redirect('/horarios');
  };

  return <div className="w-full h-full flex flex-col items-center justify-center relative bg-cover bg-center" >
    {/* Capa de contraste traslúcida sobre el fondo */}
    {/* <h1 className='text-white font-bold text-[3vw]'>Bienvenido</h1> */}
    <div className="absolute inset-0 bg-black/40 backdrop-blur-xs" />
    {/* {loading ? <Loading message={"Verificando usuario..."} /> : */}
    <form
      onSubmit={handleSubmit}
      className="relative z-10 w-full max-w-sm mx-4 bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-white/30"
    >
      <h1 className="text-2xl font-bold text-slate-800 text-center mb-6">
        Iniciar sesión
      </h1>

      <div className="flex flex-col gap-4">
        {/* Campo Usuario */}
        <div className="flex flex-col text-left">
          <label htmlFor="mail" className="text-xs font-bold text-slate-600 mb-1 uppercase tracking-wide">
            Nombre de usuario
          </label>
          <input
            id="mail"
            type="text"
            name="mail"
            required
            placeholder="Ingresá tu usuario"
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white/80 text-black text-sm transition-all"
          />
        </div>

        {/* Campo Contraseña */}
        <div className="flex flex-col text-left">
          <label htmlFor="clave" className="text-xs font-bold text-slate-600 mb-1 uppercase tracking-wide">
            Contraseña
          </label>
          <input
            id="clave"
            type="password"
            name="clave"
            required
            placeholder="••••••••"
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white/80 text-black text-sm transition-all"
          />
        </div>

        {/* Mensaje de error / Info */}
        {info && (
          <p className="text-red-600 font-bold text-xs text-center mt-1">
            {info}
          </p>
        )}

        {/* Botón Ingresar */}
        <button
          type="submit"
          className="w-full mt-2 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold text-sm rounded-lg shadow-lg shadow-emerald-500/20 transition-all duration-200 cursor-pointer active:scale-[0.98]"
        >
          Ingresar
        </button>

        {/* Footer de Registro */}
        <div className="mt-4 text-center text-xs text-slate-600 border-t border-slate-200/60 pt-4">
          ¿No tenés una cuenta?{" "}
          <Link
            href={'/registro'}
            className="font-bold text-emerald-600 hover:text-emerald-700 hover:underline transition-colors"
          >
            Registrate acá
          </Link>
        </div>
      </div>
    </form>
    {/* } */}
  </div>
}