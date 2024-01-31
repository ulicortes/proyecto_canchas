export type usuario = {
    id_usuario: string;
    u_nombre: string;
    u_password: string;
    email: string;
}

export type turno = {
    id_turno: string;
    organizador: string;
    telefono: string;
    lugar: string;
    direccion: string;
    dia: string;
    hora: string;
    cancha: string;
    jugadores_faltantes: string;
}

export type horarios = {hora: string};
