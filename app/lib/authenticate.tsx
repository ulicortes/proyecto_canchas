import { signOut } from "./metodos";
let user = { 'name': 'guest' };
export function cambiar(n: string) {
    user.name = n;
}
export function logout() {
    signOut();
}
export default function getSession() {
    return user;
}