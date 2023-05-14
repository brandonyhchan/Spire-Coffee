import { ApolloServer } from "apollo-server";
import { context } from "./context.js";
import {
  signUp,
  login,
  returnAllCafes,
  getCafeInfo,
  getCafeCount,
} from "./resolvers/Query.js";
import { loadFile } from "graphql-import-files";

const resolvers = {
  Query: {
    signUp,
    login,
    returnAllCafes,
    getCafeInfo,
    getCafeCount,
  },
};

const server = new ApolloServer({
  typeDefs: loadFile("./src/schemas/schema.graphql"),
  resolvers,
  context,
});
server.listen().then(({ url }) => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on ${url}`);
});
