import { PrismaClient } from "@prisma/client";
import { ApolloServer } from "apollo-server";
const prisma = new PrismaClient();
const typeDefs = `
type User {
  id: ID!
  firstName: String!
  lastName: String!
  userName: String!
  password: String!
}

type Query {
  allUsers: [User!]!
}`;
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
});
server.listen({ port: 4000 });
