
export type usuario = {
    user: string;
    password: string;
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
    lista: string;
}

export type jugadores = {lista: string};

export type horarios = {hora: string; cancha: string};
