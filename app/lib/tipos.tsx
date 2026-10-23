export type usuario = {
    user: string;
    password: string;
    email: string;
}

export type turno = {
    id: string;
    fecha: string;
    inicio: string;
    fin: string;
    lugar: string;
    cancha: string;
    responsable: string;
}

export type jugadores = {lista: string};

export type horarios = {hora: string; cancha: string};

export interface Cancha {
    "id": number;
    "nombre": string;
    "deporte": number;
    "superficie": string;
    "estado": number;
}

export interface Deporte {
    "id": number;
    "nombre": string;
    "duracion": string;
    "precio": string;
}