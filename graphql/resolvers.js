// Importamos los datos iniciales
const { ofertas, demandas, usuarios } = require('../data/datos.js');

// Función para mantener la unicidad global de IDs (tal como en el Producto 2)
const obtenerNuevoId = () => {
    const todos = [...ofertas, ...demandas];
    if (todos.length === 0) return 1;
    return Math.max(...todos.map(e => Number(e.id))) + 1;
};

const resolvers = {
    Query: {
        obtenerOfertas: () => ofertas,
        obtenerDemandas: () => demandas,
        obtenerUsuarios: () => usuarios,
    },
    Mutation: {
        crearOferta: (_, { titulo, empresa, ubicacion, descripcion }) => {
            const nuevaOferta = {
                id: String(obtenerNuevoId()), // Generamos el ID único global
                titulo,
                empresa,
                ubicacion,
                descripcion,
                fecha: new Date().toLocaleDateString('es-ES') // Formato español
            };
            ofertas.push(nuevaOferta);
            return nuevaOferta;
        },
        eliminarOferta: (_, { id }) => {
            const index = ofertas.findIndex(o => String(o.id) === String(id));
            if (index !== -1) {
                ofertas.splice(index, 1);
                return `Oferta con ID ${id} eliminada correctamente.`;
            }
            return "Error: No se encontró la oferta.";
        }
    }
};

module.exports = resolvers;