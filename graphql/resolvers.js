// Importamos los datos iniciales
const { ofertas, demandas, usuarios } = require('../data/datos.js');
// Datos de autentificación y gestión de errores de login
const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-express');
const SECRETO = 'MI_CLAVE_SUPER_SECRETA_AGROJOBS';

// Función para mantener la unicidad global de IDs de los dos arrays (ofertas y demandas)
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
        buscarUsuario: (_, { email }) => {return usuarios.find(u => u.email === email);},
    },

    Mutation: {

        // Ofertas
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
        },

        // Demandas
        crearDemanda: (_, { nombre, profesion, disponibilidad, descripcion }) => {
            const nuevaDemanda = {
                id: String(obtenerNuevoId()), // Mismo generador de IDs global
                nombre, 
                profesion, 
                disponibilidad, 
                descripcion,
                fecha: new Date().toLocaleDateString('es-ES')
            };
            demandas.push(nuevaDemanda);
            return nuevaDemanda;
        },

        eliminarDemanda: (_, { id }) => {
            const index = demandas.findIndex(d => String(d.id) === String(id));
            if (index !== -1) {
                demandas.splice(index, 1);
                return `Demanda con ID  ${id} eliminada correctamente.`;
            }
            return "Error: No se encontró la demanda";
        },

        // Usuarios
        crearUsuario: (_, { nombre, email, password, rol }) => {
            const existe = usuarios.find(u => u.email === email);
            if (existe) {
                throw new UserInputError('El usuario ya existe con ese email');
            }

            const nuevoUsuario = {
                id: String(usuarios.length + 1), 
                nombre,
                email,
                password,
                rol
            };

            usuarios.push(nuevoUsuario);
            return nuevoUsuario;
        },
        borrarUsuario: (_, { email }) => {
            const index = usuarios.findIndex(u => u.email === email);
            
            if (index === -1) {
                throw new UserInputError('No se encontró el usuario a eliminar');
            }

            usuarios.splice(index, 1);
            return `Usuario con email ${email} ha sido eliminado.`;
        },

        // Login
        login: (_, { email, password }) => {
            const usuario = usuarios.find(u => u.email === email);
            
            // Verificar usuario
            if (!usuario) {
                throw new AuthenticationError('El email no está registrado');
            }

            // Verificar password
            if (usuario.password !== password) {
                throw new AuthenticationError('Contraseña incorrecta');
            }

            // Generar Token JWT
            // Guardamos el ID y el Rol dentro del token
            const token = jwt.sign(
                { id: usuario.id, email: usuario.email, rol: usuario.rol },
                SECRETO,
                { expiresIn: '2h' } // El token caduca en 2 horas
            );

            return {
                token,
                usuario
            };
        }
    }
};

module.exports = resolvers;