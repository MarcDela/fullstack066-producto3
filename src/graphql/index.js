//Importación librerias
import express from 'express';
import {graphqlHTTP} from 'express-graphql';
import {schema} from './schema.js';
import {root} from './resolvers.js';

const app=express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`El servidor está funcionando: http://localhost:${PORT}/graphql`);
});
