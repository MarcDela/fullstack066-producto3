import { ObjectId } from 'mongodb';
import { COLLECTIONS } from '../models/collections.js';
import { comparePassword, createToken, hashPassword } from '../utils/auth.js';
import { required, validarEmail, validarPassword } from '../utils/validators.js';

function mapUsuario(u) {
  if (!u) return null;
  return { id: u._id.toString(), nombre: u.nombre, email: u.email, rol: u.rol, createdAt: u.createdAt };
}

/** Servicio CRUD de usuarios con MongoDB nativo. */
export class UsuarioService {
  constructor(db) { this.col = db.collection(COLLECTIONS.USUARIOS); }

  async listarUsuarios() {
    const usuarios = await this.col.find().sort({ nombre: 1 }).toArray();
    return usuarios.map(mapUsuario);
  }

  async buscarPorId(id) {
    if (!ObjectId.isValid(id)) throw new Error('ID de usuario inválido');
    return mapUsuario(await this.col.findOne({ _id: new ObjectId(id) }));
  }

  async buscarPorEmail(email) {
    return mapUsuario(await this.col.findOne({ email: String(email).trim().toLowerCase() }));
  }

  async crearUsuario(input) {
    required(input.nombre, 'nombre'); required(input.email, 'email'); required(input.password, 'password'); required(input.rol, 'rol');
    const email = input.email.trim().toLowerCase();
    if (!validarEmail(email)) throw new Error('Formato de email no válido');
    if (!validarPassword(input.password)) throw new Error('La contraseña debe tener mínimo 8 caracteres, una minúscula, una mayúscula y un número');
    const existe = await this.col.findOne({ email });
    if (existe) throw new Error('Ya existe un usuario con ese email');
    const doc = {
      nombre: input.nombre.trim(),
      email,
      passwordHash: await hashPassword(input.password),
      rol: input.rol,
      createdAt: new Date().toISOString()
    };
    const result = await this.col.insertOne(doc);
    return mapUsuario({ _id: result.insertedId, ...doc });
  }

  async login(email, password) {
    required(email, 'email'); required(password, 'password');
    const usuario = await this.col.findOne({ email: email.trim().toLowerCase() });
    if (!usuario || !(await comparePassword(password, usuario.passwordHash))) {
      throw new Error('Correo o contraseña incorrectos');
    }
    return { token: createToken(usuario), usuario: mapUsuario(usuario) };
  }

  async eliminarUsuario(id) {
    if (!ObjectId.isValid(id)) throw new Error('ID de usuario inválido');
    const result = await this.col.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount === 1;
  }
}
