import { json } from "body-parser";
import express from "express";
import { bookResolvers } from "./resolvers/books";
import { typeDefs } from "./schemas/schema";
import { WebApp } from "meteor/webapp";
import { booksMutations } from "./mutations/books";
import { booksSubscriptions } from "./subscriptions/books";
import { expressMiddleware } from '@apollo/server/express4';

import { ApolloServer } from '@apollo/server';

import cors from "cors"; //cross-origin-resource sharing

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves users from the "Users" collection.
const resolvers = {
  Query: { ...bookResolvers },
  Mutation: { ...booksMutations },
  Subscription: { ...booksSubscriptions },
};

const server = new ApolloServer({ typeDefs: [typeDefs], resolvers });
await server.start();


const apolloExpress = express().use(
  cors<cors.CorsRequest>(),
  express.json(),
  // expressMiddleware accepts the same arguments:
  // an Apollo Server instance and optional configuration options
  expressMiddleware(server, {
    context: async ({ req }) => ({ token: req.headers.token }),
  })
)

WebApp.connectHandlers.use(
  "/graphql", // Configure the path as you want.
  apolloExpress
);

WebApp.httpServer.on("error", (error) => {
  console.log("222222222222 error: ", error);
});
WebApp.httpServer.on("clienterror", (error) => {
  console.log("333333333 clienterror: ", error);
});
