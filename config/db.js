const { MongoClient } = require('mongodb');

// Configuración de conexión
const user = 'admin';
const pass = '12345';
const host = 'localhost';
const port = '27017';
const dbName = 'agrojobsDB';

const uri = `mongodb://${user}:${pass}@${host}:${port}`;
const client = new MongoClient(uri);

let db; // Variable para cachear la conexión

/**
 * Conecta a MongoDB y devuelve la instancia de la base de datos.
 * @returns {Promise<Db>}
 */
async function conectarDB() {
    if (db) return db; // Si ya estamos conectados, devolvemos la conexión actual

    try {
        await client.connect();
        console.log('✅ Conexión exitosa a MongoDB en Docker (con autenticación)');
        db = client.db(dbName);
        return db;
    } catch (error) {
        console.error('❌ Error crítico: No se pudo conectar a MongoDB.');
        console.error('Asegúrate de que el contenedor "mongodb-agrojobs" está en RUNNING en Docker Desktop.');
        process.exit(1);
    }
}

module.exports = conectarDB;