const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

async function startServer() {
    const app = express();
    
    // Creamos la instancia de Apollo Server
    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });

    // Arrancamos Apollo antes de aplicarlo a Express
    await server.start();
    server.applyMiddleware({ app });

    const PORT = 4000;
    app.listen(PORT, () => {
        console.log(`🚀 Servidor listo en http://localhost:${PORT}${server.graphqlPath}`);
        console.log(`📊 Puedes probar tus consultas en Postman usando esa URL`);
    });
}

startServer().catch(err => console.error("Error al arrancar el servidor:", err));