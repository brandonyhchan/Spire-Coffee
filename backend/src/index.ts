import { ApolloServer } from "apollo-server";
// import { startStandaloneServer } from "@apollo/server/standalone";
import { readFileSync } from 'fs';

import { context } from './context';

const typeDefs: string = `
type User {
  id: ID!
  firstName: String!
  lastName: String!
  userName: String!
  password: String!
}

type Query {
  allUsers: [User!]!
}`

const resolvers = {
  Query: {
    allUsers: () => {
      return prisma.user.findMany();
    },
  },
};

  const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers,
    context,
  });
  server.listen({port: 4000 });
