import { ApolloServer } from "apollo-server";
import { signup, login } from "./resolvers/Query";
import { context } from './context';
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
