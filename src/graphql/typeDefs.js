export const typeDefs = `#graphql
  enum RolUsuario { Administrador Empresa Candidato }
  enum TipoPublicacion { Oferta Demanda }

  type Usuario { id: ID!, nombre: String!, email: String!, rol: RolUsuario!, createdAt: String! }
  type Publicacion { id: ID!, titulo: String!, email: String!, fecha: String!, descripcion: String!, tipo: TipoPublicacion!, empresa: String, ubicacion: String, createdAt: String! }
  type AuthPayload { token: String!, usuario: Usuario! }
  type Estadisticas { ofertas: Int!, demandas: Int!, total: Int! }

  input CrearUsuarioInput { nombre: String!, email: String!, password: String!, rol: RolUsuario! }
  input CrearPublicacionInput { titulo: String!, email: String!, fecha: String!, descripcion: String!, tipo: TipoPublicacion!, empresa: String, ubicacion: String }
  input ActualizarPublicacionInput { titulo: String, email: String, fecha: String, descripcion: String, tipo: TipoPublicacion, empresa: String, ubicacion: String }

  type Query {
    salud: String!
    usuarios: [Usuario!]!
    usuario(id: ID!): Usuario
    usuarioPorEmail(email: String!): Usuario
    publicaciones(tipo: TipoPublicacion, email: String): [Publicacion!]!
    publicacion(id: ID!): Publicacion
    estadisticas: Estadisticas!
    me: Usuario
  }

  type Mutation {
    crearUsuario(input: CrearUsuarioInput!): Usuario!
    login(email: String!, password: String!): AuthPayload!
    eliminarUsuario(id: ID!): Boolean!
    crearPublicacion(input: CrearPublicacionInput!): Publicacion!
    actualizarPublicacion(id: ID!, input: ActualizarPublicacionInput!): Publicacion!
    eliminarPublicacion(id: ID!): Boolean!
  }
`;
