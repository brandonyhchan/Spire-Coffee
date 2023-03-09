import { ApolloServer } from "apollo-server";
import { context } from "./context.js";
import { signup, login } from "./resolvers/Query.js";
import { loadFile } from "graphql-import-files";

const resolvers = {
  Query: {
    signup,
    login,
  },
};

const server = new ApolloServer({
  typeDefs: loadFile("./src/schemas/schema.graphql"),
  resolvers,
  context,
});
server.listen({ port: 4000 });
