import dotenv from 'dotenv';
import { connectDB, closeDB } from '../config/db.js';
import { UsuarioService } from '../services/usuarioService.js';
import { PublicacionService } from '../services/publicacionService.js';
dotenv.config();

const usuarios = [
  { nombre: 'Admin', email: 'admin@agrojobs.com', password: '123456aA', rol: 'Administrador' },
  { nombre: 'Laura Gómez', email: 'laura@correo.com', password: '123456aA', rol: 'Candidato' },
  { nombre: 'Campo Grande', email: 'rrhh@campogrande.com', password: '123456aA', rol: 'Empresa' }
];

const publicaciones = [
  { titulo: 'Tractorista', email: 'rrhh@campogrande.com', fecha: '2026-03-27', descripcion: 'Manejo de maquinaria agrícola y apoyo en tareas de campo.', tipo: 'Oferta', empresa: 'Campo Grande', ubicacion: 'Tórrec' },
  { titulo: 'Ingeniero agrónomo', email: 'rrhh@monmalo.com', fecha: '2026-03-25', descripcion: 'Gestión de fincas, mejora de producción y coordinación técnica.', tipo: 'Oferta', empresa: 'Monmalo', ubicacion: 'Agramunt' },
  { titulo: 'Marketing Digital', email: 'laura@correo.com', fecha: '2026-03-26', descripcion: 'Interesada en comunicación digital, redes sociales y campañas online.', tipo: 'Demanda', empresa: null, ubicacion: 'Inmediata' },
  { titulo: 'Soporte IT', email: 'carlos@correo.com', fecha: '2026-03-27', descripcion: 'Experiencia en soporte técnico, incidencias y atención a usuarios.', tipo: 'Demanda', empresa: null, ubicacion: '15 días' }
];

async function seed() {
  const db = await connectDB();
  await db.collection('usuarios').deleteMany({});
  await db.collection('publicaciones').deleteMany({});
  const usuarioService = new UsuarioService(db);
  const publicacionService = new PublicacionService(db);
  for (const u of usuarios) await usuarioService.crearUsuario(u);
  for (const p of publicaciones) await publicacionService.crearPublicacion(p);
  console.log('✅ Datos iniciales insertados');
  await closeDB();
}
seed().catch(async (e) => { console.error(e); await closeDB(); process.exit(1); });
