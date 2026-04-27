import { getDB } from '../config/db.js';
import { verifyToken } from '../utils/auth.js';

export async function buildContext({ req }) {
  const authorization = req.headers.authorization || '';
  const token = authorization.startsWith('Bearer ') ? authorization.slice(7) : null;
  let user = null;

  if (token) {
    try { user = verifyToken(token); } catch { user = null; }
  }

  return { db: getDB(), user };
}

export function requireAuth(context) {
  if (!context.user) throw new Error('No autenticado. Envía Authorization: Bearer <token>');
  return context.user;
}

export function requireAdmin(context) {
  const user = requireAuth(context);
  if (user.rol !== 'Administrador') throw new Error('Acceso denegado. Se requiere rol Administrador');
  return user;
}
