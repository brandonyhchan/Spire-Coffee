import { ApolloServer } from "apollo-server";
import { context } from "./context.js";
import {
  signUp,
  login,
  returnAllCafes,
  getCafeInfo,
  getCafeCount,
  getUserInfo,
} from "./resolvers/Query.js";
import { updateUserInfo } from "./resolvers/Mutation.js";
import { loadFile } from "graphql-import-files";

const resolvers = {
  Query: {
    signUp,
    login,
    returnAllCafes,
    getCafeInfo,
    getCafeCount,
    getUserInfo,
  },
  Mutation: {
    updateUserInfo,
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
