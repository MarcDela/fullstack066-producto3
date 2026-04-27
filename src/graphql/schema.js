import {buildSchema} from 'graphql';
export const schema = buildSchema(`
  type Oferta {
    id: ID
    titulo: String
    empresa: String
    ubicacion: String
    descripcion: String
    fecha: String
  }

  type Demanda {
    id: ID
    nombre: String
    profesion: String
    disponibilidad: String
    descripcion: String
    fecha: String
  }

  type Usuario {
    id: ID
    nombre: String
    email: String
    password: String
    rol: String
  }

  type Query {
    getOfertas: [Oferta]
    getDemandas: [Demanda]
    getUsuarios: [Usuario]
  }

  type Mutation {
    crearOferta(titulo: String!, empresa: String!, ubicacion: String!, descripcion: String!, fecha: String!): Oferta
    crearDemanda(nombre: String!, profesion: String!, disponibilidad: String!, descripcion: String!, fecha: String!): Demanda
    crearUsuario(nombre: String!, email: String!, password: String!, rol: String!): Usuario
  }
`);
