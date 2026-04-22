const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Oferta {
    id: ID!
    titulo: String!
    empresa: String!
    ubicacion: String!
    descripcion: String
    fecha: String!
  }

  type Demanda {
    id: ID!
    nombre: String!
    profesion: String!
    disponibilidad: String!
    descripcion: String
    fecha: String!
  }

  type Usuario {
    id: ID!
    nombre: String!
    email: String!
    rol: String!
  }

  type Query {
    obtenerOfertas: [Oferta]
    obtenerDemandas: [Demanda]
    obtenerUsuarios: [Usuario]
  }

  type Mutation {
    # Aquí definiremos las acciones (crear, eliminar, login)
    crearOferta(titulo: String!, empresa: String!, ubicacion: String!, descripcion: String): Oferta
    eliminarOferta(id: ID!): String
  }
`;

module.exports = typeDefs;