import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

let client;
let database;

/** Conecta con MongoDB y reutiliza la conexión en toda la app. */
export async function connectDB() {
  if (database) return database;
  client = new MongoClient(process.env.MONGODB_URI || 'mongodb://localhost:27017');
  await client.connect();
  database = client.db(process.env.MONGODB_DB || 'agrojobs_producto3');
  await createIndexes(database);
  console.log(`✅ MongoDB conectado: ${database.databaseName}`);
  return database;
}

/** Devuelve la instancia de base de datos ya conectada. */
export function getDB() {
  if (!database) throw new Error('La base de datos todavía no está conectada');
  return database;
}

async function createIndexes(db) {
  await db.collection('usuarios').createIndex({ email: 1 }, { unique: true });
  await db.collection('publicaciones').createIndex({ tipo: 1 });
  await db.collection('publicaciones').createIndex({ email: 1 });
}

export async function closeDB() {
  if (client) await client.close();
}
