import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { connectDB } from './config/db.js';
import { typeDefs } from './graphql/typeDefs.js';
import { resolvers } from './graphql/resolvers.js';
import { buildContext } from './middleware/context.js';

dotenv.config();

async function bootstrap() {
  await connectDB();
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.get('/', (_, res) => res.json({ ok: true, mensaje: 'AgroJobs Producto 3', graphql: '/graphql' }));

  const apollo = new ApolloServer({ typeDefs, resolvers });
  await apollo.start();
  app.use('/graphql', expressMiddleware(apollo, { context: buildContext }));

  const port = process.env.PORT || 4000;
  app.listen(port, () => console.log(`🚀 Servidor listo en http://localhost:${port}/graphql`));
}

bootstrap().catch((error) => { console.error('❌ Error iniciando servidor', error); process.exit(1); });
