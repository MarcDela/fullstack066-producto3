import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export async function hashPassword(password) {
  return bcrypt.hash(password, 10);
}

export async function comparePassword(password, hash) {
  return bcrypt.compare(password, hash);
}

export function createToken(usuario) {
  return jwt.sign(
    { id: usuario._id.toString(), email: usuario.email, rol: usuario.rol },
    process.env.JWT_SECRET || 'dev_secret',
    { expiresIn: process.env.JWT_EXPIRES_IN || '2h' }
  );
}

export function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET || 'dev_secret');
}
