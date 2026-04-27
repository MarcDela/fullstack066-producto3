import { UsuarioService } from '../services/usuarioService.js';
import { PublicacionService } from '../services/publicacionService.js';
import { requireAdmin, requireAuth } from '../middleware/context.js';

const services = (db) => ({ usuarios: new UsuarioService(db), publicaciones: new PublicacionService(db) });

export const resolvers = {
  Query: {
    salud: () => 'API GraphQL AgroJobs funcionando',
    usuarios: async (_, __, ctx) => { requireAdmin(ctx); return services(ctx.db).usuarios.listarUsuarios(); },
    usuario: async (_, { id }, ctx) => { requireAuth(ctx); return services(ctx.db).usuarios.buscarPorId(id); },
    usuarioPorEmail: async (_, { email }, ctx) => { requireAdmin(ctx); return services(ctx.db).usuarios.buscarPorEmail(email); },
    publicaciones: async (_, filtro, ctx) => { requireAuth(ctx); return services(ctx.db).publicaciones.listarPublicaciones(filtro); },
    publicacion: async (_, { id }, ctx) => { requireAuth(ctx); return services(ctx.db).publicaciones.buscarPorId(id); },
    estadisticas: async (_, __, ctx) => { requireAuth(ctx); return services(ctx.db).publicaciones.estadisticas(); },
    me: async (_, __, ctx) => ctx.user ? services(ctx.db).usuarios.buscarPorEmail(ctx.user.email) : null
  },
  Mutation: {
    crearUsuario: async (_, { input }, ctx) => services(ctx.db).usuarios.crearUsuario(input),
    login: async (_, { email, password }, ctx) => services(ctx.db).usuarios.login(email, password),
    eliminarUsuario: async (_, { id }, ctx) => { requireAdmin(ctx); return services(ctx.db).usuarios.eliminarUsuario(id); },
    crearPublicacion: async (_, { input }, ctx) => { requireAuth(ctx); return services(ctx.db).publicaciones.crearPublicacion(input); },
    actualizarPublicacion: async (_, { id, input }, ctx) => { requireAuth(ctx); return services(ctx.db).publicaciones.actualizarPublicacion(id, input); },
    eliminarPublicacion: async (_, { id }, ctx) => { requireAuth(ctx); return services(ctx.db).publicaciones.eliminarPublicacion(id); }
  }
};
