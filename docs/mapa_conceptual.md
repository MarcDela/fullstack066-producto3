# Mapa conceptual del Producto 3

AgroJobs Producto 3
├── ExpressJS
│   ├── Servidor HTTP
│   ├── Middleware CORS/JSON
│   └── Ruta /graphql
├── GraphQL
│   ├── TypeDefs: Usuario, Publicacion, AuthPayload, Estadisticas
│   ├── Queries: usuarios, publicaciones, estadisticas, me
│   └── Mutations: login, crearUsuario, crearPublicacion, actualizarPublicacion, eliminarPublicacion
├── MongoDB
│   ├── Colección usuarios
│   ├── Colección publicaciones
│   └── Índices: email único, tipo, email publicación
├── Seguridad
│   ├── bcryptjs para hash de contraseña
│   ├── JWT para autenticación
│   └── requireAuth / requireAdmin
└── Portabilidad desde Producto 2
    ├── Almacenaje.js pasa a servicios backend
    ├── localStorage pasa a MongoDB
    ├── login frontend pasa a mutation login
    └── ofertas/demandas pasan a colección publicaciones
