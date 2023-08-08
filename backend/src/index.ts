import { ApolloServer } from "apollo-server";
import { context } from "./context.js";
import {
  signUp,
  login,
  returnAllCafes,
  getCafeInfo,
} from "./resolvers/Query.js";
import { updateCafeInfo } from "./resolvers/Mutation.js";
import { loadFile } from "graphql-import-files";

const resolvers = {
  Query: {
    signUp,
    login,
    returnAllCafes,
    getCafeInfo,
  },
  Mutation: {
    updateCafeInfo,
  },
};

const server = new ApolloServer({
  typeDefs: loadFile("./src/schemas/schema.graphql"),
  resolvers,
  context,
  cors: {
    credentials: true,
    origin: (origin, callback) => {
      const whitelist = [
        "http://localhost:3000",
        "https://maps.googleapis.com",
      ];

      if (origin !== undefined && whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  },
});
server.listen().then(({ url }) => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on ${url}`);
});
