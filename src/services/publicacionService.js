import { ObjectId } from 'mongodb';
import { COLLECTIONS } from '../models/collections.js';
import { required, validarEmail } from '../utils/validators.js';

function mapPublicacion(p) {
  if (!p) return null;
  return { id: p._id.toString(), titulo: p.titulo, email: p.email, fecha: p.fecha, descripcion: p.descripcion, tipo: p.tipo, empresa: p.empresa, ubicacion: p.ubicacion, createdAt: p.createdAt };
}

/** Servicio CRUD de ofertas y demandas de empleo. */
export class PublicacionService {
  constructor(db) { this.col = db.collection(COLLECTIONS.PUBLICACIONES); }

  async listarPublicaciones(filtro = {}) {
    const query = {};
    if (filtro.tipo) query.tipo = filtro.tipo;
    if (filtro.email) query.email = filtro.email.trim().toLowerCase();
    const docs = await this.col.find(query).sort({ createdAt: -1 }).toArray();
    return docs.map(mapPublicacion);
  }

  async buscarPorId(id) {
    if (!ObjectId.isValid(id)) throw new Error('ID de publicación inválido');
    return mapPublicacion(await this.col.findOne({ _id: new ObjectId(id) }));
  }

  async crearPublicacion(input) {
    required(input.titulo, 'titulo'); required(input.email, 'email'); required(input.fecha, 'fecha'); required(input.descripcion, 'descripcion'); required(input.tipo, 'tipo');
    const email = input.email.trim().toLowerCase();
    if (!validarEmail(email)) throw new Error('Formato de email no válido');
    const doc = {
      titulo: input.titulo.trim(), email, fecha: input.fecha, descripcion: input.descripcion.trim(), tipo: input.tipo,
      empresa: input.empresa?.trim() || null, ubicacion: input.ubicacion?.trim() || null, createdAt: new Date().toISOString()
    };
    const result = await this.col.insertOne(doc);
    return mapPublicacion({ _id: result.insertedId, ...doc });
  }

  async actualizarPublicacion(id, input) {
    if (!ObjectId.isValid(id)) throw new Error('ID de publicación inválido');
    const update = {};
    for (const key of ['titulo', 'email', 'fecha', 'descripcion', 'tipo', 'empresa', 'ubicacion']) {
      if (input[key] !== undefined) update[key] = typeof input[key] === 'string' ? input[key].trim() : input[key];
    }
    if (update.email && !validarEmail(update.email)) throw new Error('Formato de email no válido');
    const result = await this.col.findOneAndUpdate({ _id: new ObjectId(id) }, { $set: update }, { returnDocument: 'after' });
    if (!result) throw new Error('Publicación no encontrada');
    return mapPublicacion(result);
  }

  async eliminarPublicacion(id) {
    if (!ObjectId.isValid(id)) throw new Error('ID de publicación inválido');
    const result = await this.col.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount === 1;
  }

  async estadisticas() {
    const data = await this.col.aggregate([{ $group: { _id: '$tipo', total: { $sum: 1 } } }]).toArray();
    const ofertas = data.find(x => x._id === 'Oferta')?.total || 0;
    const demandas = data.find(x => x._id === 'Demanda')?.total || 0;
    return { ofertas, demandas, total: ofertas + demandas };
  }
}
