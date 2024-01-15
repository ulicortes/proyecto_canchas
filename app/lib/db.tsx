import { sql } from '@vercel/postgres';
type usuario = {
    id_usuario: string;
    u_nombre: string;
    u_password: string;
    email: string;
}
export async function turnos() {
    try {
        const data = await sql<usuario>`
          SELECT *
          FROM usuarios`
            ;
        return data.rows;
    } catch (error) {
        console.error('Database Error:', error);
    }
}