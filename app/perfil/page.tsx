'use client'

import { FormEvent, useEffect, useMemo, useState } from "react";
import { signOut } from "../lib/sesion";
import { borrarCancha, borrarDeporte, crearCancha, crearDeporte, datos_admin, editarCancha, editarDeporte, listarCanchasPorAdmin, listarDeportes } from "../lib/metodos";
import Gestion from "../componentes/Gestion";
import Deportes from "../componentes/Deportes";
import Canchas from "../componentes/Canchas";
import FormularioCancha from "../componentes/FormularioCancha";
import FormularioDeporte from "../componentes/FormularioDeporte";
import EditarCancha from "../componentes/EditarCancha";
import EditarDeporte from "../componentes/EditarDeporte";
import { Cancha, Deporte } from "../lib/tipos";

export default function Page() {
    const [deportes, setDeportes] = useState<Deporte[]>([]);
    const [deporte, setDeporte] = useState<Deporte | null>(null);
    const [canchas, setCanchas] = useState<Cancha[]>([]);
    const [cancha, setCancha] = useState<Cancha | null>(null);
    const [usuario, setUsuario] = useState<string>("");
    const [mensaje_info, setMensajeInfo] = useState<String>("");
    const [cambio, setCambio] = useState<boolean>(false);
    const [form_cancha, setFormCancha] = useState<boolean>(false);
    const [form_deporte, setFormDeporte] = useState<boolean>(false);

    async function crear_cancha(e: FormEvent<HTMLFormElement>) {
        e.preventDefault(); // Evita que la página se recargue

        const formData = new FormData(e.currentTarget);

        setFormCancha(!form_cancha);
        try {
            let rsp = await crearCancha(formData);
            setMensajeInfo(rsp.message);
        } catch (err) {
            console.error('Error inesperado al crear cancha:', err);
            setMensajeInfo('Ocurrió un error inesperado');
        }
    }

    async function crear_deporte(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        setFormDeporte(!form_deporte);
        try {
            let rsp = await crearDeporte(formData);
            console.log(rsp)
            setMensajeInfo(rsp.message);
        } catch (err) {
            console.error('Error inesperado al crear cancha:', err);
            setMensajeInfo('Ocurrió un error inesperado');
        }
    }

    async function desloguear() {
        try {
            await signOut();
        } catch (error) {
            console.log(error)
        }
    }

    async function borrar_cancha(id: number) {
        try {
            let rsp = await borrarCancha(id);
            setMensajeInfo(rsp.message);
        } catch (error) {
            console.log(error)
        }
    }

    async function borrar_deporte(id: number) {
        try {
            let rsp = await borrarDeporte(id);
            setMensajeInfo(rsp.message)
        } catch (error) {
            console.log(error);
        }
    }

    async function editar_cancha(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        if (!cancha?.id) setMensajeInfo("Falta la cancha");
        try {
            let rsp = await editarCancha(formData, cancha?.id);
            setCancha(null);
            setMensajeInfo(rsp.message)
        } catch (error) {
            console.log(error);
        }
    }

    async function editar_deporte(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        if (!deporte?.id) setMensajeInfo("Falta el deporte");
        try {
            let rsp = await editarDeporte(formData, deporte?.id);
            setDeporte(null);
            setMensajeInfo(rsp.message)
        } catch (error) {
            console.log(error);
        }
    }

    function cerrar() {
        setMensajeInfo("");
        setCambio(!cambio)
    }

    useEffect(() => {
        const controller = new AbortController();
        async function cargarDeportes() {
            try {
                // throw new Error("Error al cargar deportes");
                const [deps, canchasResult, usuarioResult] = await Promise.all([
                    listarDeportes(),
                    listarCanchasPorAdmin(),
                    datos_admin(),
                ]);
                setDeportes(deps.deportes);
                setCanchas(canchasResult.canchas);
                setUsuario(usuarioResult);
            } catch (error) {
                console.log(error);
                throw error;
            }
        }
        cargarDeportes()
    }, [cambio]);

    const nombre_deportes = useMemo(() => {
        return deportes.reduce((acc, deporte) => {
            acc[deporte.id] = deporte.nombre;
            return acc;
        }, {} as Record<string | number, string>);
    }, [deportes]);


    return <div className="w-full h-[95%]. h-full overflow-y-hidden flex flex-col justify-start items-center text-center">
        <div className='w-full h-full overflow-y-auto flex flex-col justify-evenly items-center p-0.5 md:p-6'>
            <div className="w-full h-fit">
                <h1 className="text-3xl py-10. md:text-3xl font-bold">Panel de administracion</h1>
            </div>
            <section className="w-[100%] md:w-[70%] bg-black/70 p-0.5 md:p-6 my-4 rounded-2xl shadow-xl shadow-black/40 content-center">
                <Gestion titulo="Gestión de Canchas" labelBoton="Nueva cancha" agregar={() => setFormCancha(!form_cancha)} />
                <Canchas canchas={canchas} nombre_deportes={nombre_deportes} agregar={() => setFormCancha(true)} editar={setCancha} borrar={borrar_cancha} />
            </section>
            <section className="w-[100%] md:w-[70%] bg-black/70 p-0.5 md:p-6 my-4 rounded-2xl shadow-xl shadow-black/40">
                <Gestion titulo="Gestion de deportes" labelBoton="Nuevo deporte" agregar={() => setFormDeporte(true)} />
                <Deportes deportes={deportes} agregar={() => setFormDeporte(true)} editar={setDeporte} borrar={borrar_deporte} />
            </section>
            {form_cancha && <FormularioCancha deportes={deportes} onSubmit={crear_cancha} onClose={() => setFormCancha(false)} />}
            {form_deporte && <FormularioDeporte onSubmit={crear_deporte} onClose={() => setFormDeporte(false)} />}
            {cancha && <EditarCancha cancha={cancha} deportes={deportes} editar={editar_cancha} cerrar={() => setCancha(null)} />}
            {deporte && <EditarDeporte deporte={deporte} editar={editar_deporte} cerrar={() => setDeporte(null)} />}
            {mensaje_info != "" && <div className="w-full h-full fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex flex-col justify-center items-center px-4 animate-in fade-in duration-200">
                <div className="bg-white shadow-2xl shadow-black/50 rounded-2xl w-full max-w-md p-8 flex flex-col items-center gap-4 animate-in zoom-in-95 duration-200">
                    <h1 className="font-bold text-xl text-black text-center leading-snug">
                        {mensaje_info}
                    </h1>

                    <button
                        onClick={cerrar}
                        className="mt-2 w-full bg-green-500 hover:bg-green-600 active:scale-95 transition-all duration-150 text-white font-bold py-3 rounded-lg"
                    >
                        Volver
                    </button>
                </div>
            </div>}
        </div>
    </div>
}