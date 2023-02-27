import { ApolloServer } from "apollo-server";
import { context } from './context.js';
import { signup, login } from "./resolvers/Query.js";
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
  signup(
    email: String!
    password: String!
    firstName: String!
    lastName: String!
    userName: String!
  ): AuthPayload
  login(userName: String!, password: String!): AuthPayload
}

type AuthPayload {
  token: String
  user: User
}`;
const resolvers = {
    Query: {
        signup,
        login,
    }
};
const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers,
    context,
});
server.listen({ port: 4000 });
