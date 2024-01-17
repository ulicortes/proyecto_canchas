import { sql } from '@vercel/postgres';
import type { usuario } from '@/app/lib/tipos'
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