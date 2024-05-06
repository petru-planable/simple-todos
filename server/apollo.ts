import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import { WebApp } from "meteor/webapp";
import { booksMutations } from "./mutations/books";
import { bookResolvers } from "./resolvers/books";
import { typeDefs } from "./schemas/schema";
import { booksSubscriptions } from "./subscriptions/books";
import { useServer } from "graphql-ws/lib/use/ws";

import { ApolloServer } from "@apollo/server";

import cors from "cors"; //cross-origin-resource sharing
import { WebSocketServer } from "ws";
import { makeExecutableSchema } from "@graphql-tools/schema";

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves users from the "Users" collection.
const resolvers = {
  Query: { ...bookResolvers },
  Mutation: { ...booksMutations },
  Subscription: { ...booksSubscriptions },
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

// Creating the WebSocket server
const wsServer = new WebSocketServer({
  noServer: true,
  // serves expressMiddleware at a different path
  path: "/graphql",
});

// Hand in the schema we just created and have the
// WebSocketServer start listening.
const serverCleanup = useServer({ schema }, wsServer);

const server = new ApolloServer({
  schema,
  plugins: [
    // Proper shutdown for the WebSocket server.
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ],
});

await server.start();

const apolloExpress = express().use(
  cors<cors.CorsRequest>(),
  express.json(),
  // expressMiddleware accepts the same arguments:
  // an Apollo Server instance and optional configuration options
  expressMiddleware(server, {
    context: async ({ req }) => ({ token: req.headers.token }),
  })
);

WebApp.connectHandlers.use(
  "/graphql", // Configure the path as you want.
  apolloExpress
);

// https://forums.meteor.com/t/apollo-server-express-server-setup-for-subscriptions/57871/2
WebApp.httpServer.on("upgrade", function upgrade(request, socket, head) {
  if (!request.url) {
    return;
  }

  switch (request.url) {
    case "/graphql":
      return wsServer.handleUpgrade(request, socket, head, function done(ws) {
        wsServer.emit("connection", ws, request);
      });
    default:
      break;
  }
});
