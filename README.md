# Producto 3 - AgroJobs Backend con ExpressJS, GraphQL y MongoDB

Backend que porta la lógica del Producto 2 a servidor: usuarios, login, ofertas/demandas, CRUD y estadísticas. No incluye frontend.

## 1. Instalación

```bash
npm install
cp .env.example .env
```

## 2. MongoDB local con Docker

```bash
docker compose up -d
```

También puedes usar MongoDB Atlas cambiando `MONGODB_URI` en `.env`.

## 3. Cargar datos iniciales

```bash
npm run seed
```

## 4. Arrancar servidor

```bash
npm run dev
```

GraphQL queda en: `http://localhost:4000/graphql`

## 5. Login de prueba

```graphql
mutation {
  login(email: "admin@agrojobs.com", password: "123456aA") {
    token
    usuario { id nombre email rol }
  }
}
```

En Postman, copia el token y añade cabecera:

```txt
Authorization: Bearer TU_TOKEN
```

## 6. Consultas y mutaciones principales

### Crear usuario
```graphql
mutation {
  crearUsuario(input: {
    nombre: "Marta",
    email: "marta@correo.com",
    password: "123456aA",
    rol: Candidato
  }) { id nombre email rol }
}
```

### Listar publicaciones
```graphql
query {
  publicaciones {
    id titulo email fecha descripcion tipo empresa ubicacion
  }
}
```

### Crear oferta/demanda
```graphql
mutation {
  crearPublicacion(input: {
    titulo: "Técnico agrícola",
    email: "rrhh@empresa.com",
    fecha: "2026-05-04",
    descripcion: "Trabajo de apoyo técnico en explotación agrícola.",
    tipo: Oferta,
    empresa: "AgroEmpresa",
    ubicacion: "Lleida"
  }) { id titulo tipo }
}
```

### Estadísticas
```graphql
query { estadisticas { ofertas demandas total } }
```

## 7. Documentación JSDoc

```bash
npm run docs
```

Se genera en `docs/jsdoc`.
