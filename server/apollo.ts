import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { json } from "body-parser";
import express from "express";
import { useServer } from "graphql-ws/lib/use/ws";
// import { getUser } from "meteor/apollo";
import { WebSocketServer } from "ws";
import { bookResolvers } from "./resolvers/books";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { typeDefs } from "./schemas/schema";
import { WebApp } from "meteor/webapp";
import { booksMutations } from "./mutations/books";
import { booksSubscriptions } from "./subscriptions/books";

import cors from "cors"; //cross-origin-resource sharing

// const context = async ({ req }) => ({
//   user: await getUser(req.headers.authorization),
// });

//#region Old comments
// import sc from './schemas/schema.ts';
// console.log(sc)

// console.log("print schema: ", printSchema(sc));

// import s from './schema.graphql'

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves users from the "Users" collection.
// const resolvers = {
//   Query: { ...bookResolvers },
//   // Mutation: { ...userMutations },
//   // Subscription: { ...userSubscriptions }
// };

// const schema = loadSchemaSync('./schema.graphql', {
//   loaders: [new GraphQLFileLoader()],
// });

// const document2 = loadDocuments('./schemas/schema.ts', { loaders: [new GraphQLFileLoader()] })

// // const schema = makeExecutableSchema({ typeDefs: [], resolvers });
// const server = new ApolloServer({ schema });

//#endregion

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves users from the "Users" collection.
const resolvers = {
  Query: { ...bookResolvers },
  Mutation: { ...booksMutations },
  Subscription: { ...booksSubscriptions },
};

const schema = makeExecutableSchema({ typeDefs: [typeDefs], resolvers });
const server = new ApolloServer({ schema });

// Creating the WebSocket server
const wsServer = new WebSocketServer({
  // This is the `httpServer` we created in a previous step.
  server: WebApp.httpServer,
  // Pass a different path here if app.use
  // serves expressMiddleware at a different path
  path: "/graphql",
});

wsServer.on("error", (error) => {
  console.log("111111111111 error: ", error);
});
wsServer.on("clienterror", (error) => {
  console.log("4444444444 client error: ", error);
});

useServer({ schema }, wsServer);

await server.start();

server.logger.info("Apollo server started!");

WebApp.connectHandlers.use(
  "/graphql", // Configure the path as you want.
  express() // Create new Express router.
    .disable("etag") // We don't server GET requests, so there's no need for that.
    .disable("x-powered-by") // A small safety measure.
    .use(json()) // From `body-parser`.
    .use(
      cors<cors.CorsRequest>({
        origin: "http://localhost:3000",
        credentials: true,
      })
    )
    .use(
      expressMiddleware(server, {
        /* context */
      })
    ) // From `@apollo/server/express4`.
);

WebApp.httpServer.on("error", (error) => {
  console.log("222222222222 error: ", error);
});
WebApp.httpServer.on("clienterror", (error) => {
  console.log("333333333 clienterror: ", error);
});
