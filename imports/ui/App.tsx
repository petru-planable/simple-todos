import React from "react";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";

import { split } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";

const wsLink = new GraphQLWsLink(
  createClient({ url: "ws://localhost:3000/graphql", lazy: true })
);

const httpLink = createHttpLink({ uri: "/graphql" });

// const token = retrieveData('AUTH_TOKEN');
const token = "AUTH_TOKEN";

const authLink = setContext((_, headers) => {
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

// Apollo Client instance
const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache({ addTypename: false }),
  connectToDevTools: true,
});

import { Hello } from "./Hello";
import { Info } from "./Info";

export const App = () => (
  <div>
    <h1>Welcome to Meteor with Apollo</h1>
    <ApolloProvider client={client}>
      <Hello />
      <Info />
    </ApolloProvider>
  </div>
);
