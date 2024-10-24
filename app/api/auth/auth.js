import { SignJWT, jwtVerify } from 'jose';

export async function signToken(payload) {
  const secret = new TextEncoder().encode(process.env.SCP); 
  // Firmar el JWT
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' }) // Definir el algoritmo
    .setIssuedAt()                         // Añadir la hora de emisión
    .setExpirationTime('1h')               // Definir tiempo de expiración (1 hora)
    .sign(secret);                         // Firmar con el secreto
  
  return token;
}

export async function verifyToken(token) {
  const secret = new TextEncoder().encode(process.env.SCP); // Convertir el secreto en bytes

  try {
    // Verificar el token con el secreto
    const { payload } = await jwtVerify(token, secret);
    return payload.sub; // Retornar el contenido decodificado (sub, role, etc.)
  } catch (error) {
    // throw new Error('Token inválido o expirado');
    console.log("token invalido o expirado");
  }
}